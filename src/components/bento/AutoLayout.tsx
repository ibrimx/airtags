import React from "react"

interface AutoLayoutProps {
  children: React.ReactNode
  featuredIndex?: number
}

export default function AutoLayout({
  children,
  featuredIndex,
}: AutoLayoutProps) {
  // نحول children لمصفوفة حتى نستطيع حساب عددهم
  const items = React.Children.toArray(children)
  const count = items.length

  // =========================
  // حالة 1: عنصر واحد
  // =========================
  if (count === 1) {
    return (
      <div className="w-full">
        {items[0]}
      </div>
    )
  }

  // =========================
  // حالة 2: عنصرين
  // =========================
  if (count === 2) {
    return (
      <div className="flex w-full gap-4">
        {items.map((child, index) => {
          // لو محدد عنصر مميز
          if (featuredIndex !== undefined) {
            const isFeatured = index === featuredIndex

            return (
              <div
                key={index}
                className={isFeatured ? "flex-[3]" : "flex-[1]"}
              >
                {child}
              </div>
            )
          }

          // توزيع عادي 50 / 50
          return (
            <div key={index} className="flex-1">
              {child}
            </div>
          )
        })}
      </div>
    )
  }

  // =========================
  // حالة 3: أكثر من عنصرين
  // =========================
  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((child, index) => (
        <div key={index}>
          {child}
        </div>
      ))}
    </div>
  )
}
