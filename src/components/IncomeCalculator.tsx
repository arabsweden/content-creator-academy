import React, { useState } from 'react';
import { DollarSign, AlertCircle, TrendingUp, Calculator, PieChart, Sparkles } from 'lucide-react';

export const IncomeCalculator: React.FC = () => {
  // Calculator state
  const [monthlyViews, setMonthlyViews] = useState<number>(100000);
  const [adRpm, setAdRpm] = useState<number>(2.5); // $2.5 per 1000 views
  const [sponsorshipsCount, setSponsorshipsCount] = useState<number>(1);
  const [sponsorshipPrice, setSponsorshipPrice] = useState<number>(300);
  const [clientsCount, setClientsCount] = useState<number>(5);
  const [servicePrice, setServicePrice] = useState<number>(50);
  const [expenses, setExpenses] = useState<number>(100);
  const [taxRatePercentage, setTaxRatePercentage] = useState<number>(25); // 25% tax

  // Calculations
  const adIncome = Math.round((monthlyViews / 1000) * adRpm);
  const sponsorshipIncome = sponsorshipsCount * sponsorshipPrice;
  const servicesIncome = clientsCount * servicePrice;
  const grossIncome = adIncome + sponsorshipIncome + servicesIncome;

  const taxAmount = Math.round((grossIncome - expenses > 0 ? grossIncome - expenses : 0) * (taxRatePercentage / 100));
  const netIncome = grossIncome - expenses - taxAmount;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
          <Calculator className="w-4 h-4" />
          <span>حاسبة أرباح صناع المحتوى التفاعلية</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-100">
          احسب دخلك التقديري وتوقع أرباحك القادمة
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          أدخل أرقام مشاهداتك ورعاياتك وخدماتك للتعرف على القوة المالية الكامنة لتنويع أرباحك.
        </p>
      </div>

      {/* Main Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controls Column */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <h3 className="font-bold text-lg text-slate-100 border-b border-slate-800 pb-3 flex items-center gap-2">
            <SlidersIcon className="w-5 h-5 text-amber-400" />
            <span>بيانات المدخلات الشهرية:</span>
          </h3>

          {/* Views & Ad RPM */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-slate-300">عدد المشاهدات الشهرية المتوقعة:</span>
                <span className="text-amber-400 font-extrabold">{monthlyViews.toLocaleString()} مشاهدة</span>
              </div>
              <input
                type="range"
                min={10000}
                max={2000000}
                step={10000}
                value={monthlyViews}
                onChange={e => setMonthlyViews(Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-slate-300">سعر إعلانات المنصة (RPM لكل 1000 مشاهدة):</span>
                <span className="text-amber-400 font-extrabold">${adRpm}</span>
              </div>
              <input
                type="range"
                min={0.5}
                max={15}
                step={0.5}
                value={adRpm}
                onChange={e => setAdRpm(Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Sponsorships */}
          <div className="space-y-3 pt-2 border-t border-slate-800/80">
            <h4 className="text-xs font-bold text-slate-400 uppercase">الرعايات والإعلانات المباشرة:</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">عدد الرعايات شهرياً</label>
                <input
                  type="number"
                  min={0}
                  value={sponsorshipsCount}
                  onChange={e => setSponsorshipsCount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">سعر الرعاية الواحدة ($)</label>
                <input
                  type="number"
                  min={0}
                  value={sponsorshipPrice}
                  onChange={e => setSponsorshipPrice(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100"
                />
              </div>
            </div>
          </div>

          {/* Services & Digital Products */}
          <div className="space-y-3 pt-2 border-t border-slate-800/80">
            <h4 className="text-xs font-bold text-slate-400 uppercase">الخدمات والمنتجات الرقمية (مبيعات):</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">عدد المبيعات / العملاء</label>
                <input
                  type="number"
                  min={0}
                  value={clientsCount}
                  onChange={e => setClientsCount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">سعر الخدمة / الكورس ($)</label>
                <input
                  type="number"
                  min={0}
                  value={servicePrice}
                  onChange={e => setServicePrice(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100"
                />
              </div>
            </div>
          </div>

          {/* Expenses & Taxes */}
          <div className="space-y-3 pt-2 border-t border-slate-800/80">
            <h4 className="text-xs font-bold text-slate-400 uppercase">المصاريف والضرائب التقديرية:</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">المصاريف التشغيلية ($)</label>
                <input
                  type="number"
                  min={0}
                  value={expenses}
                  onChange={e => setExpenses(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">نسبة الضريبة التقديرية (%)</label>
                <input
                  type="number"
                  min={0}
                  max={60}
                  value={taxRatePercentage}
                  onChange={e => setTaxRatePercentage(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Results Output Column */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            <h3 className="font-black text-xl text-slate-100 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-amber-400" />
              <span>النتيجة التقديرية الشهرية:</span>
            </h3>

            {/* Total Net Income */}
            <div className="bg-slate-950/80 p-6 rounded-2xl border border-amber-500/30 text-center space-y-1">
              <span className="text-xs font-bold text-slate-400">صافي الدخل الأسبوعي/الشهري المتوقع</span>
              <div className="text-4xl sm:text-5xl font-black text-amber-400 tracking-tight">
                ${netIncome > 0 ? netIncome.toLocaleString() : 0}
              </div>
              <span className="text-[11px] text-amber-300 font-semibold block pt-1">
                (حوالي {(netIncome * 10.5).toLocaleString()} كرونة سويدية SEK / أو ما يعادلها محلياً)
              </span>
            </div>

            {/* Revenue Breakdown */}
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between p-3 rounded-xl bg-slate-950/50 border border-slate-800">
                <span className="text-slate-400">أرباح إعلانات المنصة:</span>
                <span className="font-bold text-slate-200">${adIncome}</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-950/50 border border-slate-800">
                <span className="text-slate-400">أرباح الرعايات المباشرة:</span>
                <span className="font-bold text-slate-200">${sponsorshipIncome}</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-950/50 border border-slate-800">
                <span className="text-slate-400">أرباح المبيعات والخدمات:</span>
                <span className="font-bold text-slate-200">${servicesIncome}</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-950/50 border border-slate-800">
                <span className="text-slate-400">إجمالي الدخل قبل الخصم:</span>
                <span className="font-bold text-emerald-400">${grossIncome}</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-950/50 border border-slate-800 text-red-300">
                <span>خصم المصاريف والضرائب:</span>
                <span className="font-bold">-${expenses + taxAmount}</span>
              </div>
            </div>

            {/* Educational Disclaimer */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-amber-400">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>تنبيه تقديري تعليمي غير مضمون:</span>
              </div>
              <p className="leading-relaxed text-[11px] opacity-90">
                هذه النتيجة هي تقدير تعليمي تقريبي لتوضيح جدوى المحتوى، وتعتمد النتائج الحقيقية على تفاعل الجمهور، الجغرافيا، ونوع النيتش والمواسم الإعلانية.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );

  function SlidersIcon(props: any) {
    return (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="2" x2="6" y1="14" y2="14"/><line x1="10" x2="14" y1="8" y2="8"/><line x1="18" x2="22" y1="16" y2="16"/>
      </svg>
    );
  }
};
