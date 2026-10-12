import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import raedProfile from '../assets/raed-profile.jpg';
import {
  Sparkles,
  BookOpen,
  Camera,
  ShoppingBag,
  User,
  LogOut,
  Moon,
  Sun,
  ShieldCheck,
  Award,
  Sliders,
  DollarSign,
  Compass,
  Menu,
  X,
  Search,
  Globe,
  Type,
  MessagesSquare
} from 'lucide-react';

export const Navbar: React.FC<{ onOpenAuth: () => void }> = ({ onOpenAuth }) => {
  const {
    user,
    logout,
    theme,
    toggleTheme,
    language,
    setLanguage,
    fontSize,
    setFontSize,
    increaseFontSize,
    decreaseFontSize,
    currentView,
    setCurrentView,
    openSearch,
    cart
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { id: 'home', label: 'الرئيسية', icon: Compass },
    { id: 'quiz', label: 'اختبار المستوى', icon: TargetIcon },
    { id: 'stages', label: 'المسارات الـ 12', icon: BookOpen },
    { id: 'community', label: 'مجتمع الصنّاع', icon: MessagesSquare, badge: 'جديد' },
    { id: 'ai-studio', label: 'استوديو الذكاء الاصطناعي', icon: Sparkles, badge: 'AI' },
    { id: 'equipment', label: 'دليل المعدات', icon: Camera },
    { id: 'creators', label: 'صناع المحتوى', icon: Award },
    { id: 'income', label: 'حاسبة الدخل', icon: DollarSign },
    { id: 'legal', label: 'الجانب القانوني', icon: ShieldCheck },
    { id: 'store', label: 'المتجر والخدمات', icon: ShoppingBag, badgeCount: cartCount },
  ];

  function TargetIcon(props: any) {
    return (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="6"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    );
  }

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/95 border-b border-slate-200 text-slate-800 shadow-sm transition-colors">
      
      {/* Top Accessibility & Font Size Bar */}
      <div className="bg-[#1A2B48] text-white py-2 px-4 sm:px-6 lg:px-8 border-b border-[#C5A059]/30 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          {/* Font Size Selector Controls */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#C5A059] flex items-center gap-1.5">
              <Type className="w-4 h-4 text-[#C5A059]" />
              <span>التحكم بحجم الخط:</span>
            </span>

            <div className="flex items-center gap-1 bg-white/10 rounded-lg p-0.5 border border-white/20">
              <button
                onClick={decreaseFontSize}
                className="px-2 py-0.5 rounded text-xs font-black text-slate-200 hover:text-white hover:bg-white/20 transition-all"
                title="تصغير الخط (A-)"
              >
                A-
              </button>

              <button
                onClick={() => setFontSize('normal')}
                className={`px-2.5 py-0.5 rounded text-xs font-bold transition-all ${
                  fontSize === 'normal'
                    ? 'bg-[#C5A059] text-[#1A2B48] font-black shadow-sm'
                    : 'text-slate-200 hover:bg-white/10'
                }`}
              >
                عادي
              </button>

              <button
                onClick={() => setFontSize('large')}
                className={`px-2.5 py-0.5 rounded text-xs font-bold transition-all ${
                  fontSize === 'large'
                    ? 'bg-[#C5A059] text-[#1A2B48] font-black shadow-sm'
                    : 'text-slate-200 hover:bg-white/10'
                }`}
              >
                كبير
              </button>

              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2.5 py-0.5 rounded text-xs font-bold transition-all ${
                  fontSize === 'xlarge'
                    ? 'bg-[#C5A059] text-[#1A2B48] font-black shadow-sm'
                    : 'text-slate-200 hover:bg-white/10'
                }`}
              >
                كبير جداً
              </button>

              <button
                onClick={() => setFontSize('huge')}
                className={`px-2.5 py-0.5 rounded text-xs font-bold transition-all ${
                  fontSize === 'huge'
                    ? 'bg-[#C5A059] text-[#1A2B48] font-black shadow-sm'
                    : 'text-slate-200 hover:bg-white/10'
                }`}
              >
                ضخم
              </button>

              <button
                onClick={increaseFontSize}
                className="px-2 py-0.5 rounded text-xs font-black text-[#C5A059] hover:text-white hover:bg-white/20 transition-all"
                title="تكبير الخط (A+)"
              >
                A+
              </button>
            </div>
          </div>

          {/* Quick Info / Language */}
          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-[11px] text-slate-300">
              وضوح تام وتصميم متجاوب لجميع الشاشات والهواتف
            </span>
            <button
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[#C5A059] font-bold text-xs transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'العربية' : 'English'}</span>
            </button>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Info */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('home')}>
            <div className="w-12 h-12 rounded-2xl bg-[#1A2B48] flex items-center justify-center text-[#C5A059] font-black text-2xl shadow-md border border-[#C5A059]/40">
              أ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-xl sm:text-2xl text-[#1A2B48] tracking-tight">
                  أكاديمية صانع المحتوى
                </h1>
              </div>
              <p className="text-xs text-[#C5A059] font-bold">
                "من أول فكرة إلى أول دخل" • <span className="text-slate-500 font-medium">إشراف RAED SHIHAB</span>
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#1A2B48] text-[#C5A059] shadow-sm'
                      : 'text-slate-600 hover:text-[#1A2B48] hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[9px] bg-[#C5A059] text-[#1A2B48] font-extrabold rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {item.badgeCount && item.badgeCount > 0 ? (
                    <span className="px-1.5 py-0.2 text-[10px] bg-red-600 text-white font-bold rounded-full">
                      {item.badgeCount}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>

          {/* Actions & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Input Trigger */}
            <button
              onClick={() => openSearch()}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border-2 border-slate-200 hover:border-[#C5A059] text-slate-800 text-xs font-bold transition-all shadow-sm group"
              title="البحث عن دروس أو مواضيع"
            >
              <Search className="w-4 h-4 text-[#C5A059] group-hover:scale-110 transition-transform" />
              <span className="hidden lg:inline text-slate-600 font-medium">ابحث عن دروس أو مواضيع...</span>
              <span className="lg:hidden text-slate-800 font-bold">بحث</span>
            </button>

            {/* Language Selector */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <Globe className="w-4 h-4 text-[#1A2B48]" />
                <span>{language === 'ar' ? 'العربية' : 'English'}</span>
              </button>
            </div>

            {/* User Profile or Login Button */}
            {user.isGuest ? (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A2B48] hover:bg-[#2A4165] text-[#C5A059] font-bold text-xs shadow-md transition-all transform hover:-translate-y-0.5"
              >
                <User className="w-4 h-4 text-[#C5A059]" />
                <span>تسجيل الدخول</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 hover:border-[#C5A059] transition-all"
                >
                  <img
                    src={raedProfile}
                    alt={user.name}
                    className="w-8 h-8 rounded-lg object-cover shadow-sm"
                  />
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-bold text-[#1A2B48]">{user.name}</p>
                    <p className="text-[10px] text-[#C5A059] font-bold">{user.points} نقطة</p>
                  </div>
                </button>

                {user.role === 'admin' && (
                  <button
                    onClick={() => setCurrentView('admin')}
                    className="p-2 rounded-xl bg-[#1A2B48]/10 border border-[#1A2B48]/20 text-[#1A2B48] hover:bg-[#1A2B48] hover:text-[#C5A059] text-xs font-bold transition-all"
                    title="لوحة الإدارة"
                  >
                    <Sliders className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={logout}
                  className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 hover:text-red-600 transition-colors"
                  title="تسجيل الخروج"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-[#1A2B48]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 shadow-lg animate-in slide-in-from-top duration-200">
          
          {/* Mobile Search Button */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openSearch();
            }}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#1A2B48] text-white border-2 border-[#C5A059] font-bold text-sm shadow-md"
          >
            <span className="flex items-center gap-2">
              <Search className="w-5 h-5 text-[#C5A059]" />
              <span>البحث الشامل عن دروس ومواضيع</span>
            </span>
            <span className="text-xs text-[#C5A059] font-black bg-white/10 px-2.5 py-1 rounded-lg">
              بحث
            </span>
          </button>

          {/* Mobile Font Size Control Bar */}
          <div className="p-3 bg-slate-100 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#1A2B48]">
              <span className="flex items-center gap-1.5">
                <Type className="w-4 h-4 text-[#C5A059]" />
                <span>حجم الخط والوضوح:</span>
              </span>
              <span className="text-[11px] text-[#C5A059] font-black">
                {fontSize === 'normal' && 'عادي (16px)'}
                {fontSize === 'large' && 'كبير (18px)'}
                {fontSize === 'xlarge' && 'كبير جداً (20px)'}
                {fontSize === 'huge' && 'ضخم (22px)'}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1">
              <button
                onClick={() => setFontSize('normal')}
                className={`py-1.5 rounded-xl text-xs font-bold ${
                  fontSize === 'normal' ? 'bg-[#1A2B48] text-[#C5A059]' : 'bg-white text-slate-700'
                }`}
              >
                عادي
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`py-1.5 rounded-xl text-xs font-bold ${
                  fontSize === 'large' ? 'bg-[#1A2B48] text-[#C5A059]' : 'bg-white text-slate-700'
                }`}
              >
                كبير
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`py-1.5 rounded-xl text-xs font-bold ${
                  fontSize === 'xlarge' ? 'bg-[#1A2B48] text-[#C5A059]' : 'bg-white text-slate-700'
                }`}
              >
                كبير جداً
              </button>
              <button
                onClick={() => setFontSize('huge')}
                className={`py-1.5 rounded-xl text-xs font-bold ${
                  fontSize === 'huge' ? 'bg-[#1A2B48] text-[#C5A059]' : 'bg-white text-slate-700'
                }`}
              >
                ضخم
              </button>
            </div>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-right font-bold transition-all ${
                  isActive
                    ? 'bg-[#1A2B48] text-[#C5A059]'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-[#C5A059]" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs bg-[#C5A059] text-[#1A2B48] font-bold rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
