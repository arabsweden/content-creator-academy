import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CreatorTodoList } from './CreatorTodoList';
import {
  Award,
  BookOpen,
  CheckCircle2,
  Download,
  Upload,
  User,
  Zap,
  Target,
  Sparkles,
  Edit2,
  Check,
  Bookmark,
  BookmarkCheck,
  PlayCircle,
  MessagesSquare,
  Trash2
} from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const {
    user,
    stages,
    communityPosts,
    savedLessons,
    savedPosts,
    toggleSaveLesson,
    toggleSavePost,
    updateProfile,
    setCurrentView,
    setSelectedStageId,
    setSelectedLessonId
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [niche, setNiche] = useState(user.niche);
  const [targetPlatform, setTargetPlatform] = useState(user.targetPlatform);

  // Calculations
  const totalLessons = stages.reduce((acc, st) => acc + st.lessons.length, 0);
  const completedCount = user.completedLessons.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100) || 0;

  // Bookmarks
  const allLessons = stages.flatMap(s => s.lessons.map(l => ({ ...l, stageId: s.id, stageTitle: s.title })));
  const bookmarkedLessons = allLessons.filter(l => savedLessons.includes(l.id));
  const bookmarkedPosts = communityPosts.filter(p => savedPosts.includes(p.id));

  const handleOpenLesson = (stageId: number, lessonId: string) => {
    setSelectedStageId(stageId);
    setSelectedLessonId(lessonId);
    setCurrentView('stages');
  };

  const handleOpenPost = (postId: string) => {
    setCurrentView('community');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, niche, targetPlatform });
    setIsEditing(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header Profile Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-500 text-slate-950 font-black text-2xl sm:text-3xl flex items-center justify-center shadow-xl shadow-amber-500/20 border-2 border-amber-300">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-100">{user.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs">
                  {user.level === 'beginner' ? 'مبتدئ طموح' : user.level === 'intermediate' ? 'متوسط واعد' : 'صانع محترف'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                البريد: {user.email} • المنصة: <span className="text-amber-400 font-bold">{user.targetPlatform}</span> • المجال: <span className="text-amber-400 font-bold">{user.niche}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-950 px-5 py-3 rounded-2xl border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block font-bold">نقاط المكافآت</span>
              <span className="text-2xl font-black text-amber-400">{user.points} XP</span>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 transition-colors"
              title="تعديل الملف الشخصي"
            >
              <Edit2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Edit Form Drawer */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">الاسم الكريم</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">مجال المحتوى (Niche)</label>
              <input
                type="text"
                value={niche}
                onChange={e => setNiche(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">المنصة المستهدفة</label>
              <input
                type="text"
                value={targetPlatform}
                onChange={e => setTargetPlatform(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100"
              />
            </div>
            <div className="sm:col-span-3 text-left">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
              >
                حفظ التغييرات
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Progress Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Progress */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">التقدم العام في الكورس</span>
            <BookOpen className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-slate-100">{progressPercent}%</div>
          <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
            <div className="bg-amber-500 h-full rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
          </div>
          <p className="text-[11px] text-slate-400">أكملت {completedCount} من أصل {totalLessons} درساً مهارياً.</p>
        </div>

        {/* Badges Earned */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">الشارات والأوسمة المستحقة</span>
            <Award className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-3xl font-black text-purple-300">{user.earnedBadges.length} شارة</div>
          <p className="text-[11px] text-slate-400">وسام: {user.earnedBadges[user.earnedBadges.length - 1]?.title || 'البداية'}</p>
        </div>

        {/* Tasks Submitted */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">المهام العملية المسلمة</span>
            <Upload className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-3xl font-black text-blue-300">{user.submittedTasks.length} مهام</div>
          <p className="text-[11px] text-slate-400">تم تسجيل وتوثيق إنجازاتك العملية.</p>
        </div>

      </div>

      {/* Daily Creator To-Do List Section */}
      <CreatorTodoList />

      {/* Saved Favorites & Bookmarks Section (المفضلة والمحفوظات) */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <BookmarkCheck className="w-6 h-6 text-[#C5A059]" />
            <div>
              <h3 className="font-black text-xl text-slate-100">قائمة المفضلة والمحفوظات 📌</h3>
              <p className="text-xs text-slate-400">الدروس والمواضيع النقاشية التي قمت بحفظها للرجوع إليها لاحقاً</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
              {bookmarkedLessons.length} دروس • {bookmarkedPosts.length} مناقشات
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Saved Lessons */}
          <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-4">
            <h4 className="text-sm font-black text-amber-400 flex items-center gap-2">
              <PlayCircle className="w-4 h-4" />
              <span>الدروس المحفوظة ({bookmarkedLessons.length})</span>
            </h4>

            {bookmarkedLessons.length === 0 ? (
              <div className="text-center py-6 text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
                لم تقم بحفظ أي دروس في المفضلة بعد. اضغط زر "حفظ الدرس" أثناء متابعة المسارات التعليمية!
              </div>
            ) : (
              <div className="space-y-3">
                {bookmarkedLessons.map(lesson => (
                  <div
                    key={lesson.id}
                    className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 hover:border-amber-500/40 transition-all"
                  >
                    <div className="space-y-1 min-w-0 flex-1">
                      <span className="text-[10px] text-amber-400 font-bold block">{lesson.stageTitle}</span>
                      <h5 className="font-bold text-xs text-slate-100 truncate">{lesson.title}</h5>
                      <span className="text-[10px] text-slate-500">{lesson.durationMinutes} دقيقة</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleOpenLesson(lesson.stageId, lesson.id)}
                        className="px-3 py-1.5 bg-[#C5A059] hover:bg-amber-400 text-slate-950 font-black text-[11px] rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <PlayCircle className="w-3.5 h-3.5" />
                        <span>تشغيل</span>
                      </button>

                      <button
                        onClick={() => toggleSaveLesson(lesson.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all"
                        title="إزالة من المفضلة"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Saved Community Discussions */}
          <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-4">
            <h4 className="text-sm font-black text-indigo-400 flex items-center gap-2">
              <MessagesSquare className="w-4 h-4" />
              <span>المناقشات المحفوظة ({bookmarkedPosts.length})</span>
            </h4>

            {bookmarkedPosts.length === 0 ? (
              <div className="text-center py-6 text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
                لم تقم بحفظ أي مناقشات بعد. تصفح "مجتمع الصنّاع" واحفظ الأسئلة والتجارب الهامة!
              </div>
            ) : (
              <div className="space-y-3">
                {bookmarkedPosts.map(post => (
                  <div
                    key={post.id}
                    className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 hover:border-indigo-500/40 transition-all"
                  >
                    <div className="space-y-1 min-w-0 flex-1">
                      <span className="text-[10px] text-indigo-400 font-bold block">من قِبل: {post.userName}</span>
                      <h5 className="font-bold text-xs text-slate-100 truncate">{post.title}</h5>
                      <span className="text-[10px] text-slate-500">{post.commentsCount} ردود • {post.likesCount} إعجاب</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleOpenPost(post.id)}
                        className="px-3 py-1.5 bg-indigo-500 hover:bg-indigo-400 text-white font-black text-[11px] rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <MessagesSquare className="w-3.5 h-3.5" />
                        <span>عرض</span>
                      </button>

                      <button
                        onClick={() => toggleSavePost(post.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all"
                        title="إزالة من المفضلة"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Badges Showcase Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <h3 className="font-black text-xl text-slate-100 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          <span>أوسمة الإنجاز الخاصة بك:</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {user.earnedBadges.map((badge, idx) => (
            <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-amber-500/20 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xl mx-auto border border-amber-500/40">
                {badge.icon || '🏅'}
              </div>
              <h4 className="font-bold text-xs text-slate-200">{badge.title}</h4>
              <p className="text-[10px] text-slate-400 leading-tight">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Generator Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="font-black text-xl text-slate-100">شهادة إتمام المسار التعليمي</h3>
            <p className="text-xs text-slate-400 mt-0.5">تصدر موثقة برقم مسلسل باسم RAED SHIHAB – Arab Sweden</p>
          </div>

          <button
            onClick={() => alert(`شهادة موثقة باسم: ${user.name}\nأكاديمية صانع المحتوى - RAED SHIHAB\nالرمز المرجعي: ACC-2026-${Date.now().toString().slice(-6)}`)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20"
          >
            <Download className="w-4 h-4" />
            <span>تحميل الشهادة (PDF)</span>
          </button>
        </div>
      </div>

    </div>
  );
};
