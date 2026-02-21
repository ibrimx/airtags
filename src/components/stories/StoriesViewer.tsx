"use client"

import { useEffect, useRef, useState } from "react"
import type { StorySlide, StoryItem } from "@/lib/notion/types"

const backgroundMap: Record<string, string> = {
  default: "linear-gradient(180deg, #000000 0%, #1a1a1a 100%)",
  dark: "linear-gradient(180deg, #111111 0%, #000000 100%)",
  plumb: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
  sunset: "linear-gradient(135deg, #ff512f 0%, #dd2476 100%)",
  lime: "linear-gradient(135deg, #a8ff78 0%, #78ffd6 100%)",
  ocean: "linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)",
  royal: "linear-gradient(135deg, #141e30 0%, #243b55 100%)",
  amber: "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)",
  forest: "linear-gradient(135deg, #134e5e 0%, #71b280 100%)",
  cream: "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)",
}

interface Props {
  slides: StorySlide[]
  startSlideIndex: number
  onClose: () => void
}

export default function StoriesViewer({
  slides,
  startSlideIndex,
  onClose,
}: Props) {
  const [slideIndex, setSlideIndex] = useState(startSlideIndex)
  const [storyIndex, setStoryIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [paused, setPaused] = useState(false)

  const intervalRef = useRef<any>(null)
  const startX = useRef<number | null>(null)

  const currentSlide = slides[slideIndex]
  const currentStory: StoryItem = currentSlide.stories[storyIndex]

  const durationMs = (currentStory.duration || 5) * 1000

  useEffect(() => {
    if (paused) return

    const startTime = Date.now()

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime
      const percent = Math.min((elapsed / durationMs) * 100, 100)
      setProgress(percent)

      if (percent >= 100) {
        clearInterval(intervalRef.current)
        handleNext()
      }
    }, 50)

    return () => clearInterval(intervalRef.current)
  }, [slideIndex, storyIndex, paused])

  function handleNext() {
    setProgress(0)

    if (storyIndex < currentSlide.stories.length - 1) {
      setStoryIndex((prev) => prev + 1)
    } else if (slideIndex < slides.length - 1) {
      setSlideIndex((prev) => prev + 1)
      setStoryIndex(0)
    } else {
      onClose()
    }
  }

  function handlePrev() {
    setProgress(0)

    if (storyIndex > 0) {
      setStoryIndex((prev) => prev - 1)
    } else if (slideIndex > 0) {
      const prevSlide = slides[slideIndex - 1]
      setSlideIndex((prev) => prev - 1)
      setStoryIndex(prevSlide.stories.length - 1)
    }
  }

  function handleTap(e: React.MouseEvent<HTMLDivElement>) {
    const width = window.innerWidth
    const x = e.clientX

    if (x > width / 2) handleNext()
    else handlePrev()
  }

  function handleTouchStart(e: React.TouchEvent) {
    startX.current = e.touches[0].clientX
    setPaused(true)
  }

  function handleTouchEnd(e: React.TouchEvent) {
    setPaused(false)

    if (startX.current === null) return
    const diff = e.changedTouches[0].clientX - startX.current

    if (diff > 50) handlePrev()
    if (diff < -50) handleNext()

    startX.current = null
  }

  const background =
    backgroundMap[currentStory.background] ||
    backgroundMap.default

  return (
    <div
      style={{
        background,
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "#fff",
        zIndex: 9999,
      }}
      onClick={handleTap}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div style={{ display: "flex", gap: 4, padding: 8 }}>
        {currentSlide.stories.map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 3,
              background:
                i < storyIndex
                  ? "#fff"
                  : i === storyIndex
                  ? `linear-gradient(to right, #fff ${progress}%, rgba(255,255,255,0.3) ${progress}%)`
                  : "rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>

      <div style={{ padding: 24, textAlign: "center" }}>
        {currentStory.type === "image" && currentStory.media && (
          <img
            src={currentStory.media}
            style={{ maxWidth: "100%", maxHeight: "60vh" }}
          />
        )}

        {currentStory.type === "video" && currentStory.media && (
          <video
            src={currentStory.media}
            autoPlay
            muted
            style={{ maxWidth: "100%", maxHeight: "60vh" }}
          />
        )}

        {currentStory.caption && (
          <p style={{ marginTop: 16 }}>{currentStory.caption}</p>
        )}
      </div>
    </div>
  )
}
