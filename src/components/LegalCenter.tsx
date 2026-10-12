import React from 'react';
import { legalGuides } from '../data/mockData';
import { ShieldCheck, AlertOctagon, FileCheck, Scale, AlertTriangle, BookOpen } from 'lucide-react';

export const LegalCenter: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>مركز الجوانب القانونية والضريبية لصناع المحتوى</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-100">
          احمِ قناتك وعملك قانونياً وضريبياً
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          دليلك الشامل لتأسيس عملك التجاري، التعامل مع مصلحة الضرائب (Skatteverket)، وحماية حقوق الملكية والخصوصية.
        </p>
      </div>

      {/* Critical Legal Disclaimer Box */}
      <div className="p-6 rounded-3xl bg-amber-500/10 border-2 border-amber-500/40 text-amber-300 text-sm space-y-2 shadow-xl">
        <div className="flex items-center gap-2 font-black text-amber-400 text-base">
          <AlertOctagon className="w-5 h-5 text-amber-400 shrink-0" />
          <span>تنويه وتبرئة ذمة قانونية رسمية:</span>
        </div>
        <p className="leading-relaxed text-xs sm:text-sm text-slate-200">
          المعلومات الواردة في هذا القسم هي لأغراض تعليمية وإرشادية عامة فقط لمساعدة صناع المحتوى على فهم المفاهيم الأساسية، ولا تُعتبر استشارة قانونية أو ضريبية أو مالية رسمية بديلة عن مراجعة مستشار قانوني أو محاسب قانوني معتمد (Auktoriserad Revisor / Skatteverket).
        </p>
      </div>

      {/* Legal Guides List */}
      <div className="space-y-6">
        {legalGuides.map(guide => (
          <div key={guide.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
            
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold shrink-0">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                  {guide.category === 'sweden' ? 'السويد وأوروبا' : guide.category === 'copyright' ? 'الملكية الفكرية' : 'الضرائب والعقود'}
                </span>
                <h3 className="font-black text-xl text-slate-100 mt-1">{guide.title}</h3>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-medium">
              {guide.summary}
            </p>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-amber-400 block">التفاصيل والتوجيهات العملية:</span>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {guide.details}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
