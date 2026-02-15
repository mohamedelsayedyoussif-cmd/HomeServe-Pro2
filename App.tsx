
import React, { useState, useEffect } from 'react';
import { 
  Menu, X, CheckCircle, Star, ShieldCheck, 
  Clock, CreditCard, ChevronDown, Phone,
  ArrowRight, Download, Users, Briefcase,
  Wrench, Hammer, Zap, Home, Facebook, Linkedin, Mail, MapPin, Globe, ArrowLeft,
  Droplets, Paintbrush, Eraser, Wind, Target, Award, HeartHandshake, ZapIcon
} from 'lucide-react';
import { translations } from './translations';
import FloatingIcon from './components/FloatingIcon';

type Language = 'ar' | 'en';
type View = 'home' | 'terms' | 'privacy';

const ICON_MAP: Record<string, React.ReactNode> = {
  plumbing: <Droplets className="w-8 h-8" />,
  electricity: <Zap className="w-8 h-8" />,
  ac: <Wind className="w-8 h-8" />,
  cleaning: <Eraser className="w-8 h-8" />,
  painting: <Paintbrush className="w-8 h-8" />,
  carpentry: <Hammer className="w-8 h-8" />,
};

const VALUE_ICON_MAP: React.ReactNode[] = [
  <ShieldCheck className="w-10 h-10" />,
  <Target className="w-10 h-10" />,
  <Clock className="w-10 h-10" />,
  <Award className="w-10 h-10" />,
];

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

