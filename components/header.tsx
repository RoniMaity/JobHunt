"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Briefcase, Menu, X } from "lucide-react"
import { useJobs } from "@/context/jobs-context"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Header() {
  const pathname = usePathname()
  const { appliedJobs } = useJobs()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { name: "Jobs", path: "/" },
    { name: "Applied", path: "/applied", badge: appliedJobs.length > 0 ? appliedJobs.length : null },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-lg px-4">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold tracking-wide">JobTracker</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <Button
                variant={pathname === item.path ? "secondary" : "ghost"}
                className="relative px-4 py-2 transition hover:bg-muted"
              >
                {item.name}
                {item.badge && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground font-semibold">
                    {item.badge}
                  </span>
                )}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-4">
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-6">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                    <Briefcase className="h-6 w-6 text-primary" />
                    <span className="text-lg font-bold tracking-wide">JobTracker</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                    <X className="h-6 w-6" />
                  </Button>
                </div>

                {/* Mobile Menu Items */}
                <nav className="flex flex-col gap-y-4">
                  {navItems.map((item) => (
                    <Link key={item.path} href={item.path} onClick={() => setMobileMenuOpen(false)}>
                      <Button
                        variant={pathname === item.path ? "secondary" : "ghost"}
                        className="relative w-full justify-start px-4 py-3"
                      >
                        {item.name}
                        {item.badge && (
                          <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground font-semibold">
                            {item.badge}
                          </span>
                        )}
                      </Button>
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          {/* Theme Toggle */}
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

