"use client"

import type { StorySlide } from "@/lib/notion/types"

interface Props {
  slide: StorySlide
  index: number
  onOpen: (index: number) => void
}

export default function StorySlide({
  slide,
  index,
  onOpen,
}: Props) {
  return (
    <button
      onClick={() => onOpen(index)}
      style={{
        width: 72,
        height: 72,
        borderRadius: "50%",
        padding: 2,
        border: "none",
        cursor: "pointer",
        background: "linear-gradient(135deg, #ff512f, #dd2476)",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          overflow: "hidden",
          background: "#000",
        }}
      >
        {slide.cover && (
          <img
            src={slide.cover}
            alt={slide.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}
      </div>
    </button>
  )
}
