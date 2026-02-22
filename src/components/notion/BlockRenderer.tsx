import { RichText } from "./RichText"
import { highlight } from "@/lib/notion/highlight"
import { renderEquation } from "@/lib/notion/equation"

function groupLists(blocks: any[]) {
  const result: any[] = []
  let buffer: any[] = []

  const flush = () => {
    if (buffer.length) {
      result.push({ type: buffer[0].type, items: buffer })
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
  const grouped = groupLists(blocks)

  return (
    <>
      {grouped.map((block: any) => {

        /* LIST GROUP */

        if (block.items) {
          const Tag =
            block.type === "bulleted_list_item" ? "ul" : "ol"

          return (
            <Tag key={block.items[0].id}>
              {block.items.map((item: any) => (
                <li key={item.id}>
                  <RichText text={item[item.type].rich_text} />
                  {item.children && (
                    <BlockRenderer blocks={item.children} />
                  )}
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
          case "heading_2":
          case "heading_3":
            const H = block.type.replace("_", "") as any
            return (
              <H key={block.id} id={block.id}>
                <RichText text={block[block.type].rich_text} />
              </H>
            )

          case "callout":
            return (
              <div key={block.id} className="notion-callout">
                <RichText text={block.callout.rich_text} />
              </div>
            )

          case "quote":
            return (
              <blockquote key={block.id}>
                <RichText text={block.quote.rich_text} />
              </blockquote>
            )

          case "toggle":
            return (
              <details key={block.id}>
                <summary>
                  <RichText text={block.toggle.rich_text} />
                </summary>
                {block.children && (
                  <BlockRenderer blocks={block.children} />
                )}
              </details>
            )

          case "code":
            const raw = block.code.rich_text
              .map((t: any) => t.plain_text)
              .join("")

            const html = highlight(raw, block.code.language)

            return (
              <div key={block.id} className="code-block">
                <button
                  className="copy-btn"
                  onClick={() =>
                    navigator.clipboard.writeText(raw)
                  }
                >
                  Copy
                </button>
                <pre>
                  <code
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                </pre>
              </div>
            )

          case "image":
            const img =
              block.image.file?.url ||
              block.image.external?.url

            return (
              <figure key={block.id}>
                <img
                  src={img}
                  loading="lazy"
                  decoding="async"
                  style={{ width: "100%" }}
                  alt=""
                />
                {block.image.caption?.length > 0 && (
                  <figcaption>
                    <RichText text={block.image.caption} />
                  </figcaption>
                )}
              </figure>
            )

          case "bookmark":
            const url = new URL(block.bookmark.url)
            return (
              <a
                key={block.id}
                href={block.bookmark.url}
                target="_blank"
                rel="noopener"
                className="bookmark-card"
              >
                <strong>{url.hostname}</strong>
                <span>{block.bookmark.url}</span>
              </a>
            )

          case "embed":
            return (
              <iframe
                key={block.id}
                src={block.embed.url}
                loading="lazy"
                style={{ width: "100%", minHeight: "400px" }}
              />
            )

          case "video":
            const video =
              block.video.file?.url ||
              block.video.external?.url

            return (
              <video key={block.id} controls>
                <source src={video} />
              </video>
            )

          case "equation":
            return (
              <div
                key={block.id}
                dangerouslySetInnerHTML={{
                  __html: renderEquation(block.equation.expression),
                }}
              />
            )

          case "table":
            return (
              <table key={block.id}>
                <tbody>
                  {block.children?.map((row: any) => (
                    <tr key={row.id}>
                      {row.table_row.cells.map(
                        (cell: any, i: number) => (
                          <td key={i}>
                            <RichText text={cell} />
                          </td>
                        )
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            )

          case "column_list":
            return (
              <div key={block.id} className="columns">
                {block.children?.map((col: any) => (
                  <div key={col.id} className="column">
                    <BlockRenderer blocks={col.children} />
                  </div>
                ))}
              </div>
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
