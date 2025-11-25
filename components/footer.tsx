'use client';

import { Heart, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Footer() {
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

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/Amredinseid',
      color: 'hover:text-primary',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',

      href: 'https://linkedin.com/in/amredin-seid/',
      color: 'hover:text-primary',
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: 'https://twitter.com',
      color: 'hover:text-primary',
    },
    {
      icon: Mail,
      label: 'Email',
      href: 'https://mail.google.com/mail/?view=cm&fs=1&to=amredinseid29@gmail.com',
      color: 'hover:text-primary',
    },
  ];

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer
      ref={ref}
      className={`relative border-t border-border/30 bg-card/50 backdrop-blur-sm transition-all duration-500 ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0'
      }`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-20" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Main footer content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand section */}
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
                Amredin
              </h3>
              <p className="text-foreground/70 mb-6">
                Building exceptional mobile experiences with Flutter and modern
                development practices.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className={`p-2 rounded-lg bg-muted border border-border/30 text-foreground transition-all duration-300 hover:bg-primary/20 hover:border-primary/50 ${link.color}`}
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-6">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-foreground/70 hover:text-primary transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-6">
                Services
              </h4>
              <ul className="space-y-3">
                {[
                  'App Development',
                  'UI/UX Design',
                  'Consulting',
                  'Optimization',
                ].map((service) => (
                  <li key={service}>
                    <a
                      href="#"
                      className="text-foreground/70 hover:text-primary transition-colors duration-300"
                    >
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-8" />

          {/* Bottom footer */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/60">
            <div className="flex items-center gap-1">
              <span>Prepared By</span>
              <Heart size={16} className="text-primary fill-primary" />
              <span>by Amredin Seid © 2024</span>
            </div>
            <div className="flex gap-6">
              <a
                href="#"
                className="hover:text-foreground transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-foreground transition-colors duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Scroll to top button */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-full px-6 py-3 rounded-lg border border-border/50 bg-muted hover:bg-primary/20 hover:border-primary/50 text-foreground font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
          >
            ↑ Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
}
