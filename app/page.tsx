import JobsList from "@/components/jobs-list"
import { SearchFilters } from "@/components/search-filters"

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto py-8 space-y-8">
      {/* Header Section */}
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-800">
          Find Your Dream Job
        </h1>
        <p className="text-lg text-gray-600">
          Browse through available job opportunities and apply today.
        </p>
      </header>

      {/* Search Filters Section */}
      <section className="p-4 bg-gray-100 rounded-lg shadow-sm">
        <SearchFilters />
      </section>

      {/* Jobs List Section */}
      <section className="space-y-6">
        <JobsList />
      </section>
    </main>
  )
}

