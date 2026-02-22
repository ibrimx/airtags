import { notion } from "./client"
import type { StorySlide, StoryItem } from "./types"

export async function getStorySlides(): Promise<StorySlide[]> {
  /* Slides */
  const slidesRes = await notion.databases.query({
    database_id: process.env.NOTION_STORY_SLIDE_DB!,
    filter: {
      property: "Published",
      checkbox: { equals: true },
    },
    sorts: [{ property: "Order", direction: "ascending" }],
  })

  /* Items */
  const itemsRes = await notion.databases.query({
    database_id: process.env.NOTION_STORY_ITEMS_DB!,
    filter: {
      property: "Active",
      checkbox: { equals: true },
    },
    sorts: [{ property: "Order", direction: "ascending" }],
  })

  const items: StoryItem[] = (itemsRes.results as any[]).map(item => ({
    id: item.id,
    title: item.properties.Title?.title?.[0]?.plain_text || "",
    media:
      item.properties.Media?.files?.[0]?.file?.url ||
      item.properties.Media?.files?.[0]?.external?.url ||
      null,
    caption:
      item.properties.Caption?.rich_text?.[0]?.plain_text || "",
    ctaText:
      item.properties["CTA Text"]?.rich_text?.[0]?.plain_text || "",
    ctaLink:
      item.properties["CTA Link"]?.url || "",
    type:
      item.properties.Type?.select?.name || "image",
    duration:
      item.properties.Duration?.number || 0,
    background:
      item.properties.Background?.select?.name || "",
    order:
      item.properties.Order?.number || 0,
    slideId:
      item.properties.Slide?.relation?.[0]?.id || null,
  }))

  const slides: StorySlide[] = (slidesRes.results as any[]).map(slide => {
    const slideItems = items.filter(
      item => item.slideId === slide.id
    )

    return {
      id: slide.id,
      title: slide.properties.Title?.title?.[0]?.plain_text || "",
      slug:
        slide.properties.Slug?.rich_text?.[0]?.plain_text || "",
      cover:
        slide.properties.Cover?.files?.[0]?.file?.url ||
        slide.properties.Cover?.files?.[0]?.external?.url ||
        null,
      order:
        slide.properties.Order?.number || 0,
      theme:
        slide.properties.Theme?.select?.name || "",
      items: slideItems,
    }
  })

  return slides
}
