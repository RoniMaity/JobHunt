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
import { JobCard } from "./job-card"

interface JobsListProps {
  showLatestOnly?: boolean
  category?: string
}

export default function JobsList({ showLatestOnly, category }: JobsListProps) {
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

        if (category) {
          filteredJobs = filteredJobs.filter((job) => 
            job.type.toLowerCase() === category.toLowerCase()
          )
        }

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

        // Sort by date for latest jobs
        if (showLatestOnly) {
          filteredJobs = filteredJobs
            .sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime())
            .slice(0, 3)
        }

        setJobs(filteredJobs)
      } catch (error) {
        console.error("Failed to fetch jobs:", error)
      } finally {
        setLoading(false)
      }
    }

    getJobs()
  }, [searchFilters, category, showLatestOnly])

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(showLatestOnly ? 3 : 6)].map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h2 className="text-2xl font-bold mb-2">No jobs found</h2>
        <p className="text-muted-foreground mb-4">
          {category 
            ? `No ${category.toLowerCase()} positions available at the moment.`
            : "Try adjusting your search filters to find more opportunities."
          }
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {showLatestOnly && (
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight">Latest Opportunities</h2>
        </div>
      )}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => {
          const hasApplied = appliedJobs.some((appliedJob) => appliedJob.id === job.id)
          return <JobCard key={job.id} job={job} hasApplied={hasApplied} />
        })}
      </div>
    </div>
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

