import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { assessmentQuestions } from '../data/mockData';
import { CheckCircle2, ArrowRight, ArrowLeft, RotateCcw, Sparkles } from 'lucide-react';

export const PlacementQuizModal: React.FC = () => {
  const {
    quizAnswers,
    setQuizAnswer,
    calculateAssessmentResult,
    setCurrentView,
    resetQuiz
  } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);

  const currentQ = assessmentQuestions[currentIndex];
  const totalQuestions = assessmentQuestions.length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  const selectedOptionScore = quizAnswers[currentQ.id];

  const handleSelectOption = (score: number) => {
    setQuizAnswer(currentQ.id, score);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Calculate final result and go to results view
      calculateAssessmentResult();
      setCurrentView('quiz-results');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className="text-center mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>اختبار تحديد المستوى الشامل (25 سؤالاً)</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-100">
          اكتشف مستواك، المنصة الأنسب، وخطة عملك الـ 30 يوماً
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          أجب بدقة وشفافية لتوليد تحليل شخصي متكامل يحدد نقاط قوتك، المهارات المطلوبة، والمسار التعليمي المقترح.
        </p>
      </div>

      {/* Progress Bar Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 shadow-xl">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
          <span>السؤال {currentIndex + 1} من {totalQuestions} ({currentQ.category})</span>
          <span className="text-amber-400 font-extrabold">{progressPercent}% مكتمل</span>
        </div>
        <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800">
          <div
            className="bg-gradient-to-r from-amber-500 to-amber-400 h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-slate-900/90 border border-amber-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">
            {currentQ.category}
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-100 mt-3 leading-relaxed">
            {currentQ.question}
          </h3>
        </div>

        {/* Options List */}
        <div className="space-y-3.5 mb-10">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOptionScore === opt.score;
            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(opt.score)}
                className={`w-full flex items-start justify-between p-4 sm:p-5 rounded-2xl border text-right transition-all transform hover:-translate-y-0.5 ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow-lg shadow-amber-500/10 font-bold'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${
                    isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {idx + 1}
                  </span>
                  <span className="text-sm sm:text-base leading-relaxed">{opt.label}</span>
                </div>
                {isSelected && <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />}
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-6">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all ${
              currentIndex === 0
                ? 'opacity-30 cursor-not-allowed text-slate-600'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <ArrowRight className="w-4 h-4" />
            <span>السؤال السابق</span>
          </button>

          <button
            onClick={() => {
              resetQuiz();
              setCurrentIndex(0);
            }}
            className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة الاختبار</span>
          </button>

          <button
            onClick={handleNext}
            disabled={selectedOptionScore === undefined}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold shadow-lg transition-all ${
              selectedOptionScore !== undefined
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/20 transform hover:-translate-y-0.5'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>{currentIndex === totalQuestions - 1 ? 'عرض نتيجتي الشخصية' : 'السؤال التالي'}</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
