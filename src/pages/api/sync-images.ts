import type { APIRoute } from "astro"
import { Client } from "@notionhq/client"
import { uploadImageToR2 } from "@/lib/r2/upload"

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export const POST: APIRoute = async () => {
  const pages = await notion.databases.query({
    database_id: process.env.NOTION_DB_ID!,
  })

  for (const page of pages.results as any[]) {
    const imageFile = page.properties.Image?.files?.[0]
    if (!imageFile) continue

    const notionUrl = imageFile.file?.url
    if (!notionUrl) continue

    const response = await fetch(notionUrl)
    const buffer = Buffer.from(await response.arrayBuffer())

    const r2Url = await uploadImageToR2(buffer)

    await notion.pages.update({
      page_id: page.id,
      properties: {
        R2Image: {
          url: r2Url,
        },
      },
    })
  }

  return new Response(JSON.stringify({ success: true }))
}
