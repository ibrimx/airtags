import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import RichText from "./RichText"

interface Props {
  block: BlockObjectResponse
}

export default function QuoteBlock({ block }: Props) {
  if (block.type !== "quote") return null

  return (
    <blockquote
      style={{
        borderLeft: "4px solid #888",
        paddingLeft: "1rem",
        margin: "1.5rem 0",
        opacity: 0.9,
      }}
    >
      <RichText text={block.quote.rich_text} />
    </blockquote>
  )
}
