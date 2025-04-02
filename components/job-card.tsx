import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building, MapPin, Calendar } from "lucide-react"
import Link from "next/link"
import type { Job } from "@/types/job"

export function JobCard({ job, hasApplied }: { job: Job; hasApplied: boolean }) {
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