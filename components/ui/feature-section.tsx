import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Feature {
  title: string
  description: string
  icon: React.ReactNode
}

interface FeatureSectionProps {
  title: string
  description?: string
  features: Feature[]
  columns?: 2 | 3 | 4
}

export function FeatureSection({ title, description, features, columns = 3 }: FeatureSectionProps) {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        {description && <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">{description}</p>}
      </div>
      <div className={`grid grid-cols-1 gap-6 ${gridCols[columns]}`}>
        {features.map((feature, index) => (
          <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                {feature.icon}
              </div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
