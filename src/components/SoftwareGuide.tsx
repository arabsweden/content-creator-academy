import React from 'react';
import { softwareApps } from '../data/mockData';
import { Monitor, Check, ExternalLink } from 'lucide-react';

export const SoftwareGuide: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
          <Monitor className="w-4 h-4 text-amber-400" />
          <span>مكتبة البرامج والتطبيقات الموصى بها</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-100">
          تطبيقات المونتاج، التصميم، وتحسين الصوت
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          اختر البرامج الأنسب لجهازك ولإنتاجيتك اليومية سواءً كنت تستخدم الهاتف أو الكمبيوتر.
        </p>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {softwareApps.map(sw => (
          <div key={sw.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 hover:border-amber-500/30 transition-all flex flex-col justify-between">
            
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/20">
                    {sw.category === 'video' ? 'مونتاج فيديو' : sw.category === 'design' ? 'تصميم صور' : sw.category === 'audio' ? 'صوت وهندسة' : 'ذكاء اصطناعي'}
                  </span>
                  <h3 className="font-black text-xl text-slate-100 mt-2">{sw.name}</h3>
                </div>

                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                  sw.pricing.includes('مجاني') ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {sw.pricing}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                {sw.description}
              </p>

              {/* Supported Platforms */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {sw.platforms.map((p, idx) => (
                  <span key={idx} className="text-[10px] font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md">
                    {p}
                  </span>
                ))}
              </div>

              {/* Key Features List */}
              <div className="space-y-1 pt-2 border-t border-slate-800">
                <span className="text-[11px] font-bold text-slate-400">أبرز المزايا:</span>
                <ul className="space-y-1">
                  {sw.keyFeatures.map((feat, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2">
              <div className="text-[10px] text-slate-400 font-semibold bg-slate-950 p-2 rounded-xl">
                💡 نصيحة التصدير: <span className="text-amber-300">{sw.exportTips}</span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
