/**
 * Design Philosophy: Luxe Arabian Modernism
 * - Elegant symmetrical layout with royal blue and gold accents
 * - Smooth transitions reflecting sophistication
 * - Bilingual navigation (Arabic/English)
 */

import { useState } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "الرئيسية", nameEn: "Home", href: "/" },
    { name: "من نحن", nameEn: "About", href: "#about" },
    { name: "خدماتنا", nameEn: "Services", href: "#services" },
    { name: "مشاريعنا", nameEn: "Projects", href: "#projects" },
    { name: "اتصل بنا", nameEn: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-3 transition-opacity hover:opacity-80">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031015500/nrvgOSXOTDMNsgic.png"
                alt="IPAC Logo"
                className="h-12 w-auto"
              />
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground hover:text-accent transition-colors duration-300 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              asChild
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6"
            >
              <a href="#contact">احصل على عرض</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-accent transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-in slide-in-from-top-5 duration-300">
            <nav className="flex flex-col gap-4">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-base font-medium text-foreground hover:text-accent transition-colors py-2"
                >
                  {item.name}
                </a>
              ))}
              <Button
                asChild
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold w-full mt-2"
              >
                <a href="#contact" onClick={() => setIsMenuOpen(false)}>
                  احصل على عرض
                </a>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
