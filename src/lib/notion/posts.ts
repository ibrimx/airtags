import { notion } from "./client"
import { mapText, mapCheckbox } from "./mapper"
import type { Post } from "./types"

export async function getPosts(): Promise<Post[]> {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_POSTS_DB!,
    filter: {
      property: "Published",
      checkbox: { equals: true },
    },
    sorts: [
      { property: "Date", direction: "descending" },
    ],
  })

  return res.results.map((page: any) => ({
    id: page.id,
    slug: mapText(page.properties.Slug),
    title: mapText(page.properties.Title),
    excerpt: mapText(page.properties.Excerpt),
    cover: page.properties.Cover?.files?.[0]?.file?.url,
    published: mapCheckbox(page.properties.Published),
    date: page.properties.Date?.date?.start,
  }))
}
