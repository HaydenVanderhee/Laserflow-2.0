/**
 * Contact Page - Liquid Flow Aesthetics Design
 * - Contact form
 * - Contact information
 * - Glassmorphic design elements
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Globe,
  MessageSquare,
  CheckCircle2,
  Send,
  Clock,
} from "lucide-react";
import { LogoIcon } from "../components/LogoIcon";
import { toast } from "sonner";
import { Link } from "wouter";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateFormData = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/xykbyjrb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Your message has been sent!");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg mx-auto px-4"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[oklch(0.5_0.2_250)] to-[oklch(0.65_0.2_200)] flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] mb-4">
            Message Sent!
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Thank you for reaching out. We'll get back to you within 24 hours.
          </p>
          <Link href="/">
            <Button className="btn-gradient text-white border-0">
              Return to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-24">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-[oklch(0.7_0.15_220)] mb-6">
            <MessageSquare className="w-4 h-4" />
            Get in Touch
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-display)] mb-4">
            Let's Start a <span className="gradient-text">Conversation</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Have questions about AI automation for your med spa? We're here to help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h2 className="text-2xl font-semibold font-[family-name:var(--font-display)] mb-6 text-foreground">
                Contact Information
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Ready to transform your med spa operations? Reach out and let's
                discuss how Laserflow can help you automate and grow.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[oklch(0.5_0.2_250)] to-[oklch(0.65_0.2_200)] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold font-[family-name:var(--font-display)] mb-1 text-foreground">
                    Email Us
                  </h3>
                  <a
                    href="mailto:customersupport@laserflow.co"
                    className="text-muted-foreground hover:text-[oklch(0.7_0.15_220)] transition-colors"
                  >
                    customersupport@laserflow.co
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[oklch(0.5_0.2_250)] to-[oklch(0.65_0.2_200)] flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold font-[family-name:var(--font-display)] mb-1 text-foreground">
                    Website
                  </h3>
                  <a
                    href="https://laserflow.co"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[oklch(0.7_0.15_220)] transition-colors"
                  >
                    laserflow.co
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[oklch(0.5_0.2_250)] to-[oklch(0.65_0.2_200)] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold font-[family-name:var(--font-display)] mb-1 text-foreground">
                    Response Time
                  </h3>
                  <p className="text-muted-foreground">
                    We typically respond within 24 hours
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="glass-card rounded-2xl p-6 mt-8">
              <div className="flex items-center gap-3 mb-4">
                <LogoIcon className="w-10 h-10 text-[#48CFCB]" />
                <h3 className="text-xl font-semibold font-[family-name:var(--font-display)] text-foreground">
                  Ready to Get Started?
                </h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Skip the contact form and book a discovery call directly.
              </p>
              <Link href="/book">
                <Button className="btn-gradient text-white border-0 w-full">
                  Book a Discovery Call
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="glass-card rounded-2xl p-6 md:p-10">
              <h2 className="text-2xl font-semibold font-[family-name:var(--font-display)] mb-6 text-foreground">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">
                      Your Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="John Smith"
                      value={formData.name}
                      onChange={(e) => updateFormData("name", e.target.value)}
                      className="bg-input border-border focus:border-[oklch(0.5_0.2_250)]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                      Email Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@medspa.com"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      className="bg-input border-border focus:border-[oklch(0.5_0.2_250)]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-foreground">
                    Subject
                  </Label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) => updateFormData("subject", value)}
                  >
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="What's this about?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="demo">Request a Demo</SelectItem>
                      <SelectItem value="pricing">Pricing Information</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground">
                    Your Message <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your med spa and how we can help..."
                    value={formData.message}
                    onChange={(e) => updateFormData("message", e.target.value)}
                    className="bg-input border-border focus:border-[oklch(0.5_0.2_250)] min-h-[150px]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gradient text-white border-0 w-full py-6"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              <p className="text-sm text-muted-foreground mt-6 text-center">
                By submitting this form, you agree to our privacy policy.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
