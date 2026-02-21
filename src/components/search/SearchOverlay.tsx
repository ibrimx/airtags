import { useEffect, useMemo, useState } from "react"

interface Post {
  title: string
  slug: string
  date?: string
}

interface Props {
  posts: Post[]
}

function groupByYear(posts: Post[]) {
  const map: Record<string, Post[]> = {}

  for (const post of posts) {
    const year = post.date
      ? new Date(post.date).getFullYear().toString()
      : "Other"

    if (!map[year]) map[year] = []
    map[year].push(post)
  }

  return Object.entries(map).sort(
    (a, b) => Number(b[0]) - Number(a[0])
  )
}

export default function SearchOverlay({ posts }: Props) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [active, setActive] = useState(0)

  const filtered = useMemo(() => {
    if (!query) return posts
    return posts.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase())
    )
  }, [query, posts])

  const grouped = useMemo(() => groupByYear(filtered), [filtered])
  const flatResults = filtered

  // 🔹 ربط زر الهيدر
  useEffect(() => {
    const btn = document.getElementById("open-search")
    if (!btn) return

    const handler = () => setOpen(true)

    btn.addEventListener("click", handler)
    return () => btn.removeEventListener("click", handler)
  }, [])

  // 🔹 التحكم بالكيبورد
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)

      if (!open) return

      if (e.key === "ArrowDown") {
        setActive((prev) =>
          prev + 1 >= flatResults.length ? 0 : prev + 1
        )
      }

      if (e.key === "ArrowUp") {
        setActive((prev) =>
          prev - 1 < 0 ? flatResults.length - 1 : prev - 1
        )
      }

      if (e.key === "Enter" && flatResults[active]) {
        window.location.href = `/posts/${flatResults[active].slug}`
      }
    }

    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, flatResults, active])

  if (!open) return null

  return (
    <div
      onClick={() => setOpen(false)}
      style={{
        position: "fixed",
        inset: 0,
        backdropFilter: "blur(18px)",
        background: "rgba(0,0,0,0.65)",
        zIndex: 999,
        paddingTop: "10vh",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(720px, 92%)",
          margin: "0 auto",
          background: "#111",
          borderRadius: 24,
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
          overflow: "hidden",
        }}
      >
        {/* Input */}
        <div style={{ padding: 20 }}>
          <input
            autoFocus
            placeholder="Search posts..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActive(0)
            }}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: 18,
            }}
          />
        </div>

        <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />

        {/* Results */}
        <div style={{ padding: 20, maxHeight: "60vh", overflowY: "auto" }}>
          {grouped.map(([year, items]) => (
            <div key={year} style={{ marginBottom: 24 }}>
              <div
                style={{
                  opacity: 0.4,
                  fontSize: 13,
                  marginBottom: 12,
                }}
              >
                {year}
              </div>

              {items.map((post) => {
                const index = flatResults.findIndex(
                  (p) => p.slug === post.slug
                )

                return (
                  <div
                    key={post.slug}
                    onMouseEnter={() => setActive(index)}
                    onClick={() =>
                      (window.location.href = `/posts/${post.slug}`)
                    }
                    style={{
                      padding: "14px 16px",
                      borderRadius: 12,
                      marginBottom: 6,
                      cursor: "pointer",
                      background:
                        index === active
                          ? "rgba(255,255,255,0.08)"
                          : "transparent",
                      transition: "background 0.15s ease",
                    }}
                  >
                    {post.title}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
