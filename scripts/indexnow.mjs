#!/usr/bin/env node
/**
 * Submit every URL from the live sitemap to IndexNow (Bing, Yandex, Seznam, Naver …).
 * Run after a deploy that adds or changes pages:  npm run indexnow
 *
 * The key file must already be live at https://<host>/<key>.txt.
 */
const SITE = process.env.SITE_URL ?? "https://openstatuspage.dev";
const KEY = process.env.INDEXNOW_KEY ?? "373eab395bd2fa8fc70db05cc631d430";

const host = new URL(SITE).host;
const keyLocation = `${SITE}/${KEY}.txt`;

async function text(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  return res.text();
}

const locs = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

const keyFile = (await text(keyLocation)).trim();
if (keyFile !== KEY) throw new Error(`Key file at ${keyLocation} does not contain the key`);

const index = await text(`${SITE}/sitemap.xml`);
const urlList = (await Promise.all(locs(index).map(async (s) => locs(await text(s))))).flat();
if (urlList.length === 0) throw new Error("No URLs found in the sitemap");

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key: KEY, keyLocation, urlList }),
});
console.log(`IndexNow: HTTP ${res.status} for ${urlList.length} URLs`);
if (res.status >= 300) {
  console.error(await res.text());
  process.exit(1);
}
