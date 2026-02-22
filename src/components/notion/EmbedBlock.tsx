import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"

interface Props {
  block: BlockObjectResponse
}

export default function EmbedBlock({ block }: Props) {
  if (block.type !== "embed") return null

  return (
    <div style={{ margin: "2rem 0" }}>
      <iframe
        src={block.embed.url}
        style={{
          width: "100%",
          minHeight: "400px",
          borderRadius: 12,
          border: "none",
        }}
        loading="lazy"
      />
    </div>
  )
}
