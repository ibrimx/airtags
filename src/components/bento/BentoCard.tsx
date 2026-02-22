// components/bento/BentoCard.tsx

import type { BentoBlock } from "@/lib/notion/types"

interface Props {
  block: BentoBlock
}

export default function BentoCard({ block }: Props) {
  return (
    <div className="h-full rounded-2xl p-6 relative overflow-hidden bg-neutral-900 text-white">

      {block.image && (
        <img
          src={block.image}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <h3 className="text-xl font-semibold">
            {block.title}
          </h3>

          {block.description && (
            <p className="mt-3 opacity-80">
              {block.description}
            </p>
          )}
        </div>

        {block.linkHref && (
          <a
            href={block.linkHref}
            className="mt-4 inline-flex items-center gap-2 text-sm opacity-80 hover:opacity-100"
          >
            {block.linkText}
            <span>→</span>
          </a>
        )}
      </div>
    </div>
  )
}
