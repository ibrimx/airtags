import { notion } from "./client"
import { mapText, mapNumber, mapCheckbox } from "./mapper"
import type { StorySlide } from "./types"

export async function getStorySlides(): Promise<StorySlide[]> {
  const slidesRes = await notion.databases.query({
    database_id: process.env.NOTION_SLIDES_DB!,
    filter: {
      property: "Published",
      checkbox: { equals: true },
    },
    sorts: [{ property: "Order", direction: "ascending" }],
  })

  const slides: StorySlide[] = []

  for (const slide: any of slidesRes.results) {
    const storiesRes = await notion.databases.query({
      database_id: process.env.NOTION_STORIES_DB!,
      filter: {
        property: "Slide",
        relation: { contains: slide.id },
      },
      sorts: [{ property: "Order", direction: "ascending" }],
    })

    slides.push({
      id: slide.id,
      title: mapText(slide.properties.Title),
      slug: mapText(slide.properties.Slug),
      cover: slide.properties.Cover?.files?.[0]?.file?.url,
      order: mapNumber(slide.properties.Order),
      stories: storiesRes.results
        .filter((story: any) =>
          mapCheckbox(story.properties.Active)
        )
        .map((story: any) => ({
          id: story.id,
          type: story.properties.Type.select.name,
          media: story.properties.Media?.files?.[0]?.file?.url,
          caption: mapText(story.properties.Caption),
          duration: mapNumber(story.properties.Duration),
          background:
            story.properties.Background?.select?.name || "default",
          cta: {
            text: mapText(story.properties["CTA Text"]),
            link: story.properties["CTA Link"]?.url,
          },
        })),
    })
  }

  return slides
}
