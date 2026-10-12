import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sliders, Plus, Users, ShoppingBag, BookOpen, Camera, Bell, Check, ShieldAlert } from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const {
    user,
    stages,
    creators,
    equipment,
    products,
    addCreator,
    addEquipment,
    addProduct,
    addStage,
    loginWithEmail
  } = useApp();

  const [adminPin, setAdminPin] = useState('');
  const [activeTab, setActiveTab] = useState<'stats' | 'stages' | 'creators' | 'equipment' | 'store'>('stats');

  // Creator Form state
  const [creatorName, setCreatorName] = useState('');
  const [creatorNiche, setCreatorNiche] = useState('');
  const [creatorAdvice, setCreatorAdvice] = useState('');

  // Equipment Form state
  const [eqName, setEqName] = useState('');
  const [eqPrice, setEqPrice] = useState(150);

  // Store Product Form state
  const [prodTitle, setProdTitle] = useState('');
  const [prodPrice, setProdPrice] = useState(99);

  // Check if admin
  if (user.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-slate-900 border border-slate-800 rounded-3xl text-center space-y-4 shadow-2xl">
        <ShieldAlert className="w-12 h-12 text-amber-400 mx-auto" />
        <h3 className="font-black text-xl text-slate-100">لوحة تحكم إدارية محمية</h3>
        <p className="text-xs text-slate-400">الرجاء تسجيل الدخول بحساب المسؤول (RAED SHIHAB) للوصول.</p>
        <div className="space-y-2">
          <input
            type="password"
            placeholder="رمز المرور الإداري السريع"
            value={adminPin}
            onChange={e => setAdminPin(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 text-center"
          />
          <button
            onClick={() => {
              if (adminPin === '2026' || adminPin.toLowerCase() === 'admin') {
                loginWithEmail('raed@academy.com', 'RAED SHIHAB');
              } else {
                alert('رمز مرور غير صحيح');
              }
            }}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl"
          >
            تفعيل صلاحية المسؤول
          </button>
        </div>
      </div>
    );
  }

  const handleAddCreator = (e: React.FormEvent) => {
    e.preventDefault();
    if (!creatorName) return;
    addCreator({
      id: `c-${Date.now()}`,
      name: creatorName,
      platform: 'YouTube & TikTok',
      followers: '+500K متابع',
      niche: creatorNiche || 'صناعة المحتوى',
      storySummary: 'صانع محتوى متميز انضم حديثاً للأكاديمية.',
      keyAdvice: creatorAdvice || 'استمر واستثمر في تطوير مهاراتك يومياً.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
      youtubeChannel: 'https://youtube.com'
    });
    setCreatorName('');
    setCreatorNiche('');
    setCreatorAdvice('');
    alert('تمت إضافة صانع المحتوى للمكتبة بنجاح!');
  };

  const handleAddEquipment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eqName) return;
    addEquipment({
      id: `eq-${Date.now()}`,
      name: eqName,
      category: 'camera',
      priceUsd: eqPrice,
      recommendedFor: ['المبتدئين', 'صناع الفلوجات'],
      specs: ['دقة عالية HD/4K', 'جودة ممتازة'],
      pros: ['سعر مناسب', 'سهل الاستخدام'],
      cons: ['يحتاج لإضاءة جيدة'],
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500'
    });
    setEqName('');
    alert('تمت إضافة المعدة للدليل بنجاح!');
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodTitle) return;
    addProduct({
      id: `p-${Date.now()}`,
      title: prodTitle,
      category: 'course',
      price: prodPrice,
      description: 'دورة أو خدمة ممتازة مضافة من الإدارة.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500',
      features: ['محتوى حصري', 'تحديثات مستمرة', 'دعم مباشر']
    });
    setProdTitle('');
    alert('تمت إضافة المنتج للمتجر بنجاح!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/30">
              صلاحية المسؤول (Admin)
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-100 mt-2">
              لوحة إدارة المحتوى والمنتجات
            </h2>
          </div>
          <div className="text-xs text-slate-400">
            أهلاً بك <span className="text-amber-400 font-bold">{user.name}</span>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs shrink-0 transition-all ${
            activeTab === 'stats' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-300'
          }`}
        >
          الإحصائيات والملخص
        </button>

        <button
          onClick={() => setActiveTab('creators')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs shrink-0 transition-all ${
            activeTab === 'creators' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-300'
          }`}
        >
          إضافة صناع محتوى ({creators.length})
        </button>

        <button
          onClick={() => setActiveTab('equipment')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs shrink-0 transition-all ${
            activeTab === 'equipment' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-300'
          }`}
        >
          إضافة معدات ({equipment.length})
        </button>

        <button
          onClick={() => setActiveTab('store')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs shrink-0 transition-all ${
            activeTab === 'store' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-300'
          }`}
        >
          إضافة منتجات متجر ({products.length})
        </button>
      </div>

      {/* Tab 1: Stats */}
      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
            <span className="text-xs text-slate-400 font-bold">عدد الطلاب المسجلين</span>
            <div className="text-3xl font-black text-amber-400">1,240 طالب</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
            <span className="text-xs text-slate-400 font-bold">إجمالي المبيعات</span>
            <div className="text-3xl font-black text-emerald-400">$18,450</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
            <span className="text-xs text-slate-400 font-bold">عدد المراحل التعليمية</span>
            <div className="text-3xl font-black text-purple-300">12 مرحلة</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
            <span className="text-xs text-slate-400 font-bold">نسبة إكمال الكورسات</span>
            <div className="text-3xl font-black text-blue-300">78%</div>
          </div>
        </div>
      )}

      {/* Tab 2: Creators */}
      {activeTab === 'creators' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl max-w-xl space-y-4">
          <h3 className="font-bold text-lg text-slate-100">إضافة صانع محتوى جديد للمكتبة</h3>
          <form onSubmit={handleAddCreator} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">اسم صانع المحتوى</label>
              <input
                type="text"
                required
                value={creatorName}
                onChange={e => setCreatorName(e.target.value)}
                placeholder="مثال: أحمد حسن"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">المجال / النيتش</label>
              <input
                type="text"
                value={creatorNiche}
                onChange={e => setCreatorNiche(e.target.value)}
                placeholder="تكنولوجيا ومراجعات"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">النصيحة الذهبية</label>
              <textarea
                rows={2}
                value={creatorAdvice}
                onChange={e => setCreatorAdvice(e.target.value)}
                placeholder="اكتب نصيحته..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100"
              />
            </div>

            <button type="submit" className="w-full py-3 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl">
              إضافة الصانع للمكتبة
            </button>
          </form>
        </div>
      )}

      {/* Tab 3: Equipment */}
      {activeTab === 'equipment' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl max-w-xl space-y-4">
          <h3 className="font-bold text-lg text-slate-100">إضافة معدة جديدة للدليل</h3>
          <form onSubmit={handleAddEquipment} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">اسم المعدة / المايك / الكاميرا</label>
              <input
                type="text"
                required
                value={eqName}
                onChange={e => setEqName(e.target.value)}
                placeholder="مثال: Sony ZV-E10 II"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">السعر التقريبي ($)</label>
              <input
                type="number"
                value={eqPrice}
                onChange={e => setEqPrice(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100"
              />
            </div>

            <button type="submit" className="w-full py-3 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl">
              إضافة المعدة للدليل
            </button>
          </form>
        </div>
      )}

      {/* Tab 4: Store */}
      {activeTab === 'store' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl max-w-xl space-y-4">
          <h3 className="font-bold text-lg text-slate-100">إضافة منتج أو خدمة جديدة للمتجر</h3>
          <form onSubmit={handleAddProduct} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">عنوان الخدمة / الكورس</label>
              <input
                type="text"
                required
                value={prodTitle}
                onChange={e => setProdTitle(e.target.value)}
                placeholder="مثال: ورشة احتراف إضاءة الستوديو"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">السعر ($)</label>
              <input
                type="number"
                value={prodPrice}
                onChange={e => setProdPrice(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100"
              />
            </div>

            <button type="submit" className="w-full py-3 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl">
              إضافة للمتجر
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
