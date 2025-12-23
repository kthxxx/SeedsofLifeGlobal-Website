interface SectionHeaderProps {
  title: string
  subtitle?: string
  align?: "left" | "center"
}

export function SectionHeader({ title, subtitle, align = "center" }: SectionHeaderProps) {
  const textAlign = align === "center" ? "text-center" : "text-left"
  const justifyDivider = align === "center" ? "mx-auto" : ""

  return (
    <div className={textAlign}>
      <h2 className="text-4xl font-bold text-green-900 mb-4">{title}</h2>
      <div className={`w-24 h-1 bg-yellow-400 mb-8 ${justifyDivider}`}></div>
      {subtitle && <p className="text-xl text-green-800 max-w-4xl mx-auto leading-relaxed">{subtitle}</p>}
    </div>
  )
}
