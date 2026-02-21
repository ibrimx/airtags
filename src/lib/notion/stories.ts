import { notion } from "./client"
import type { StorySlide } from "./types"

export async function getStorySlides(): Promise<StorySlide[]> {
  const slidesRes = await notion.databases.query({
    database_id: process.env.NOTION_SLIDES_DB!,
  })

  const slides: StorySlide[] = []

  for (const slide of slidesRes.results as any[]) {
    slides.push({
      id: slide.id,
      title: slide.properties?.Title?.title?.[0]?.plain_text || "",
      slug: slide.properties?.Slug?.rich_text?.[0]?.plain_text || "",
      cover: slide.properties?.Cover?.files?.[0]?.file?.url,
      order: slide.properties?.Order?.number || 0,
      stories: [],
    })
  }

  return slides
}
