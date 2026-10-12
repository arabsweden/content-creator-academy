import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, ThumbsUp, MessageSquare, Send, CheckCircle2, Award, Sparkles } from 'lucide-react';

interface LessonRatingSectionProps {
  lessonId: string;
  lessonTitle: string;
}

export const LessonRatingSection: React.FC<LessonRatingSectionProps> = ({ lessonId, lessonTitle }) => {
  const { addLessonReview, getLessonReviews, getLessonRatingStats, user } = useApp();

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [reviewSubmitted, setReviewSubmitted] = useState<boolean>(false);
  const [filterStar, setFilterStar] = useState<number | 'all'>('all');
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});

  const stats = getLessonRatingStats(lessonId);
  const reviews = getLessonReviews(lessonId);

  const filteredReviews = filterStar === 'all'
    ? reviews
    : reviews.filter(r => r.rating === filterStar);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    addLessonReview(lessonId, rating, comment);
    setReviewSubmitted(true);
    setComment('');
    setTimeout(() => {
      setReviewSubmitted(false);
    }, 4000);
  };

  const toggleLikeReview = (reviewId: string) => {
    setLikedReviews(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };

  const starLabels: Record<number, string> = {
    1: 'ضعيف ويحتاج تحسين',
    2: 'مقبول',
    3: 'جيد ومفيد',
    4: 'ممتاز جداً',
    5: 'استثنائي وفائق الجودة! 🌟'
  };

  return (
    <div className="bg-slate-950/80 border-2 border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-8 mt-8 shadow-2xl">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
            <h3 className="text-xl sm:text-2xl font-black text-slate-100">
              تقييمات الدرس وآراء الطلاب
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            شارك انطباعك وتقييمك لـ <span className="text-amber-400 font-bold">"{lessonTitle}"</span> لمساعدة زملائك صناع المحتوى
          </p>
        </div>

        {/* Global Average Pill */}
        <div className="bg-slate-900 border border-amber-500/30 px-5 py-3 rounded-2xl flex items-center gap-4 shrink-0 shadow-lg">
          <div className="text-center">
            <span className="text-2xl font-black text-amber-400">{stats.averageRating}</span>
            <span className="text-xs text-slate-400 block">من 5.0</span>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= Math.round(stats.averageRating)
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-slate-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-300 mt-1 block">
              {stats.totalCount} {stats.totalCount === 1 ? 'تقييم' : 'تقييمات'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Rating Stats & Submission Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Rating Breakdown Bars (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
          <h4 className="text-sm font-black text-slate-200 flex items-center justify-between">
            <span>توزيع التقييمات</span>
            <span className="text-xs text-amber-400 font-bold">{stats.totalCount} صوت</span>
          </h4>

          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((starNum) => {
              const count = stats.distribution[starNum] || 0;
              const percent = stats.totalCount > 0 ? Math.round((count / stats.totalCount) * 100) : 0;

              return (
                <button
                  key={starNum}
                  onClick={() => setFilterStar(filterStar === starNum ? 'all' : starNum)}
                  className={`w-full flex items-center gap-3 text-xs font-bold transition-all p-1.5 rounded-xl ${
                    filterStar === starNum ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="w-8 flex items-center gap-1 shrink-0 font-bold">
                    <span>{starNum}</span>
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  </span>

                  <div className="flex-1 h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  <span className="w-10 text-left font-mono text-slate-400 shrink-0">
                    {percent}%
                  </span>
                </button>
              );
            })}
          </div>

          {filterStar !== 'all' && (
            <button
              onClick={() => setFilterStar('all')}
              className="w-full text-center text-xs text-amber-400 hover:underline font-bold pt-2 border-t border-slate-800"
            >
              إلغاء التصفية وإظهار جميع التقييمات
            </button>
          )}
        </div>

        {/* User Interactive Rating & Feedback Form (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-black text-slate-100 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <span>أضف تقييمك ورأيك المباشر</span>
            </h4>
            <span className="text-[11px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>اكسب +20 نقطة عند التقييم</span>
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Interactive Star Picker */}
            <div className="space-y-2 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
              <label className="text-xs font-bold text-slate-300 block">
                اختر عدد النجوم:
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isActive = star <= (hoverRating || rating);
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1.5 transform hover:scale-125 transition-transform focus:outline-none"
                      title={`${star} نجوم`}
                    >
                      <Star
                        className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                          isActive
                            ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                            : 'text-slate-700'
                        }`}
                      />
                    </button>
                  );
                })}
                <span className="text-xs sm:text-sm font-black text-amber-400 mr-2">
                  {starLabels[hoverRating || rating]}
                </span>
              </div>
            </div>

            {/* Feedback Comment Box */}
            <div>
              <label className="text-xs font-bold text-slate-300 mb-1.5 block">
                ملاحظاتك وانطباعك المباشر عن الدرس:
              </label>
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="ما هي أكثر النقاط فائدة بالنسبة لك؟ وكيف تنوي تطبيقها في قناتك/حسابك؟"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                required
              />
            </div>

            {reviewSubmitted && (
              <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>تم إرسال تقييمك بنجاح! تمت إضافة +20 نقطة إلى رصيدك. شكراً لمشاركتك!</span>
              </div>
            )}

            <button
              type="submit"
              disabled={!comment.trim()}
              className={`px-6 py-3 rounded-xl font-black text-sm flex items-center gap-2 transition-all shadow-lg ${
                comment.trim()
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20 cursor-pointer'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>نشر التقييم والملاحظة (+20 نقطة)</span>
            </button>
          </form>
        </div>

      </div>

      {/* Community Reviews Feed List */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-black text-slate-100 flex items-center gap-2">
            <span>آراء وتعليقات الطلاب</span>
            <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md">
              {filteredReviews.length} تعليق
            </span>
          </h4>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 text-xs">
            <button
              onClick={() => setFilterStar('all')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                filterStar === 'all'
                  ? 'bg-amber-500 text-slate-950 font-black'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              الكل
            </button>
            {[5, 4, 3].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStar(s)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
                  filterStar === s
                    ? 'bg-amber-500 text-slate-950 font-black'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{s}</span>
                <Star className="w-3 h-3 fill-current" />
              </button>
            ))}
          </div>
        </div>

        {filteredReviews.length === 0 ? (
          <div className="text-center py-8 bg-slate-900/50 rounded-2xl border border-slate-800 space-y-2">
            <Star className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-sm font-bold text-slate-400">لا توجد تقييمات مطابقة لتصفيتك حالياً</p>
            <p className="text-xs text-slate-500">كن أول من يضيف تقييماً لهذا الدرس في الأكاديمية!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredReviews.map((rev) => {
              const isLiked = likedReviews[rev.id];
              const likes = (rev.likesCount || 0) + (isLiked ? 1 : 0);

              return (
                <div
                  key={rev.id}
                  className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl space-y-3 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={rev.userAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                        alt={rev.userName}
                        className="w-10 h-10 rounded-full object-cover border border-amber-500/30"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-slate-100 text-sm">{rev.userName}</span>
                          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            طالب الأكاديمية
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 font-medium">{rev.createdAt}</span>
                      </div>
                    </div>

                    {/* Star Badge */}
                    <div className="flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-800">
                      {[1, 2, 3, 4, 5].map((st) => (
                        <Star
                          key={st}
                          className={`w-3.5 h-3.5 ${
                            st <= rev.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Comment Text */}
                  <p className="text-sm text-slate-200 leading-relaxed font-medium bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/60">
                    "{rev.comment}"
                  </p>

                  {/* Footer Actions */}
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                    <span className="text-[11px] text-slate-500">هل كان هذا التقييم مفيداً لك؟</span>
                    <button
                      onClick={() => toggleLikeReview(rev.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                        isLiked
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'text-amber-400 fill-amber-400' : ''}`} />
                      <span>مفيد ({likes})</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
