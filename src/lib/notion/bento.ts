// src/lib/notion/bento.ts

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

  return res.results.map((item: any) => ({
    id: item.id,
    title: item.properties.Title?.title?.[0]?.plain_text || "",
    description:
      item.properties.Description?.rich_text?.[0]?.plain_text || "",
    image:
      item.properties.Image?.files?.[0]?.file?.url ||
      item.properties.Image?.files?.[0]?.external?.url ||
      null,
    spanCols: item.properties.SpanCols?.number || 12,
    spanRows: item.properties.SpanRows?.number || 1,
    order: item.properties.Order?.number || 0,
    layout:
      item.properties.Layout?.select?.name || "stack",
    linkText:
      item.properties["Link Text"]?.rich_text?.[0]?.plain_text || "",
    linkHref:
      item.properties["Link URL"]?.url || "",
    styleVariant:
      item.properties["Style Variant"]?.select?.name || "surface",
  }))
}
