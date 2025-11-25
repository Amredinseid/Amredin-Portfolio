'use client';

import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function Contact() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setIsVisible(true);
          obs.unobserve(e.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'amredinseid29@gmail.com',
      href: 'https://mail.google.com/mail/?view=cm&fs=1&to=amredinseid29@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+251 962 195 984',
      href: 'tel:+251962195984',
    },
    { icon: MapPin, label: 'Location', value: 'Ethiopia,AdissAbaba, Figa', href: '#' },
  ];

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Enter a valid email';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 10)
      e.message = 'Message must be at least 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
    if (errors[e.target.name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setErrorMessage(null);

  if (!validate()) return;
  setLoading(true);

  try {
    const templateParams = {
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
    };

    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      templateParams,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    );

    setSuccess(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSuccess(false), 5000);
  } catch (err) {
    setErrorMessage('Failed to send message. Please try again.');
  } finally {
    setLoading(false);
  }
};


  return (
    <section
      id="contact"
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Have a project in mind? Let's collaborate and bring your ideas to
            life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((it) => {
              const Icon = it.icon;
              return (
                <a
                  key={it.label}
                  href={it.href}
                  className="group p-6 rounded-lg border border-border/50 bg-card/50 hover:bg-card/80 transition-all block"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/20 rounded-lg">
                      <Icon size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{it.label}</h3>
                      <p className="text-foreground/70 break-all">{it.value}</p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          <div className="lg:col-span-2 p-8 rounded-lg border bg-card/50">
            {success ? (
              <div className="text-center py-16">
                <CheckCircle size={32} className="text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-foreground/70">
                  Thank you for reaching out. I'll respond soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full p-3 rounded-lg bg-muted border"
                />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full p-3 rounded-lg bg-muted border"
                />

                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="w-full p-3 rounded-lg bg-muted border"
                />

                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  className="w-full p-3 rounded-lg bg-muted border"
                />

                {errorMessage && (
                  <p className="text-red-500 text-sm">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-primary text-white rounded-lg flex items-center justify-center gap-2"
                >
                  {loading ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
