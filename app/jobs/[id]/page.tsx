"use client"

import { useState } from "react"
import { use } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building, MapPin, Calendar } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import ApplicationForm from "@/components/application-form"

export default function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const resolvedParams = use(params)
  
  // In a real app, we would fetch the job details using the ID
  const job = {
    id: resolvedParams.id,
    title: "Software Engineer",
    company: "Example Company",
    location: "San Francisco, CA",
    type: "Full-time",
    postedDate: "2024-04-02",
    description: "We are looking for a talented Software Engineer to join our team...",
    skills: ["JavaScript", "TypeScript", "React", "Node.js"]
  }

  return (
    <main className="max-w-4xl mx-auto py-8 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-foreground">{job.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span>{job.company}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Posted 2 days ago</span>
            </div>
          </div>
        </div>
        <Badge>{job.type}</Badge>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-foreground">About the Role</h2>
        <p className="text-muted-foreground">
          We are looking for a talented Software Engineer to join our team...
        </p>

        <h2 className="text-foreground">Requirements</h2>
        <ul className="text-muted-foreground">
          <li>5+ years of experience in software development</li>
          <li>Strong proficiency in JavaScript/TypeScript</li>
          <li>Experience with React and modern frontend frameworks</li>
          <li>Bachelor's degree in Computer Science or related field</li>
        </ul>

        <h2 className="text-foreground">Benefits</h2>
        <ul className="text-muted-foreground">
          <li>Competitive salary and equity</li>
          <li>Health, dental, and vision insurance</li>
          <li>Flexible work hours and location</li>
          <li>Professional development budget</li>
        </ul>
      </div>

      <div className="flex gap-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg">Apply Now</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogTitle className="text-foreground">Apply for {job.title} at {job.company}</DialogTitle>
            <ApplicationForm job={job} onClose={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
        <Link href="/">
          <Button variant="outline" size="lg">Back to Jobs</Button>
        </Link>
      </div>
    </main>
  )
} 