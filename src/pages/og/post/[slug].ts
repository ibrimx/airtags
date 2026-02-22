import { OGImageRoute } from "astro-og-canvas"
import { getPosts } from "@/lib/notion/posts"
import { getCollection } from "astro:content"

export const { getStaticPaths, GET } = OGImageRoute({
  param: "slug",

  async getImageOptions({ slug }) {

    /* Notion */
    try {
      const notionPosts = await getPosts(false)
      const post = notionPosts.find(p => p.slug === slug)

      if (post) {
        return {
          title: post.title,
          description: post.excerpt,
        }
      }
    } catch {}

    /* Markdown */
    const posts = await getCollection("posts")
    const md = posts.find(p => p.id === slug)

    if (md) {
      return {
        title: md.data.title,
        description: md.data.description,
      }
    }

    return {
      title: "Post",
      description: "",
    }
  },
})
