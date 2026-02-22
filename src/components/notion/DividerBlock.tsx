import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"

interface Props {
  block: BlockObjectResponse
}

export default function DividerBlock({ block }: Props) {
  if (block.type !== "divider") return null
  return <hr style={{ margin: "2rem 0", opacity: 0.3 }} />
}
