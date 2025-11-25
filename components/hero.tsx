'use client';

import { useEffect, useState } from 'react';
import { Download, Github as GitHub, Linkedin, Mail, Send } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  const [text, setText] = useState('');
  const fullText = 'Flutter Developer';
  const [isTyping, setIsTyping] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [theme, setTheme] = useState<string>('dark');

  useEffect(() => {
    if (!isTyping) return;

    if (text.length < fullText.length) {
      const timer = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
      }, 80);
      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [text, isTyping]);

  useEffect(() => {
    const updateTheme = () => {
      const currentTheme = document.documentElement.classList.contains('dark')
        ? 'dark'
        : 'light';
      setTheme(currentTheme);
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      const dx = e.movementX;
      const dy = e.movementY;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      setRotation(angle);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen pt-20 flex items-center justify-center overflow-hidden bg-background">
      <div
        className="
    fixed pointer-events-none z-50 hidden lg:block 
    transition-all duration-150 ease-out 
    rounded-xl backdrop-blur-md
    dark:bg-gradient-to-br dark:from-[#02569B]/30 dark:to-[#13B9FD]/20
    bg-gradient-to-br from-purple-500/60 to-pink-500/50
    dark:shadow-[0_0_25px_rgba(19,185,253,0.3)]
    shadow-[0_0_25px_rgba(168,85,247,0.6)]
    border
    dark:border-[#13B9FD]/30
    border-purple-600/40
  "
        style={{
          left: `${mousePos.x + 80}px`,
          top: `${mousePos.y + 80}px`,
          transform: `rotate(${rotation * 0.08}deg)`,
          mixBlendMode: 'plus-darker',
        }}
      >
        <div
          className={`relative bg-gradient-to-br ${
            theme === 'dark'
              ? 'from-[#02569B]/30 to-[#13B9FD]/25'
              : 'from-black to-black'
          } backdrop-blur-sm rounded-lg shadow-xl border ${
            theme === 'dark' ? 'border-[#13B9FD]/20' : 'border-blue-600/40'
          } p-3 min-w-[200px]`}
          style={{
            boxShadow:
              theme === 'dark'
                ? '0 0 20px rgba(19, 185, 253, 0.2), 0 0 40px rgba(2, 86, 155, 0.1)'
                : '0 0 25px rgba(59, 130, 246, 0.4), 0 0 50px rgba(6, 182, 212, 0.2)',
          }}
        >
          {/* Flutter logo badge */}
          <div
            className={`absolute -top-2 -left-2 w-8 h-8 rounded-lg flex items-center justify-center shadow-lg border ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-[#02569B]/80 to-[#13B9FD]/80 border-[#13B9FD]/30'
                : 'bg-gradient-to-br from-blue-600 to-cyan-500 border-blue-500/50'
            }`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 256 317"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M157.665 0L0 157.665L48.535 206.2L254.665 0H157.665Z"
                fill={theme === 'dark' ? '#42A5F5' : '#FFFFFF'}
                fillOpacity="0.9"
              />
              <path
                d="M157.665 145.465L72.465 230.665L121 279.2L254.665 145.465H157.665Z"
                fill={theme === 'dark' ? '#0D47A1' : '#1E40AF'}
                fillOpacity="0.9"
              />
              <path
                d="M121 279.2L72.465 230.665L157.665 145.465L206.2 194L121 279.2Z"
                fill={theme === 'dark' ? '#42A5F5' : '#FFFFFF'}
                fillOpacity="0.7"
              />
            </svg>
          </div>

          {/* Code snippet with syntax highlighting */}
          <div className="font-mono text-[10px] leading-relaxed">
            <div className="flex items-center gap-1 mb-0.5">
              <span
                className={
                  theme === 'dark' ? 'text-[#C792EA]/90' : 'text-purple-700'
                }
              >
                class
              </span>
              <span
                className={
                  theme === 'dark' ? 'text-[#FFCB6B]/90' : 'text-amber-700'
                }
              >
                MyApp
              </span>
              <span
                className={theme === 'dark' ? 'text-white/60' : 'text-gray-800'}
              >
                {' '}
                &#123;
              </span>
            </div>
            <div className="pl-2 flex items-center gap-1">
              <span
                className={
                  theme === 'dark' ? 'text-[#82AAFF]/90' : 'text-blue-700'
                }
              >
                Widget
              </span>
              <span
                className={
                  theme === 'dark' ? 'text-[#FFCB6B]/90' : 'text-amber-700'
                }
              >
                build
              </span>
              <span
                className={theme === 'dark' ? 'text-white/60' : 'text-gray-800'}
              >
                () &#123;
              </span>
            </div>
            <div className="pl-4 flex items-center gap-1">
              <span
                className={
                  theme === 'dark' ? 'text-[#89DDFF]/90' : 'text-cyan-700'
                }
              >
                return
              </span>
              <span
                className={
                  theme === 'dark' ? 'text-[#82AAFF]/90' : 'text-blue-700'
                }
              >
                Container
              </span>
              <span
                className={theme === 'dark' ? 'text-white/60' : 'text-gray-800'}
              >
                ();
              </span>
            </div>
            <div
              className={
                theme === 'dark' ? 'pl-2 text-white/60' : 'pl-2 text-gray-800'
              }
            >
              &#125;
            </div>
            <div
              className={theme === 'dark' ? 'text-white/60' : 'text-gray-800'}
            >
              &#125;
            </div>
          </div>

          {/* Animated dots indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 flex gap-0.5">
            <div
              className={`w-1 h-1 rounded-full animate-pulse ${
                theme === 'dark' ? 'bg-[#13B9FD]/80' : 'bg-white/90'
              }`}
            />
            <div
              className={`w-1 h-1 rounded-full animate-pulse ${
                theme === 'dark' ? 'bg-[#13B9FD]/80' : 'bg-white/90'
              }`}
              style={{ animationDelay: '0.2s' }}
            />
            <div
              className={`w-1 h-1 rounded-full animate-pulse ${
                theme === 'dark' ? 'bg-[#13B9FD]/80' : 'bg-white/90'
              }`}
              style={{ animationDelay: '0.4s' }}
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Mobile Photo - Shows on top for mobile only */}
          <div className="flex justify-center items-center relative lg:hidden w-full order-1">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-primary/20 to-accent/30 rounded-full blur-3xl opacity-60 animate-pulse" />

            <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden shadow-2xl border-4 border-accent/40 group">
              <Image
                src="/profile-photo.png"
                alt="Amredin Seid"
                fill
                className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
              <div className="absolute inset-0 rounded-full border-2 border-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[inset_0_0_30px_rgba(0,200,255,0.3)]" />
            </div>

            <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full opacity-60 animate-float" />
            <div
              className="absolute -bottom-3 -left-3 w-5 h-5 bg-primary rounded-full opacity-40 animate-float"
              style={{ animationDelay: '0.5s' }}
            />
          </div>

          {/* Left side - Content */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <div className="flex justify-start gap-2 mb-6 lg:mb-8 flex-wrap">
              <span className="px-3 py-1 text-xs font-semibold bg-primary/40 backdrop-blur-sm text-primary rounded-full border border-primary/50">
                Flutter Developer
              </span>
              <span className="px-3 py-1 text-xs font-semibold bg-accent/40 backdrop-blur-sm text-accent rounded-full border border-accent/50">
                Mobile Apps
              </span>
              <span className="px-3 py-1 text-xs font-semibold bg-primary/40 backdrop-blur-sm text-primary rounded-full border border-primary/50">
                UI/UX Design
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent leading-tight text-center lg:text-left">
              Hi, I'm Amredin Seid
            </h1>

            <h2 className="text-xl sm:text-2xl md:text-3xl text-accent mb-6 lg:mb-8 min-h-12 lg:min-h-16 font-semibold text-center lg:text-left">
              {text}
              {isTyping && <span className="animate-pulse">|</span>}
            </h2>

            <p className="text-base lg:text-lg text-foreground/80 mb-8 lg:mb-12 max-w-xl leading-relaxed backdrop-blur-sm bg-background/30 p-4 rounded-lg text-center lg:text-left">
              Transforming ideas into cutting-edge mobile applications.
              Specialized in Flutter, Dart, Firebase, and modern app
              architecture.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8 lg:mb-12 w-full sm:w-auto">
              <a
                href="http://t.me/Emgoam"
                className="group px-8 py-3 bg-gradient-to-r from-accent to-primary text-background font-semibold rounded-lg hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                Hire Me
                <Send
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
              <a
                href="/cv/cv.pdf"
                download
                className="px-8 py-3 border-2 border-accent/60 text-accent font-semibold rounded-lg hover:bg-accent/10 transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2"
              >
                Download CV
                <Download size={18} />
              </a>
            </div>

            <div className="flex justify-center lg:justify-start gap-6">
              <a
                href="https://github.com/Amredinseid"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-card/50 backdrop-blur-sm hover:bg-accent/20 rounded-lg transition-all duration-300 border border-accent/30 hover:border-accent/60 group"
              >
                <GitHub
                  size={24}
                  className="text-foreground group-hover:text-accent transition-colors"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/amredin-seid/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-card/50 backdrop-blur-sm hover:bg-accent/20 rounded-lg transition-all duration-300 border border-accent/30 hover:border-accent/60 group"
              >
                <Linkedin
                  size={24}
                  className="text-foreground group-hover:text-accent transition-colors"
                />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=amredinseid29@gmail.com"
                className="p-3 bg-card/50 backdrop-blur-sm hover:bg-accent/20 rounded-lg transition-all duration-300 border border-accent/30 hover:border-accent/60 group"
              >
                <Mail
                  size={24}
                  className="text-foreground group-hover:text-accent transition-colors"
                />
              </a>
            </div>
          </div>

          {/* Desktop Photo - Changed to circular shape */}
          <div className="hidden lg:flex justify-center items-center relative order-2">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-primary/20 to-accent/30 rounded-full blur-3xl opacity-60 animate-pulse" />

            <div className="relative w-96 h-96 rounded-full overflow-hidden shadow-2xl border-4 border-accent/40 group">
              <Image
                src="/profile-photo.png"
                alt="Amredin Seid"
                fill
                className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
              <div className="absolute inset-0 rounded-full border-2 border-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[inset_0_0_30px_rgba(0,200,255,0.3)]" />
            </div>

            <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full opacity-60 animate-float" />
            <div
              className="absolute -bottom-6 -left-6 w-6 h-6 bg-primary rounded-full opacity-40 animate-float"
              style={{ animationDelay: '0.5s' }}
            />
            <div
              className="absolute top-1/2 -right-8 w-4 h-4 bg-accent/50 rounded-full opacity-50 animate-float"
              style={{ animationDelay: '0.25s' }}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-accent/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-accent rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
