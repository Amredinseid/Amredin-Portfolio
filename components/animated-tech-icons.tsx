"use client"

interface FloatingIconProps {
  icon: string
  label: string
  delay: number
}

export function FloatingTechIcon({ icon, label, delay }: FloatingIconProps) {
  return (
    <div className="flex flex-col items-center gap-2 animate-float" style={{ animationDelay: `${delay}s` }}>
      <div className="w-16 h-16 rounded-lg bg-card border border-primary/30 flex items-center justify-center hover:border-primary/80 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
        <span className="text-3xl">{icon}</span>
      </div>
      <span className="text-sm text-foreground/70">{label}</span>
    </div>
  )
}
