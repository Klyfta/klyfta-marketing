import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export const alt = "Verkio — fast, focused, European work suite";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OgImage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "hero" });
  const headline = t("headline");
  const eyebrow = t("eyebrow");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "rgb(17, 24, 39)",
          padding: "80px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            backgroundColor: "rgb(120, 158, 196)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 32,
            fontWeight: 600,
            color: "white",
            letterSpacing: "-0.02em",
          }}
        >
          Verkio
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
            marginBottom: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 600,
              color: "rgb(168, 196, 220)",
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              marginBottom: 32,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 88,
              fontWeight: 500,
              color: "white",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: "1000px",
            }}
          >
            {headline}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 24,
            color: "rgb(156, 163, 175)",
          }}
        >
          <div style={{ display: "flex" }}>verkio.eu</div>
          <div style={{ display: "flex" }}>EU-resident work suite</div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
