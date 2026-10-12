import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  AssessmentResult,
  Stage,
  CartItem,
  StoreProduct,
  UserLevel,
  LessonReview,
  CommunityPost,
  CommunityComment,
} from '../types';
import {
  stagesData as initialStages,
  creatorsLibrary as initialCreators,
  equipmentCatalog as initialEquipment,
  storeProducts as initialProducts,
  initialLessonReviews,
  initialCommunityPosts,
  defaultBadges,
} from '../data/mockData';

interface AppContextType {
  // Auth & Profile
  user: UserProfile;
  loginAsGuest: () => void;
  loginWithEmail: (email: string, name: string) => void;
  loginWithGoogle: () => void;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;

  // Theme, Language & Typography
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  language: 'ar' | 'en' | 'sv';
  setLanguage: (lang: 'ar' | 'en' | 'sv') => void;
  fontSize: 'normal' | 'large' | 'xlarge' | 'huge';
  setFontSize: (size: 'normal' | 'large' | 'xlarge' | 'huge') => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;

  // Assessment Quiz
  quizAnswers: Record<number, number>;
  setQuizAnswer: (questionId: number, optionScore: number) => void;
  assessmentResult: AssessmentResult | null;
  calculateAssessmentResult: () => AssessmentResult;
  resetQuiz: () => void;

  // Learning Progress
  stages: Stage[];
  completedLessons: string[];
  completeLesson: (lessonId: string) => void;
  passedQuizzes: { quizId: string; score: number }[];
  submitQuizScore: (quizId: string, score: number) => void;
  submitTask: (taskId: string, fileOrUrl: string, note: string) => void;
  isStageUnlocked: (stageId: number) => boolean;

  // Shopping Cart & Store
  cart: CartItem[];
  addToCart: (product: StoreProduct) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  couponCode: string;
  applyCoupon: (code: string) => boolean;
  discountPercent: number;
  processCheckout: (method: 'stripe' | 'swish') => boolean;

  // Active View / Navigation State
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedStageId: number | null;
  setSelectedStageId: (id: number | null) => void;
  selectedLessonId: string | null;
  setSelectedLessonId: (id: string | null) => void;

  // Global Search State
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  openSearch: (initialQuery?: string) => void;
  closeSearch: () => void;

  // Lesson Star Ratings & Community Reviews
  lessonReviews: LessonReview[];
  addLessonReview: (lessonId: string, rating: number, comment: string) => void;
  getLessonReviews: (lessonId: string) => LessonReview[];
  getLessonRatingStats: (lessonId: string) => {
    averageRating: number;
    totalCount: number;
    distribution: Record<number, number>;
  };

  // Creators Community (مجتمع الصنّاع)
  communityPosts: CommunityPost[];
  addCommunityPost: (title: string, content: string, category: CommunityPost['category'], tags: string[]) => void;
  likeCommunityPost: (postId: string) => void;
  addCommunityComment: (postId: string, content: string) => void;
  likeCommunityComment: (postId: string, commentId: string) => void;

  // Saved Items (المفضلة والمحفوظات)
  savedLessons: string[];
  savedPosts: string[];
  toggleSaveLesson: (lessonId: string) => void;
  toggleSavePost: (postId: string) => void;
  isLessonSaved: (lessonId: string) => boolean;
  isPostSaved: (postId: string) => boolean;

  // Admin Data Management
  creators: typeof initialCreators;
  equipment: typeof initialEquipment;
  products: StoreProduct[];
  addCreator: (creator: any) => void;
  addEquipment: (item: any) => void;
  addProduct: (product: any) => void;
  addStage: (stage: Stage) => void;
}

