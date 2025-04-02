"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, MapPin, Briefcase, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useJobs } from "@/context/jobs-context"

export function SearchFilters() {
  const { searchFilters, setSearchFilters } = useJobs()
  const [localFilters, setLocalFilters] = useState({
    query: searchFilters.query || "",
    location: searchFilters.location || "all",
    type: searchFilters.type || "all",
  })

  // Update local state when context changes
  useEffect(() => {
    setLocalFilters({
      query: searchFilters.query || "",
      location: searchFilters.location || "all",
      type: searchFilters.type || "all",
    })
  }, [searchFilters])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchFilters(localFilters)
  }

  const clearFilters = () => {
    const resetFilters = {
      query: "",
      location: "all",
      type: "all",
    }
    setLocalFilters(resetFilters)
    setSearchFilters(resetFilters)
  }

  const hasActiveFilters = localFilters.query !== "" || localFilters.location !== "all" || localFilters.type !== "all"

  return (
    <form onSubmit={handleSearch} className="space-y-4">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search jobs, companies, or keywords..."
            className="pl-9 transition-colors"
            value={localFilters.query}
            onChange={(e) => setLocalFilters({ ...localFilters, query: e.target.value })}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="w-full sm:w-40">
            <Select
              value={localFilters.location}
              onValueChange={(value) => setLocalFilters({ ...localFilters, location: value })}
            >
              <SelectTrigger className="w-full transition-colors">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Location" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="new york">New York</SelectItem>
                <SelectItem value="san francisco">San Francisco</SelectItem>
                <SelectItem value="london">London</SelectItem>
                <SelectItem value="berlin">Berlin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full sm:w-40">
            <Select
              value={localFilters.type}
              onValueChange={(value) => setLocalFilters({ ...localFilters, type: value })}
            >
              <SelectTrigger className="w-full transition-colors">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Job Type" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="transition-colors">
            Search
          </Button>

          {hasActiveFilters && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={clearFilters}
              title="Clear filters"
              className="transition-colors"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </form>
  )
}

