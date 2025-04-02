import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building, MapPin, Calendar } from "lucide-react"
import Link from "next/link"
import type { Job } from "@/types/job"
import { JobCard } from "./job-card"

export function LatestJobs({ jobs }: { jobs: Job[] }) {
  const latestJobs = jobs
    .sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime())
    .slice(0, 3)

  if (latestJobs.length === 0) return null

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Latest Opportunities</h2>
        <Link href="/jobs">
          <Button variant="link">View all jobs</Button>
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {latestJobs.map((job) => (
          <JobCard key={job.id} job={job} hasApplied={false} />
        ))}
      </div>
    </section>
  )
} 