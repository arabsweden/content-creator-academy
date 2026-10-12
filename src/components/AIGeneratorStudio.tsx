import React, { useState } from 'react';
import { Sparkles, Copy, Check, Send, Bot, RefreshCw, Layers, Calendar, Zap, AlertTriangle } from 'lucide-react';

export const AIGeneratorStudio: React.FC = () => {
  const [activeTool, setActiveTool] = useState<string>('hook');
  const [topicPrompt, setTopicPrompt] = useState<string>('');
  const [platform, setPlatform] = useState<string>('YouTube');
  const [niche, setNiche] = useState<string>('عام');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const tools = [
    { id: 'hook', name: 'كاتب الهوكات (Hooks)', desc: 'جمل افتتاحية تخطف المشاهد في أول 3 ثوانٍ' },
    { id: 'script', name: 'كاتب السيناريو الكامل', desc: 'سيناريو مقسم (Hook, Body, CTA) جاهز للتصوير' },
    { id: 'ideas', name: 'مولد الأفكار المبتكرة', desc: '5 أفكار محتوى فيروزية لنفس موضوعك' },
    { id: 'calendar', name: 'تقويم الـ 30 يوماً', desc: 'جدول نشر متكامل لمدة شهر كامل' },
    { id: 'title', name: 'العناوين والوصف (SEO)', desc: 'عناوين عالية النقر ووصف محسّن للبحث' },
    { id: 'thumbnail', name: 'اقتراح الصور المصغرة', desc: 'نصوص وتعابير الوجه الموصى بها للثمنيل' },
    { id: 'cta', name: 'صانع الـ Call To Action', desc: 'دعوات عمل ذكية لزيادة المتابعات والمبيعات' },
    { id: 'hashtags', name: 'الكلمات المفتاحية والهاشتاغ', desc: 'أهم الهاشتاغات المستهدفة لمنشورك' },
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicPrompt.trim()) return;

    setIsLoading(true);
    setErrorMessage('');
    setAiResult('');

    try {
      const formattedPrompt = `
الموضوع / الفكرة: ${topicPrompt}
المنصة المستهدفة: ${platform}
النيتش / المجال: ${niche}
الأداة المطلوبة: ${tools.find(t => t.id === activeTool)?.name}

الرجاء كتابة المحتوى المطلوب بأعلى جودة باللغة العربية بأسلوب احترافي وعصري مناسب لصناع المحتوى.
      `;

      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: formattedPrompt,
          toolType: activeTool,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'حدث خطأ أثناء توليد المحتوى');
      }

      setAiResult(data.result);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'تعذر الاتصال بخادم الذكاء الاصطناعي. الرجاء المحاولة لاحقاً.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!aiResult) return;
    navigator.clipboard.writeText(aiResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>استوديو الذكاء الاصطناعي الخاص بالأكاديمية (Gemini 3.6 Flash)</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-100">
          مساعدك الذكي لصناعة المحتوى التفاعلي
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          ولد أفكارك، أسرار الهوكات، والسيناريو والتقويم الشهري في أجزاء من الثانية لمضاعفة إنتاجيتك.
        </p>
      </div>

      {/* Tools Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {tools.map(tool => {
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`p-4 rounded-2xl border text-right transition-all ${
                isActive
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-lg shadow-amber-500/20'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-amber-500/40 hover:bg-slate-900/80'
              }`}
            >
              <div className="font-bold text-sm mb-1">{tool.name}</div>
              <div className={`text-[11px] leading-tight ${isActive ? 'text-slate-900 opacity-90' : 'text-slate-400'}`}>
                {tool.desc}
              </div>
            </button>
          );
        })}
      </div>

      {/* Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Form Controls Column */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
          <h3 className="font-bold text-lg text-slate-100 border-b border-slate-800 pb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>إعدادات التوليد:</span>
          </h3>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                موضوع الفيديو أو الفكرة الرئيسية *
              </label>
              <textarea
                rows={3}
                required
                value={topicPrompt}
                onChange={e => setTopicPrompt(e.target.value)}
                placeholder="مثال: كيف أختار أول مايك للتصوير بالشارع بدون ميزانية كبيرة؟"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">المنصة المستهدفة</label>
                <select
                  value={platform}
                  onChange={e => setPlatform(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200"
                >
                  <option value="YouTube Long">YouTube (طويل)</option>
                  <option value="Shorts & Reels">Shorts / Reels / TikTok</option>
                  <option value="Facebook">Facebook</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Podcast">Podcast / صوتي</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">مجال المحتوى (Niche)</label>
                <select
                  value={niche}
                  onChange={e => setNiche(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200"
                >
                  <option value="تعليم وتطوير">تعليم وتطوير</option>
                  <option value="تقنية ومعدات">تقنية ومعدات</option>
                  <option value="فلوجات وسفر">فلوجات وسفر</option>
                  <option value="مال وأعمال">مال وأعمال</option>
                  <option value="صحة ولياقة">صحة ولياقة</option>
                  <option value="عام">عام</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !topicPrompt.trim()}
              className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                isLoading || !topicPrompt.trim()
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/25'
              }`}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>جاري توليد المحتوى بالذكاء الاصطناعي...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>توليد المحتوى الآن</span>
                </>
              )}
            </button>
          </form>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>تنبيه: مراجعة ودقة المحتوى وتطعيمه بشخصيتك وخبرتك الواقعية قبل النشر تضمن لك أقصى تفاعل.</span>
          </div>
        </div>

        {/* AI Output Result Column */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl flex flex-col justify-between min-h-[420px]">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
                <Bot className="w-5 h-5 text-amber-400" />
                <span>نتيجة المحتوى المولد:</span>
              </h3>

              {aiResult && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-amber-400 hover:bg-slate-800"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'تم النسخ!' : 'نسخ النص'}</span>
                </button>
              )}
            </div>

            {errorMessage && (
              <div className="p-4 rounded-2xl bg-red-500/15 border border-red-500 text-red-300 text-xs font-bold">
                {errorMessage}
              </div>
            )}

            {isLoading ? (
              <div className="py-20 text-center space-y-3">
                <RefreshCw className="w-8 h-8 animate-spin text-amber-400 mx-auto" />
                <p className="text-sm text-slate-300 font-bold">يقوم نموذج Gemini 3.6 Flash بصياغة أفضل نتيجة لك...</p>
              </div>
            ) : aiResult ? (
              <div className="prose prose-invert max-w-none text-slate-200 text-sm leading-relaxed whitespace-pre-line bg-slate-950 p-5 rounded-2xl border border-slate-800 max-h-[500px] overflow-y-auto">
                {aiResult}
              </div>
            ) : (
              <div className="py-20 text-center text-slate-500 space-y-2">
                <Sparkles className="w-10 h-10 mx-auto text-slate-700" />
                <p className="text-sm">أدخل موضوعك واضغط 'توليد المحتوى الآن' للبدء</p>
              </div>
            )}
          </div>

          <div className="text-[10px] text-slate-500 text-center pt-2 border-t border-slate-800/60">
            أكاديمية صانع المحتوى • جميع الحقوق محفوظة لـ RAED SHIHAB
          </div>
        </div>

      </div>

    </div>
  );
};