const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
  if (e) e.preventDefault();
  const section = document.getElementById(id);
  if (section) {
    const headerOffset = 80; 
    const elementPosition = section.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

const Navbar: React.FC<{ lang: Language, toggleLang: () => void, currentView: View, setView: (v: View) => void }> = ({ lang, toggleLang, currentView, setView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || currentView !== 'home' || isOpen ? 'glass py-3 shadow-lg' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => { setView('home'); window.scrollTo({top: 0, behavior: 'smooth'}); }} 
            className="flex items-center gap-2 group shrink-0"
            aria-label="HomeServe Pro Logo"
          >
            <div className="bg-primary p-2 rounded-lg shadow-lg group-hover:scale-110 transition-transform">
              <Home className="text-white w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-xl sm:text-2xl font-black text-blue-900">HomeServe<span className="text-secondary">Pro</span></span>
          </button>
          
          <div className="hidden lg:flex items-center gap-8 font-bold text-slate-700">
            <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-primary transition-colors">{t.services}</a>
            <a href="#reviews" onClick={(e) => scrollToSection(e, 'reviews')} className="hover:text-primary transition-colors">{t.reviews}</a>
            <button onClick={toggleLang} className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-lg hover:bg-slate-200 transition-all font-black text-sm">
              <Globe className="w-4 h-4" /> {t.lang}
            </button>
            <a href="#download" onClick={(e) => scrollToSection(e, 'download')} className="bg-primary text-white px-6 py-2.5 rounded-full hover:bg-primary-dark transition-all shadow-lg hover:shadow-primary/30">
              {t.download}
            </a>
          </div>

          <div className="lg:hidden flex items-center gap-3">
            <button onClick={toggleLang} className="p-2 bg-slate-100 rounded-lg font-bold text-xs" aria-label="Toggle Language">{t.lang}</button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-800" aria-label="Toggle Menu">
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 top-[60px] bg-white z-40 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : (lang === 'ar' ? 'translate-x-full' : '-translate-x-full')}`}>
        <div className="flex flex-col h-full p-6 space-y-6 overflow-y-auto">
          <a href="#services" onClick={(e) => { closeMenu(); scrollToSection(e, 'services'); }} className="text-2xl font-black text-slate-800 border-b border-slate-100 pb-4">{t.services}</a>
          <a href="#reviews" onClick={(e) => { closeMenu(); scrollToSection(e, 'reviews'); }} className="text-2xl font-black text-slate-800 border-b border-slate-100 pb-4">{t.reviews}</a>
          <div className="pt-4 space-y-4">
            <a href="#download" onClick={(e) => { closeMenu(); scrollToSection(e, 'download'); }} className="block w-full bg-primary text-white py-4 rounded-2xl text-center font-black text-xl shadow-lg">
              {t.download}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero: React.FC<{ lang: Language }> = ({ lang }) => {
  const getRevealClass = useScrollReveal();
  const t = translations[lang].hero;
  
  return (
    <section id="hero" className="relative pt-24 pb-12 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
      {/* Decorative Floating Icons */}
      <FloatingIcon icon={<Wrench className="w-12 h-12" />} className="top-20 left-10 hidden lg:block" delay="7s" />
      <FloatingIcon icon={<Zap className="w-16 h-16" />} className="bottom-40 left-20 hidden lg:block" delay="5s" />
      <FloatingIcon icon={<Hammer className="w-10 h-10" />} className="top-40 right-1/2 hidden lg:block" delay="8s" />
      <FloatingIcon icon={<Droplets className="w-14 h-14" />} className="bottom-20 right-1/3 hidden lg:block" delay="6s" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:items-center">
          <div className="text-center lg:text-right space-y-6">
            <div className={`reveal transition-all duration-700 ${getRevealClass('hero-badge')}`} id="hero-badge">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-primary px-4 py-1.5 rounded-full text-sm font-bold border border-blue-100">
                <ShieldCheck className="w-4 h-4" />
                <span>{t.badge}</span>
              </div>
            </div>

            <h1 id="hero-title" className={`reveal text-4xl xs:text-5xl lg:text-7xl font-black text-slate-900 leading-[1.2] transition-all duration-1000 delay-100 ${getRevealClass('hero-title')}`}>
              {t.title} <br />
              <span className="text-primary">{t.titleAccent}</span>
            </h1>

            <p id="hero-subtitle" className={`reveal text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 transition-all duration-1000 delay-300 ${getRevealClass('hero-subtitle')}`}>
              {t.subtitle}
            </p>

            <div className={`reveal flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start transition-all duration-1000 delay-500 ${getRevealClass('hero-ctas')}`} id="hero-ctas">
              <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="w-full sm:w-auto bg-secondary hover:bg-secondary-dark text-white px-8 py-4 rounded-2xl text-lg font-black transition-all shadow-xl shadow-secondary/20 flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95">
                {t.ctaPrimary}
                <ArrowRight className={`w-5 h-5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
              </a>
              <a href="#download" onClick={(e) => scrollToSection(e, 'download')} className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 px-8 py-4 rounded-2xl text-lg font-bold transition-all shadow-lg flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95">
                {t.ctaSecondary}
                <Download className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="relative mt-12 lg:mt-0 px-4 xs:px-10 lg:px-0">
             <div className="relative z-10 transition-transform duration-700 hover:scale-[1.02]">
               <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative aspect-[4/3]">
                 <img 
                    src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop" 
                    className="w-full h-full object-cover" 
                    alt="Professional Home Service"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
               </div>
               <div className="absolute -bottom-6 -right-2 xs:right-4 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3">
                  <div className="flex -space-x-3 rtl:space-x-reverse">
                    {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/40?img=${i+10}`} className="w-10 h-10 rounded-full border-2 border-white" alt="User" />)}
                  </div>
                  <div>
                    <div className="flex text-yellow-400"><Star className="w-3 h-3 fill-current" /> <Star className="w-3 h-3 fill-current" /> <Star className="w-3 h-3 fill-current" /></div>
                    <p className="text-[10px] font-black text-slate-400">{lang === 'ar' ? '٢٠ ألف+ عميل سعيد' : '20K+ Happy Customers'}</p>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const WhyUsSection: React.FC<{ lang: Language }> = ({ lang }) => {
  const getRevealClass = useScrollReveal();
  const t = translations[lang].value;
  
  return (
    <section id="why-us" className="py-20 lg:py-32 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className={`reveal text-center mb-16 lg:mb-20 transition-all duration-1000 ${getRevealClass('why-us-header')}`} id="why-us-header">
          <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-6">{t.title}</h2>
          <div className="w-24 h-1.5 bg-secondary mx-auto rounded-full mb-8"></div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.features.map((feature, idx) => (
            <div 
              key={idx} 
              className={`reveal group p-8 bg-white rounded-[40px] shadow-xl shadow-slate-200/50 border border-white transition-all duration-700 hover:shadow-2xl hover:bg-primary hover:-translate-y-3 ${getRevealClass(`why-${idx}`)}`}
              id={`why-${idx}`}
            >
              <div className="mb-8 text-secondary group-hover:text-white group-hover:scale-110 transition-all duration-500">
                {VALUE_ICON_MAP[idx]}
              </div>
              <h3 className="text-2xl font-black mb-4 text-slate-900 group-hover:text-white transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-500 group-hover:text-blue-100 transition-colors leading-relaxed font-bold">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

const ServicesSection: React.FC<{ lang: Language }> = ({ lang }) => {
  const getRevealClass = useScrollReveal();
  const t = translations[lang].services;
  
  return (
    <section id="services" className="py-20 lg:py-24 bg-white relative overflow-hidden">
      {/* Decorative Floating Background Icons */}
      <FloatingIcon icon={<Paintbrush className="w-10 h-10" />} className="top-1/4 left-10 opacity-20" delay="9s" />
      <FloatingIcon icon={<Wind className="w-12 h-12" />} className="bottom-1/4 right-10 opacity-20" delay="11s" />
      <FloatingIcon icon={<ZapIcon className="w-8 h-8" />} className="top-10 right-1/4 opacity-20" delay="6s" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className={`reveal text-center mb-12 lg:mb-16 transition-all duration-1000 ${getRevealClass('services-header')}`} id="services-header">
          <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">{t.title}</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {t.items.map((service, idx) => (
            <div 
              key={service.id} 
              className={`reveal glass p-6 lg:p-8 rounded-3xl border border-slate-100 transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 group ${getRevealClass(`service-${idx}`)}`}
              id={`service-${idx}`}
            >
              <div className="bg-blue-50 text-primary w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500 relative overflow-hidden">
                <FloatingIcon 
                  icon={ICON_MAP[service.id]} 
                  className="!text-current !opacity-100 !static !z-10 flex items-center justify-center transform-none"
                  delay={`${5 + idx}s`}
                />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-slate-500 mb-6 text-sm lg:text-base leading-relaxed">{service.desc}</p>
              <div className="flex justify-between items-center mt-auto">
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">{t.priceFrom}</span>
                  <span className="text-lg lg:text-xl font-black text-primary">{service.price} {t.currency}</span>
                </div>
                <a 
                  href={`https://wa.me/201033776986?text=${encodeURIComponent(lang === 'ar' ? `أريد حجز خدمة ${service.title}` : `I want to book ${service.title} service`)}`} 
                  target="_blank" 
                  aria-label={`Book ${service.title}`}
                  className="bg-slate-50 text-secondary px-4 py-2 rounded-xl font-bold hover:bg-secondary hover:text-white transition-all"
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

const Testimonials: React.FC<{ lang: Language }> = ({ lang }) => {
  const getRevealClass = useScrollReveal();
  const t = translations[lang].reviews;
  
  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className={`reveal text-3xl lg:text-4xl font-black text-slate-900 text-center mb-12 transition-all duration-1000 ${getRevealClass('reviews-title')}`} id="reviews-title">
          {t.title}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.items.map((review, idx) => (
            <div 
              key={review.id} 
              className={`reveal bg-slate-50 p-6 lg:p-8 rounded-3xl border border-white shadow-sm transition-all duration-700 hover:shadow-xl ${getRevealClass(`review-${idx}`)}`}
              id={`review-${idx}`}
            >
              <div className="flex gap-1 mb-4 text-secondary">
                {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-slate-600 mb-6 italic text-sm lg:text-base leading-relaxed">"{review.content}"</p>
              <div className="flex justify-between items-center border-t border-slate-200 pt-4">
                <span className="font-bold text-slate-900">{review.author}</span>
                <span className="text-xs text-slate-400 font-bold">{review.date}</span>
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
    <section id="contact" className="py-20 lg:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className={`reveal transition-all duration-1000 ${getRevealClass('map-section')}`} id="map-section">
            <h2 className="text-2xl lg:text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <MapPin className="text-secondary" /> {t.findUs}
            </h2>
            <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white h-[300px] lg:h-[400px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3451.23456789!2d31.2357!3d30.0444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840c67cdba7d5%3A0x1234567890abcdef!2z2KfZhNmC2KfZh9ix2KnYjCDZhdit2KfZgdi42Kkg2KfZhNmC2KfZh9ix2KnYjCDZhdit2KfZgdi42Kkg2YXYtdix!5e0!3m2!1sen!2seg!4v1700000000000!5m2!1sen!2seg"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Office Location"
              ></iframe>
            </div>
          </div>
          
          <div className={`reveal space-y-8 transition-all duration-1000 ${getRevealClass('social-section')}`} id="social-section">
            <h2 className="text-2xl lg:text-3xl font-black text-slate-900 mb-8">{t.connect}</h2>
            <div className="bg-slate-50 p-6 lg:p-8 rounded-3xl space-y-6">
               <div className="flex items-center gap-4">
                 <img src="https://picsum.photos/seed/founder/100/100" className="w-16 h-16 rounded-2xl object-cover shadow-lg border-2 border-white" alt="Founder" />
                 <div>
                   <h3 className="text-xl font-black text-blue-900">Mohamed Elsayed Yousef</h3>
                   <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Founder & CEO</p>
                 </div>
               </div>
               
               <div className="grid xs:grid-cols-2 gap-3">
                 <a href="https://sa.linkedin.com/in/mohamed-elsayed-yousef-4a2ba81ab" target="_blank" className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all group">
                   <div className="bg-[#0077b5] p-2 rounded-lg text-white"><Linkedin className="w-4 h-4" /></div>
                   <span className="font-bold text-slate-700 text-sm">LinkedIn</span>
                 </a>
                 <a href="https://web.facebook.com/mhmdalsydyusf/?_rdc=1&_rdr#" target="_blank" className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all group">
                   <div className="bg-[#1877f2] p-2 rounded-lg text-white"><Facebook className="w-4 h-4" /></div>
                   <span className="font-bold text-slate-700 text-sm">Facebook</span>
                 </a>
                 <a href="tel:+201033776986" className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all group">
                   <div className="bg-[#25d366] p-2 rounded-lg text-white"><Phone className="w-4 h-4" /></div>
                   <span className="font-bold text-slate-700 text-sm" dir="ltr">+20 103 377 6986</span>
                 </a>
                 <a href="mailto:el3arif.m@gmail.com" className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all group overflow-hidden">
                   <div className="bg-slate-700 p-2 rounded-lg text-white"><Mail className="w-4 h-4" /></div>
                   <span className="font-bold text-slate-700 text-xs truncate">Email Us</span>
                 </a>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC<{ lang: Language, setView: (v: View) => void }> = ({ lang, setView }) => {
  const t = translations[lang].contact;
  const navT = translations[lang].nav;
  const legalT = translations[lang].legal;
  
  return (
    <footer id="download" className="bg-slate-900 text-slate-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="sm:col-span-2 space-y-6 text-center sm:text-right">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <div className="bg-primary p-2 rounded-lg"><Home className="text-white w-6 h-6" /></div>
              <span className="text-2xl font-black text-white">HomeServe<span className="text-secondary">Pro</span></span>
            </div>
            <p className="text-base leading-relaxed max-w-sm mx-auto sm:mx-0">{t.footerDesc}</p>
          </div>
          
          <div className="text-center sm:text-right">
            <h4 className="text-white font-black text-lg mb-6">{t.links}</h4>
            <ul className="space-y-3 font-bold text-sm">
              <li><button onClick={() => { setView('home'); setTimeout(() => scrollToSection({ preventDefault: () => {} } as any, 'services'), 100); }} className="hover:text-white transition-colors">{navT.services}</button></li>
              <li><button onClick={() => setView('terms')} className="hover:text-white transition-colors">{legalT.termsTitle}</button></li>
              <li><button onClick={() => setView('privacy')} className="hover:text-white transition-colors">{legalT.privacyTitle}</button></li>
            </ul>
          </div>

          <div className="text-center sm:text-right">
            <h4 className="text-white font-black text-lg mb-6">{t.app}</h4>
            <div className="flex flex-col gap-3">
              <a href="#" className="bg-white text-slate-900 px-6 py-3 rounded-xl font-black flex items-center justify-center gap-2 text-sm">
                <Download className="w-4 h-4" /> App Store
              </a>
              <a href="#" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-black flex items-center justify-center gap-2 text-sm">
                <Download className="w-4 h-4" /> Google Play
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] lg:text-xs font-bold uppercase tracking-widest text-slate-500">
          <p>© {new Date().getFullYear()} HomeServe Pro. {t.rights}</p>
          <p>Handcrafted for Excellence in Egypt</p>
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
    <div className={`min-h-screen bg-white ${lang === 'en' ? 'font-sans' : 'font-cairo'}`}>
      <Navbar lang={lang} toggleLang={toggleLang} currentView={view} setView={setView} />
      
      {view === 'home' ? (
        <main>
          <Hero lang={lang} />
          <ServicesSection lang={lang} />
          <WhyUsSection lang={lang} />
          <Testimonials lang={lang} />
          <FAQ lang={lang} />
          <LocationAndSocial lang={lang} />
        </main>
      ) : (
        <LegalPage 
          type={view === 'terms' ? 'terms' : 'privacy'} 
          lang={lang} 
          onBack={() => { setView('home'); window.scrollTo(0, 0); }} 
        />
      )}
      
      <div className="fixed bottom-6 right-6 left-6 lg:left-auto lg:w-auto z-40 flex flex-col sm:flex-row gap-3">
        <a 
          href="tel:+201033776986" 
          aria-label="Call for Emergency"
          className="bg-primary text-white p-4 sm:px-8 rounded-2xl font-black shadow-2xl flex items-center justify-center gap-3 text-lg hover:scale-105 active:scale-95 transition-all"
        >
          <Phone className="w-5 h-5 fill-current" />
          <span>{lang === 'ar' ? 'اطلب طوارئ' : 'Emergency Call'}</span>
        </a>
        <a 
          href="https://wa.me/201033776986" 
          target="_blank"
          aria-label="WhatsApp Support"
          className="bg-green-500 text-white p-4 rounded-2xl font-black shadow-2xl flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
      </div>

      <Footer lang={lang} setView={setView} />
    </div>
  );
};

const LegalPage: React.FC<{ type: 'terms' | 'privacy', lang: Language, onBack: () => void }> = ({ type, lang, onBack }) => {
  const t = translations[lang].legal;
  const content = type === 'terms' ? t.terms : t.privacy;
  
  return (
    <div className="pt-24 pb-16 bg-slate-50 min-h-screen px-4">
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-primary font-bold mb-8 transition-transform hover:-translate-x-1 rtl:hover:translate-x-1">
          <ArrowLeft className={`w-5 h-5 ${lang === 'ar' ? 'rotate-180' : ''}`} /> {t.backToHome}
        </button>
        <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-lg border border-slate-100">
          <h1 className="text-3xl sm:text-4xl font-black mb-6">{type === 'terms' ? t.termsTitle : t.privacyTitle}</h1>
          <div className="space-y-8">
            {content.map((item) => (
              <div key={item.id} className="space-y-3">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-primary rounded-full"></div> {item.h}
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{item.p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQ: React.FC<{ lang: Language }> = ({ lang }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const t = translations[lang].faq;
  
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-black text-center mb-12">{t.title}</h2>
        <div className="space-y-4">
          {t.items.map((faq, idx) => (
            <div key={idx} className="border border-slate-100 rounded-2xl overflow-hidden">
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full p-5 flex justify-between items-center bg-white hover:bg-slate-50 transition-colors text-right"
              >
                <span className="text-base sm:text-lg font-bold text-slate-800">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openIndex === idx ? 'rotate-180' : ''}`} />
              </button>
              <div className={`transition-all duration-300 ${openIndex === idx ? 'max-h-[500px] p-5 opacity-100' : 'max-h-0 p-0 opacity-0'} overflow-hidden bg-slate-50 text-slate-600 text-sm sm:text-base`}>
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default App;
