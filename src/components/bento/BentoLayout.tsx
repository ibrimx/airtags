// components/bento/BentoLayout.tsx

import React from "react"

interface BentoLayoutProps {
  children: React.ReactNode
  spans: number[]
}

export default function BentoLayout({
  children,
  spans,
}: BentoLayoutProps) {
  const items = React.Children.toArray(children)

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
      {items.map((child, index) => {
        const span = spans[index] || 12

        return (
          <div
            key={index}
            className="w-full"
            style={{
              gridColumn:
                typeof window === "undefined"
                  ? undefined
                  : `span ${span} / span ${span}`,
            }}
          >
            {child}
          </div>
        )
      })}
    </div>
  )
}