const defaultUser: UserProfile = {
  id: 'guest-1',
  name: 'زائر الأكاديمية',
  email: 'guest@academy.com',
  role: 'user',
  isGuest: true,
  level: 'beginner',
  primaryGoal: 'بناء مشروع ومصدر دخل إضافي من المحتوى',
  targetPlatform: 'YouTube',
  niche: 'تطوير الذات وصناعة المحتوى',
  assessedScore: 0,
  completedLessons: ['l1-1'],
  passedQuizzes: [],
  submittedTasks: [],
  earnedBadges: [defaultBadges[0]],
  points: 150,
  purchasedProducts: [],
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme & Language state
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [language, setLanguage] = useState<'ar' | 'en' | 'sv'>('ar');

  // Font size state ('large' by default for better clarity and readability)
  const [fontSize, setFontSizeState] = useState<'normal' | 'large' | 'xlarge' | 'huge'>(() => {
    const saved = localStorage.getItem('academy_font_size');
    if (saved && ['normal', 'large', 'xlarge', 'huge'].includes(saved)) {
      return saved as 'normal' | 'large' | 'xlarge' | 'huge';
    }
    return 'large';
  });

  // Navigation view state
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedStageId, setSelectedStageId] = useState<number | null>(1);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>('l1-1');

  // Search state
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const openSearch = (initialQuery?: string) => {
    if (initialQuery !== undefined) {
      setSearchQuery(initialQuery);
    }
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  // User state
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('academy_user_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return defaultUser; }
    }
    return defaultUser;
  });

  // Dynamic Data States
  const [stages, setStages] = useState<Stage[]>(initialStages);
  const [creators, setCreators] = useState(initialCreators);
  const [equipment, setEquipment] = useState(initialEquipment);
  const [products, setProducts] = useState<StoreProduct[]>(initialProducts);

  // Quiz Answers state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);

  // Shopping Cart
  const [cart, setCart] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  // Sync user profile to localStorage
  useEffect(() => {
    localStorage.setItem('academy_user_profile', JSON.stringify(user));
  }, [user]);

  // Handle font size effect on root document
  useEffect(() => {
    localStorage.setItem('academy_font_size', fontSize);
    const sizeMap = {
      normal: '16px',
      large: '18px',
      xlarge: '20px',
      huge: '22px'
    };
    document.documentElement.style.fontSize = sizeMap[fontSize] || '18px';
  }, [fontSize]);

  const setFontSize = (size: 'normal' | 'large' | 'xlarge' | 'huge') => {
    setFontSizeState(size);
  };

  const increaseFontSize = () => {
    if (fontSize === 'normal') setFontSizeState('large');
    else if (fontSize === 'large') setFontSizeState('xlarge');
    else if (fontSize === 'xlarge') setFontSizeState('huge');
  };

  const decreaseFontSize = () => {
    if (fontSize === 'huge') setFontSizeState('xlarge');
    else if (fontSize === 'xlarge') setFontSizeState('large');
    else if (fontSize === 'large') setFontSizeState('normal');
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const loginAsGuest = () => {
    setUser({ ...defaultUser, isGuest: true });
    setCurrentView('dashboard');
  };

  const loginWithEmail = (email: string, name: string) => {
    const isOwner = email.toLowerCase().includes('raed') || email.toLowerCase().includes('admin');
    setUser({
      id: `user-${Date.now()}`,
      name: name || 'صانع محتوى متميز',
      email,
      role: isOwner ? 'admin' : 'user',
      isGuest: false,
      level: 'beginner',
      primaryGoal: 'بناء مشروع ومصدر دخل إضافي',
      targetPlatform: 'YouTube',
      niche: 'عام',
      assessedScore: 40,
      completedLessons: ['l1-1', 'l1-2'],
      passedQuizzes: [],
      submittedTasks: [],
      earnedBadges: [defaultBadges[0], defaultBadges[1]],
      points: 250,
      purchasedProducts: [],
    });
    setCurrentView('dashboard');
  };

  const loginWithGoogle = () => {
    loginWithEmail('Raedinsweden@gmail.com', 'RAED SHIHAB');
  };

  const logout = () => {
    setUser(defaultUser);
    setCurrentView('home');
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updated }));
  };

  // Placement Quiz methods
  const setQuizAnswer = (questionId: number, optionScore: number) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: optionScore }));
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setAssessmentResult(null);
  };

  const calculateAssessmentResult = (): AssessmentResult => {
    const scores: number[] = Object.values(quizAnswers);
    const totalPossible = 25 * 4; // 100 max
    const totalScore = scores.reduce((sum: number, s: number) => sum + (Number(s) || 0), 0);
    const percentage = Math.round((totalScore / (scores.length ? scores.length * 4 : 100)) * 100) || 45;

    let level: UserLevel = 'beginner';
    let levelTitle = 'مبتدئ طموح';
    if (percentage >= 70) {
      level = 'advanced';
      levelTitle = 'محترف متمكن';
    } else if (percentage >= 45) {
      level = 'intermediate';
      levelTitle = 'متوسط واعد';
    }

    const result: AssessmentResult = {
      level,
      levelTitle,
      scorePercentage: percentage,
      strengths: [
        'الرغبة العالية في التعلم والالتزام',
        'وضوح الهدف من صناعة المحتوى',
        'استعداد ممتاز لاستخدام التكنولوجيا والذكاء الاصطناعي'
      ],
      areasToImprove: [
        'احتراف كتابة الـ Hook والسيناريو القصصي في أول 3 ثوانٍ',
        'تطوير مهارات تصميم الصور المصغرة (CTR)',
        'تنويع مصادر الدخل الخمسة والجانب الضريبي'
      ],
      recommendedPlatform: {
        name: 'YouTube & Shorts',
        reason: 'تمنحك يوتيوب أفضل استمرارية طويلة الأمد وقيمة تراكمية للفيديوهات مع أرباح متزايدة من الإعلانات والرعايات.'
      },
      suggestedNiche: 'المحتوى التعليمي والتطويري في مجال مهاراتك وشغفك الحقيقي',
      equipmentNeeds: [
        'هاتفك الذكي الحالي مع تنظيف العدسة',
        'مايك لاسلكي عالي الجودة (مثل DJI Mic أو Boya)',
        'إضاءة Softbox ناعمة للستوديو المنزلي'
      ],
      actionPlan30Days: [
        { day: 1, task: 'تحديد النيتش ورسالة قناتك وبناء البايو الموحد' },
        { day: 5, task: 'كتابة أول 3 سيناريوهات باستخدام أدوات الذكاء الاصطناعي' },
        { day: 10, task: 'تصوير أول فيديو بالهاتف واكتساب الثقة أمام الكاميرا' },
        { day: 15, task: 'مونتاج الفيديو على CapCut وإضافة الترجمة التلقائية والمؤثرات' },
        { day: 20, task: 'تصميم صورة مصغرة جذابة ونشر الفيديو على يوتيوب وشورتس' },
        { day: 25, task: 'تحليل أول الإحصائيات (Retention & CTR) وتطبيق التحسينات' },
        { day: 30, task: 'تقييم المسار وتفعيل خطة الدخل الأولى' }
      ]
    };

    setAssessmentResult(result);
    updateProfile({
      level,
      assessedScore: percentage,
      earnedBadges: [...user.earnedBadges, defaultBadges[0]]
    });

    return result;
  };

  // Learning Progress
  const completeLesson = (lessonId: string) => {
    if (!user.completedLessons.includes(lessonId)) {
      const updatedLessons = [...user.completedLessons, lessonId];
      setUser(prev => ({
        ...prev,
        completedLessons: updatedLessons,
        points: prev.points + 50,
      }));
    }
  };

  const submitQuizScore = (quizId: string, score: number) => {
    const existingIndex = user.passedQuizzes.findIndex(q => q.quizId === quizId);
    let updated = [...user.passedQuizzes];
    if (existingIndex >= 0) {
      updated[existingIndex] = { quizId, score };
    } else {
      updated.push({ quizId, score });
    }
    setUser(prev => ({
      ...prev,
      passedQuizzes: updated,
      points: prev.points + (score >= 70 ? 100 : 20),
    }));
  };

  const submitTask = (taskId: string, fileOrUrl: string, note: string) => {
    const newTask = { taskId, fileOrUrl, note, date: new Date().toLocaleDateString('ar-EG') };
    setUser(prev => ({
      ...prev,
      submittedTasks: [...prev.submittedTasks, newTask],
      points: prev.points + 150,
    }));
  };

  const isStageUnlocked = (stageId: number): boolean => {
    if (stageId === 1) return true;
    // Check if stageId - 1 has at least 2 completed lessons or passed quiz
    const prevStage = stages.find(s => s.id === stageId - 1);
    if (!prevStage) return true;
    const completedCount = prevStage.lessons.filter(l => user.completedLessons.includes(l.id)).length;
    return completedCount >= Math.min(2, prevStage.lessons.length);
  };

  // Cart & Store
  const addToCart = (product: StoreProduct) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyCoupon = (code: string): boolean => {
    setCouponCode(code);
    if (code.toUpperCase() === 'RAED50' || code.toUpperCase() === 'ARAB2026') {
      setDiscountPercent(50);
      return true;
    } else if (code.toUpperCase() === 'WELCOME') {
      setDiscountPercent(20);
      return true;
    }
    setDiscountPercent(0);
    return false;
  };

  const processCheckout = (method: 'stripe' | 'swish'): boolean => {
    if (cart.length === 0) return false;
    const purchasedIds = cart.map(item => item.product.id);
    setUser(prev => ({
      ...prev,
      purchasedProducts: [...prev.purchasedProducts, ...purchasedIds],
      points: prev.points + 300,
    }));
    clearCart();
    return true;
  };

  // Admin additions
  const addCreator = (creator: any) => setCreators(prev => [creator, ...prev]);
  const addEquipment = (item: any) => setEquipment(prev => [item, ...prev]);
  const addProduct = (product: any) => setProducts(prev => [product, ...prev]);
  const addStage = (stage: Stage) => setStages(prev => [...prev, stage]);

  // Lesson Star Ratings & Reviews State
  const [lessonReviews, setLessonReviews] = useState<LessonReview[]>(() => {
    const saved = localStorage.getItem('academy_lesson_reviews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return initialLessonReviews;
  });

  useEffect(() => {
    localStorage.setItem('academy_lesson_reviews', JSON.stringify(lessonReviews));
  }, [lessonReviews]);

  const addLessonReview = (lessonId: string, rating: number, comment: string) => {
    const newReview: LessonReview = {
      id: `rev-${Date.now()}`,
      lessonId,
      userId: user.id,
      userName: user.name || 'طالب الأكاديمية',
      userAvatar: user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      rating,
      comment,
      createdAt: 'الآن',
      likesCount: 0
    };

    setLessonReviews(prev => [newReview, ...prev]);

    // Reward user with 20 points for feedback
    setUser(prev => ({
      ...prev,
      points: prev.points + 20
    }));
  };

  const getLessonReviews = (lessonId: string) => {
    return lessonReviews.filter(r => r.lessonId === lessonId);
  };

  const getLessonRatingStats = (lessonId: string) => {
    const reviews = getLessonReviews(lessonId);
    if (reviews.length === 0) {
      return {
        averageRating: 5.0,
        totalCount: 1, // baseline default
        distribution: { 5: 1, 4: 0, 3: 0, 2: 0, 1: 0 }
      };
    }

    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const avg = Number((sum / reviews.length).toFixed(1));
    const dist: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(r => {
      dist[r.rating] = (dist[r.rating] || 0) + 1;
    });

    return {
      averageRating: avg,
      totalCount: reviews.length,
      distribution: dist
    };
  };

  // Community Posts State
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(() => {
    const saved = localStorage.getItem('academy_community_posts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return initialCommunityPosts;
  });

  useEffect(() => {
    localStorage.setItem('academy_community_posts', JSON.stringify(communityPosts));
  }, [communityPosts]);

  const addCommunityPost = (
    title: string,
    content: string,
    category: CommunityPost['category'],
    tags: string[]
  ) => {
    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      title,
      content,
      category,
      tags: tags.filter(t => t.trim().length > 0),
      userId: user.id,
      userName: user.name || 'صانع محتوى بالأكاديمية',
      userAvatar: user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      userBadge: 'عضو نشط 🌟',
      createdAt: 'الآن',
      likesCount: 0,
      commentsCount: 0,
      viewsCount: 1,
      isPinned: false,
      comments: []
    };

    setCommunityPosts(prev => [newPost, ...prev]);

    // Reward user with 25 points for starting a discussion
    setUser(prev => ({
      ...prev,
      points: prev.points + 25
    }));
  };

  const likeCommunityPost = (postId: string) => {
    setCommunityPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          return { ...p, likesCount: p.likesCount + 1 };
        }
        return p;
      })
    );
  };

  const addCommunityComment = (postId: string, content: string) => {
    const newComment: CommunityComment = {
      id: `comm-${Date.now()}`,
      postId,
      userId: user.id,
      userName: user.name || 'صانع محتوى بالأكاديمية',
      userAvatar: user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      userBadge: 'مشارك تفاعلي',
      content,
      createdAt: 'الآن',
      likesCount: 0
    };

    setCommunityPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          const updatedComments = [...(p.comments || []), newComment];
          return {
            ...p,
            comments: updatedComments,
            commentsCount: updatedComments.length
          };
        }
        return p;
      })
    );

    // Reward user with 15 points for helping a peer
    setUser(prev => ({
      ...prev,
      points: prev.points + 15
    }));
  };

  const likeCommunityComment = (postId: string, commentId: string) => {
    setCommunityPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          const updatedComments = (p.comments || []).map(c => {
            if (c.id === commentId) {
              return { ...c, likesCount: c.likesCount + 1 };
            }
            return c;
          });
          return { ...p, comments: updatedComments };
        }
        return p;
      })
    );
  };

  // Saved Items (Favorites)
  const [savedLessons, setSavedLessons] = useState<string[]>(() => {
    const saved = localStorage.getItem('academy_saved_lessons');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  const [savedPosts, setSavedPosts] = useState<string[]>(() => {
    const saved = localStorage.getItem('academy_saved_posts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('academy_saved_lessons', JSON.stringify(savedLessons));
  }, [savedLessons]);

  useEffect(() => {
    localStorage.setItem('academy_saved_posts', JSON.stringify(savedPosts));
  }, [savedPosts]);

  const toggleSaveLesson = (lessonId: string) => {
    setSavedLessons(prev =>
      prev.includes(lessonId) ? prev.filter(id => id !== lessonId) : [...prev, lessonId]
    );
  };

  const toggleSavePost = (postId: string) => {
    setSavedPosts(prev =>
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  };

  const isLessonSaved = (lessonId: string) => savedLessons.includes(lessonId);
  const isPostSaved = (postId: string) => savedPosts.includes(postId);

  return (
    <AppContext.Provider
      value={{
        user,
        loginAsGuest,
        loginWithEmail,
        loginWithGoogle,
        logout,
        updateProfile,
        theme,
        toggleTheme,
        language,
        setLanguage,
        fontSize,
        setFontSize,
        increaseFontSize,
        decreaseFontSize,
        quizAnswers,
        setQuizAnswer,
        assessmentResult,
        calculateAssessmentResult,
        resetQuiz,
        stages,
        completedLessons: user.completedLessons,
        completeLesson,
        passedQuizzes: user.passedQuizzes,
        submitQuizScore,
        submitTask,
        isStageUnlocked,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        couponCode,
        applyCoupon,
        discountPercent,
        processCheckout,
        currentView,
        setCurrentView,
        selectedStageId,
        setSelectedStageId,
        selectedLessonId,
        setSelectedLessonId,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        openSearch,
        closeSearch,
        lessonReviews,
        addLessonReview,
        getLessonReviews,
        getLessonRatingStats,
        communityPosts,
        addCommunityPost,
        likeCommunityPost,
        addCommunityComment,
        likeCommunityComment,
        savedLessons,
        savedPosts,
        toggleSaveLesson,
        toggleSavePost,
        isLessonSaved,
        isPostSaved,
        creators,
        equipment,
        products,
        addCreator,
        addEquipment,
        addProduct,
        addStage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
