interface CardProps {
  layout?: "stack" | "split" | "overlay" | "center"
  title?: string
  description?: string
  image?: string
  linkText?: string
  linkHref?: string
  dir?: "ltr" | "rtl"
}

export default function Card({
  layout = "stack",
  title,
  description,
  image,
  linkText,
  linkHref,
  dir = "ltr",
}: CardProps) {
  const isRTL = dir === "rtl"

  return (
    <div
      dir={dir}
      className="
        relative
        rounded-3xl
        overflow-hidden
        bg-neutral-100
        dark:bg-neutral-900
        p-6
        min-h-[260px]
        transition
        hover:shadow-xl
      "
    >
      {/* ========== Overlay Layout ========== */}
      {layout === "overlay" && image && (
        <>
          <img
            src={image}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-10 text-white">
            <h3 className="text-xl font-bold">{title}</h3>
          </div>
        </>
      )}

      {/* ========== Split Layout ========== */}
      {layout === "split" && (
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            {description && (
              <p className="mt-2 text-sm opacity-70">
                {description}
              </p>
            )}
          </div>
          <div>✎</div>
        </div>
      )}

      {/* ========== Stack Layout ========== */}
      {layout === "stack" && (
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <p className="mt-3 text-sm opacity-70">
              {description}
            </p>
          )}
        </div>
      )}

      {/* ========== Center Layout ========== */}
      {layout === "center" && (
        <div className="flex items-center justify-center h-full">
          <h3 className="text-2xl font-bold">{title}</h3>
        </div>
      )}

      {/* ========== Bottom Link Zone ========== */}
      {linkText && linkHref && (
        <a
          href={linkHref}
          className={`
            absolute
            bottom-5
            ${isRTL ? "left-6" : "right-6"}
            text-sm
            underline
            flex items-center gap-2
          `}
        >
          {!isRTL && linkText}
          <span>{isRTL ? "←" : "→"}</span>
          {isRTL && linkText}
        </a>
      )}
    </div>
  )
}
