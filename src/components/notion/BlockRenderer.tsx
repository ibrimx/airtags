import React from "react"
import { RichText } from "./RichText"

function groupListBlocks(blocks: any[]) {
  const result: any[] = []
  let buffer: any[] = []

  const flush = () => {
    if (buffer.length) {
      result.push({
        type: buffer[0].type,
        items: buffer,
      })
      buffer = []
    }
  }

  for (const block of blocks) {
    if (
      block.type === "bulleted_list_item" ||
      block.type === "numbered_list_item"
    ) {
      buffer.push(block)
    } else {
      flush()
      result.push(block)
    }
  }

  flush()
  return result
}

export function BlockRenderer({ blocks }: { blocks: any[] }) {
  const grouped = groupListBlocks(blocks)

  return (
    <>
      {grouped.map((block: any) => {
        // grouped list
        if (block.items) {
          const Tag =
            block.type === "bulleted_list_item" ? "ul" : "ol"

          return (
            <Tag key={block.items[0].id}>
              {block.items.map((item: any) => (
                <li key={item.id}>
                  <RichText text={item[item.type].rich_text} />
                </li>
              ))}
            </Tag>
          )
        }

        switch (block.type) {
          case "paragraph":
            return (
              <p key={block.id}>
                <RichText text={block.paragraph.rich_text} />
              </p>
            )

          case "heading_1":
            return (
              <h1 id={block.id} key={block.id}>
                <RichText text={block.heading_1.rich_text} />
              </h1>
            )

          case "heading_2":
            return (
              <h2 id={block.id} key={block.id}>
                <RichText text={block.heading_2.rich_text} />
              </h2>
            )

          case "heading_3":
            return (
              <h3 id={block.id} key={block.id}>
                <RichText text={block.heading_3.rich_text} />
              </h3>
            )

          case "quote":
            return (
              <blockquote key={block.id}>
                <RichText text={block.quote.rich_text} />
              </blockquote>
            )

          case "callout":
            return (
              <div key={block.id} className="callout">
                <RichText text={block.callout.rich_text} />
              </div>
            )

          case "code":
            const codeText = block.code.rich_text
              .map((t: any) => t.plain_text)
              .join("")

            return (
              <pre key={block.id}>
                <code className={`language-${block.code.language}`}>
                  {codeText}
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
                className="post-image"
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
