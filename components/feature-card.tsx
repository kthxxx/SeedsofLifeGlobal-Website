import type { ReactNode } from "react"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  borderColor?: string
  iconBgColor?: string
}

export function FeatureCard({
  icon,
  title,
  description,
  borderColor = "border-green-700",
  iconBgColor = "bg-green-100",
}: FeatureCardProps) {
  return (
    <div className={`bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow border-t-4 ${borderColor}`}>
      <div className={`${iconBgColor} w-16 h-16 rounded-full flex items-center justify-center mb-4`}>{icon}</div>
      <h3 className="text-2xl font-bold text-green-900 mb-3">{title}</h3>
      <p className="text-green-700 leading-relaxed">{description}</p>
    </div>
  )
}
