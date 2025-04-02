import JobsList from "@/components/jobs-list"
import { SearchFilters } from "@/components/search-filters"
import { LatestJobs } from "@/components/latest-jobs"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const jobCategories = [
  { title: "Full-time", href: "/categories/full-time", description: "Permanent positions with comprehensive benefits" },
  { title: "Part-time", href: "/categories/part-time", description: "Flexible work arrangements with reduced hours" },
  { title: "Contract", href: "/categories/contract", description: "Fixed-term project-based opportunities" },
  { title: "Remote", href: "/categories/remote", description: "Work from anywhere positions" },
]

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto py-8 space-y-12">
      {/* Header Section */}
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          Find Your Dream Job
        </h1>
        <p className="text-lg text-muted-foreground">
          Browse through available job opportunities and apply today.
        </p>
      </header>

      {/* Search Filters Section */}
      <section className="p-4 bg-card rounded-lg shadow-sm">
        <SearchFilters />
      </section>

      {/* Latest Jobs Section */}
      <JobsList showLatestOnly />

      {/* Job Categories Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Browse by Category</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {jobCategories.map((category) => (
            <Link key={category.title} href={category.href} className="block">
              <div className="p-6 bg-card hover:bg-muted rounded-lg transition-colors">
                <h3 className="text-lg font-semibold mb-2 text-foreground">{category.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                <Button variant="secondary" size="sm">Browse Jobs</Button>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

