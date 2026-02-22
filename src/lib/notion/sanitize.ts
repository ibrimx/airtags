import sanitizeHtml from "sanitize-html"

export function sanitize(content: string) {
  return sanitizeHtml(content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "img",
      "h1",
      "h2",
      "h3",
      "iframe",
    ]),
    allowedAttributes: {
      "*": ["class", "style"],
      a: ["href", "target", "rel"],
      img: ["src", "alt"],
      iframe: ["src", "allow", "allowfullscreen"],
    },
  })
}
