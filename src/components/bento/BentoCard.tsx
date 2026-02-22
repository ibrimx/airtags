interface CardProps {
  layout?: "stack" | "split" | "overlay" | "center" | "mediaTop" | "banner"
  title?: string
  description?: string
  image?: string | null
  linkText?: string
  linkHref?: string
  styleVariant?: string
}

function resolveStyle(variant?: string) {
  switch (variant) {
    case "accent-blue":
      return "bg-blue-600 text-white"
    case "accent-green":
      return "bg-green-600 text-white"
    case "accent-red":
      return "bg-red-600 text-white"
    case "accent-yellow":
      return "bg-yellow-400 text-black"
    case "gradient-soft":
      return "bg-gradient-to-br from-neutral-200 to-neutral-400"
    case "gradient-strong":
      return "bg-gradient-to-br from-indigo-600 to-purple-600 text-white"
    case "glass":
      return "bg-white/10 backdrop-blur-xl border border-white/20"
    case "outline":
      return "border border-neutral-300 dark:border-neutral-700"
    case "surface-muted":
      return "bg-neutral-200 dark:bg-neutral-800"
    case "surface-inverted":
      return "bg-black text-white"
    default:
      return "bg-neutral-100 dark:bg-neutral-900"
  }
}

export default function Card({
  layout = "stack",
  title,
  description,
  image,
  linkText,
  linkHref,
  styleVariant,
}: CardProps) {
  const style = resolveStyle(styleVariant)

  return (
    <div
      className={`
        relative
        rounded-3xl
        overflow-hidden
        p-6
        min-h-[260px]
        transition
        hover:shadow-xl
        ${style}
      `}
    >
      {/* Overlay */}
      {layout === "overlay" && image && (
        <>
          <img
            src={image}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-10">
            <h3 className="text-xl font-bold">{title}</h3>
          </div>
        </>
      )}

      {/* Media Top */}
      {layout === "mediaTop" && (
        <>
          {image && (
            <img
              src={image}
              className="w-full h-40 object-cover rounded-xl mb-4"
            />
          )}
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <p className="mt-3 text-sm opacity-80">
              {description}
            </p>
          )}
        </>
      )}

      {/* Split */}
      {layout === "split" && (
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            {description && (
              <p className="mt-2 text-sm opacity-80">
                {description}
              </p>
            )}
          </div>
          <div>✦</div>
        </div>
      )}

      {/* Center */}
      {layout === "center" && (
        <div className="flex items-center justify-center h-full">
          <h3 className="text-2xl font-bold text-center">
            {title}
          </h3>
        </div>
      )}

      {/* Banner */}
      {layout === "banner" && (
        <>
          <h2 className="text-2xl font-bold mb-4">
            {title}
          </h2>
          {description && (
            <p className="opacity-80">{description}</p>
          )}
        </>
      )}

      {/* Stack */}
      {layout === "stack" && (
        <>
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <p className="mt-3 text-sm opacity-80">
              {description}
            </p>
          )}
        </>
      )}

      {/* Bottom Link */}
      {linkText && linkHref && (
        <a
          href={linkHref}
          className="absolute bottom-5 right-6 text-sm underline flex items-center gap-2"
        >
          {linkText}
          <span>→</span>
        </a>
      )}
    </div>
  )
}
