import { ImageResponse } from "next/og";
import { LogoSvg } from "@/lib/og";

/** 512×512 PNG logo for structured data (Organization.logo) and other consumers. */
export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex" }}>
        <LogoSvg size={512} />
      </div>
    ),
    { width: 512, height: 512, headers: { "Cache-Control": "public, max-age=86400, s-maxage=604800" } },
  );
}
