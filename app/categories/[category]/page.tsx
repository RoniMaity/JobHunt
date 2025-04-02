"use client"

import { use } from "react"
import JobsList from "@/components/jobs-list"
import { SearchFilters } from "@/components/search-filters"

const categoryTitles: Record<string, string> = {
  "full-time": "Full-time Jobs",
  "part-time": "Part-time Jobs",
  "contract": "Contract Positions",
  "remote": "Remote Jobs",
}

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = use(params)
  const title = categoryTitles[resolvedParams.category] || "Jobs"
  
  return (
    <main className="max-w-4xl mx-auto py-8 space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="text-lg text-muted-foreground">
          Browse through available {resolvedParams.category.replace("-", " ")} opportunities.
        </p>
      </header>

      <section className="p-4 bg-card rounded-lg shadow-sm">
        <SearchFilters />
      </section>

      <section className="space-y-6">
        <JobsList category={resolvedParams.category} />
      </section>
    </main>
  )
} 