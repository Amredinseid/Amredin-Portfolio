'use client';

import type React from 'react';

import { useEffect, useRef, useState } from 'react';
import { Briefcase, Target, Award } from 'lucide-react';

interface AboutCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

function AboutCard({ icon, title, description, delay }: AboutCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group relative p-6 rounded-lg border border-border/50 bg-card/50 hover:bg-card/80 hover:border-primary/50 transition-all duration-500 hover:shadow-lg hover:shadow-primary/20 transform hover:-translate-y-2 cursor-pointer ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Glassmorphism effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative z-10">
        <div className="mb-4 inline-block p-3 bg-primary/20 rounded-lg group-hover:bg-primary/40 transition-colors duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-foreground">{title}</h3>
        <p className="text-foreground/70 leading-relaxed">{description}</p>
      </div>

      {/* Border animation on hover */}
      <div className="absolute inset-0 rounded-lg border border-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <div
          className={`mb-16 text-center transition-all duration-500 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto" />
        </div>

        {/* About content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <AboutCard
            icon={<Briefcase size={24} className="text-primary" />}
            title="Who I Am"
            description="I'm a passionate Flutter developer with over 4 years of experience crafting beautiful and performant mobile applications. I combine technical expertise with a keen eye for design to create exceptional user experiences."
            delay={0}
          />
          <AboutCard
            icon={<Award size={24} className="text-primary" />}
            title="My Experience"
            description="I've worked on 20+ successful mobile projects across various industries including fintech, e-commerce, and social platforms. My expertise spans full-stack mobile development, from backend integration to pixel-perfect UI implementation."
            delay={0.1}
          />
          <AboutCard
            icon={<Target size={24} className="text-primary" />}
            title="My Mission"
            description="I believe in building apps that matter. My mission is to deliver solutions that are not only visually stunning but also intuitive, performant, and scalable. Every line of code serves a purpose."
            delay={0.2}
          />
        </div>

        {/* Detailed bio section */}
        <div
          className={`p-8 rounded-lg border border-primary/20 bg-card/50 backdrop-blur-sm transition-all duration-500 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.3s' }}
        >
          <h3 className="text-2xl font-bold mb-4 text-foreground">
            Professional Journey
          </h3>
          <p className="text-foreground/80 leading-relaxed mb-4">
            Starting my career in traditional web development, I quickly
            transitioned to mobile development when I discovered Flutter in
            2019. Since then, I've been on a mission to master the craft of
            building exceptional mobile experiences.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            When I'm not coding, I contribute to open-source projects, write
            technical articles about Flutter best practices, and mentor aspiring
            developers. I'm constantly exploring new technologies and design
            patterns to stay at the forefront of mobile development.
          </p>
        </div>
      </div>
    </section>
  );
}
