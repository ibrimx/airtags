import { notion } from "./client"

export async function getSiteConfig() {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_SITE_CONFIG_DB!,
    page_size: 1,
  })

  const config = res.results[0] as any

  return {
    siteName:
      config.properties["Site Name"]?.title?.[0]?.plain_text || "",
    tagline:
      config.properties.Tagline?.rich_text?.[0]?.plain_text || "",
    primaryColor:
      config.properties["Primary Color"]?.rich_text?.[0]?.plain_text || "",
    accentColor:
      config.properties["Accent Color"]?.rich_text?.[0]?.plain_text || "",
    defaultTheme:
      config.properties["Default Theme"]?.select?.name || "light",
    seoTitle:
      config.properties["SEO Title"]?.rich_text?.[0]?.plain_text || "",
    seoDescription:
      config.properties["SEO Description"]?.rich_text?.[0]?.plain_text || "",
    logo:
      config.properties.Logo?.files?.[0]?.file?.url ||
      config.properties.Logo?.files?.[0]?.external?.url ||
      null,
    favicon:
      config.properties.Favicon?.files?.[0]?.file?.url ||
      config.properties.Favicon?.files?.[0]?.external?.url ||
      null,
    ogImage:
      config.properties["OG Image"]?.files?.[0]?.file?.url ||
      config.properties["OG Image"]?.files?.[0]?.external?.url ||
      null,
    footerText:
      config.properties["Footer Text"]?.rich_text?.[0]?.plain_text || "",
    twitter:
      config.properties["Twitter URL"]?.url || "",
    instagram:
      config.properties["Instagram URL"]?.url || "",
    github:
      config.properties["GitHub URL"]?.url || "",
  }
}
