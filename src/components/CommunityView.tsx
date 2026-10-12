import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CommunityPost } from '../types';
import {
  MessageSquare,
  PlusCircle,
  ThumbsUp,
  Eye,
  Tag,
  Search,
  Filter,
  Pin,
  Sparkles,
  Send,
  User,
  CheckCircle2,
  Clock,
  Award,
  Video,
  Camera,
  TrendingUp,
  Cpu,
  Scale,
  MessagesSquare,
  Bookmark,
  BookmarkCheck,
  X
} from 'lucide-react';

export const CommunityView: React.FC = () => {
  const {
    communityPosts,
    addCommunityPost,
    likeCommunityPost,
    addCommunityComment,
    likeCommunityComment,
    toggleSavePost,
    isPostSaved,
    user
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'likes' | 'comments'>('newest');
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  
  // New Post Form Modal state
  const [isNewPostOpen, setIsNewPostOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<CommunityPost['category']>('general');
  const [newTags, setNewTags] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');
  const [postSubmitted, setPostSubmitted] = useState<boolean>(false);

  // New Comment inline state
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  const categories = [
    { id: 'all', label: 'جميع المناقشات', icon: MessagesSquare },
    { id: 'editing', label: 'المونتاج والتعديل', icon: Video },
    { id: 'equipment', label: 'المعدات والتصوير', icon: Camera },
    { id: 'algorithms', label: 'النمو والخوارزميات', icon: TrendingUp },
    { id: 'ai', label: 'الذكاء الاصطناعي', icon: Cpu },
    { id: 'legal', label: 'القانون والضرائب', icon: Scale },
    { id: 'general', label: 'نقاشات عامة', icon: MessageSquare },
  ];

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const parsedTags = newTags
      .split(',')
      .map(t => t.trim().replace(/^#/, ''))
      .filter(t => t.length > 0);

    addCommunityPost(newTitle, newContent, newCategory, parsedTags);
    
    setPostSubmitted(true);
    setNewTitle('');
    setNewContent('');
    setNewTags('');
    setTimeout(() => {
      setPostSubmitted(false);
      setIsNewPostOpen(false);
    }, 1500);
  };

  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    addCommunityComment(postId, text);
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  // Filter posts
  const filteredPosts = communityPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      post.userName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Sort posts (Pinned posts stay on top)
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;

    if (sortBy === 'likes') return b.likesCount - a.likesCount;
    if (sortBy === 'comments') return b.commentsCount - a.commentsCount;
    return b.id.localeCompare(a.id); // Default newest
  });

  const getCategoryBadge = (cat: CommunityPost['category']) => {
    switch (cat) {
      case 'editing':
        return { label: 'المونتاج والتعديل', color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' };
      case 'equipment':
        return { label: 'المعدات والتصوير', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' };
      case 'algorithms':
        return { label: 'النمو والخوارزميات', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' };
      case 'ai':
        return { label: 'الذكاء الاصطناعي', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' };
      case 'legal':
        return { label: 'القانون والضرائب', color: 'bg-rose-500/10 text-rose-400 border-rose-500/20' };
      default:
        return { label: 'مناقشة عامة', color: 'bg-slate-500/10 text-slate-400 border-slate-500/20' };
    }
  };

  return (
    <div className="space-y-8 py-6">
      
      {/* Community Banner Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-[#1A2B48] border-2 border-[#C5A059]/40 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#C5A059]/10 border border-[#C5A059]/30 px-3.5 py-1.5 rounded-full text-xs font-black text-[#C5A059]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ملتقى الصُنّاع التفاعلي</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight">
              مجتمع صُنّاع المحتوى 💬
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
              اطرح أسئلتك، شارك تجاربك العملية في التصوير والمونتاج، وناقش استراتيجيات التفاعل والتصدر مع زملائك وصناع المحتوى المحترفين.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-300 pt-2">
              <span className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-xl">
                <MessagesSquare className="w-4 h-4 text-[#C5A059]" />
                <span>{communityPosts.length} مناقشة جارية</span>
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-xl">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>+25 نقطة عند إضافة سؤال</span>
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsNewPostOpen(true)}
            className="px-6 py-4 bg-gradient-to-r from-[#C5A059] to-amber-500 hover:from-amber-400 hover:to-[#C5A059] text-slate-950 font-black text-sm sm:text-base rounded-2xl shadow-xl shadow-amber-500/20 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <PlusCircle className="w-5 h-5" />
            <span>طرح سؤال / مناقشة جديدة</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في الأسئلة، المواضيع، أو العناوين..."
              className="w-full bg-slate-950 text-slate-100 placeholder-slate-500 pr-10 pl-4 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-[#C5A059] text-sm font-medium transition-all"
            />
            <Search className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
            <Filter className="w-4 h-4 text-[#C5A059]" />
            <span className="text-xs font-bold text-slate-400">ترتيب:</span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-200 text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:border-[#C5A059]"
            >
              <option value="newest">الأحدث نشرًا</option>
              <option value="likes">الأكثر إعجاباً وتفاعلاً</option>
              <option value="comments">الأكثر تعليقاً</option>
            </select>
          </div>
        </div>

        {/* Category Tabs Scrollable */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-t border-slate-800/80 pt-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#C5A059] text-slate-950 font-black shadow-lg shadow-amber-500/10'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-[#C5A059]'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Discussions List */}
      <div className="space-y-4">
        {sortedPosts.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/50 border border-slate-800 rounded-3xl space-y-3">
            <MessagesSquare className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-slate-300">لا توجد مناقشات مطابقة لخيارات البحث</h3>
            <p className="text-xs text-slate-500">كن أول من ينشر سؤالاً في هذا القسم ويثري مجتمع الصنّاع!</p>
            <button
              onClick={() => setIsNewPostOpen(true)}
              className="mt-2 px-5 py-2.5 bg-[#C5A059] text-slate-950 font-black text-xs rounded-xl hover:bg-amber-400 transition-all"
            >
              إضافة سؤال جديد الآن
            </button>
          </div>
        ) : (
          sortedPosts.map((post) => {
            const categoryInfo = getCategoryBadge(post.category);
            const isExpanded = expandedPostId === post.id;

            return (
              <div
                key={post.id}
                className={`bg-slate-900 border rounded-3xl p-5 sm:p-6 space-y-4 transition-all ${
                  post.isPinned
                    ? 'border-[#C5A059]/60 shadow-xl bg-gradient-to-b from-[#C5A059]/5 to-slate-900'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Post Top Meta */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.userAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                      alt={post.userName}
                      className="w-10 h-10 rounded-full object-cover border border-[#C5A059]/40"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-100 text-sm sm:text-base">{post.userName}</span>
                        {post.userBadge && (
                          <span className="text-[10px] bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 px-2 py-0.5 rounded-md font-bold">
                            {post.userBadge}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-600" />
                        <span>{post.createdAt}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {post.isPinned && (
                      <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-black px-2.5 py-1 rounded-lg flex items-center gap-1">
                        <Pin className="w-3 h-3 fill-amber-300" />
                        <span>مثبّت</span>
                      </span>
                    )}
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${categoryInfo.color}`}>
                      {categoryInfo.label}
                    </span>
                  </div>
                </div>

                {/* Post Title & Content */}
                <div className="space-y-2">
                  <h2 className="text-lg sm:text-xl font-black text-slate-100 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal whitespace-pre-line">
                    {post.content}
                  </p>
                </div>

                {/* Post Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-950 border border-slate-800 text-slate-400 text-[11px] font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1"
                      >
                        <Tag className="w-3 h-3 text-[#C5A059]" />
                        <span>#{tag}</span>
                      </span>
                    ))}
                  </div>
                )}

                {/* Post Actions Bar */}
                <div className="flex items-center justify-between border-t border-slate-800/80 pt-4 text-xs font-bold">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => likeCommunityPost(post.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-[#C5A059] text-slate-300 hover:text-[#C5A059] transition-all cursor-pointer"
                    >
                      <ThumbsUp className="w-4 h-4 text-[#C5A059]" />
                      <span>{post.likesCount} إعجاب</span>
                    </button>

                    <button
                      onClick={() => setExpandedPostId(isExpanded ? null : post.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                        isExpanded
                          ? 'bg-[#C5A059] text-slate-950 border-[#C5A059] font-black'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-slate-100'
                      }`}
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.commentsCount} ردود</span>
                    </button>

                    <button
                      onClick={() => toggleSavePost(post.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                        isPostSaved(post.id)
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-[#C5A059] hover:border-[#C5A059]'
                      }`}
                      title={isPostSaved(post.id) ? 'إزالة من المفضلة' : 'حفظ المناقشة في المفضلة'}
                    >
                      {isPostSaved(post.id) ? (
                        <>
                          <BookmarkCheck className="w-4 h-4 text-amber-400" />
                          <span>محفوظ</span>
                        </>
                      ) : (
                        <>
                          <Bookmark className="w-4 h-4 text-slate-400" />
                          <span>حفظ</span>
                        </>
                      )}
                    </button>
                  </div>

                  <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-slate-600" />
                    <span>{post.viewsCount} مشاهدة</span>
                  </span>
                </div>

                {/* Expanded Thread Replies Area */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-800 space-y-4 animate-in fade-in">
                    <h4 className="text-xs font-black text-slate-300 flex items-center gap-1.5">
                      <MessagesSquare className="w-4 h-4 text-[#C5A059]" />
                      <span>الردود والأفكار المطروحة ({post.comments?.length || 0})</span>
                    </h4>

                    {/* Replies list */}
                    <div className="space-y-3">
                      {(!post.comments || post.comments.length === 0) ? (
                        <p className="text-xs text-slate-500 italic p-3 bg-slate-950 rounded-xl border border-slate-800">
                          لا توجد ردود بعد. كن أول من يجيب ويحصل على +15 نقطة!
                        </p>
                      ) : (
                        post.comments.map((comm) => (
                          <div
                            key={comm.id}
                            className="bg-slate-950 border border-slate-800/80 p-3.5 rounded-2xl space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <img
                                  src={comm.userAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                                  alt={comm.userName}
                                  className="w-7 h-7 rounded-full object-cover border border-slate-700"
                                />
                                <div>
                                  <span className="font-bold text-slate-200 text-xs">{comm.userName}</span>
                                  {comm.userBadge && (
                                    <span className="text-[9px] text-[#C5A059] mr-2 bg-[#C5A059]/10 px-1.5 py-0.5 rounded">
                                      {comm.userBadge}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <span className="text-[10px] text-slate-500">{comm.createdAt}</span>
                            </div>

                            <p className="text-xs text-slate-300 font-medium leading-relaxed pr-9">
                              {comm.content}
                            </p>

                            <div className="flex justify-end pt-1">
                              <button
                                onClick={() => likeCommunityComment(post.id, comm.id)}
                                className="text-[11px] text-slate-400 hover:text-[#C5A059] flex items-center gap-1 font-bold"
                              >
                                <ThumbsUp className="w-3 h-3 text-[#C5A059]" />
                                <span>مفيد ({comm.likesCount})</span>
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Add Comment Input Form */}
                    <div className="pt-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={commentInputs[post.id] || ''}
                          onChange={(e) =>
                            setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleAddComment(post.id);
                          }}
                          placeholder="اكتب ردك أو نصيحتك لزميلك هنا... (+15 نقطة)"
                          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#C5A059]"
                        />
                        <button
                          onClick={() => handleAddComment(post.id)}
                          disabled={!commentInputs[post.id]?.trim()}
                          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                            commentInputs[post.id]?.trim()
                              ? 'bg-[#C5A059] text-slate-950 hover:bg-amber-400 cursor-pointer'
                              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>إرسال الرد</span>
                        </button>
                      </div>
                    </div>

                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

      {/* New Discussion Modal */}
      {isNewPostOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border-2 border-[#C5A059]/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            
            <button
              onClick={() => setIsNewPostOpen(false)}
              className="absolute top-5 left-5 text-slate-400 hover:text-slate-100 bg-slate-950 p-2 rounded-full border border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-6 h-6 text-[#C5A059]" />
                <h3 className="text-2xl font-black text-slate-100">
                  طرح سؤال أو مناقشة جديدة
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                شارك سؤالك أو تحديك مع مجتمع الصُنّاع واكسب <span className="text-[#C5A059] font-bold">+25 نقطة</span>
              </p>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  عنوان المناقشة أو السؤال:
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="مثال: كيف أضبط إضاءة الكروما في غرفة صغيرة بدون ظلال؟"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#C5A059]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    تصنيف الموضوع:
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e: any) => setNewCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs font-bold rounded-xl p-3 focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="editing">🎬 المونتاج والتعديل</option>
                    <option value="equipment">🎥 المعدات والتصوير</option>
                    <option value="algorithms">📈 النمو والخوارزميات</option>
                    <option value="ai">🤖 الذكاء الاصطناعي</option>
                    <option value="legal">⚖️ القانون والضرائب</option>
                    <option value="general">💬 مناقشات عامة</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    الوسوم / Tags (مفصولة بفاصلة):
                  </label>
                  <input
                    type="text"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    placeholder="إضاءة, تصوير_ميداني, إعدادات"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  تفاصيل السؤال أو التحدي الذي يواجهك:
                </label>
                <textarea
                  rows={5}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="اشرح التفاصيل، البرامج المستخدمة، والمعدات لكي يستطيع الزملاء إفادتك بشكل دقيق..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#C5A059]"
                  required
                />
              </div>

              {postSubmitted && (
                <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>تم نشر مشاركتك بنجاح وحصولك على +25 نقطة! جاري تحديث القائمة...</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewPostOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-800 text-xs font-bold text-slate-400 hover:text-slate-200"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={!newTitle.trim() || !newContent.trim()}
                  className={`px-6 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 transition-all shadow-lg ${
                    newTitle.trim() && newContent.trim()
                      ? 'bg-[#C5A059] hover:bg-amber-400 text-slate-950 cursor-pointer shadow-amber-500/20'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>نشر الموضوع (+25 نقطة)</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
