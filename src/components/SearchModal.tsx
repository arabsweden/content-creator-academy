import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { softwareApps } from '../data/mockData';
import {
  Search,
  X,
  BookOpen,
  Sparkles,
  Camera,
  Cpu,
  DollarSign,
  ShieldCheck,
  Target,
  ArrowLeft,
  ChevronLeft,
  Tag,
  ShoppingBag,
  Users
} from 'lucide-react';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    closeSearch,
    searchQuery,
    setSearchQuery,
    stages,
    equipment,
    setCurrentView,
    setSelectedStageId,
    setSelectedLessonId
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'lessons' | 'software' | 'equipment' | 'sections'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isSearchOpen]);

  // Handle ESC key to close search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  if (!isSearchOpen) return null;

  const trimmedQuery = searchQuery.trim().toLowerCase();

  // Search in Lessons & Stages
  const matchedLessons: {
    lessonId: string;
    stageId: number;
    stageTitle: string;
    title: string;
    summary: string;
    duration: number;
  }[] = [];

  stages.forEach((stage) => {
    stage.lessons.forEach((lesson) => {
      if (
        !trimmedQuery ||
        lesson.title.toLowerCase().includes(trimmedQuery) ||
        lesson.summary.toLowerCase().includes(trimmedQuery) ||
        stage.title.toLowerCase().includes(trimmedQuery) ||
        lesson.contentMarkdown.toLowerCase().includes(trimmedQuery)
      ) {
        matchedLessons.push({
          lessonId: lesson.id,
          stageId: stage.id,
          stageTitle: stage.title,
          title: lesson.title,
          summary: lesson.summary,
          duration: lesson.durationMinutes,
        });
      }
    });
  });

  // Search in Software & AI tools
  const matchedSoftware = softwareApps.filter((app) => {
    if (!trimmedQuery) return true;
    return (
      app.name.toLowerCase().includes(trimmedQuery) ||
      app.description.toLowerCase().includes(trimmedQuery) ||
      app.category.toLowerCase().includes(trimmedQuery) ||
      app.keyFeatures.some((f) => f.toLowerCase().includes(trimmedQuery))
    );
  });

  // Search in Equipment
  const matchedEquipment = equipment.filter((item) => {
    if (!trimmedQuery) return true;
    return (
      item.name.toLowerCase().includes(trimmedQuery) ||
      item.category.toLowerCase().includes(trimmedQuery) ||
      item.specs.some((s) => s.toLowerCase().includes(trimmedQuery)) ||
      item.pros.some((p) => p.toLowerCase().includes(trimmedQuery))
    );
  });

  // Search in Main Platform Sections
  const platformSections = [
    {
      id: 'quiz',
      title: 'اختبار تحديد المستوى (25 سؤالاً)',
      desc: 'تقييم مهاراتك وخطة عمل 30 يوماً شخصية',
      icon: Target,
      keywords: ['اختبار', 'تقييم', 'مستوى', 'خطة', 'اسئلة', '25', 'نواقص', 'تحديد'],
    },
    {
      id: 'ai-studio',
      title: 'استوديو الذكاء الاصطناعي (Gemini)',
      desc: 'صنع الهوكات والسيناريو وأفكار المحتوى بذكاء الاصطناعي',
      icon: Sparkles,
      keywords: ['ذكاء', 'اصطناعي', 'ai', 'gemini', 'سيناريو', 'هوك', 'hook', 'عنوان', 'بوست', 'افكار'],
    },
    {
      id: 'income',
      title: 'حاسبة أرباح صناع المحتوى',
      desc: 'حساب الدخل المتوقع والضرائب من يوتيوب، تيك توك والرعايات',
      icon: DollarSign,
      keywords: ['ارباح', 'أرباح', 'حاسبة', 'دخل', 'مال', 'دولار', 'رعاية', 'اعلان', 'ضرائب'],
    },
    {
      id: 'legal',
      title: 'المركز القانوني والضرائب (Skatteverket)',
      desc: 'قوانين تأسيس العمل في السويد والعالم العربي والضرائب',
      icon: ShieldCheck,
      keywords: ['قانون', 'ضرائب', 'سويد', 'skatteverket', 'تأسيس', 'شركة', 'عقد', 'حقوق'],
    },
    {
      id: 'equipment',
      title: 'دليل المعدات والكاميرات والمايكات',
      desc: 'أفضل الكاميرات والمايكات والإضاءات للميزانيات المختلفة',
      icon: Camera,
      keywords: ['معدات', 'كاميرا', 'مايك', 'إضاءة', 'صوت', 'استوديو', 'ستوديو', 'ايفون'],
    },
    {
      id: 'software',
      title: 'دليل برامج وتطبيقات المونتاج',
      desc: 'CapCut, Premiere Pro, DaVinci, Canva والتطبيقات المساعدة',
      icon: Cpu,
      keywords: ['مونتاج', 'برامج', 'تطبيقات', 'capcut', 'premiere', 'davinci', 'canva'],
    },
    {
      id: 'creators',
      title: 'مكتبة ونماذج صناع المحتوى',
      desc: 'قنوات ملهمة ودراسات حالة لصناع محتوى ناجحين',
      icon: Users,
      keywords: ['صناع', 'مكتبة', 'نماذج', 'قنوات', 'الهام', 'رواد'],
    },
    {
      id: 'store',
      title: 'المتجر الرقمي والقوالب',
      desc: 'قوالب جاهزة، أكواد خصم، ومستلزمات صانع المحتوى',
      icon: ShoppingBag,
      keywords: ['متجر', 'قوالب', 'منتجات', 'شراء', 'تطبيقات', 'قالب'],
    },
  ];

  const matchedSections = platformSections.filter((sec) => {
    if (!trimmedQuery) return true;
    return (
      sec.title.toLowerCase().includes(trimmedQuery) ||
      sec.desc.toLowerCase().includes(trimmedQuery) ||
      sec.keywords.some((k) => k.toLowerCase().includes(trimmedQuery))
    );
  });

  const totalResultsCount =
    matchedLessons.length +
    matchedSoftware.length +
    matchedEquipment.length +
    matchedSections.length;

  const handleSelectLesson = (stageId: number, lessonId: string) => {
    setSelectedStageId(stageId);
    setSelectedLessonId(lessonId);
    setCurrentView('stages');
    closeSearch();
  };

  const handleSelectSection = (viewId: string) => {
    setCurrentView(viewId);
    closeSearch();
  };

  const quickTags = [
    '🎬 مونتاج CapCut',
    '🤖 سيناريو بالذكاء الاصطناعي',
    '🎤 أفضل مايك للبودكاست',
    '💰 حساب الأرباح والضرائب',
    '📌 خطاف الفيديو (Hook)',
    '🎯 اختبار تحديد المستوى',
    '📜 تأسيس شركة بالسويد',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-start justify-center p-3 sm:p-6 md:p-10 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border-2 border-[#C5A059]/40 overflow-hidden flex flex-col max-h-[85vh] my-auto">
        
        {/* Search Header Bar */}
        <div className="p-4 sm:p-6 bg-[#1A2B48] text-white border-b border-[#C5A059]/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#C5A059] flex items-center gap-1.5">
              <Search className="w-4 h-4 text-[#C5A059]" />
              <span>البحث الشامل والمباشر في الأكاديمية</span>
            </span>
            <button
              onClick={closeSearch}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
              title="إغلاق (ESC)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Input Box */}
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="اكتب اسم الدرس، الموضوع، أداة المونتاج، أو المعدات..."
              className="w-full bg-white text-slate-900 placeholder-slate-400 font-bold text-base sm:text-lg pl-12 pr-12 py-3.5 sm:py-4 rounded-2xl border-2 border-[#C5A059] focus:outline-none focus:ring-4 focus:ring-[#C5A059]/30 shadow-inner"
            />
            <Search className="w-6 h-6 text-[#1A2B48] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-slate-200 text-slate-600 hover:bg-slate-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Tags Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs pt-1 no-scrollbar">
            <span className="text-slate-300 font-bold whitespace-nowrap flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>بحث سريع:</span>
            </span>
            {quickTags.map((tag) => {
              const cleanTag = tag.replace(/^[^\w\u0600-\u06FF]+/, '').trim();
              return (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(cleanTag)}
                  className="px-3 py-1 rounded-xl bg-white/10 hover:bg-[#C5A059] hover:text-[#1A2B48] text-slate-200 font-bold whitespace-nowrap transition-all border border-white/15"
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Filters & Results Count */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeTab === 'all'
                  ? 'bg-[#1A2B48] text-white font-black shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              الكل ({totalResultsCount})
            </button>
            <button
              onClick={() => setActiveTab('lessons')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeTab === 'lessons'
                  ? 'bg-[#1A2B48] text-white font-black shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              الدروس ({matchedLessons.length})
            </button>
            <button
              onClick={() => setActiveTab('software')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeTab === 'software'
                  ? 'bg-[#1A2B48] text-white font-black shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              البرامج والأدوات ({matchedSoftware.length})
            </button>
            <button
              onClick={() => setActiveTab('equipment')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeTab === 'equipment'
                  ? 'bg-[#1A2B48] text-white font-black shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              المعدات ({matchedEquipment.length})
            </button>
            <button
              onClick={() => setActiveTab('sections')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeTab === 'sections'
                  ? 'bg-[#1A2B48] text-white font-black shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              الأقسام ({matchedSections.length})
            </button>
          </div>

          <span className="text-xs text-slate-500 font-bold hidden sm:inline whitespace-nowrap">
            اضغط ESC للإغلاق
          </span>
        </div>

        {/* Results Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {totalResultsCount === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 rounded-3xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-black text-slate-800">لم نجد نتائج تطابق "{searchQuery}"</h4>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                جرب البحث بكلمات أخرى مثل "مونتاج"، "سيناريو"، "مايك"، "ضرائب"، أو اختبر "الذكاء الاصطناعي".
              </p>
            </div>
          ) : (
            <>
              {/* Category 1: Lessons */}
              {(activeTab === 'all' || activeTab === 'lessons') && matchedLessons.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <h4 className="text-sm font-black text-[#1A2B48] flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#C5A059]" />
                      <span>الدروس والمواضيع المنهجية ({matchedLessons.length})</span>
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 gap-2.5">
                    {matchedLessons.slice(0, activeTab === 'all' ? 6 : 50).map((lesson) => (
                      <div
                        key={lesson.lessonId}
                        onClick={() => handleSelectLesson(lesson.stageId, lesson.lessonId)}
                        className="bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-[#C5A059] p-4 rounded-2xl transition-all cursor-pointer group shadow-sm flex items-start justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <span className="inline-block text-[11px] font-bold text-[#C5A059] bg-[#1A2B48] px-2.5 py-0.5 rounded-lg">
                            {lesson.stageTitle}
                          </span>
                          <h5 className="font-black text-slate-900 text-base group-hover:text-[#1A2B48] transition-colors">
                            {lesson.title}
                          </h5>
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium">
                            {lesson.summary}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 self-center shrink-0">
                          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                            {lesson.duration} دقيقة
                          </span>
                          <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-[#C5A059] group-hover:-translate-x-1 transition-all" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Category 2: Platform Sections */}
              {(activeTab === 'all' || activeTab === 'sections') && matchedSections.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <h4 className="text-sm font-black text-[#1A2B48] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#C5A059]" />
                      <span>الأقسام الرئيسية والخدمات التفاعلية ({matchedSections.length})</span>
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {matchedSections.map((sec) => {
                      const IconComponent = sec.icon;
                      return (
                        <div
                          key={sec.id}
                          onClick={() => handleSelectSection(sec.id)}
                          className="bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-[#C5A059] p-4 rounded-2xl transition-all cursor-pointer group shadow-sm flex items-start gap-3"
                        >
                          <div className="w-10 h-10 rounded-xl bg-[#1A2B48] text-[#C5A059] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div className="space-y-1">
                            <h5 className="font-black text-slate-900 text-sm group-hover:text-[#1A2B48]">
                              {sec.title}
                            </h5>
                            <p className="text-xs text-slate-600 font-medium leading-relaxed">
                              {sec.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Category 3: Software & Apps */}
              {(activeTab === 'all' || activeTab === 'software') && matchedSoftware.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <h4 className="text-sm font-black text-[#1A2B48] flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-[#C5A059]" />
                      <span>برامج المونتاج والذكاء الاصطناعي ({matchedSoftware.length})</span>
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {matchedSoftware.map((app) => (
                      <div
                        key={app.id}
                        onClick={() => handleSelectSection('software')}
                        className="bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-[#C5A059] p-4 rounded-2xl transition-all cursor-pointer group shadow-sm flex items-start gap-3"
                      >
                        <div className="text-3xl shrink-0 p-1 bg-slate-100 rounded-xl">{app.icon}</div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h5 className="font-black text-slate-900 text-sm">{app.name}</h5>
                            <span className="text-[10px] font-bold text-[#C5A059] bg-[#1A2B48] px-2 py-0.5 rounded-md">
                              {app.pricing}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 line-clamp-2 font-medium">
                            {app.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Category 4: Equipment */}
              {(activeTab === 'all' || activeTab === 'equipment') && matchedEquipment.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <h4 className="text-sm font-black text-[#1A2B48] flex items-center gap-2">
                      <Camera className="w-4 h-4 text-[#C5A059]" />
                      <span>دليل المعدات والأجهزة ({matchedEquipment.length})</span>
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {matchedEquipment.map((eq) => (
                      <div
                        key={eq.id}
                        onClick={() => handleSelectSection('equipment')}
                        className="bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-[#C5A059] p-3.5 rounded-2xl transition-all cursor-pointer group shadow-sm flex items-center gap-3"
                      >
                        <img
                          src={eq.image}
                          alt={eq.name}
                          className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                        <div className="space-y-1">
                          <h5 className="font-black text-slate-900 text-sm">{eq.name}</h5>
                          <span className="text-xs font-bold text-[#C5A059] block">
                            السعر المقدر: ${eq.priceUsd}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
};
