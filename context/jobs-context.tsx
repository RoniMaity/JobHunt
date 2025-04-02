"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import type { Job } from "@/types/job"

type SearchFilters = {
  query: string
  location: string
  type: string
}

type JobsContextType = {
  appliedJobs: Job[]
  addApplication: (job: Job) => void
  removeApplication: (jobId: string) => void
  searchFilters: SearchFilters
  setSearchFilters: (filters: SearchFilters) => void
}

const JobsContext = createContext<JobsContextType | undefined>(undefined)

export function JobsProvider({ children }: { children: React.ReactNode }) {
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([])
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    query: "",
    location: "all",
    type: "all",
  })

  // Load applied jobs from localStorage on mount
  useEffect(() => {
    const savedJobs = localStorage.getItem("appliedJobs")
    if (savedJobs) {
      try {
        setAppliedJobs(JSON.parse(savedJobs))
      } catch (error) {
        console.error("Failed to parse saved jobs:", error)
      }
    }
  }, [])

  // Save applied jobs to localStorage when updated
  useEffect(() => {
    localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs))
  }, [appliedJobs])

  const addApplication = (job: Job) => {
    setAppliedJobs((prev) => {
      // Check if job already exists
      if (prev.some((j) => j.id === job.id)) {
        return prev
      }
      return [...prev, job]
    })
  }

  const removeApplication = (jobId: string) => {
    setAppliedJobs((prev) => prev.filter((job) => job.id !== jobId))
  }

  return (
    <JobsContext.Provider
      value={{
        appliedJobs,
        addApplication,
        removeApplication,
        searchFilters,
        setSearchFilters,
      }}
    >
      {children}
    </JobsContext.Provider>
  )
}

export function useJobs() {
  const context = useContext(JobsContext)
  if (context === undefined) {
    throw new Error("useJobs must be used within a JobsProvider")
  }
  return context
}

