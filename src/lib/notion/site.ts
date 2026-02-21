import { notion } from "./client"
import { mapText } from "./mapper"
import type { SiteConfig } from "./types"

export async function getSiteConfig(): Promise<SiteConfig> {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_SITE_DB!,
    page_size: 1,
  })

  const page: any = res.results[0]

  return {
    title: mapText(page.properties.Title),
    description: mapText(page.properties.Description),
    logo: page.properties.Logo?.files?.[0]?.file?.url,
  }
}
