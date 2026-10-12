import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CreatorTask } from '../types';
import {
  CheckSquare,
  Square,
  Plus,
  Trash2,
  Sparkles,
  CheckCircle2,
  ListTodo,
  Video,
  FileText,
  Scissors,
  Share2,
  BookOpen,
  Filter,
  Flame,
  Award,
  PlusCircle,
  Tag,
  Clock
} from 'lucide-react';

const initialDefaultTasks: CreatorTask[] = [
  {
    id: 'task-1',
    title: 'كتابة هوك بصرية و3 أفكار للفيديوهات القادمة',
    category: 'script',
    priority: 'high',
    completed: true,
    pointsReward: 15,
    createdAt: 'اليوم'
  },
  {
    id: 'task-2',
    title: 'تصوير فيديو قصيرة (Shorts / Reels) مدته 45 ثانية',
    category: 'filming',
    priority: 'high',
    completed: false,
    pointsReward: 20,
    createdAt: 'اليوم'
  },
  {
    id: 'task-3',
    title: 'إضافة المؤثرات الصوتية والانتقالات في برنامج CapCut',
    category: 'editing',
    priority: 'medium',
    completed: false,
    pointsReward: 15,
    createdAt: 'اليوم'
  },
  {
    id: 'task-4',
    title: 'نشر منشور تفاعلي على مجتمع اليوتيوب وحسابات التواصل',
    category: 'publishing',
    priority: 'low',
    completed: false,
    pointsReward: 10,
    createdAt: 'اليوم'
  },
  {
    id: 'task-5',
    title: 'متابعة الدرس القادم في الأكاديمية وحل الاختبار العملي',
    category: 'learning',
    priority: 'medium',
    completed: false,
    pointsReward: 25,
    createdAt: 'اليوم'
  }
];

const presetTemplates = [
  { title: '✍️ تجهيز سيناريو وفكرة فيديو للأسبوع القادم', category: 'script' as const, priority: 'high' as const, points: 15 },
  { title: '🎥 ضبط إضاءة الكاميرا وتصوير المقابلة', category: 'filming' as const, priority: 'high' as const, points: 20 },
  { title: '🎬 تعديل الصوت وعزل الضوضاء بالذكاء الاصطناعي', category: 'editing' as const, priority: 'medium' as const, points: 15 },
  { title: '🚀 الرد على أول 15 تعليقاً فور نشر الفيديو', category: 'publishing' as const, priority: 'high' as const, points: 10 },
  { title: '📊 تحليل إحصائيات نسبة الاحتفاظ المشاهدين في Studio', category: 'learning' as const, priority: 'medium' as const, points: 15 }
];

