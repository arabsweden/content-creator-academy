import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Camera, Search, Filter, ExternalLink, ThumbsUp, ThumbsDown, DollarSign, Sparkles } from 'lucide-react';

export const EquipmentGuide: React.FC = () => {
  const { equipment } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(2000);

  const categories = [
    { id: 'all', label: 'جميع المعدات' },
    { id: 'mobile', label: 'الهواتف الذكية' },
    { id: 'camera', label: 'الكاميرات السينمائية' },
    { id: 'mic', label: 'الميكروفونات والصوت' },
    { id: 'lighting', label: 'الإضاءة والستوديو' },
    { id: 'support', label: 'الحوامل والمانع اهتزاز' },
  ];

  const filteredItems = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.specs.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesPrice = item.priceUsd <= maxPrice;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
          <Camera className="w-4 h-4 text-amber-400" />
          <span>دليل المعدات القابل للبحث والمقارنة</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-100">
          اختر المعدات المناسبة لميزانيتك ومجالك
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
          تذكر دائماً: لا توجد معدة "أفضل مطلقاً" لكل الأشخاص؛ بل الاختيار الذكي يعتمد على ميزانيتك، نوع محتواك (فلوج، استوديو، أو الشارع)، والاحتياج الحقيقي.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Search Box */}
          <div className="md:col-span-6 relative">
            <Search className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="ابحث عن هاتف، مايك، كاميرا، أو إضاءة..."
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl pr-11 pl-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Price Range Slider */}
          <div className="md:col-span-6 flex items-center gap-4 bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <div className="text-xs font-bold text-slate-300 shrink-0">
              السعر الأقصى: <span className="text-amber-400 font-extrabold">${maxPrice}</span>
            </div>
            <input
              type="range"
              min={50}
              max={2000}
              step={50}
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full accent-amber-500 bg-slate-900 h-2 rounded-lg cursor-pointer"
            />
          </div>

        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Equipment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:border-amber-500/30 transition-all flex flex-col justify-between">
            
            <div>
              {/* Image Banner */}
              <div className="relative h-48 bg-slate-950 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black text-amber-400 border border-amber-500/30">
                  ${item.priceUsd}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                <h3 className="font-black text-xl text-slate-100">{item.name}</h3>

                {/* Recommended Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {item.recommendedFor.map((rec, idx) => (
                    <span key={idx} className="text-[10px] font-bold bg-amber-500/10 text-amber-300 px-2.5 py-0.5 rounded-md border border-amber-500/20">
                      {rec}
                    </span>
                  ))}
                </div>

                {/* Specs List */}
                <div className="space-y-1 pt-2 border-t border-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">المواصفات الرئيسية:</span>
                  <ul className="space-y-1">
                    {item.specs.map((spec, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pros & Cons */}
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-800">
                  <div className="space-y-1">
                    <span className="font-bold text-emerald-400 flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3" /> المزايا:
                    </span>
                    <p className="text-slate-300 leading-tight">{item.pros[0]}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-bold text-red-400 flex items-center gap-1">
                      <ThumbsDown className="w-3 h-3" /> الملاحظات:
                    </span>
                    <p className="text-slate-400 leading-tight">{item.cons[0]}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Button */}
            <div className="p-6 pt-0">
              <a
                href={item.affiliateUrl || '#'}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-slate-950 border border-amber-500/30 hover:bg-amber-500 hover:text-slate-950 text-amber-400 font-bold text-xs transition-all"
              >
                <span>شراء عبر الرابط / تفاصيل</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
