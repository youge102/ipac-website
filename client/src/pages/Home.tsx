/**
 * Design Philosophy: Luxe Arabian Modernism
 * - Symmetrical layouts with royal blue (#0A2647) and gold (#C9A961)
 * - Elegant transitions and smooth animations
 * - Generous whitespace and sophisticated typography
 * - Inspired by BCG structure with IPAC content
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, CheckCircle, Building2, Hammer, Zap, Wrench } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  const services = [
    {
      icon: Building2,
      title: "الإنشاءات العامة",
      titleEn: "General Construction",
      description: "تقدم IPAC خدمات الإنشاءات العامة الشاملة التي تغطي جميع أنواع المباني السكنية والتجارية والصناعية",
    },
    {
      icon: Hammer,
      title: "أعمال البناء والتشطيبات",
      titleEn: "Construction & Finishing",
      description: "نوفر أعمال البناء والتشطيبات عالية الجودة مع الالتزام بالمواصفات الفنية والمعايير الدولية",
    },
    {
      icon: Zap,
      title: "الأعمال الكهروميكانيكية",
      titleEn: "MEP Works",
      description: "خدمات متكاملة للأعمال الكهروميكانيكية والسباكة بأعلى معايير الجودة والسلامة",
    },
    {
      icon: Wrench,
      title: "خدمات الصيانة",
      titleEn: "Maintenance Services",
      description: "نقدم خدمات صيانة شاملة ومتخصصة لضمان استمرارية المشاريع بكفاءة عالية",
    },
  ];

  const projects = [
    {
      title: "مشروع البنية التحتية",
      location: "الرياض، المملكة العربية السعودية",
      image: "https://private-us-east-1.manuscdn.com/sessionFile/gW9czFGtDkWjYC4eyP25fJ/sandbox/VM529Pfd8OrVHbzX5rcTFX-img-4_1770232469000_na1fn_aXBhYy1wcm9qZWN0cy1pbmZyYXN0cnVjdHVyZQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZ1c5Y3pGR3REa1dqWUM0ZXlQMjVmSi9zYW5kYm94L1ZNNTI5UGZkOE9yVkhielg1cmNURlgtaW1nLTRfMTc3MDIzMjQ2OTAwMF9uYTFmbl9hWEJoWXkxd2NtOXFaV04wY3kxcGJtWnlZWE4wY25WamRIVnlaUS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=XYRIgnQMpTO6LaXPspwzycgIiC5bCmxOy8MeCqtixvmT0PLwiB~Zn6y9~6gJnzIBUOnwtBPag7ysPfwvuUJjioZp6t7A1DKBrr7enBHWShAbFKEP1hFqTpJnVZ77V-NRIx92G43MvQZ8r7M-9FnXUjrlNf3d7Q4TCaCkYrilQXY7Mzd4-r3cDhboxYhKcBtTK6dZII9eq64DdhbQg6tG-uhaDtqIfqB~cwpZAKKl4MoaxsF9CWjOrhzV9QCW1ODj6xPIK8lyII1EignORK9bUA~rakfrX3iiHGEB~KTkLlRkS6kfhelAFvSaP4MI6JlXWqXcBcQdHksZ66IbU--gEA__",
    },
    {
      title: "مشروع المباني التجارية",
      location: "جدة، المملكة العربية السعودية",
      image: "https://private-us-east-1.manuscdn.com/sessionFile/gW9czFGtDkWjYC4eyP25fJ/sandbox/VM529Pfd8OrVHbzX5rcTFX-img-3_1770232465000_na1fn_aXBhYy1zZXJ2aWNlcy1nZW5lcmFs.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZ1c5Y3pGR3REa1dqWUM0ZXlQMjVmSi9zYW5kYm94L1ZNNTI5UGZkOE9yVkhielg1cmNURlgtaW1nLTNfMTc3MDIzMjQ2NTAwMF9uYTFmbl9hWEJoWXkxelpYSjJhV05sY3kxblpXNWxjbUZzLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=L5fzazBeK8d74Pv7HbYvYkaAC6RtZ-C6HoKHDzmdgNdJfg9EjL5XucMh28jLb1nKsDsLysp0s~9ka1m6CXsbIU2ncdWnrsBdY4Nuk8PtBMYun8Sq6aLiTNwN-tjI~1ZpuH3E4BMYAWORYmDygPA1seYQNCQ-yNf48gzkX0O4TSYBuoM~LSHBYtmkLo1VU1mKuPMGx46qALBgoqna2dWSgZNaVsWmIFCS2-3f2453nUxFZsmTcpCYag6aV1ZkwWyIQ1K4Wzo~-UENM9NPNFIrA0AHlpZ0zxT0SXEUOfUAQvDBpkobANZYg9xXplY-XjbpoJ4jOT6YQ09A0xBQnOgxKg__",
    },
  ];

  const stats = [
    { value: "15+", label: "سنوات من الخبرة" },
    { value: "200+", label: "مشروع منجز" },
    { value: "100%", label: "نسبة النجاح" },
    { value: "50+", label: "عميل راضٍ" },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(10, 38, 71, 0.7), rgba(10, 38, 71, 0.85)), url('https://private-us-east-1.manuscdn.com/sessionFile/gW9czFGtDkWjYC4eyP25fJ/sandbox/VM529Pfd8OrVHbzX5rcTFX-img-1_1770232465000_na1fn_aXBhYy1oZXJvLWNvbnN0cnVjdGlvbg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZ1c5Y3pGR3REa1dqWUM0ZXlQMjVmSi9zYW5kYm94L1ZNNTI5UGZkOE9yVkhielg1cmNURlgtaW1nLTFfMTc3MDIzMjQ2NTAwMF9uYTFmbl9hWEJoWXkxb1pYSnZMV052Ym5OMGNuVmpkR2x2YmcucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=DvH~XcnvVS9aDI2RllJdNqj0QyqXPVy1Dxcu-FuW8VybaN1OVSX8fDQt8wzJ4LWPzRXrbxr7Im-1jdzeTmW~9mNCRKdHjEbvxQlPMnfRGQRfZtSvAOYk0l0L-UDK62RpElrknDh~44OXqZGvPMOQLbn1a~hXX9H4TiETI0K73dd4PcPNr07Byb1NKVswV~QEcEQLTmJw1s3y2KC7n~y9Sy1kBBpP5QzRZVrsXTNqmA5~FvkvK5ly7pGo4OTJ81zBDyymHSR3vIp97DffK0V9Yg8wFw-yriZfyMo9MFCogP9edzCfNQEapwG1Q6iLnPwxuZt6cw19o7Yfm9RkhR6l5g__')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 fade-in-up">
            حلول إنشائية متميزة
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-95 fade-in-up" style={{ animationDelay: "0.2s" }}>
            خدمات إنشائية احترافية لمشاريعكم بأعلى معايير الجودة والكفاءة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-lg"
              asChild
            >
              <a href="#contact">
                احصل على عرض مجاني
                <ArrowRight className="mr-2" size={20} />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-6 text-lg"
              asChild
            >
              <a href="#about">تعرف على المزيد</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-sm md:text-base opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary gold-line">
                رؤيتنا ورسالتنا
              </h2>
              <div className="space-y-6 text-lg leading-relaxed">
                <p>
                  شركة المشاريع والإنشاءات المتكاملة (IPAC) هي شركة رائدة في المقاولات العامة والإنشاءات المتكاملة في المملكة العربية السعودية. نحن ملتزمون بتقديم التميز من خلال الابتكار والجودة والالتزام بالمعايير الدولية.
                </p>
                <p>
                  منذ تأسيس شركتنا، آمنا بأن النجاح الحقيقي يكمن في تقديم قيمة مضافة لعملائنا من خلال الجودة والابتكار والالتزام. لقد عملنا بجد لبناء علاقات طويلة الأمد مع عملائنا وشركائنا، مستندين إلى مبادئ الشفافية والنزاهة والاحترافية.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-accent" size={20} />
                    <span className="font-semibold">جودة عالية</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-accent" size={20} />
                    <span className="font-semibold">التزام بالمواعيد</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-accent" size={20} />
                    <span className="font-semibold">معايير دولية</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <img
                src="https://private-us-east-1.manuscdn.com/sessionFile/gW9czFGtDkWjYC4eyP25fJ/sandbox/VM529Pfd8OrVHbzX5rcTFX-img-2_1770232460000_na1fn_aXBhYy1hYm91dC12aXNpb24.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZ1c5Y3pGR3REa1dqWUM0ZXlQMjVmSi9zYW5kYm94L1ZNNTI5UGZkOE9yVkhielg1cmNURlgtaW1nLTJfMTc3MDIzMjQ2MDAwMF9uYTFmbl9hWEJoWXkxaFltOTFkQzEyYVhOcGIyNC5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=v-yK9hWLoF5a7iDD5ShcwY8Bzw-aMJBNvBEjFmZfBWsN9jY3d39aWuLnnVW~HupX2tPtksyL8p89gVY90Lss1LbfTnAT70lUHZqvmOInBCj9FBEN1DFw5S0q69h7U6tgwAisGwTvkzaytdHlYBh1VqD9pj1-wr7bLjH4WQy0AXBV9RNCEeNTkQ7xgj29AvF7uNqY9um4Nyiz6~9bpKZCC2PPQhIcsvHD6pw7WviqzeI-DnsqXv4j31PtxnZ-SwkuD8m00kJid9KXURl9Pamlfor0CBJb-sWnhCD4nmyBfPzCrBNuAnkjxO3i9NBQ0cU657mcFPGzXG39lG8C66uzyg__"
                alt="IPAC Vision"
                className="rounded-lg shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">خدماتنا</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              نقدم مجموعة شاملة من الخدمات الإنشائية بأعلى معايير الجودة والاحترافية
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="border-2 hover:border-accent transition-all duration-300 hover:shadow-xl group"
              >
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-primary">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2 opacity-70">{service.titleEn}</p>
                  <p className="text-sm leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary gold-line inline-block">
              مشاريعنا المميزة
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-8">
              نفخر بإنجاز مشاريع متنوعة تعكس خبرتنا وتميزنا في قطاع الإنشاءات
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="overflow-hidden group hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-sm opacity-90">{project.location}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">ابدأ مشروعك معنا</h2>
            <p className="text-xl mb-8 opacity-90">
              نحن هنا لتحويل أفكارك إلى واقع ملموس. تواصل معنا اليوم للحصول على استشارة مجانية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-lg"
                asChild
              >
                <a href="mailto:info@ipac-co.com">
                  تواصل معنا عبر البريد
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-6 text-lg"
                asChild
              >
                <a href="tel:+966">اتصل بنا الآن</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
