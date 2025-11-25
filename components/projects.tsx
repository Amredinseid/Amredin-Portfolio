"use client"

import { useEffect, useRef, useState } from "react"
import { ExternalLink, Github } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  category: string
  link?: string
  github?: string
}

function ProjectCard({ project, isVisible, delay }: { project: Project; isVisible: boolean; delay: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`group relative rounded-lg overflow-hidden border border-border/50 bg-card/50 hover:border-primary/50 transition-all duration-500 cursor-pointer ${
        isVisible ? "animate-fade-in-up" : "opacity-0"
      }`}
      style={{ animationDelay: `${delay}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-48 sm:h-56 overflow-hidden bg-muted">
        <div
          className="w-full h-full transition-transform duration-500"
          style={{
            backgroundImage: `url(${project.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: isHovered ? "scale(1.1)" : "scale(1)",
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6 relative z-10">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-semibold bg-primary/20 text-primary rounded border border-primary/30"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title and Description */}
        <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
        <p className="text-foreground/70 text-sm mb-4 line-clamp-2">{project.description}</p>

        {/* Links */}
        <div className="flex gap-3 pt-4 border-t border-border/30">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:text-accent transition-colors text-sm font-semibold group/link"
            >
              Live Preview
              <ExternalLink size={16} className="group-hover/link:translate-x-1 transition-transform" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:text-accent transition-colors text-sm font-semibold group/link"
            >
              GitHub
              <Github size={16} className="group-hover/link:translate-x-1 transition-transform" />
            </a>
          )}
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 border border-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
    </div>
  )
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState("All")

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const projects: Project[] = [
    {
      id: "1",
      title: "Akiya Spare Part - E-commerce App",
      description:
        "Complete automotive spare parts e-commerce platform with advanced search, inventory management, and secure payment integration.",
      image: "/automotive-spare-parts-ecommerce-mobile-app.jpg",
      tags: ["Flutter", "E-commerce", "REST API", "Payment"],
      category: "Mobile Apps",
      link: "#",
      github: "#",
    },
    {
      id: "2",
      title: "Motah - E-commerce Platform",
      description:
        "Full-featured e-commerce application with product catalog, shopping cart, order tracking, and integrated payment gateway.",
      image: "/modern-ecommerce-shopping-mobile-app.jpg",
      tags: ["Flutter", "Firebase", "Stripe", "Push Notifications"],
      category: "Mobile Apps",
      link: "#",
      github: "#",
    },
   
    {
      id: "4",
      title: "FinFlow - Finance Management App",
      description:
        "A comprehensive mobile app for personal finance management with real-time analytics and investment tracking.",
      image: "/finance-app-dashboard.png",
      tags: ["Flutter", "Firebase", "Charts"],
      category: "Mobile Apps",
      link: "#",
      github: "#",
    },
    {
      id: "5",
      title: "ShopHub - E-commerce Platform",
      description:
        "Full-featured e-commerce app with real-time inventory management, secure payments, and personalized recommendations.",
      image: "/shopping-mobile-app.jpg",
      tags: ["Flutter", "REST API", "Stripe"],
      category: "Mobile Apps",
      link: "#",
      github: "#",
    },
    {
      id: "6",
      title: "FitTrack - Fitness Companion",
      description: "AI-powered fitness app featuring workout planning, progress tracking, and community challenges.",
      image: "/fitness-tracking-app-interface.png",
      tags: ["Flutter", "Machine Learning", "Wearables"],
      category: "Mobile Apps",
      link: "#",
      github: "#",
    },
    {
      id: "7",
      title: "Design System - Component Library",
      description:
        "Custom design system built with Flutter featuring 50+ reusable components and comprehensive documentation.",
      image: "/design-system-ui.png",
      tags: ["Design", "Flutter", "Documentation"],
      category: "UI Designs",
      link: "#",
      github: "#",
    },
    {
      id: "8",
      title: "Admin Dashboard",
      description:
        "Enterprise admin dashboard with advanced analytics, user management, and real-time data visualization.",
      image: "/admin-dashboard-interface.png",
      tags: ["Flutter Web", "Charts", "Real-time"],
      category: "Admin Panels",
      link: "#",
      github: "#",
    },
    {
      id: "9",
      title: "Social Connect - Community App",
      description:
        "Social networking app connecting developers worldwide with real-time messaging and collaboration features.",
      image: "/social-network-app.png",
      tags: ["Flutter", "Firebase", "Real-time"],
      category: "Mobile Apps",
      link: "#",
      github: "#",
    },
  ]

  const categories = ["All", "Mobile Apps", "UI Designs", "Admin Panels"]

  const filteredProjects =
    activeFilter === "All" ? projects : projects.filter((project) => project.category === activeFilter)

  return (
    <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-1/2 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <div
          className={`mb-12 text-center transition-all duration-500 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-4" />
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Showcasing my best work in mobile development and design
          </p>
        </div>

        {/* Filter buttons */}
        <div
          className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-500 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          style={{ animationDelay: "0.1s" }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                activeFilter === category
                  ? "bg-gradient-to-r from-primary to-accent text-accent-foreground shadow-lg shadow-primary/50"
                  : "bg-card border border-border/50 text-foreground hover:border-primary/50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} isVisible={isVisible} delay={index * 0.1 + 0.2} />
          ))}
        </div>

        {/* View more button */}
        <div
          className={`mt-16 text-center transition-all duration-500 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          style={{ animationDelay: "0.4s" }}
        >
          <a
            href="#"
            className="inline-block px-8 py-3 bg-gradient-to-r from-primary to-accent text-accent-foreground font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
          >
            View All Projects
          </a>
        </div>
      </div>
    </section>
  )
}
