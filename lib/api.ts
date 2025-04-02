import type { Job } from "@/types/job"

// Mock data for jobs
const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA (Remote)",
    type: "Full-time",
    experience: "5+ years",
    salary: "$120k - $150k",
    description:
      "We're looking for a Senior Frontend Developer to join our team. You'll be responsible for building user interfaces for our web applications using React, Next.js, and TypeScript.",
    requirements: [
      "5+ years of experience with React",
      "Experience with Next.js and TypeScript",
      "Strong understanding of web performance optimization",
      "Experience with state management libraries (Redux, Context API)",
      "Excellent communication skills",
    ],
    benefits: ["Competitive salary", "Remote work", "Health insurance", "401(k) matching", "Unlimited PTO"],
    skills: ["React", "Next.js", "TypeScript", "Redux", "CSS"],
    postedDate: "2 days ago",
  },
  {
    id: "2",
    title: "Backend Engineer",
    company: "DataSystems Inc.",
    location: "New York, NY",
    type: "Full-time",
    experience: "3+ years",
    salary: "$100k - $130k",
    description:
      "Join our backend team to develop scalable APIs and services. You'll work with Node.js, Express, and MongoDB to build robust backend systems.",
    requirements: [
      "3+ years of experience with Node.js",
      "Experience with Express and MongoDB",
      "Understanding of RESTful API design",
      "Knowledge of authentication and authorization",
      "Experience with testing frameworks",
    ],
    benefits: [
      "Competitive salary",
      "Flexible hours",
      "Health and dental insurance",
      "Professional development budget",
    ],
    skills: ["Node.js", "Express", "MongoDB", "REST API", "Jest"],
    postedDate: "1 week ago",
  },
  {
    id: "3",
    title: "UX/UI Designer",
    company: "CreativeMinds",
    location: "Remote",
    type: "Contract",
    experience: "2+ years",
    salary: "$80k - $100k",
    description:
      "We're seeking a talented UX/UI Designer to create beautiful, intuitive interfaces for our clients. You'll work closely with our development team to bring designs to life.",
    requirements: [
      "2+ years of experience in UX/UI design",
      "Proficiency in Figma or Adobe XD",
      "Understanding of user-centered design principles",
      "Portfolio showcasing previous work",
      "Ability to create wireframes, prototypes, and high-fidelity designs",
    ],
    benefits: ["Flexible schedule", "Remote work", "Project-based bonuses"],
    skills: ["Figma", "Adobe XD", "Wireframing", "Prototyping", "User Research"],
    postedDate: "3 days ago",
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "CloudTech Solutions",
    location: "Berlin, Germany",
    type: "Full-time",
    experience: "4+ years",
    salary: "€70k - €90k",
    description:
      "Join our DevOps team to build and maintain our cloud infrastructure. You'll work with AWS, Docker, and Kubernetes to ensure our systems are reliable, scalable, and secure.",
    requirements: [
      "4+ years of experience in DevOps",
      "Experience with AWS or other cloud providers",
      "Knowledge of Docker and Kubernetes",
      "Experience with CI/CD pipelines",
      "Understanding of infrastructure as code",
    ],
    benefits: [
      "Competitive salary",
      "Flexible work hours",
      "30 days of vacation",
      "Health insurance",
      "Relocation assistance",
    ],
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
    postedDate: "2 weeks ago",
  },
  {
    id: "5",
    title: "Product Manager",
    company: "InnovateTech",
    location: "London, UK",
    type: "Full-time",
    experience: "3+ years",
    salary: "£60k - £80k",
    description:
      "We're looking for a Product Manager to lead our product development efforts. You'll work with cross-functional teams to define product vision, strategy, and roadmap.",
    requirements: [
      "3+ years of experience in product management",
      "Experience working with engineering teams",
      "Strong analytical and problem-solving skills",
      "Excellent communication and leadership abilities",
      "Understanding of agile methodologies",
    ],
    benefits: [
      "Competitive salary",
      "Flexible work arrangements",
      "Health insurance",
      "Stock options",
      "Professional development budget",
    ],
    skills: ["Product Strategy", "Agile", "User Stories", "Roadmapping", "Data Analysis"],
    postedDate: "5 days ago",
  },
  {
    id: "6",
    title: "Mobile Developer (iOS)",
    company: "AppWorks",
    location: "Remote",
    type: "Part-time",
    experience: "2+ years",
    salary: "$50 - $70 per hour",
    description:
      "Join our mobile development team to build innovative iOS applications. You'll work with Swift and UIKit to create beautiful, performant mobile experiences.",
    requirements: [
      "2+ years of experience with iOS development",
      "Proficiency in Swift",
      "Experience with UIKit and SwiftUI",
      "Understanding of iOS design patterns",
      "Knowledge of App Store submission process",
    ],
    benefits: ["Flexible hours", "Remote work", "Performance bonuses"],
    skills: ["Swift", "UIKit", "SwiftUI", "Xcode", "Core Data"],
    postedDate: "1 week ago",
  },
  {
    id: "7",
    title: "Data Scientist",
    company: "AnalyticsPro",
    location: "Boston, MA",
    type: "Full-time",
    experience: "3+ years",
    salary: "$110k - $140k",
    description:
      "We're seeking a Data Scientist to help us extract insights from complex datasets. You'll work with machine learning models and statistical analysis to solve business problems.",
    requirements: [
      "3+ years of experience in data science",
      "Proficiency in Python and data science libraries",
      "Experience with machine learning algorithms",
      "Strong statistical knowledge",
      "Ability to communicate complex findings to non-technical stakeholders",
    ],
    benefits: [
      "Competitive salary",
      "Flexible work arrangements",
      "Health and dental insurance",
      "401(k) with company match",
      "Continuing education stipend",
    ],
    skills: ["Python", "Machine Learning", "SQL", "Data Visualization", "Statistics"],
    postedDate: "3 days ago",
  },
  {
    id: "8",
    title: "Full Stack Developer",
    company: "WebSolutions",
    location: "Austin, TX",
    type: "Full-time",
    experience: "4+ years",
    salary: "$90k - $120k",
    description:
      "Join our team as a Full Stack Developer to build web applications from front to back. You'll work with React, Node.js, and PostgreSQL to create seamless user experiences.",
    requirements: [
      "4+ years of experience in full stack development",
      "Proficiency in React and Node.js",
      "Experience with relational databases",
      "Understanding of RESTful API design",
      "Knowledge of authentication and security best practices",
    ],
    benefits: [
      "Competitive salary",
      "Hybrid work model",
      "Health insurance",
      "401(k) matching",
      "Professional development opportunities",
    ],
    skills: ["React", "Node.js", "PostgreSQL", "REST API", "JavaScript"],
    postedDate: "1 week ago",
  },
]

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Fetch all jobs
export async function fetchJobs(): Promise<Job[]> {
  await delay(800) // Simulate network delay
  return [...mockJobs]
}

// Fetch a single job by ID
export async function fetchJobById(id: string): Promise<Job | null> {
  await delay(600) // Simulate network delay
  const job = mockJobs.find((job) => job.id === id)
  return job || null
}

