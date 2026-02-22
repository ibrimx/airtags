import React from "react"

interface AutoLayoutProps {
  children: React.ReactNode
  featuredIndex?: number
}

export default function AutoLayout({
  children,
  featuredIndex,
}: AutoLayoutProps) {
  const items = React.Children.toArray(children)
  const count = items.length

  // عنصر واحد
  if (count === 1) {
    return <div className="w-full">{items}</div>
  }

  // عنصرين
  if (count === 2) {
    return (
      <div className="flex flex-col md:flex-row gap-6 w-full">
        {items.map((child, index) => {
          if (featuredIndex !== undefined) {
            return (
              <div
                key={index}
                className={
                  index === featuredIndex
                    ? "md:flex-[3]"
                    : "md:flex-[1]"
                }
              >
                {child}
              </div>
            )
          }

          return (
            <div key={index} className="md:flex-1">
              {child}
            </div>
          )
        })}
      </div>
    )
  }

  // أكثر من عنصرين
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((child, index) => (
        <div key={index}>{child}</div>
      ))}
    </div>
  )
}
