import React from "react"

interface BentoLayoutProps {
  children: React.ReactNode
  spans: number[]
}

export default function AutoLayout({
  children,
  spans,
}: BentoLayoutProps) {
  const items = React.Children.toArray(children)

  return (
    <div className="grid grid-cols-12 gap-6 w-full">
      {items.map((child, index) => (
        <div
          key={index}
          className={`
            col-span-12
            md:col-span-${spans[index] || 12}
          `}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
