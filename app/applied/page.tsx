"use client"

import { useJobs } from "@/context/jobs-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Building, Briefcase, DollarSign, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import type { Job } from "@/types/job"

export default function AppliedJobsPage() {
  const { appliedJobs, removeApplication } = useJobs()
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null)

  const toggleExpand = (jobId: string) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId)
  }

  if (appliedJobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-center">
        <h1 className="text-3xl font-bold mb-2">No Applications Yet</h1>
        <p className="text-muted-foreground mb-6 max-w-md">
          You haven't applied to any jobs yet. Browse our listings and submit your first application!
        </p>
        <Link href="/">
          <Button>Browse Jobs</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Applied Jobs</h1>
        <p className="text-muted-foreground">Track and manage your job applications.</p>
      </div>

      <div className="grid gap-4">
        {appliedJobs.map((job: Job) => (
          <Card key={job.id} className="overflow-hidden transition-colors hover:border-primary/50">
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div>
                  <CardTitle className="text-xl font-bold">{job.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
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
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Applied on {job.appliedDate}</span>
                  </div>
                </div>
              </div>
            </CardHeader>

            {expandedJobId === job.id && (
              <CardContent className="pt-2 pb-0">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-sm mb-1">Application Details</h3>
                    <div className="text-sm text-muted-foreground">
                      <p>
                        <strong>Name:</strong> {job.application?.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {job.application?.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {job.application?.phone}
                      </p>
                      {job.application?.coverLetter && (
                        <div className="mt-2">
                          <strong>Cover Letter:</strong>
                          <p className="mt-1 whitespace-pre-line">{job.application.coverLetter}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            )}

            <CardFooter className="flex justify-between pt-4">
              <Button variant="ghost" size="sm" onClick={() => toggleExpand(job.id)}>
                {expandedJobId === job.id ? "Hide Details" : "View Application"}
              </Button>
              <div className="flex gap-2">
                <Link href={`/jobs/${job.id}`}>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <ExternalLink className="h-3 w-3" />
                    View Job
                  </Button>
                </Link>
                <Button variant="destructive" size="sm" onClick={() => removeApplication(job.id)}>
                  Remove
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

