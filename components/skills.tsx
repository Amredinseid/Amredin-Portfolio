'use client';

import { useEffect, useRef, useState } from 'react';

interface SkillProps {
  name: string;
  level: number;
  category: string;
  delay: number;
}

function SkillBar({ name, level, category, delay }: SkillProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedLevel, setAnimatedLevel] = useState(0);

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

  useEffect(() => {
    if (!isVisible) return;

    let current = 0;
    const timer = setInterval(() => {
      current += 2;
      if (current >= level) {
        setAnimatedLevel(level);
        clearInterval(timer);
      } else {
        setAnimatedLevel(current);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [isVisible, level]);

  return (
    <div
      ref={ref}
      className="space-y-2"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-foreground">{name}</span>
        <span className="text-xs text-foreground/60">{animatedLevel}%</span>
      </div>
      <div className="h-2 bg-card rounded-full overflow-hidden border border-border/30">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
          style={{ width: `${animatedLevel}%` }}
        />
      </div>
    </div>
  );
}

interface SkillCategory {
  name: string;
  icon: string;
  skills: Array<{ name: string; level: number }>;
}

export default function Skills() {
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

  const skillCategories: SkillCategory[] = [
    {
      name: 'Mobile Development',
      icon: '📱',
      skills: [
        { name: 'Flutter', level: 99 },
        { name: 'Dart', level: 92 },
        { name: 'State Management', level: 88 },
        { name: 'React Native +', level: 80 },
      ],
    },
    {
      name: 'Backend & Database',
      icon: '🔧',
      skills: [
        { name: 'Firebase', level: 90 },
        { name: 'Mongo Db', level: 90 },
        { name: 'REST APIs', level: 88 },
        { name: 'Backend Architecture', level: 85 },
      ],
    },
    {
      name: 'Web Development',
      icon: '🕸🧑‍💻',
      skills: [
        { name: 'JavaScript', level: 95 },
        { name: ' Next JS', level: 92 },
        { name: 'React JS', level: 88 },
        { name: 'Express Js', level: 85 },
      ],
    },
    {
      name: 'Design & UX',
      icon: '🎨',
      skills: [
        { name: 'UI/UX Design', level: 87 },
        { name: 'Figma', level: 95 },
        { name: 'Material Design', level: 91 },
        { name: 'Responsive Design', level: 93 },
        { name: 'CSS', level: 95 },
      ],
    },
    {
      name: 'Other Languages',
      icon: '💻</>🌍',
      skills: [
        { name: 'Python', level: 85 },
        { name: ' C++', level: 82 },
        { name: 'PHP', level: 88 },
        { name: 'Java', level: 85 },
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
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
              Skills & Expertise
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-red from-primary to-accent mx-auto mb-4" />
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Proficient in modern mobile development technologies and best
            practices
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.name}
              className={`group p-6 rounded-lg border border-border/50 bg-card/50 hover:bg-card/80 hover:border-primary/50 transition-all duration-500 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${categoryIndex * 0.1 + 0.2}s` }}
            >
              {/* Card header */}
              <div className="mb-6 flex items-center gap-3">
                <span className="text-3xl">{category.icon}</span>
                <h3 className="text-xl font-bold text-foreground">
                  {category.name}
                </h3>
              </div>

              {/* Skills */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    category={category.name}
                    delay={categoryIndex * 0.1 + skillIndex * 0.05 + 0.3}
                  />
                ))}
              </div>

              {/* Hover effect border */}
              <div className="absolute inset-0 rounded-lg border border-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Additional competencies */}
        <div
          className={`mt-16 p-8 rounded-lg border border-primary/20 bg-card/50 backdrop-blur-sm transition-all duration-500 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.6s' }}
        >
          <h3 className="text-2xl font-bold mb-6 text-foreground">
            Additional Competencies
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Version Control',
              'CI/CD Pipelines',
              'Cloud Services',
              'App Store Deployment',
              'Performance Optimization',
              'Testing & QA',
              'Agile Methodology',
              'Team Leadership',
            ].map((competency) => (
              <div
                key={competency}
                className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-sm font-semibold text-foreground hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 text-center cursor-pointer"
              >
                {competency}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
