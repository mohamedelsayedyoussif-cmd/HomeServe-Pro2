
import React, { useState, useEffect } from 'react';
import { 
  Menu, X, CheckCircle, Star, ShieldCheck, 
  Clock, CreditCard, ChevronDown, Phone,
  ArrowRight, Download, Users, Briefcase,
  Wrench, Hammer, Zap, Home, Facebook, Linkedin, Mail, MapPin, Globe, ArrowLeft, Link as LinkIcon
} from 'lucide-react';
import { SERVICES, REVIEWS, FAQS, COLORS } from './constants';
import FloatingIcon from './components/FloatingIcon';
import { translations } from './translations';

type Language = 'ar' | 'en';
type View = 'home' | 'terms' | 'privacy';

// Custom Hook for Reveal Animation
function useScrollReveal() {
  const [revealed, setRevealed] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (id: string) => revealed[id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10';
}

// Smooth Scroll Helper
const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
  if (e) e.preventDefault();
  const section = document.getElementById(id);
  if (section) {
    const headerOffset = 100; 
    const elementPosition = section.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

const LegalPage: React.FC<{ type: 'terms' | 'privacy', lang: Language, onBack: () => void, setView: (v: View) => void }> = ({ type, lang, onBack, setView }) => {
  const t = translations[lang].legal;
  const content = type === 'terms' ? t.terms : t.privacy;
  const title = type === 'terms' ? t.termsTitle : t.privacyTitle;
  const intro = type === 'terms' ? t.termsIntro : t.privacyIntro;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-blue-600 font-bold mb-8 hover:translate-x-[-4px] transition-transform"
        >
          {lang === 'ar' ? <ArrowRight className="w-5 h-5 rotate-180" /> : <ArrowLeft className="w-5 h-5" />}
          {t.backToHome}
        </button>
        
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">{title}</h1>
          <p className="text-slate-500 font-bold mb-2">{t.lastUpdated}</p>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">{intro}</p>
        </header>

        {/* Quick Navigation Panel */}
        <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 mb-16">
          <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-blue-600" />
            {t.quickNav}
          </h3>
          <div className="flex flex-wrap gap-3">
            {content.map((item) => (
              <button 
                key={item.id}
                onClick={(e) => scrollToSection(e as any, item.id)}
                className="px-4 py-2 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-xl text-sm font-bold transition-all text-slate-700"
              >
                {item.h}
              </button>
            ))}
            {type === 'terms' && (
              <button 
                onClick={() => setView('privacy')}
                className="px-4 py-2 bg-orange-50 text-orange-600 hover:bg-orange-600 hover:text-white rounded-xl text-sm font-bold transition-all border border-orange-100"
              >
                {t.privacyTitle}
              </button>
            )}
          </div>
        </div>

        <div className="space-y-16">
          {content.map((item) => (
            <div key={item.id} id={item.id} className="scroll-mt-24 bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-6 flex items-center gap-3">
                <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
                {item.h}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-wrap">{item.p}</p>
              
              {/* Contextual links inside Terms */}
              {type === 'terms' && item.id === 'privacy-link' && (
                <button 
                  onClick={() => setView('privacy')}
                  className="mt-6 inline-flex items-center gap-2 text-orange-500 font-black hover:underline"
                >
                  {t.privacyTitle}
                  <ArrowRight className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                </button>
              )}
            </div>
          ))}
        </div>

        <footer className="mt-20 pt-12 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
           <button 
            onClick={onBack}
            className="px-8 py-3 bg-blue-600 text-white font-black rounded-2xl shadow-lg hover:bg-blue-700 transition-all hover:scale-105"
           >
             {t.backToHome}
           </button>
           <div className="flex gap-4">
              <a href="mailto:el3arif.m@gmail.com" className="text-slate-500 font-bold hover:text-slate-900 transition-colors">Contact Us</a>
              <span className="text-slate-300">|</span>
              <a href="tel:+201033776986" className="text-slate-500 font-bold hover:text-slate-900 transition-colors">Emergency Call</a>
           </div>
        </footer>
      </div>
    </div>
  );
};

const Navbar: React.FC<{ lang: Language, toggleLang: () => void, currentView: View, setView: (v: View) => void }> = ({ lang, toggleLang, currentView, setView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (currentView !== 'home') {
      e.preventDefault();
      setView('home');
      // Delay scrolling to allow view switch
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) {
          const headerOffset = 85; 
          const elementPosition = section.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
    } else {
      scrollToSection(e, id);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || currentView !== 'home' ? 'glass py-3 shadow-lg' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button onClick={() => setView('home')} className="flex items-center gap-2 group">
              <div className="bg-blue-600 p-2 rounded-lg shadow-blue-500/20 shadow-lg group-hover:scale-110 transition-transform">
                <Home className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-black text-blue-900 tracking-tight">HomeServe<span className="text-orange-500">Pro</span></span>
            </button>
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-bold text-slate-700">
            <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="hover:text-blue-600 transition-colors">{t.services}</a>
            <a href="#how-it-works" onClick={(e) => handleNavClick(e, 'how-it-works')} className="hover:text-blue-600 transition-colors">{t.howItWorks}</a>
            <a href="#reviews" onClick={(e) => handleNavClick(e, 'reviews')} className="hover:text-blue-600 transition-colors">{t.reviews}</a>
            <button 
              onClick={toggleLang} 
              className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-lg hover:bg-slate-200 transition-all font-black text-sm"
            >
              <Globe className="w-4 h-4" />
              {t.lang}
            </button>
            <a href="#download" onClick={(e) => handleNavClick(e, 'download')} className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30">
              {t.download}
            </a>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleLang} className="p-2 bg-slate-100 rounded-lg font-bold text-xs">{t.lang}</button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden glass absolute top-full left-0 w-full p-4 border-t shadow-xl animate-fade-in-down">
          <div className="flex flex-col gap-4 text-center font-bold">
            <a href="#services" onClick={(e) => { closeMenu(); handleNavClick(e, 'services'); }} className="py-2 text-slate-800">{t.services}</a>
            <a href="#how-it-works" onClick={(e) => { closeMenu(); handleNavClick(e, 'how-it-works'); }} className="py-2 text-slate-800">{t.howItWorks}</a>
            <a href="#reviews" onClick={(e) => { closeMenu(); handleNavClick(e, 'reviews'); }} className="py-2 text-slate-800">{t.reviews}</a>
            <a href="#download" onClick={(e) => { closeMenu(); handleNavClick(e, 'download'); }} className="bg-blue-600 text-white py-3 rounded-xl mx-4">{t.download}</a>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero: React.FC<{ lang: Language }> = ({ lang }) => {
  const getRevealClass = useScrollReveal();
  const t = translations[lang].hero;
  
  return (
    <section id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <FloatingIcon icon={<Wrench className="w-24 h-24" />} className="top-20 left-10" delay="5s" />
      <FloatingIcon icon={<Zap className="w-16 h-16" />} className="bottom-20 right-10" delay="7s" />
      <FloatingIcon icon={<Star className="w-12 h-12 text-yellow-400" />} className="top-40 right-1/4" delay="9s" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className={`reveal transition-all duration-700 ${getRevealClass('hero-badge')}`} id="hero-badge">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-sm font-bold border border-blue-100">
                <ShieldCheck className="w-4 h-4" />
                <span>{t.badge}</span>
              </div>
            </div>

            <h1 
              id="hero-title"
              className={`reveal text-5xl lg:text-7xl font-black text-slate-900 leading-[1.2] transition-all duration-1000 delay-100 ${getRevealClass('hero-title')}`}
            >
              {t.title} <br />
              <span className="text-blue-600">{t.titleAccent}</span>
            </h1>

            <p 
              id="hero-subtitle"
              className={`reveal text-xl text-slate-600 leading-relaxed max-w-lg transition-all duration-1000 delay-300 ${getRevealClass('hero-subtitle')}`}
            >
              {t.subtitle}
            </p>

            <div className={`reveal transition-all duration-1000 delay-500 ${getRevealClass('hero-ctas')}`} id="hero-ctas">
              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl text-lg font-black transition-all shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95">
                  {t.ctaPrimary}
                  <ArrowRight className={`w-5 h-5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                </a>
                <a href="#download" onClick={(e) => scrollToSection(e, 'download')} className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 px-8 py-4 rounded-2xl text-lg font-bold transition-all shadow-lg flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95">
                  {t.ctaSecondary}
                  <Download className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="relative group perspective">
             <div className="relative z-10 transition-transform duration-700 group-hover:rotate-y-12">
               <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 relative">
                 <img 
                    src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop" 
                    className="w-full h-full object-cover aspect-[4/3]" 
                    alt="Clean Home"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
               </div>
             </div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-400/10 blur-[100px] -z-10 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicesSection: React.FC<{ lang: Language }> = ({ lang }) => {
  const getRevealClass = useScrollReveal();
  const t = translations[lang].services;
  
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className={`reveal text-center mb-16 transition-all duration-1000 ${getRevealClass('services-header')}`} id="services-header">
          <h2 className="text-4xl font-black text-slate-900 mb-4">{t.title}</h2>
          <p className="text-lg text-slate-600">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <div 
              key={service.id} 
              className={`reveal glass p-8 rounded-3xl border border-slate-100 transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 group ${getRevealClass(`service-${idx}`)}`}
              id={`service-${idx}`}
            >
              <div 
                className="bg-blue-50 text-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500"
                style={{ animation: `float ${4 + (idx % 3) * 1.5}s ease-in-out infinite` }}
              >
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{lang === 'ar' ? service.title : service.id.toUpperCase()}</h3>
              <p className="text-slate-500 mb-6 leading-relaxed">{lang === 'ar' ? service.description : `Professional ${service.id} services for your home.`}</p>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs text-slate-400 block font-bold">{t.priceFrom}</span>
                  <span className="text-xl font-black text-blue-600">{service.priceStart} {t.currency}</span>
                </div>
                <a 
                  href={`https://wa.me/201033776986?text=${encodeURIComponent(lang === 'ar' ? `أريد حجز خدمة ${service.title}` : `I want to book ${service.id} service`)}`} 
                  target="_blank" 
                  className="text-orange-500 font-bold hover:underline group-hover:translate-x-1 transition-transform inline-block"
                >
                  {t.bookNow}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LocationAndSocial: React.FC<{ lang: Language }> = ({ lang }) => {
  const getRevealClass = useScrollReveal();
  const t = translations[lang].contact;

  return (
    <section id="contact" className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className={`reveal transition-all duration-1000 ${getRevealClass('map-section')}`} id="map-section">
            <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <MapPin className="text-orange-500" />
              {t.findUs}
            </h2>
            <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white h-[400px] group relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3451.23456789!2d31.2357!3d30.0444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840c67cdba7d5%3A0x1234567890abcdef!2z2KfZhNmC2KfZh9ix2KnYjCDZhdit2KfZgdi42Kkg2KfZhNmC2KfZh9ix2KnYjCDZhdit2KfZgdi42Kkg2YXYtdix!5e0!3m2!1sen!2seg!4v1700000000000!5m2!1sen!2seg"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="transition-transform duration-500 group-hover:scale-110"
              ></iframe>
            </div>
          </div>
          
          <div className={`reveal transition-all duration-1000 ${getRevealClass('social-section')}`} id="social-section">
            <h2 className="text-3xl font-black text-slate-900 mb-8">{t.connect}</h2>
            <div className="glass p-8 rounded-3xl space-y-8 shadow-2xl border border-white/40">
               <div className="flex items-center gap-6">
                 <div className="relative">
                    <img 
                      src="https://picsum.photos/seed/founder/150/150" 
                      className="w-24 h-24 rounded-2xl object-cover shadow-lg border-2 border-white"
                      alt="Mohamed Elsayed Yousef" 
                    />
                    <div className="absolute -bottom-2 -right-2 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
                 </div>
                 <div>
                   <h3 className="text-2xl font-black text-blue-900">Mohamed Elsayed Yousef</h3>
                   <p className="text-slate-500 font-bold">Founder & CEO</p>
                 </div>
               </div>
               
               <div className="grid sm:grid-cols-2 gap-4">
                 <a href="https://sa.linkedin.com/in/mohamed-elsayed-yousef-4a2ba81ab" target="_blank" className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-100 group">
                   <div className="bg-[#0077b5] p-2 rounded-lg group-hover:scale-110 transition-transform text-white shadow-sm"><Linkedin className="w-5 h-5" /></div>
                   <span className="font-bold text-slate-700">LinkedIn</span>
                 </a>
                 <a href="https://web.facebook.com/mhmdalsydyusf/?_rdc=1&_rdr#" target="_blank" className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-100 group">
                   <div className="bg-[#1877f2] p-2 rounded-lg group-hover:scale-110 transition-transform text-white shadow-sm"><Facebook className="w-5 h-5" /></div>
                   <span className="font-bold text-slate-700">Facebook</span>
                 </a>
                 <a href="tel:+201033776986" className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-100 group">
                   <div className="bg-[#25d366] p-2 rounded-lg group-hover:scale-110 transition-transform text-white shadow-sm"><Phone className="w-5 h-5" /></div>
                   <span className="font-bold text-slate-700" dir="ltr">+20 103 377 6986</span>
                 </a>
                 <a href="mailto:el3arif.m@gmail.com" className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-100 group">
                   <div className="bg-slate-700 p-2 rounded-lg group-hover:scale-110 transition-transform text-white shadow-sm"><Mail className="w-5 h-5" /></div>
                   <span className="font-bold text-slate-700 text-sm overflow-hidden text-ellipsis">el3arif.m@gmail.com</span>
                 </a>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials: React.FC<{ lang: Language }> = ({ lang }) => {
  const getRevealClass = useScrollReveal();
  const t = translations[lang].reviews;
  
  return (
    <section id="reviews" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className={`reveal text-center mb-16 transition-all duration-1000 ${getRevealClass('reviews-header')}`} id="reviews-header">
          <h2 className="text-4xl font-black text-slate-900 mb-4">{t.title}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {REVIEWS.map((review, idx) => (
            <div 
              key={review.id} 
              className={`reveal glass p-8 rounded-3xl border border-white transition-all duration-700 hover:shadow-xl ${getRevealClass(`review-${idx}`)}`}
              id={`review-${idx}`}
            >
              <div className="flex gap-1 mb-4 text-orange-500">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-slate-600 mb-6 italic leading-relaxed">
                "{lang === 'ar' ? review.content : 'Excellent service and very professional team.'}"
              </p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900">{lang === 'ar' ? review.author : `Customer ${idx + 1}`}</span>
                <span className="text-sm text-slate-400 font-bold">{lang === 'ar' ? review.date : 'Recently'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ: React.FC<{ lang: Language }> = ({ lang }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const t = translations[lang].faq;
  
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-4xl font-black text-center mb-16">{t.title}</h2>
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className={`w-full p-6 flex justify-between items-center bg-white hover:bg-slate-50 transition-colors ${lang === 'ar' ? 'text-right' : 'text-left'}`}
              >
                <span className="text-lg font-bold text-slate-800">{lang === 'ar' ? faq.question : `FAQ Question ${idx + 1}?`}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openIndex === idx ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === idx && (
                <div className="p-6 pt-0 bg-white border-t border-slate-50 animate-fade-in-down">
                  <p className="text-slate-600 leading-relaxed">
                    {lang === 'ar' ? faq.answer : 'We guarantee the highest quality of work with certified professionals and a 30-day warranty.'}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC<{ lang: Language, setView: (v: View) => void }> = ({ lang, setView }) => {
  const t = translations[lang].contact;
  return (
    <footer id="download" className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <button onClick={() => { setView('home'); window.scrollTo(0, 0); }} className="flex items-center gap-2">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Home className="text-white w-6 h-6" />
                </div>
                <span className="text-2xl font-black text-white tracking-tight">HomeServe<span className="text-orange-500">Pro</span></span>
              </button>
            </div>
            <p className="text-lg leading-relaxed max-w-sm mb-6">{t.footerDesc}</p>
          </div>
          
          <div>
            <h4 className="text-white font-black text-xl mb-6">{t.links}</h4>
            <ul className="space-y-4 font-bold text-sm">
              <li><button onClick={() => { setView('home'); setTimeout(() => scrollToSection({ preventDefault: () => {} } as any, 'services'), 100); }} className="hover:text-blue-400 transition-colors">Services</button></li>
              <li><button onClick={() => { setView('home'); setTimeout(() => scrollToSection({ preventDefault: () => {} } as any, 'how-it-works'), 100); }} className="hover:text-blue-400 transition-colors">How it Works</button></li>
              <li><button onClick={() => setView('terms')} className="hover:text-blue-400 transition-colors">{translations[lang].legal.termsTitle}</button></li>
              <li><button onClick={() => setView('privacy')} className="hover:text-blue-400 transition-colors">{translations[lang].legal.privacyTitle}</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-xl mb-6">{t.app}</h4>
            <div className="space-y-3">
              <a href="https://apps.apple.com" target="_blank" className="w-full bg-white text-slate-900 py-3 rounded-xl font-black flex items-center justify-center gap-2 transform hover:scale-105 transition-transform shadow-md">
                <Download className="w-5 h-5" /> App Store
              </a>
              <a href="https://play.google.com" target="_blank" className="w-full bg-blue-600 text-white py-3 rounded-xl font-black flex items-center justify-center gap-2 transform hover:scale-105 transition-transform shadow-md">
                <Download className="w-5 h-5" /> Google Play
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-bold">
          <p>© {new Date().getFullYear()} HomeServe Pro. {t.rights}</p>
          <div className="flex gap-8">
            <button onClick={() => setView('terms')} className="hover:text-white transition-colors">Terms</button>
            <button onClick={() => setView('privacy')} className="hover:text-white transition-colors">Privacy</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ar');
  const [view, setView] = useState<View>('home');
  const toggleLang = () => setLang(prev => prev === 'ar' ? 'en' : 'ar');

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className={`min-h-screen ${lang === 'en' ? 'font-sans' : ''}`}>
      <Navbar lang={lang} toggleLang={toggleLang} currentView={view} setView={setView} />
      
      {view === 'home' ? (
        <>
          <Hero lang={lang} />
          <ServicesSection lang={lang} />
          <div className="py-24 gradient-bg">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-4xl font-black text-slate-900 text-center mb-16">{translations[lang].value.title}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {translations[lang].value.features.map((f, i) => (
                  <div key={i} className="glass p-8 rounded-3xl border border-white/50 shadow-xl">
                    <h4 className="text-xl font-bold mb-2 text-blue-600">{f.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <section id="how-it-works" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-4xl font-black text-center mb-16">{translations[lang].how.title}</h2>
              <div className="grid md:grid-cols-3 gap-12">
                {translations[lang].how.steps.map((s, i) => (
                  <div key={i} className="text-center group">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-6 group-hover:scale-110 transition-transform">
                      {i + 1}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                    <p className="text-slate-500">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <Testimonials lang={lang} />
          <FAQ lang={lang} />
          <LocationAndSocial lang={lang} />
        </>
      ) : (
        <LegalPage 
          type={view === 'terms' ? 'terms' : 'privacy'} 
          lang={lang} 
          onBack={() => setView('home')} 
          setView={setView}
        />
      )}
      
      {/* Sticky Call Buttons */}
      <div className="fixed bottom-6 right-6 left-6 md:left-auto md:w-auto z-40 flex flex-col md:flex-row gap-3">
        <a 
          href="tel:+201033776986" 
          className="bg-blue-600 text-white p-4 md:px-6 rounded-2xl md:rounded-full font-black shadow-2xl flex items-center justify-center gap-3 text-lg hover:scale-105 active:scale-95 transition-all group"
        >
          <div className="bg-blue-500 p-2 rounded-full group-hover:animate-shake">
            <Phone className="w-5 h-5 fill-current" />
          </div>
          <span className="md:inline">{lang === 'ar' ? 'اتصل بنا' : 'Call Us'}</span>
        </a>

        <a 
          href="https://wa.me/201033776986?text=مرحبا، أحتاج مساعدة فنية من HomeServe Pro" 
          target="_blank"
          className="bg-green-500 text-white p-4 rounded-2xl md:rounded-full font-black shadow-2xl flex items-center justify-center gap-3 text-lg hover:scale-105 active:scale-95 transition-all"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
      </div>

      <Footer lang={lang} setView={setView} />
    </div>
  );
};

export default App;
