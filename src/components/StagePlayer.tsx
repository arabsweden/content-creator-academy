import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LessonRatingSection } from './LessonRatingSection';
import {
  BookOpen,
  CheckCircle2,
  Lock,
  PlayCircle,
  FileText,
  HelpCircle,
  Upload,
  ArrowRight,
  ArrowLeft,
  Award,
  Clock,
  Sparkles,
  Star,
  Bookmark,
  BookmarkCheck
} from 'lucide-react';

export const StagePlayer: React.FC = () => {
  const {
    stages,
    selectedStageId,
    setSelectedStageId,
    selectedLessonId,
    setSelectedLessonId,
    completedLessons,
    completeLesson,
    submitQuizScore,
    submitTask,
    isStageUnlocked,
    passedQuizzes,
    getLessonRatingStats,
    toggleSaveLesson,
    isLessonSaved,
    user
  } = useApp();

  const [activeTab, setActiveTab] = useState<'content' | 'quiz' | 'task'>('content');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScoreResult, setQuizScoreResult] = useState<number | null>(null);

  // Practical Task state
  const [taskUrl, setTaskUrl] = useState('');
  const [taskNote, setTaskNote] = useState('');
  const [taskSuccess, setTaskSuccess] = useState(false);

  const currentStage = stages.find(s => s.id === (selectedStageId || 1)) || stages[0];
  const currentLesson = currentStage.lessons.find(l => l.id === selectedLessonId) || currentStage.lessons[0];

  const unlocked = isStageUnlocked(currentStage.id);
  const isLessonCompleted = completedLessons.includes(currentLesson.id);

  const handleSelectLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setActiveTab('content');
    setQuizSubmitted(false);
  };

  const handleAnswerQuizQuestion = (qId: string, optionIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIndex }));
  };

  const handleQuizSubmit = () => {
    let correct = 0;
    currentStage.quiz.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswerIndex) {
        correct++;
      }
    });
    const score = Math.round((correct / currentStage.quiz.length) * 100);
    setQuizScoreResult(score);
    setQuizSubmitted(true);
    submitQuizScore(`stage-quiz-${currentStage.id}`, score);
  };

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskUrl && !taskNote) return;
    submitTask(`task-${currentStage.id}`, taskUrl, taskNote);
    setTaskSuccess(true);
    setTimeout(() => setTaskSuccess(false), 4000);
    setTaskUrl('');
    setTaskNote('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Top Stages Selector Pills */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-100">المسارات التعليمية الـ 12</h2>
          </div>
          <span className="text-xs text-amber-400 font-bold bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
            فتح متسلسل عند إكمال الدروس
          </span>
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto pb-3 pt-1 scrollbar-none">
          {stages.map((st) => {
            const isCurrent = st.id === currentStage.id;
            const isUnlocked = isStageUnlocked(st.id);
            const isCompleted = st.lessons.every(l => completedLessons.includes(l.id));

            return (
              <button
                key={st.id}
                onClick={() => {
                  if (isUnlocked) {
                    setSelectedStageId(st.id);
                    setSelectedLessonId(st.lessons[0]?.id || null);
                    setActiveTab('content');
                  }
                }}
                disabled={!isUnlocked}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border shrink-0 text-sm font-bold transition-all ${
                  isCurrent
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20 font-black'
                    : isUnlocked
                    ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-amber-500/40 hover:text-amber-300'
                    : 'bg-slate-950 border-slate-900 text-slate-600 opacity-60 cursor-not-allowed'
                }`}
              >
                {!isUnlocked ? (
                  <Lock className="w-4 h-4 text-slate-600 shrink-0" />
                ) : isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 text-xs flex items-center justify-center shrink-0">
                    {st.id}
                  </span>
                )}
                <span>المرحلة {st.id}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Learning Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar: Lessons List for Current Stage */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
              {currentStage.levelTarget}
            </span>
            <h3 className="font-black text-lg text-slate-100 mt-2">
              {currentStage.title}
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              {currentStage.shortDesc}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              قائمة الدروس ({currentStage.lessons.length})
            </h4>

            {currentStage.lessons.map((lesson) => {
              const isSelected = lesson.id === currentLesson.id;
              const isDone = completedLessons.includes(lesson.id);

              return (
                <button
                  key={lesson.id}
                  onClick={() => handleSelectLesson(lesson.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-right transition-all ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500 text-amber-300 font-bold shadow-md'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:bg-slate-950 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    ) : (
                      <PlayCircle className={`w-5 h-5 shrink-0 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
                    )}
                    <span className="text-xs sm:text-sm line-clamp-2">{lesson.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium shrink-0">
                    {lesson.durationMinutes} دقيقة
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quiz & Task Shortcuts */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <button
              onClick={() => setActiveTab('quiz')}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl border font-bold text-xs transition-all ${
                activeTab === 'quiz'
                  ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-purple-400" />
                <span>اختبار المرحلة (70%+ للعبور)</span>
              </div>
              <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">
                {currentStage.quiz.length} أسئلة
              </span>
            </button>

            <button
              onClick={() => setActiveTab('task')}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl border font-bold text-xs transition-all ${
                activeTab === 'task'
                  ? 'bg-blue-500/20 border-blue-500 text-blue-300'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-blue-400" />
                <span>المهمة العملية للمرحلة</span>
              </div>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">
                تأكيد إنجاز
              </span>
            </button>
          </div>
        </div>

        {/* Main Content Viewer */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          
          {/* Tab Navigation */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
            <button
              onClick={() => setActiveTab('content')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'content'
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>محتوى الدرس</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'quiz'
                  ? 'bg-purple-500 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>الاختبار</span>
            </button>

            <button
              onClick={() => setActiveTab('task')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'task'
                  ? 'bg-blue-500 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Upload className="w-4 h-4" />
              <span>المهمة العملية</span>
            </button>
          </div>

          {/* TAB 1: Lesson Content */}
          {activeTab === 'content' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Simulated Video Player Banner */}
              <div className="relative aspect-video rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center p-6 text-center overflow-hidden group">
                {/* Bookmark Button Top Left */}
                <button
                  onClick={() => toggleSaveLesson(currentLesson.id)}
                  className={`absolute top-4 left-4 z-30 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                    isLessonSaved(currentLesson.id)
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-lg shadow-amber-500/20'
                      : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:border-amber-400 backdrop-blur-md'
                  }`}
                  title={isLessonSaved(currentLesson.id) ? 'إزالة من المفضلة' : 'حفظ الدرس في المفضلة'}
                >
                  {isLessonSaved(currentLesson.id) ? (
                    <>
                      <BookmarkCheck className="w-4 h-4 fill-slate-950 text-slate-950" />
                      <span>محفوظ بالمفضلة</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-4 h-4 text-amber-400" />
                      <span>حفظ الدرس</span>
                    </>
                  )}
                </button>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-10" />
                <div className="relative z-20 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-xl shadow-amber-500/30 group-hover:scale-110 transition-transform cursor-pointer mx-auto">
                    <PlayCircle className="w-10 h-10 fill-slate-950" />
                  </div>
                  <h4 className="text-lg font-black text-slate-100">{currentLesson.title}</h4>
                  
                  {/* Rating Badge */}
                  <div className="flex items-center justify-center gap-2">
                    <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-black text-amber-400">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>{getLessonRatingStats(currentLesson.id).averageRating}</span>
                      <span className="text-slate-400 font-normal">({getLessonRatingStats(currentLesson.id).totalCount} تقييم)</span>
                    </div>
                    <span className="text-xs text-slate-400">فيديو تعليمي • {currentLesson.durationMinutes} دقيقة</span>
                  </div>
                </div>
              </div>

              {/* Lesson Summary & Key Takeaways */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-amber-400">ملخص الدرس</h3>
                <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                  {currentLesson.summary}
                </p>

                {/* Markdown text details */}
                <div className="prose prose-invert max-w-none text-slate-200 text-sm leading-relaxed whitespace-pre-line bg-slate-950/40 p-5 rounded-2xl border border-slate-800/80">
                  {currentLesson.contentMarkdown}
                </div>

                {/* Key Takeaways */}
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5 space-y-3">
                  <h4 className="font-bold text-sm text-amber-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>أهم النقاط المستفادة:</span>
                  </h4>
                  <ul className="space-y-2">
                    {currentLesson.keyTakeaways.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Complete Lesson Button */}
                <div className="pt-4 flex items-center justify-between border-t border-slate-800">
                  <div className="text-xs text-slate-400">
                    {isLessonCompleted ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        الدرس مكتمل في سجل تقدمك (+50 نقطة)
                      </span>
                    ) : (
                      'أكمل الدرس للانتقال للدرس التالي'
                    )}
                  </div>

                  <button
                    onClick={() => completeLesson(currentLesson.id)}
                    disabled={isLessonCompleted}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                      isLessonCompleted
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
                    }`}
                  >
                    <span>{isLessonCompleted ? 'تم الإكمال' : 'تأكيد إكمال الدرس (+50 نقطة)'}</span>
                  </button>
                </div>

                {/* Lesson Star Rating & Student Feedback Section */}
                <LessonRatingSection lessonId={currentLesson.id} lessonTitle={currentLesson.title} />
              </div>

            </div>
          )}

          {/* TAB 2: Stage Quiz */}
          {activeTab === 'quiz' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-xl font-bold text-slate-100">
                  اختبار المرحلة {currentStage.id}: {currentStage.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  أجب عن جميع الأسئلة وحقق 70% على الأقل للانتقال التلقائي للمرحلة التالية.
                </p>
              </div>

              {currentStage.quiz.map((q, idx) => (
                <div key={q.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <h4 className="font-bold text-sm text-slate-200">
                    {idx + 1}. {q.question}
                  </h4>
                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[q.id] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleAnswerQuizQuestion(q.id, optIdx)}
                          className={`w-full text-right p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                            isSelected
                              ? 'bg-purple-500/20 border-purple-500 text-purple-200 font-bold'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="pt-4 flex items-center justify-between">
                {quizSubmitted && quizScoreResult !== null && (
                  <div className={`p-4 rounded-xl font-bold text-sm border ${
                    quizScoreResult >= 70
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300'
                      : 'bg-red-500/15 border-red-500 text-red-300'
                  }`}>
                    نتيجتك: {quizScoreResult}% • {quizScoreResult >= 70 ? 'ناجح بنجاح! تم فتح المرحلة التالية.' : 'حاول مرة أخرى لتحقيق 70%+.'}
                  </div>
                )}

                <button
                  onClick={handleQuizSubmit}
                  className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-600/20 mr-auto"
                >
                  تسليم الاختبار
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: Practical Task */}
          {activeTab === 'task' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-xl font-bold text-slate-100">
                  المهمة العملية للمرحلة {currentStage.id}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  طبق ما تعلمته في هذه المرحلة وارفع رابط مشروعاتك أو اكتب ملخص تنفيذك.
                </p>
              </div>

              {currentLesson.practicalTask && (
                <div className="bg-amber-500/10 border border-amber-500/30 p-5 rounded-2xl space-y-2">
                  <h4 className="font-bold text-sm text-amber-300">
                    {currentLesson.practicalTask.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentLesson.practicalTask.description}
                  </p>
                </div>
              )}

              <form onSubmit={handleTaskSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    رابط المشروع أو الفيديو (YouTube / TikTok / Google Drive / Link)
                  </label>
                  <input
                    type="url"
                    value={taskUrl}
                    onChange={e => setTaskUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    ملاحظاتك وشرح تنفيذ المهمة
                  </label>
                  <textarea
                    rows={4}
                    value={taskNote}
                    onChange={e => setTaskNote(e.target.value)}
                    placeholder="اكتب ماذا نفذت وما هي العوائق التي تجاوزتها..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {taskSuccess && (
                  <div className="p-3 bg-emerald-500/20 border border-emerald-500 text-emerald-300 rounded-xl text-xs font-bold">
                    تم تقديم المهمة بنجاح! (+150 نقطة في حسابك)
                  </div>
                )}

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/20"
                >
                  تأكيد تسليم المهمة
                </button>
              </form>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
