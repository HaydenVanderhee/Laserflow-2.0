/**
 * Layout Component - Liquid Flow Aesthetics Design
 * - Plus Jakarta Sans for headings, DM Sans for body
 * - Dark ocean blue theme with cyan accents
 * - Glassmorphic navigation with smooth transitions
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { LogoIcon } from "./LogoIcon";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/book", label: "Book a Call" },
    { href: "/contact", label: "Contact" },
  ];

  if (location === "/demo") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "glass-card py-3"
          : "bg-transparent border-b border-slate-800/80 py-5"
          }`}
      >
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <LogoIcon className="w-10 h-10 text-[#48CFCB] transition-transform group-hover:scale-105" />
            <span className="text-2xl font-bold font-[family-name:var(--font-display)] gradient-text">
              Laserflow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-16">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[oklch(0.7_0.15_220)] ${location === link.href
                  ? "text-[oklch(0.7_0.15_220)]"
                  : "text-foreground/80"
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/book">
              <Button className="btn-gradient text-white border-0 px-6">
                Get Started
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-card mt-2 mx-4 rounded-xl overflow-hidden"
            >
              <nav className="flex flex-col p-4 gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${location === link.href
                      ? "bg-primary/20 text-[oklch(0.7_0.15_220)]"
                      : "text-foreground/80 hover:bg-secondary"
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link href="/book" className="mt-2">
                  <Button className="btn-gradient text-white border-0 w-full">
                    Get Started
                  </Button>
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative bg-[oklch(0.1_0.02_250)] border-t border-border/50 py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <LogoIcon className="w-10 h-10 text-[#48CFCB]" />
                <span className="text-2xl font-bold font-[family-name:var(--font-display)] gradient-text">
                  Laserflow
                </span>
              </Link>
              <p className="text-muted-foreground max-w-sm leading-relaxed">
                Automating the future of med spa operations with intelligent AI agents.
                Streamline your leads, onboarding, and client communication effortlessly.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold font-[family-name:var(--font-display)] mb-4 text-foreground">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-[oklch(0.7_0.15_220)] transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold font-[family-name:var(--font-display)] mb-4 text-foreground">
                Contact
              </h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <a
                    href="mailto:customersupport@laserflow.co"
                    className="hover:text-[oklch(0.7_0.15_220)] transition-colors"
                  >
                    customersupport@laserflow.co
                  </a>
                </li>
                <li>
                  <a
                    href="https://laserflow.co"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[oklch(0.7_0.15_220)] transition-colors"
                  >
                    laserflow.co
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Laserflow. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <button
                onClick={() => alert("Privacy Policy - Coming Soon")}
                className="hover:text-[oklch(0.7_0.15_220)] transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => alert("Terms of Service - Coming Soon")}
                className="hover:text-[oklch(0.7_0.15_220)] transition-colors"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
