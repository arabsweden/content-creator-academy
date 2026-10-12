import React from 'react';
import { useApp } from '../context/AppContext';
import { Compass, BookOpen, MessagesSquare, Sparkles, ShoppingBag, LayoutDashboard, Sliders } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { currentView, setCurrentView, user, cart } = useApp();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const bottomItems = [
    { id: 'home', label: 'الرئيسية', icon: Compass },
    { id: 'stages', label: 'المسارات', icon: BookOpen },
    { id: 'community', label: 'المجتمع', icon: MessagesSquare },
    { id: 'ai-studio', label: 'ذكاء AI', icon: Sparkles, badge: 'جديد' },
    { id: 'store', label: 'المتجر', icon: ShoppingBag, badgeCount: cartCount },
    { id: 'dashboard', label: 'لوحتي', icon: LayoutDashboard },
  ];

  if (user.role === 'admin') {
    bottomItems.push({ id: 'admin', label: 'الإدارة', icon: Sliders });
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 xl:hidden bg-slate-950/95 backdrop-blur-lg border-t border-amber-500/20 px-2 py-1.5 shadow-2xl">
      <div className="flex items-center justify-around">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                isActive
                  ? 'text-amber-400 font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                {item.badgeCount && item.badgeCount > 0 ? (
                  <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] font-extrabold px-1 rounded-full">
                    {item.badgeCount}
                  </span>
                ) : null}
              </div>
              <span className="text-[10px] mt-0.5 font-medium">{item.label}</span>
              {isActive && (
                <span className="w-1 h-1 bg-amber-400 rounded-full mt-0.5 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
