"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, MapPin, Building, Briefcase, Clock, DollarSign } from "lucide-react"
import { fetchJobById } from "@/lib/api"
import { useJobs } from "@/context/jobs-context"
import ApplicationForm from "@/components/application-form"
import type { Job } from "@/types/job"

export default function JobDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const jobId = params.id as string
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const { appliedJobs } = useJobs()

  const hasApplied = appliedJobs.some((job) => job.id === jobId)

  useEffect(() => {
    const getJobDetails = async () => {
      try {
        const jobData = await fetchJobById(jobId)
        setJob(jobData)
      } catch (error) {
        console.error("Failed to fetch job details:", error)
      } finally {
        setLoading(false)
      }
    }

    getJobDetails()
  }, [jobId])

  if (loading) {
    return <JobDetailsSkeleton />
  }

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <h2 className="text-2xl font-bold mb-2">Job not found</h2>
        <p className="text-muted-foreground mb-4">The job you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => router.push("/")}>Back to Jobs</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        ← Back to listings
      </Button>

      <Card className="border-l-4 border-l-primary transition-colors">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <CardTitle className="text-2xl font-bold">{job.title}</CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{job.company}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{job.location}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Briefcase className="h-3 w-3" />
                  {job.type}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {job.experience}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  {job.salary}
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <Calendar className="h-3 w-3" />
                <span>Posted {job.postedDate}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">Job Description</h3>
            <p className="text-muted-foreground whitespace-pre-line">{job.description}</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Requirements</h3>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          {job.benefits && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Benefits</h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                {job.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {hasApplied ? (
            <Button disabled className="w-full sm:w-auto">
              Application Submitted
            </Button>
          ) : (
            <Button onClick={() => setShowApplicationForm(true)} className="w-full sm:w-auto">
              Apply Now
            </Button>
          )}
        </CardFooter>
      </Card>

      {showApplicationForm && <ApplicationForm job={job} onClose={() => setShowApplicationForm(false)} />}
    </div>
  )
}

function JobDetailsSkeleton() {
  return (
    <div className="space-y-6">
      <Button variant="ghost" disabled className="mb-4">
        ← Back to listings
      </Button>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div className="space-y-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-40" />
            </div>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-24" />
              </div>
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-32" />
        </CardFooter>
      </Card>
    </div>
  )
}

