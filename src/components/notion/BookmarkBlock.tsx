import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"

interface Props {
  block: BlockObjectResponse
}

export default function BookmarkBlock({ block }: Props) {
  if (block.type !== "bookmark") return null

  return (
    <a
      href={block.bookmark.url}
      target="_blank"
      style={{
        display: "block",
        padding: "1rem",
        border: "1px solid #333",
        borderRadius: 12,
        margin: "1.5rem 0",
        textDecoration: "none",
      }}
    >
      {block.bookmark.url}
    </a>
  )
}
