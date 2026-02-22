import React from "react"
import { RichText } from "./RichText"

export function BlockRenderer({ blocks }: { blocks: any[] }) {
  return (
    <>
      {blocks.map((block) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={block.id}>
                <RichText text={block.paragraph.rich_text} />
              </p>
            )

          case "heading_1":
            return (
              <h1 key={block.id}>
                <RichText text={block.heading_1.rich_text} />
              </h1>
            )

          case "heading_2":
            return (
              <h2 key={block.id}>
                <RichText text={block.heading_2.rich_text} />
              </h2>
            )

          case "heading_3":
            return (
              <h3 key={block.id}>
                <RichText text={block.heading_3.rich_text} />
              </h3>
            )

          case "bulleted_list_item":
            return (
              <ul key={block.id}>
                <li>
                  <RichText text={block.bulleted_list_item.rich_text} />
                </li>
              </ul>
            )

          case "numbered_list_item":
            return (
              <ol key={block.id}>
                <li>
                  <RichText text={block.numbered_list_item.rich_text} />
                </li>
              </ol>
            )

          case "code":
            return (
              <pre key={block.id}>
                <code>
                  {block.code.rich_text.map((t: any) => t.plain_text).join("")}
                </code>
              </pre>
            )

          case "image":
            const img =
              block.image.file?.url ||
              block.image.external?.url

            return (
              <img
                key={block.id}
                src={img}
                loading="lazy"
                alt=""
              />
            )

          case "divider":
            return <hr key={block.id} />

          default:
            return null
        }
      })}
    </>
  )
}
