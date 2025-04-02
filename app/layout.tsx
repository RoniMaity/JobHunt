import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { JobsProvider } from "@/context/jobs-context"
import Header from "@/components/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Job Application Dashboard",
  description: "Track and manage your job applications",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="job-dashboard-theme" // Add a specific storage key
        >
          <JobsProvider>
            <div className="min-h-screen bg-background flex flex-col transition-colors duration-200">
              <Header />
              <main className="flex-1 container mx-auto py-6 px-4 md:px-6">{children}</main>
            </div>
          </JobsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'