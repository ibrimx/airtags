import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import RichText from "./RichText"

interface Props {
  block: BlockObjectResponse
}

const colorMap: Record<string, string> = {
  gray_background: "#2a2a2a",
  brown_background: "#3b2f2f",
  orange_background: "#3a2a1f",
  yellow_background: "#3a3a1f",
  green_background: "#1f3a2a",
  blue_background: "#1f2a3a",
  purple_background: "#2a1f3a",
  pink_background: "#3a1f2f",
  red_background: "#3a1f1f",
}

export default function Callout({ block }: Props) {
  if (block.type !== "callout") return null

  const icon =
    block.callout.icon?.type === "emoji"
      ? block.callout.icon.emoji
      : "💡"

  const background =
    colorMap[block.callout.color] || "#222"

  return (
    <div
      style={{
        background,
        padding: "1rem",
        borderRadius: "12px",
        display: "flex",
        gap: "0.75rem",
        alignItems: "flex-start",
      }}
    >
      <span style={{ fontSize: "1.25rem" }}>{icon}</span>
      <div>
        <RichText text={block.callout.rich_text} />
      </div>
    </div>
  )
}
