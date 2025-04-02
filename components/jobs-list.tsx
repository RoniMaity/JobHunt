"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Building, MapPin, Calendar } from "lucide-react"
import Link from "next/link"
import { fetchJobs } from "@/lib/api"
import { useJobs } from "@/context/jobs-context"
import type { Job } from "@/types/job"

export default function JobsList() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const { appliedJobs, searchFilters } = useJobs()

  useEffect(() => {
    const getJobs = async () => {
      try {
        setLoading(true)
        const jobsData = await fetchJobs()

        // Apply filters if they exist
        let filteredJobs = [...jobsData]

        if (searchFilters.query) {
          const query = searchFilters.query.toLowerCase()
          filteredJobs = filteredJobs.filter(
            (job) =>
              job.title.toLowerCase().includes(query) ||
              job.company.toLowerCase().includes(query) ||
              job.description.toLowerCase().includes(query),
          )
        }

        if (searchFilters.location && searchFilters.location !== "all") {
          filteredJobs = filteredJobs.filter((job) =>
            job.location.toLowerCase().includes(searchFilters.location.toLowerCase()),
          )
        }

        if (searchFilters.type && searchFilters.type !== "all") {
          filteredJobs = filteredJobs.filter((job) => job.type.toLowerCase() === searchFilters.type.toLowerCase())
        }

        setJobs(filteredJobs)
      } catch (error) {
        console.error("Failed to fetch jobs:", error)
      } finally {
        setLoading(false)
      }
    }

    getJobs()
  }, [searchFilters])

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h2 className="text-2xl font-bold mb-2">No jobs found</h2>
        <p className="text-muted-foreground mb-4">Try adjusting your search filters to find more opportunities.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => {
        const hasApplied = appliedJobs.some((appliedJob) => appliedJob.id === job.id)

        return <JobCard key={job.id} job={job} hasApplied={hasApplied} />
      })}
    </div>
  )
}

function JobCard({ job, hasApplied }: { job: Job; hasApplied: boolean }) {
  return (
    <Card className="flex flex-col h-full border-border transition-colors hover:border-primary/50">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold line-clamp-1">{job.title}</CardTitle>
          <Badge variant={hasApplied ? "secondary" : "outline"}>{hasApplied ? "Applied" : job.type}</Badge>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Building className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{job.company}</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{job.location}</span>
        </div>
      </CardHeader>
      <CardContent className="py-2 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{job.description}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {job.skills?.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="secondary" className="font-normal">
              {skill}
            </Badge>
          ))}
          {job.skills && job.skills.length > 3 && (
            <Badge variant="secondary" className="font-normal">
              +{job.skills.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between items-center">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>{job.postedDate}</span>
        </div>
        <Link href={`/jobs/${job.id}`}>
          <Button variant="secondary" size="sm">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

function JobCardSkeleton() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-5 w-16" />
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardHeader>
      <CardContent className="py-2 flex-grow">
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-2 mt-3">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-16" />
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between items-center">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-24" />
      </CardFooter>
    </Card>
  )
}

