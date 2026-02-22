import { notion } from "./client"
import type { BentoBlock } from "./types"

export async function getBentoBlocks(): Promise<BentoBlock[]> {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_BENTO_DB!,
    filter: {
      property: "Published",
      checkbox: { equals: true },
    },
    sorts: [{ property: "Order", direction: "ascending" }],
  })

  return res.results.map((item: any): BentoBlock => ({
    id: item.id,
    title: item.properties.Title?.title?.[0]?.plain_text || "",
    description:
      item.properties.Description?.rich_text?.[0]?.plain_text || "",
    image:
      item.properties.Image?.files?.[0]?.file?.url ||
      item.properties.Image?.files?.[0]?.external?.url ||
      null,
    layout:
      item.properties.Layout?.select?.name || "stack",
    span:
      Math.min(
        12,
        Math.max(1, item.properties.Span?.number || 12)
      ),
    order: item.properties.Order?.number || 0,
    linkText:
      item.properties["Link Text"]?.rich_text?.[0]?.plain_text || "",
    linkHref:
      item.properties["Link URL"]?.url || "",
    styleVariant:
      item.properties["Style Variant"]?.select?.name || "surface",
    published:
      item.properties.Published?.checkbox ?? false,
  }))
}
