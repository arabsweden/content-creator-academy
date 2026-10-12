// Application Types for Content Creator Academy (أكاديمية صانع المحتوى)

export type UserLevel = 'beginner' | 'intermediate' | 'advanced';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  isGuest: boolean;
  level: UserLevel;
  primaryGoal: string;
  targetPlatform: string;
  niche: string;
  assessedScore: number;
  completedLessons: string[]; // lesson IDs
  passedQuizzes: { quizId: string; score: number }[];
  submittedTasks: { taskId: string; fileOrUrl: string; note: string; date: string }[];
  earnedBadges: Badge[];
  points: number;
  purchasedProducts: string[]; // product IDs
  activeSubscription?: 'monthly' | 'annual';
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface Lesson {
  id: string;
  stageId: number;
  title: string;
  durationMinutes: number;
  videoUrl?: string;
  summary: string;
  contentMarkdown: string;
  keyTakeaways: string[];
  practicalTask?: {
    id: string;
    title: string;
    description: string;
  };
}

export interface StageQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Stage {
  id: number;
  title: string;
  shortDesc: string;
  iconName: string;
  lessonsCount: number;
  estimatedHours: number;
  levelTarget: 'جميع المستويات' | 'مبتدئ' | 'متوسط' | 'محترف';
  lessons: Lesson[];
  quiz: StageQuizQuestion[];
}

export interface EquipmentItem {
  id: string;
  name: string;
  category: 'mobile' | 'camera' | 'mic' | 'lighting' | 'support' | 'pc' | 'live';
  priceUsd: number;
  targetLevel: UserLevel | 'all';
  recommendedFor: string[]; // e.g. ["vlog", "studio", "beginner"]
  specs: string[];
  pros: string[];
  cons: string[];
  image: string;
  affiliateUrl?: string;
}

export interface SoftwareApp {
  id: string;
  name: string;
  category: 'video' | 'design' | 'audio' | 'ai';
  platforms: ('iOS' | 'Android' | 'Windows' | 'Mac')[];
  pricing: 'مجاني' | 'مدفوع' | 'مجاني مع اشتراك';
  rating: number;
  icon: string;
  description: string;
  keyFeatures: string[];
  exportTips: string;
}

export interface CreatorProfile {
  id: string;
  name: string;
  photo: string;
  country: string;
  niche: string;
  platforms: string[];
  style: string;
  strengths: string[];
  whatToLearn: string;
  caseStudy: string;
  categoryTag: 'نماذج ملهمة' | 'متميز في السرد' | 'متميز في التصوير' | 'متميز في التعليم' | 'متميز في البث المباشر';
  socialLinks: { [key: string]: string };
  lastUpdated: string;
}

export interface StoreProduct {
  id: string;
  title: string;
  category: 'course' | 'membership' | 'template' | 'consultation' | 'service' | 'prompts';
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  badge?: string;
  image: string;
}

export interface QuizAssessmentQuestion {
  id: number;
  question: string;
  category: string;
  options: {
    label: string;
    score: number;
    platform?: string;
  }[];
}

export interface AssessmentResult {
  level: UserLevel;
  levelTitle: string;
  scorePercentage: number;
  strengths: string[];
  areasToImprove: string[];
  recommendedPlatform: {
    name: string;
    reason: string;
  };
  suggestedNiche: string;
  equipmentNeeds: string[];
  actionPlan30Days: { day: number; task: string }[];
}

export interface LessonReview {
  id: string;
  lessonId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number; // 1 to 5
  comment: string;
  createdAt: string;
  likesCount?: number;
}

export interface CommunityComment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  userBadge?: string;
  content: string;
  createdAt: string;
  likesCount: number;
}

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  category: 'editing' | 'equipment' | 'algorithms' | 'ai' | 'legal' | 'general';
  tags: string[];
  userId: string;
  userName: string;
  userAvatar?: string;
  userBadge?: string;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  viewsCount: number;
  isPinned?: boolean;
  comments?: CommunityComment[];
}

export interface CreatorTask {
  id: string;
  title: string;
  category: 'script' | 'filming' | 'editing' | 'publishing' | 'learning' | 'other';
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  dueDate?: string;
  pointsReward: number;
  createdAt: string;
}

export interface CartItem {
  product: StoreProduct;
  quantity: number;
}
