export type Job = {
  id: string
  title: string
  company: string
  location: string
  type: string
  experience: string
  salary: string
  description: string
  requirements: string[]
  benefits?: string[]
  skills?: string[]
  postedDate: string
  appliedDate?: string
  application?: {
    name: string
    email: string
    phone: string
    coverLetter?: string
    resumeFileName?: string
  }
}

