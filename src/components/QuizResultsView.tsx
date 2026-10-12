import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Award,
  CheckCircle2,
  TrendingUp,
  Tv,
  Camera,
  Calendar,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Share2
} from 'lucide-react';

export const QuizResultsView: React.FC = () => {
  const { assessmentResult, setCurrentView, resetQuiz, user } = useApp();

  if (!assessmentResult) {
    return (
      <div className="text-center py-20 space-y-4">
        <h3 className="text-xl font-bold text-slate-300">لم تقم بإجراء الاختبار بعد</h3>
        <button
          onClick={() => setCurrentView('quiz')}
          className="px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold"
        >
          ابدأ الاختبار الآن
        </button>
      </div>
    );
  }

  const {
    levelTitle,
    scorePercentage,
    strengths,
    areasToImprove,
    recommendedPlatform,
    suggestedNiche,
    equipmentNeeds,
    actionPlan30Days
  } = assessmentResult;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner Result Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 border border-amber-500/30 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs mb-4">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>تم تحليل إجاباتك بنجاح بذكاء الأكاديمية</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-slate-100 mb-2">
          مستواك الحالي: <span className="text-amber-400">{levelTitle}</span>
        </h2>
        <p className="text-slate-300 text-base max-w-xl mx-auto mb-6">
          نسبة التقييم العام الشاملة: <span className="text-amber-400 font-black text-xl">{scorePercentage}%</span> • مرحباً بك {user.name} في بداية انطلاقتك نحو الاحتراف.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => setCurrentView('stages')}
            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-base shadow-xl shadow-amber-500/25 transform hover:-translate-y-1 transition-all"
          >
            <span>ابدأ مساري التعليمي المخصص</span>
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              resetQuiz();
              setCurrentView('quiz');
            }}
            className="flex items-center gap-2 px-5 py-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-300 hover:text-amber-400 font-bold text-sm transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>إعادة الاختبار</span>
          </button>
        </div>
      </div>

      {/* Grid Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Strengths Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-100">نقاط القوة لديك</h3>
              <p className="text-xs text-slate-400">المهارات والركائز التي تمتلكها حالياً</p>
            </div>
          </div>
          <ul className="space-y-3">
            {strengths.map((st, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{st}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas To Improve Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-100">مهارات تحتاج إلى تطوير</h3>
              <p className="text-xs text-slate-400">النقاط التي سنركز عليها في دروسك</p>
            </div>
          </div>
          <ul className="space-y-3">
            {areasToImprove.map((area, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-slate-200">
                <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0" />
                <span>{area}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Platform & Equipment Recommendation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Recommended Platform */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Tv className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-100">المنصة الأنسب لك</h3>
              <p className="text-xs text-slate-400">بناء على أهدافك والوقت المتاح</p>
            </div>
          </div>
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 font-extrabold text-sm rounded-lg border border-blue-500/30">
              {recommendedPlatform.name}
            </span>
            <p className="text-sm text-slate-300 leading-relaxed pt-1">
              {recommendedPlatform.reason}
            </p>
            <div className="pt-2 text-xs text-slate-400">
              <span className="font-bold text-slate-200">نوع المحتوى المقترح: </span>
              {suggestedNiche}
            </div>
          </div>
        </div>

        {/* Recommended Equipment */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-100">المعدات المطلوبة للبدء</h3>
              <p className="text-xs text-slate-400">موصى بها لميزانيتك الحالية</p>
            </div>
          </div>
          <ul className="space-y-2.5">
            {equipmentNeeds.map((eq, idx) => (
              <li key={idx} className="flex items-center justify-between text-sm text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <span>{eq}</span>
                <span className="text-xs text-amber-400 font-bold">موصى به</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* 30-Day Action Plan Timeline */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-xl text-slate-100">خطة عملك الشخصية لمدة 30 يوماً</h3>
            <p className="text-xs text-slate-400">خطوات متسلسلة للتحول من الفكرة إلى أول نشر وتفاعل</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {actionPlan30Days.map((item, idx) => (
            <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 hover:border-amber-500/40 transition-all">
              <span className="inline-block text-xs font-black text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                اليوم {item.day}
              </span>
              <p className="text-sm font-semibold text-slate-200 leading-relaxed">
                {item.task}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
