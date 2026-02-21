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

  // ربط زر الهيدر
  useEffect(() => {
    const btn = document.getElementById("open-search")
    if (!btn) return
    const handler = () => setOpen(true)
    btn.addEventListener("click", handler)
    return () => btn.removeEventListener("click", handler)
  }, [])

  // التحكم بالكيبورد
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
        backdropFilter: "blur(20px)",
        background: "rgba(0,0,0,0.55)",
        zIndex: 999,
        paddingTop: "8vh",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(680px, 92%)",
          margin: "0 auto",
          background: "#161616",
          borderRadius: 20,
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.7)",
          overflow: "hidden",
        }}
      >
        {/* Search Input */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "16px 20px",
          }}
        >
          {/* Search Icon */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0 }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>

          <input
            autoFocus
            placeholder="Search posts..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActive(0)
            }}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "rgba(255,255,255,0.85)",
              fontSize: 16,
              letterSpacing: 0.2,
            }}
          />
        </div>

        <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />

        {/* Results */}
        <div
          style={{
            padding: "10px 10px",
            maxHeight: "65vh",
            overflowY: "auto",
          }}
        >
          {grouped.map(([year, items]) => (
            <div key={year}>
              {/* Year label — only show if multiple years exist */}
              {grouped.length > 1 && (
                <div
                  style={{
                    padding: "8px 12px 4px",
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.28)",
                  }}
                >
                  {year}
                </div>
              )}

              {items.map((post) => {
                const index = flatResults.findIndex(
                  (p) => p.slug === post.slug
                )
                const isActive = index === active

                return (
                  <div
                    key={post.slug}
                    onMouseEnter={() => setActive(index)}
                    onClick={() =>
                      (window.location.href = `/posts/${post.slug}`)
                    }
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "13px 14px",
                      borderRadius: 12,
                      marginBottom: 2,
                      cursor: "pointer",
                      background: isActive
                        ? "rgba(255,255,255,0.07)"
                        : "transparent",
                      transition: "background 0.12s ease",
                    }}
                  >
                    {/* Arrow icon */}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={
                        isActive
                          ? "rgba(255,255,255,0.7)"
                          : "rgba(255,255,255,0.25)"
                      }
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ flexShrink: 0, transition: "stroke 0.12s" }}
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>

                    <span
                      style={{
                        fontSize: 15,
                        color: isActive
                          ? "rgba(255,255,255,0.9)"
                          : "rgba(255,255,255,0.6)",
                        transition: "color 0.12s",
                      }}
                    >
                      {post.title}
                    </span>
                  </div>
                )
              })}
            </div>
          ))}

          {filtered.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "40px 20px",
                color: "rgba(255,255,255,0.25)",
                fontSize: 14,
              }}
            >
              No results found
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
