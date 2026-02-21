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

  const flatResults = useMemo(() => filtered, [filtered])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "/") {
        e.preventDefault()
        setOpen(true)
      }

      if (e.key === "Escape") {
        setOpen(false)
      }

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

  return (
    <>
      <input
        placeholder="Search posts..."
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value)
          setActive(0)
        }}
        style={{
          width: "100%",
          padding: "14px 18px",
          borderRadius: 14,
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.05)",
          color: "white",
        }}
      />

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backdropFilter: "blur(20px)",
            background: "rgba(0,0,0,0.6)",
            zIndex: 100,
            paddingTop: 100,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 720,
              margin: "0 auto",
              background: "rgba(20,20,20,0.9)",
              borderRadius: 20,
              padding: 24,
            }}
          >
            {grouped.map(([year, items]) => (
              <div key={year} style={{ marginBottom: 24 }}>
                <div
                  style={{
                    opacity: 0.5,
                    marginBottom: 12,
                    fontSize: 14,
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
                            ? "rgba(255,255,255,0.1)"
                            : "transparent",
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
      )}
    </>
  )
}
