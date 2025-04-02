"use client"

import { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useJobs } from "@/context/jobs-context"
import type { Job } from "@/types/job"
import { Loader2, Upload } from "lucide-react"

const ApplicationSchema = Yup.object().shape({
  name: Yup.string().min(2, "Name is too short").max(50, "Name is too long").required("Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9+\-() ]+$/, "Invalid phone number")
    .min(10, "Phone number is too short")
    .required("Phone number is required"),
  coverLetter: Yup.string().min(50, "Cover letter is too short").max(2000, "Cover letter is too long"),
  resume: Yup.mixed().required("Resume is required"),
})

export default function ApplicationForm({ job, onClose }: { job: Job; onClose: () => void }) {
  const { toast } = useToast()
  const { addApplication } = useJobs()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      coverLetter: "",
      resume: null,
    },
    validationSchema: ApplicationSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true)

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Format current date for the application
        const today = new Date()
        const formattedDate = today.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })

        // Add application to context
        addApplication({
          ...job,
          appliedDate: formattedDate,
          application: {
            name: values.name,
            email: values.email,
            phone: values.phone,
            coverLetter: values.coverLetter,
            resumeFileName: values.resume ? values.resume.name : "resume.pdf",
          },
        })

        toast({
          title: "Application Submitted",
          description: `Your application for ${job.title} at ${job.company} has been submitted successfully.`,
        })

        onClose()
      } catch (error) {
        console.error("Error submitting application:", error)
        toast({
          title: "Submission Failed",
          description: "There was an error submitting your application. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsSubmitting(false)
      }
    },
  })

  return (
    <Card className="w-full border-border transition-colors">
      <CardHeader>
        <CardTitle>Apply for {job.title}</CardTitle>
        <CardDescription>Complete the form below to submit your application to {job.company}.</CardDescription>
      </CardHeader>
      <form onSubmit={formik.handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="transition-colors"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-sm text-destructive">{formik.errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john.doe@example.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="transition-colors"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-destructive">{formik.errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="+1 (555) 123-4567"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              className="transition-colors"
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-sm text-destructive">{formik.errors.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="resume">Resume</Label>
            <div className="flex items-center gap-2">
              <Input
                id="resume"
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(event) => {
                  formik.setFieldValue("resume", event.currentTarget.files?.[0] || null)
                }}
              />
              <Button
                type="button"
                variant="outline"
                className="w-full transition-colors"
                onClick={() => document.getElementById("resume")?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                {formik.values.resume ? formik.values.resume.name : "Upload Resume"}
              </Button>
            </div>
            {formik.touched.resume && formik.errors.resume && (
              <p className="text-sm text-destructive">{formik.errors.resume as string}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverLetter">Cover Letter (Optional)</Label>
            <Textarea
              id="coverLetter"
              name="coverLetter"
              placeholder="Tell us why you're a good fit for this position..."
              rows={5}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.coverLetter}
              className="transition-colors"
            />
            {formik.touched.coverLetter && formik.errors.coverLetter && (
              <p className="text-sm text-destructive">{formik.errors.coverLetter}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onClose} className="transition-colors">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="transition-colors">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Application
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

