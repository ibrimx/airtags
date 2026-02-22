// components/bento/BentoLayout.tsx

import type { BentoBlock } from "@/lib/notion/types"
import BentoCard from "./BentoCard"

interface Props {
  blocks: BentoBlock[]
}

export default function BentoLayout({ blocks }: Props) {
  return (
    <div
      className="
        grid gap-6 w-full
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-12
      "
      style={{
        gridAutoRows: "180px",
        gridAutoFlow: "dense",
      }}
    >
      {blocks.map((block) => (
        <div
          key={block.id}
          style={{
            gridColumn: `span ${block.spanCols} / span ${block.spanCols}`,
            gridRow: `span ${block.spanRows} / span ${block.spanRows}`,
          }}
        >
          <BentoCard block={block} />
        </div>
      ))}
    </div>
  )
}
