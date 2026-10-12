import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Heart, Smartphone, ShieldCheck, Globe, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <footer className="bg-slate-950 border-t border-amber-500/20 text-slate-400 py-12 px-4 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-black text-xl">
                أ
              </div>
              <h3 className="font-black text-2xl text-slate-100">أكاديمية صانع المحتوى</h3>
            </div>
            <p className="text-amber-400 font-extrabold text-sm">
              الشعار: "من أول فكرة إلى أول دخل"
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              منصة تعليمية عربية متكاملة تساعد المبتدئ والمتوسط والمحترف على خوض رحلة صناعة المحتوى، خوارزميات المنصات، جودة التصوير، والجانب القانوني والمالي.
            </p>
            <div className="text-xs text-slate-300 font-bold">
              صاحب المشروع والمسؤول: <span className="text-amber-400 font-black">RAED SHIHAB – Arab Sweden Since 2007</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-2">
              <h4 className="font-bold text-slate-200 text-sm mb-2">الأقسام الرئيسية</h4>
              <button onClick={() => setCurrentView('quiz')} className="block text-slate-400 hover:text-amber-400 text-right">
                اختبار المستوى (25 سؤالاً)
              </button>
              <button onClick={() => setCurrentView('stages')} className="block text-slate-400 hover:text-amber-400 text-right">
                المسارات التعليمية الـ 12
              </button>
              <button onClick={() => setCurrentView('ai-studio')} className="block text-slate-400 hover:text-amber-400 text-right">
                استوديو الذكاء الاصطناعي
              </button>
              <button onClick={() => setCurrentView('income')} className="block text-slate-400 hover:text-amber-400 text-right">
                حاسبة الدخل والأرباح
              </button>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-200 text-sm mb-2">الموارد والدليل</h4>
              <button onClick={() => setCurrentView('equipment')} className="block text-slate-400 hover:text-amber-400 text-right">
                دليل المعدات والكاميرات
              </button>
              <button onClick={() => setCurrentView('creators')} className="block text-slate-400 hover:text-amber-400 text-right">
                مكتبة صناع المحتوى
              </button>
              <button onClick={() => setCurrentView('legal')} className="block text-slate-400 hover:text-amber-400 text-right">
                الجانب القانوني (Skatteverket)
              </button>
              <button onClick={() => setCurrentView('store')} className="block text-slate-400 hover:text-amber-400 text-right">
                المتجر والخدمات المدفوعة
              </button>
            </div>
          </div>

          {/* PWA & Install CTA */}
          <div className="md:col-span-3 space-y-3 bg-slate-900 border border-slate-800 p-5 rounded-3xl">
            <h4 className="font-bold text-sm text-slate-200 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-amber-400" />
              <span>التثبيت كتطبيق (PWA)</span>
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              تطبيق متجاوب يعمل على الهاتف والكمبيوتر بنفس الكفاءة مع دعم الوضع الليلي وتخزين تقدمك.
            </p>
            <button
              onClick={() => alert('التطبيق جاهز كـ PWA! يمكنك إضافته لشاشتك الرئيسية من إعدادات المتصفح.')}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
            >
              تثبيت على الهاتف / الجهاز
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800/80 text-xs text-center text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 أكاديمية صانع المحتوى • جميع الحقوق محفوظة لـ RAED SHIHAB</p>
          <p className="flex items-center gap-1 text-slate-400">
            <span>صُنع بشغف لخدمة صناع المحتوى العربي</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </p>
        </div>

      </div>
    </footer>
  );
};
