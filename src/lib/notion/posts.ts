import { notion } from "./client"
import type { Post } from "./types"

export async function getPosts(preview = false): Promise<Post[]> {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_POSTS_DB!,
    sorts: [
      {
        property: "Publish Date",
        direction: "descending",
      },
    ],
  })

  const now = new Date()

  const posts: Post[] = (res.results as any[])
    .map((item) => {
      const slug =
        item.properties.Slug?.rich_text?.[0]?.plain_text || ""

      if (!slug) return null

      return {
        id: item.id,
        title:
          item.properties.Title?.title?.[0]?.plain_text ||
          "Untitled",

        slug,

        excerpt:
          item.properties.Excerpt?.rich_text?.[0]?.plain_text ||
          "",

        cover:
          item.properties.Cover?.files?.[0]?.file?.url ||
          item.properties.Cover?.files?.[0]?.external?.url ||
          null,

        status:
          item.properties.Status?.select?.name ||
          "draft",

        publishDate:
          item.properties["Publish Date"]?.date?.start,

        updatedDate:
          item.properties["Updated Date"]?.date?.start,

        contentType:
          item.properties["Content Type"]?.select?.name ||
          "essay",

        category:
          item.properties.Category?.select?.name ||
          null,

        tags:
          item.properties.Tags?.multi_select?.map(
            (t: any) => t.name
          ) || [],

        featured:
          item.properties.Featured?.checkbox || false,

        pinned:
          item.properties.Pinned?.checkbox || false,

        showTOC:
          item.properties["Show TOC"]?.checkbox || false,

        enableComments:
          item.properties["Enable Comments"]?.checkbox ||
          false,
      }
    })
    .filter(Boolean) as Post[]

  /* =========================
     PREVIEW MODE
  ========================= */

  if (preview) {
    return posts
  }

  /* =========================
     PRODUCTION FILTER
  ========================= */

  return posts.filter((post) => {
    if (post.status === "published") return true

    if (
      post.status === "scheduled" &&
      post.publishDate &&
      new Date(post.publishDate) <= now
    ) {
      return true
    }

    return false
  })
}
