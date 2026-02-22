import { RichText } from "./RichText"
import { highlight } from "@/lib/notion/highlight"
import { renderEquation } from "@/lib/notion/equation"

interface Props {
  blocks: any[]
}

export function BlockRenderer({ blocks }: Props) {
  if (!blocks || blocks.length === 0) return null

  return (
    <>
      {blocks.map((block: any) => {
        switch (block.type) {

          case "paragraph":
            return (
              <p key={block.id}>
                <RichText text={block.paragraph?.rich_text || []} />
              </p>
            )

          case "heading_1":
          case "heading_2":
          case "heading_3": {
            const level = block.type.split("_")[1]
            const Tag = `h${level}` as any
            return (
              <Tag key={block.id}>
                <RichText text={block[block.type]?.rich_text || []} />
              </Tag>
            )
          }

          case "bulleted_list_item":
            return (
              <ul key={block.id}>
                <li>
                  <RichText text={block.bulleted_list_item?.rich_text || []} />
                </li>
              </ul>
            )

          case "numbered_list_item":
            return (
              <ol key={block.id}>
                <li>
                  <RichText text={block.numbered_list_item?.rich_text || []} />
                </li>
              </ol>
            )

          case "quote":
            return (
              <blockquote key={block.id}>
                <RichText text={block.quote?.rich_text || []} />
              </blockquote>
            )

          case "callout":
            return (
              <div key={block.id} className="notion-callout">
                <RichText text={block.callout?.rich_text || []} />
              </div>
            )

          case "code": {
            const raw =
              block.code?.rich_text?.map((t: any) => t.plain_text).join("") || ""

            const html = highlight(raw, block.code?.language || "javascript")

            return (
              <pre key={block.id}>
                <code dangerouslySetInnerHTML={{ __html: html }} />
              </pre>
            )
          }

          case "image": {
            const src =
              block.image?.file?.url ||
              block.image?.external?.url

            if (!src) return null

            return (
              <img key={block.id} src={src} loading="lazy" />
            )
          }

          case "divider":
            return <hr key={block.id} />

          default:
            return null
        }
      })}
    </>
  )
}
