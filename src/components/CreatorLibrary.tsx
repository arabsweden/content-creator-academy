import React from 'react';
import { useApp } from '../context/AppContext';
import { Award, Youtube, ExternalLink, Sparkles, Globe } from 'lucide-react';

export const CreatorLibrary: React.FC = () => {
  const { creators } = useApp();

  // Find owner RAED SHIHAB
  const owner = creators.find(c => c.name.includes('RAED SHIHAB')) || creators[0];
  const otherCreators = creators.filter(c => c.id !== owner.id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
          <Award className="w-4 h-4 text-amber-400" />
          <span>مكتبة صناع المحتوى الملهمين والخبرات</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-100">
          نماذج عربية وعالمية ملهمة في صناعة المحتوى
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          تعرف على أسرار نجاح أبرز صناع المحتوى واستفد من نصائحهم العملية وتجاربهم الميدانية.
        </p>
      </div>

      {/* Founder Spotlight Card */}
      {owner && (
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/50 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-4 text-center">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-amber-500 mx-auto shadow-2xl shadow-amber-500/20">
                <img
                  src={owner.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'}
                  alt={owner.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="inline-block mt-3 px-3 py-1 bg-amber-500 text-slate-950 font-black text-xs rounded-full">
                صاحب المشروع - Arab Sweden
              </span>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div>
                <h3 className="text-2xl sm:text-4xl font-black text-slate-100">{owner.name}</h3>
                <p className="text-amber-400 font-bold text-sm mt-1">{owner.niche} • {owner.country}</p>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-amber-500/20">
                "{owner.caseStudy}"
              </p>

              <div className="bg-amber-500/10 p-4 rounded-2xl border border-amber-500/30">
                <span className="text-xs font-bold text-amber-400 block mb-1">ماذا نتعلم منه؟</span>
                <p className="text-sm font-bold text-slate-100">{owner.whatToLearn}</p>
              </div>

              <div className="pt-2">
                <a
                  href={owner.socialLinks?.youtube || 'https://youtube.com'}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-lg shadow-red-600/20 transition-all"
                >
                  <Youtube className="w-5 h-5" />
                  <span>زيارة القناة الرسمية Arab Sweden</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other Creators Grid */}
      <div className="space-y-4">
        <h3 className="font-black text-2xl text-slate-100 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span>صناع محتوى بارزون ننصح بمتابعتهم:</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherCreators.map(cr => (
            <div key={cr.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 hover:border-amber-500/30 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <img
                    src={cr.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'}
                    alt={cr.name}
                    className="w-16 h-16 rounded-2xl object-cover border border-amber-500/30 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-bold text-lg text-slate-100">{cr.name}</h4>
                    <p className="text-xs text-amber-400 font-semibold">{cr.country}</p>
                    <span className="text-[10px] text-slate-400 line-clamp-1">{cr.niche}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                  {cr.caseStudy}
                </p>

                <div className="bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 text-xs text-slate-200">
                  <span className="font-bold text-amber-400 block mb-0.5">ماذا نتعلم منه؟</span>
                  {cr.whatToLearn}
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={cr.socialLinks?.youtube || 'https://youtube.com'}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 font-bold text-xs transition-all"
                >
                  <Youtube className="w-4 h-4 text-red-500" />
                  <span>زيارة القناة / الحساب</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
