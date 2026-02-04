/**
 * Design Philosophy: Luxe Arabian Modernism
 * - Elegant footer with symmetrical layout
 * - Gold accents and royal blue background
 * - Clear information hierarchy
 */

import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031015500/nrvgOSXOTDMNsgic.png"
              alt="IPAC Logo"
              className="h-12 w-auto brightness-0 invert"
            />
            <p className="text-sm leading-relaxed opacity-90">
              شركة المشاريع والإنشاءات المتكاملة - شركة رائدة في المقاولات العامة والإنشاءات المتكاملة في المملكة العربية السعودية
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-accent">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-sm opacity-90 hover:text-accent transition-colors">
                  من نحن
                </a>
              </li>
              <li>
                <a href="#services" className="text-sm opacity-90 hover:text-accent transition-colors">
                  خدماتنا
                </a>
              </li>
              <li>
                <a href="#projects" className="text-sm opacity-90 hover:text-accent transition-colors">
                  مشاريعنا
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm opacity-90 hover:text-accent transition-colors">
                  اتصل بنا
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-accent">خدماتنا</h3>
            <ul className="space-y-2">
              <li className="text-sm opacity-90">الإنشاءات العامة</li>
              <li className="text-sm opacity-90">أعمال البناء والتشطيبات</li>
              <li className="text-sm opacity-90">الأعمال الكهروميكانيكية</li>
              <li className="text-sm opacity-90">خدمات الصيانة</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-accent">تواصل معنا</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm opacity-90">
                <MapPin size={18} className="text-accent mt-0.5 flex-shrink-0" />
                <span>المملكة العربية السعودية</span>
              </li>
              <li className="flex items-center gap-3 text-sm opacity-90">
                <Phone size={18} className="text-accent flex-shrink-0" />
                <a href="tel:+966" className="hover:text-accent transition-colors">
                  +966 XX XXX XXXX
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm opacity-90">
                <Mail size={18} className="text-accent flex-shrink-0" />
                <a href="mailto:info@ipac-co.com" className="hover:text-accent transition-colors">
                  info@ipac-co.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-80">
            <p>
              © {currentYear} Integrated Projects and Construction Company. جميع الحقوق محفوظة.
            </p>
            <p className="text-accent">
              تطوير بواسطة IPAC
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
