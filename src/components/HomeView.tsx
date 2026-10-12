import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Target,
  BookOpen,
  Camera,
  Award,
  DollarSign,
  ShieldCheck,
  ShoppingBag,
  ArrowLeft,
  CheckCircle2,
  PlayCircle,
  TrendingUp,
  Globe,
  Zap,
  Search,
  Tag
} from 'lucide-react';

export const HomeView: React.FC<{ onOpenAuth: () => void }> = ({ onOpenAuth }) => {
  const { setCurrentView, user, openSearch } = useApp();
  const [homeSearchQuery, setHomeSearchQuery] = useState('');

  const handleHomeSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openSearch(homeSearchQuery);
  };

  return (
    <div className="space-y-12 py-6">
      
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-6 pb-10">
        <div className="bg-gradient-to-l from-[#1A2B48] via-[#111C30] to-[#2A4165] rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-2xl border border-[#C5A059]/30">
          <div className="absolute -left-10 -bottom-10 w-80 h-80 border-[30px] border-white/5 rounded-full pointer-events-none" />
          <div className="absolute right-10 top-10 w-40 h-40 bg-[#C5A059]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#C5A059] font-black text-xs sm:text-sm shadow-sm">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <span>الأكاديمية العربية المتكاملة لصناعة المحتوى والدخل الرقمي</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.2]">
              أكاديمية صانع المحتوى
              <span className="block text-[#C5A059] mt-2">
                "من أول فكرة إلى أول دخل"
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-100 text-base sm:text-xl leading-relaxed max-w-2xl mx-auto font-semibold opacity-95">
              منصة تفاعلية شاملة تصحبك خطوة بخطوة: تحديد مستواك، تعلم صناعة الفيديوهات الملتفتة، كتابة السيناريو بالذكاء الاصطناعي، اختيار المعدات، وفهم الجوانب القانونية والمالية.
            </p>

            <div className="text-sm text-[#C5A059] font-black bg-black/40 inline-block px-5 py-2.5 rounded-2xl border border-[#C5A059]/40 shadow-inner">
              إشراف وإدارة: <span className="text-white font-black">RAED SHIHAB – Arab Sweden Since 2007</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setCurrentView('quiz')}
                className="flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[#C5A059] hover:bg-[#D8B878] text-[#1A2B48] font-black text-sm sm:text-base shadow-xl transform hover:-translate-y-0.5 transition-all"
              >
                <span>ابدأ اختبار تحديد المستوى الآن (25 سؤالاً)</span>
                <ArrowLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => setCurrentView('stages')}
                className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-all"
              >
                <BookOpen className="w-5 h-5 text-[#C5A059]" />
                <span>تصفح المسارات الـ 12</span>
              </button>
            </div>

            {/* Prominent Search Bar Card in Hero */}
            <div className="pt-6 max-w-2xl mx-auto">
              <form onSubmit={handleHomeSearchSubmit} className="relative">
                <input
                  type="text"
                  value={homeSearchQuery}
                  onChange={(e) => setHomeSearchQuery(e.target.value)}
                  placeholder="ابحث عن درس، أسلوب مونتاج، أداة ذكاء اصطناعي، أو معدات..."
                  className="w-full bg-white text-slate-900 placeholder-slate-400 font-bold text-sm sm:text-base pr-12 pl-28 py-4 rounded-2xl border-2 border-[#C5A059] focus:outline-none focus:ring-4 focus:ring-[#C5A059]/40 shadow-2xl"
                />
                <Search className="w-6 h-6 text-[#1A2B48] absolute right-4 top-1/2 -translate-y-1/2" />
                <button
                  type="submit"
                  className="absolute left-2 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-[#1A2B48] hover:bg-[#2A4165] text-[#C5A059] font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <span>بحث</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </form>

              {/* Quick Search Chips */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-3 text-xs">
                <span className="text-slate-300 font-bold flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>الأكثر بحثاً:</span>
                </span>
                <button
                  onClick={() => openSearch('CapCut')}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-[#C5A059] hover:text-[#1A2B48] text-slate-200 font-bold transition-all border border-white/15"
                >
                  🎬 CapCut
                </button>
                <button
                  onClick={() => openSearch('سيناريو')}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-[#C5A059] hover:text-[#1A2B48] text-slate-200 font-bold transition-all border border-white/15"
                >
                  🤖 سيناريو AI
                </button>
                <button
                  onClick={() => openSearch('مايك')}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-[#C5A059] hover:text-[#1A2B48] text-slate-200 font-bold transition-all border border-white/15"
                >
                  🎤 مايك للبودكاست
                </button>
                <button
                  onClick={() => openSearch('ضرائب')}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-[#C5A059] hover:text-[#1A2B48] text-slate-200 font-bold transition-all border border-white/15"
                >
                  💰 ضرائب السويد
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Counter Bar */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm text-center">
          <div className="space-y-1 border-r border-slate-100 last:border-none">
            <span className="text-3xl font-black text-[#1A2B48]">12</span>
            <p className="text-xs text-slate-500 font-bold">مرحلة متكاملة</p>
          </div>
          <div className="space-y-1 border-r border-slate-100 last:border-none">
            <span className="text-3xl font-black text-[#1A2B48]">36+</span>
            <p className="text-xs text-slate-500 font-bold">درساً وحالة تطبيقية</p>
          </div>
          <div className="space-y-1 border-r border-slate-100 last:border-none">
            <span className="text-3xl font-black text-[#C5A059]">8</span>
            <p className="text-xs text-slate-500 font-bold">أدوات ذكاء اصطناعي</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl font-black text-[#C5A059]">100%</span>
            <p className="text-xs text-slate-500 font-bold">تفاعلي وحفظ تلقائي</p>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-[#1A2B48]">
            ماذا توفر لك أركان الأكاديمية؟
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto">
            منظومة عمل موحدة توفر لك كل ما يحتاجه صانع المحتوى في مكان واحد.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Feature 1: Assessment */}
          <div
            onClick={() => setCurrentView('quiz')}
            className="bg-white border-2 border-slate-200 rounded-3xl p-6 space-y-4 hover:border-[#C5A059] transition-all cursor-pointer group shadow-sm hover:shadow-md"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#1A2B48] flex items-center justify-center text-[#C5A059] group-hover:scale-105 transition-transform">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-[#1A2B48]">اختبار تحديد المستوى (25 سؤالاً)</h3>
            <p className="text-sm text-slate-700 font-medium leading-relaxed">
              تقييم دقيق لمهاراتك في التصوير، المونتاج، خوارزميات المنصات، وبناء الجمهور مع خطة عمل 30 يوماً شخصية.
            </p>
            <span className="inline-flex items-center gap-1.5 text-sm font-black text-[#C5A059] group-hover:translate-x-[-4px] transition-transform">
              <span>ابدأ الاختبار الان</span>
              <ArrowLeft className="w-4 h-4" />
            </span>
          </div>

          {/* Feature 2: 12 Curriculum Stages */}
          <div
            onClick={() => setCurrentView('stages')}
            className="bg-white border-2 border-slate-200 rounded-3xl p-6 space-y-4 hover:border-[#C5A059] transition-all cursor-pointer group shadow-sm hover:shadow-md"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#1A2B48] flex items-center justify-center text-[#C5A059] group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-[#1A2B48]">المسار التعليمي الشامل (12 مرحلة)</h3>
            <p className="text-sm text-slate-700 font-medium leading-relaxed">
              دروس فيديو، سيناريوهات حقيقية، اختبارات تقييمية، ومهام عملية مع فتح متسلسل للمراحل عند النجاح.
            </p>
            <span className="inline-flex items-center gap-1.5 text-sm font-black text-[#C5A059] group-hover:translate-x-[-4px] transition-transform">
              <span>استكشف المراحل</span>
              <ArrowLeft className="w-4 h-4" />
            </span>
          </div>

          {/* Feature 3: AI Studio */}
          <div
            onClick={() => setCurrentView('ai-studio')}
            className="bg-white border-2 border-slate-200 rounded-3xl p-6 space-y-4 hover:border-[#C5A059] transition-all cursor-pointer group shadow-sm hover:shadow-md"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#1A2B48] flex items-center justify-center text-[#C5A059] group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-[#1A2B48]">استوديو الذكاء الاصطناعي (Gemini)</h3>
            <p className="text-sm text-slate-700 font-medium leading-relaxed">
              صانع الهوكات الخاطفة، السيناريو الكامل، أفكار المحتوى، العناوين الجذابة، وتقويم منشورات 30 يوماً.
            </p>
            <span className="inline-flex items-center gap-1.5 text-sm font-black text-[#C5A059] group-hover:translate-x-[-4px] transition-transform">
              <span>تجربة أدوات AI</span>
              <ArrowLeft className="w-4 h-4" />
            </span>
          </div>

          {/* Feature 4: Income Calculator */}
          <div
            onClick={() => setCurrentView('income')}
            className="bg-white border-2 border-slate-200 rounded-3xl p-6 space-y-4 hover:border-[#C5A059] transition-all cursor-pointer group shadow-sm hover:shadow-md"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#1A2B48] flex items-center justify-center text-[#C5A059] group-hover:scale-105 transition-transform">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-[#1A2B48]">حاسبة أرباح صناع المحتوى</h3>
            <p className="text-sm text-slate-700 font-medium leading-relaxed">
              احسب دخلك المتوقع من الإعلانات والرعايات والخدمات الرقمية مع تقدير اقتطاع الضرائب والمصاريف.
            </p>
            <span className="inline-flex items-center gap-1.5 text-sm font-black text-[#C5A059] group-hover:translate-x-[-4px] transition-transform">
              <span>احسب أرباحك</span>
              <ArrowLeft className="w-4 h-4" />
            </span>
          </div>

          {/* Feature 5: Gear & Software */}
          <div
            onClick={() => setCurrentView('equipment')}
            className="bg-white border-2 border-slate-200 rounded-3xl p-6 space-y-4 hover:border-[#C5A059] transition-all cursor-pointer group shadow-sm hover:shadow-md"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#1A2B48] flex items-center justify-center text-[#C5A059] group-hover:scale-105 transition-transform">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-[#1A2B48]">دليل المعدات والتطبيقات</h3>
            <p className="text-sm text-slate-700 font-medium leading-relaxed">
              مقارنات دقيقة للهواتف، المايكات، الإضاءة، وبرامج المونتاج الموصى بها حسب ميزانيتك ومستواك.
            </p>
            <span className="inline-flex items-center gap-1.5 text-sm font-black text-[#C5A059] group-hover:translate-x-[-4px] transition-transform">
              <span>تصفح المعدات</span>
              <ArrowLeft className="w-4 h-4" />
            </span>
          </div>

          {/* Feature 6: Legal & Tax */}
          <div
            onClick={() => setCurrentView('legal')}
            className="bg-white border-2 border-slate-200 rounded-3xl p-6 space-y-4 hover:border-[#C5A059] transition-all cursor-pointer group shadow-sm hover:shadow-md"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#1A2B48] flex items-center justify-center text-[#C5A059] group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-[#1A2B48]">الجانب القانوني والضريبي</h3>
            <p className="text-sm text-slate-700 font-medium leading-relaxed">
              توجيهات تأسيس عملك في السويد والعالم العربي، التعامل مع Skatteverket، والملكية الفكرية.
            </p>
            <span className="inline-flex items-center gap-1.5 text-sm font-black text-[#C5A059] group-hover:translate-x-[-4px] transition-transform">
              <span>اقرأ الدليل القانوني</span>
              <ArrowLeft className="w-4 h-4" />
            </span>
          </div>

        </div>
      </section>

      {/* Founder Message Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-[#1A2B48] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-[#C5A059]/40 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-[#C5A059] bg-[#111C30] py-6 px-4 rounded-2xl border border-[#C5A059]/40 shadow-lg">
                دورة صناعة المحتوى
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-black text-[#1A2B48] bg-[#C5A059] px-3.5 py-1.5 rounded-lg shadow-sm">
                كلمة المؤسس
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                "صناعة المحتوى ليست حظاً، بل مهارة متكاملة ومنظومة يمكنك احترافها"
              </h3>
              <p className="text-slate-100 text-base sm:text-lg leading-relaxed font-medium">
                أنشأت هذه الأكاديمية لنقل تجربة حقيقية امتدت لسنوات في السويد والعالم العربي. الهدف هو تمكين كل صانع محتوى طموح من تحويل شغفه وفكره إلى مصدر دخل كريم ومستدام عبر اتباع خطوات واضحة وقانونية ومجربة.
              </p>
              <button
                onClick={() => setCurrentView('quiz')}
                className="px-8 py-3.5 rounded-xl bg-[#C5A059] hover:bg-[#D8B878] text-[#1A2B48] font-black text-sm sm:text-base shadow-xl transform hover:-translate-y-0.5 transition-all"
              >
                ابدأ رحلتك معي اليوم
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