export const CreatorTodoList: React.FC = () => {
  const { user, setUser } = useApp();

  const [tasks, setTasks] = useState<CreatorTask[]>(() => {
    const saved = localStorage.getItem('academy_creator_todo_tasks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return initialDefaultTasks;
  });

  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed'>('all');

  // Form State for new task
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<CreatorTask['category']>('script');
  const [newPriority, setNewPriority] = useState<CreatorTask['priority']>('medium');
  const [showForm, setShowForm] = useState(false);
  const [rewardToast, setRewardToast] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('academy_creator_todo_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: CreatorTask = {
      id: `task-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      priority: newPriority,
      completed: false,
      pointsReward: newPriority === 'high' ? 20 : newPriority === 'medium' ? 15 : 10,
      createdAt: 'اليوم'
    };

    setTasks(prev => [newTask, ...prev]);
    setNewTitle('');
    setShowForm(false);
  };

  const addPresetTask = (template: typeof presetTemplates[0]) => {
    const newTask: CreatorTask = {
      id: `task-${Date.now()}`,
      title: template.title,
      category: template.category,
      priority: template.priority,
      completed: false,
      pointsReward: template.points,
      createdAt: 'اليوم'
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTask = (taskId: string) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === taskId) {
          const nextState = !t.completed;
          if (nextState) {
            // Reward points!
            setUser(u => ({ ...u, points: u.points + t.pointsReward }));
            setRewardToast(`🎉 أحسنت! كسبت +${t.pointsReward} نقطة إنجاز!`);
            setTimeout(() => setRewardToast(null), 3000);
          }
          return { ...t, completed: nextState };
        }
        return t;
      })
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  // Stats
  const totalCount = tasks.length;
  const completedCount = tasks.filter(t => t.completed).length;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Filtering
  const filteredTasks = tasks.filter(t => {
    const matchesCategory = filterCategory === 'all' || t.category === filterCategory;
    const matchesStatus =
      filterStatus === 'all'
        ? true
        : filterStatus === 'completed'
        ? t.completed
        : !t.completed;
    return matchesCategory && matchesStatus;
  });

  const getCategoryInfo = (cat: CreatorTask['category']) => {
    switch (cat) {
      case 'script':
        return { label: 'كتابة وسيناريو', icon: FileText, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' };
      case 'filming':
        return { label: 'تصوير وإنتاج', icon: Video, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
      case 'editing':
        return { label: 'مونتاج وتعديل', icon: Scissors, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30' };
      case 'publishing':
        return { label: 'نشر وتسويق', icon: Share2, color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' };
      case 'learning':
        return { label: 'تعلم وتطوير', icon: BookOpen, color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' };
      default:
        return { label: 'عام', icon: Tag, color: 'text-slate-400 bg-slate-500/10 border-slate-500/30' };
    }
  };

  const getPriorityBadge = (prio: CreatorTask['priority']) => {
    switch (prio) {
      case 'high':
        return <span className="text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/40 px-2 py-0.5 rounded font-bold">عالية ⚡</span>;
      case 'medium':
        return <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded font-bold">متوسطة</span>;
      default:
        return <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-bold">عادية</span>;
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
      
      {/* Toast Reward Notification */}
      {rewardToast && (
        <div className="fixed bottom-6 left-6 z-50 bg-amber-500 text-slate-950 px-5 py-3 rounded-2xl font-black text-sm shadow-2xl flex items-center gap-2 animate-bounce">
          <Sparkles className="w-5 h-5 text-slate-950" />
          <span>{rewardToast}</span>
        </div>
      )}

      {/* Header & Progress Card */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800/80 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ListTodo className="w-6 h-6 text-[#C5A059]" />
            <h3 className="text-2xl font-black text-slate-100">
              مهامي اليومية كصانع محتوى 📋
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            خطط لأهدافك اليومية في الكتابة والتصوير والمونتاج، واكسب <span className="text-amber-400 font-bold">نقاط XP</span> عند الإنجاز
          </p>
        </div>

        {/* Daily Stats Pill */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex items-center gap-6 shrink-0 shadow-inner">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold mb-1">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>نسبة الإنجاز اليومي:</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black text-amber-400">{completionPercentage}%</span>
              <div className="w-28 bg-slate-900 h-3 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-amber-500 to-amber-300 h-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-center">
            <span className="text-xs text-slate-400 block font-bold">المكتمل</span>
            <span className="text-lg font-black text-emerald-400">{completedCount} / {totalCount}</span>
          </div>
        </div>
      </div>

      {/* Controls: Add Task Button & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-bold">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filterCategory === 'all'
                ? 'bg-[#C5A059] text-slate-950 font-black'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            الكل ({tasks.length})
          </button>
          <button
            onClick={() => setFilterCategory('script')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filterCategory === 'script'
                ? 'bg-amber-500 text-slate-950 font-black'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            ✍️ سيناريو
          </button>
          <button
            onClick={() => setFilterCategory('filming')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filterCategory === 'filming'
                ? 'bg-emerald-500 text-slate-950 font-black'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            🎥 تصوير
          </button>
          <button
            onClick={() => setFilterCategory('editing')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filterCategory === 'editing'
                ? 'bg-indigo-500 text-slate-100 font-black'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            🎬 مونتاج
          </button>
          <button
            onClick={() => setFilterCategory('publishing')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filterCategory === 'publishing'
                ? 'bg-rose-500 text-slate-100 font-black'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            🚀 نشر
          </button>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-[#C5A059] hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة مهمة خاصة</span>
          </button>
        </div>
      </div>

      {/* Add Task Form Drawer */}
      {showForm && (
        <form onSubmit={handleAddTask} className="bg-slate-950 border border-amber-500/30 rounded-2xl p-4 sm:p-5 space-y-4 animate-in fade-in">
          <h4 className="text-xs font-black text-amber-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>إنشاء مهمة يومية جديدة</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="text-[11px] font-bold text-slate-300 block mb-1">اسم المهمة المطلوبة:</label>
              <input
                type="text"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="مثال: تسجيل التعليق الصوتي لدرس المونتاج..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#C5A059]"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">تصنيف العمل:</label>
              <select
                value={newCategory}
                onChange={(e: any) => setNewCategory(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:border-[#C5A059]"
              >
                <option value="script">✍️ كتابة وسيناريو</option>
                <option value="filming">🎥 تصوير وإنتاج</option>
                <option value="editing">🎬 مونتاج وتعديل</option>
                <option value="publishing">🚀 نشر وتسويق</option>
                <option value="learning">🎓 تعلم وتطوير</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-bold">الأولوية:</span>
              <button
                type="button"
                onClick={() => setNewPriority('high')}
                className={`px-2.5 py-1 rounded-lg font-bold border transition-all ${
                  newPriority === 'high' ? 'bg-rose-500/20 text-rose-300 border-rose-500' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                عالية (+20 XP)
              </button>
              <button
                type="button"
                onClick={() => setNewPriority('medium')}
                className={`px-2.5 py-1 rounded-lg font-bold border transition-all ${
                  newPriority === 'medium' ? 'bg-amber-500/20 text-amber-300 border-amber-500' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                متوسطة (+15 XP)
              </button>
            </div>

            <button
              type="submit"
              className="px-5 py-2 bg-[#C5A059] text-slate-950 font-black text-xs rounded-xl hover:bg-amber-400 transition-all cursor-pointer"
            >
              حفظ المهمة
            </button>
          </div>
        </form>
      )}

      {/* Quick Preset Recommended Tasks (Quick Add Pills) */}
      <div className="bg-slate-950/70 border border-slate-800/80 p-3.5 rounded-2xl space-y-2">
        <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>مقترحات مهام سريعة بنقرة واحدة:</span>
        </span>
        <div className="flex flex-wrap gap-2">
          {presetTemplates.map((template, idx) => (
            <button
              key={idx}
              onClick={() => addPresetTask(template)}
              className="text-[11px] font-bold bg-slate-900 hover:bg-[#C5A059] hover:text-slate-950 text-slate-300 border border-slate-800 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{template.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tasks List Items */}
      <div className="space-y-2.5">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-8 bg-slate-950 rounded-2xl border border-slate-800 text-slate-500 text-xs">
            لا توجد مهام حالياً في هذا التصنيف. أضف مهمتك الأولى الآن!
          </div>
        ) : (
          filteredTasks.map((task) => {
            const catInfo = getCategoryInfo(task.category);
            const CatIcon = catInfo.icon;

            return (
              <div
                key={task.id}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                  task.completed
                    ? 'bg-slate-950/60 border-slate-800/60 opacity-60'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="shrink-0 transition-transform hover:scale-110 cursor-pointer"
                  >
                    {task.completed ? (
                      <CheckSquare className="w-6 h-6 text-emerald-400 fill-emerald-400/20" />
                    ) : (
                      <Square className="w-6 h-6 text-slate-600 hover:text-amber-400" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0 space-y-1">
                    <p
                      className={`text-sm font-bold leading-tight ${
                        task.completed ? 'line-through text-slate-500' : 'text-slate-100'
                      }`}
                    >
                      {task.title}
                    </p>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border flex items-center gap-1 ${catInfo.color}`}>
                        <CatIcon className="w-3 h-3" />
                        <span>{catInfo.label}</span>
                      </span>

                      {getPriorityBadge(task.priority)}

                      <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                        +{task.pointsReward} XP
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-2 text-slate-600 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all"
                  title="حذف المهمة"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
