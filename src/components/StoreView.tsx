import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShoppingBag,
  ShoppingCart,
  Check,
  Tag,
  CreditCard,
  Trash2,
  Sparkles,
  ShieldCheck,
  Lock,
  ArrowLeft
} from 'lucide-react';

export const StoreView: React.FC = () => {
  const {
    products,
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    couponCode,
    applyCoupon,
    discountPercent,
    processCheckout,
    user
  } = useApp();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponMessage, setCouponMessage] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'swish'>('swish');
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const finalTotal = subtotal - discountAmount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const ok = applyCoupon(inputCoupon);
    if (ok) {
      setCouponMessage(`تم تطبيق كود الخصم بنجاح! خصم ${discountPercent}%`);
    } else {
      setCouponMessage('كود الخصم غير صحيح أو منتهي الصلاحية');
    }
  };

  const handlePay = () => {
    if (cart.length === 0) return;
    const ok = processCheckout(paymentMethod);
    if (ok) {
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 6000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
          <ShoppingBag className="w-4 h-4 text-amber-400" />
          <span>المتجر والخدمات المدفوعة والاستشارات</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-100">
          استثمر في نموك وسرّع نتائجك
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          احصل على دورات متقدمة، استشارات فردية مع RAED SHIHAB، وقوالب جاهزة لخدمة صانعي المحتوى.
        </p>
      </div>

      {/* Main Grid: Products List + Cart Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Products Column */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="font-black text-2xl text-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>المنتجات والخدمات المتاحة:</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {products.map(prod => {
              const inCart = cart.some(item => item.product.id === prod.id);
              const isPurchased = user.purchasedProducts.includes(prod.id);

              return (
                <div key={prod.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 hover:border-amber-500/30 transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="relative aspect-video bg-slate-950 rounded-2xl overflow-hidden">
                      <img src={prod.image} alt={prod.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <span className="absolute top-3 left-3 bg-slate-950/90 text-amber-400 px-3 py-1 rounded-full text-xs font-black border border-amber-500/30">
                        ${prod.price}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                        {prod.category === 'membership' ? 'عضوية VIP' : prod.category === 'consultation' ? 'استشارة خاصة' : 'دورة متقدمة'}
                      </span>
                      <h4 className="font-bold text-lg text-slate-100 mt-1">{prod.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{prod.description}</p>
                    </div>

                    <ul className="space-y-1.5 pt-2 border-t border-slate-800">
                      {prod.features.map((feat, idx) => (
                        <li key={idx} className="text-xs text-slate-300 flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-800">
                    {isPurchased ? (
                      <div className="w-full py-2.5 bg-emerald-500/20 text-emerald-300 text-center font-bold text-xs rounded-xl border border-emerald-500/30">
                        تم الشراء وتفعيل الوصول!
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(prod)}
                        className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                          inCart
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                        }`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>{inCart ? 'تمت الإضافة للسلة (إضافة أخرى)' : 'إضافة إلى سلة الشراء'}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cart & Checkout Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl sticky top-28">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-black text-xl text-slate-100 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-amber-400" />
                <span>سلة الشراء ({cart.length})</span>
              </h3>

              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-slate-400 hover:text-red-400 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>تفريغ السلة</span>
                </button>
              )}
            </div>

            {cart.length === 0 ? (
              <div className="py-12 text-center text-slate-500 space-y-2">
                <ShoppingBag className="w-12 h-12 mx-auto text-slate-700" />
                <p className="text-sm">سلتك فارغة حالياً. اضغط 'إضافة' لشراء خدمة أو دورة.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Cart Items List */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {cart.map(item => (
                    <div key={item.product.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-950 border border-slate-800">
                      <div>
                        <p className="font-bold text-xs text-slate-200">{item.product.title}</p>
                        <span className="text-[10px] text-slate-400">${item.product.price} × {item.quantity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-xs text-amber-400">${item.product.price * item.quantity}</span>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-slate-500 hover:text-red-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon Code Input */}
                <form onSubmit={handleApplyCoupon} className="space-y-2 pt-2 border-t border-slate-800">
                  <label className="block text-xs font-bold text-slate-300">هل لديك كود خصم؟ (جرب: RAED50)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={e => setInputCoupon(e.target.value)}
                      placeholder="أدخل الكود هنا"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs shrink-0"
                    >
                      تطبيق
                    </button>
                  </div>
                  {couponMessage && (
                    <p className={`text-[11px] font-bold ${discountPercent > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {couponMessage}
                    </p>
                  )}
                </form>

                {/* Price Totals */}
                <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>المجموع الفرعي:</span>
                    <span className="font-bold text-slate-200">${subtotal}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-emerald-400 font-bold">
                      <span>الخصم المطبق ({discountPercent}%):</span>
                      <span>-${discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-black text-slate-100 pt-2 border-t border-slate-800">
                    <span>الإجمالي النهائي:</span>
                    <span className="text-amber-400">${finalTotal}</span>
                  </div>
                </div>

                {/* Payment Method Selector (Swish / Stripe) */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <label className="block text-xs font-bold text-slate-300">طريقة الدفع آمنة ومضمونة:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('swish')}
                      className={`p-3 rounded-xl border text-center font-bold text-xs transition-all ${
                        paymentMethod === 'swish'
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      Swish (السويد)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('stripe')}
                      className={`p-3 rounded-xl border text-center font-bold text-xs transition-all ${
                        paymentMethod === 'stripe'
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      بطاقة ائتمان Stripe
                    </button>
                  </div>
                </div>

                {isSuccess && (
                  <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500 text-emerald-300 text-xs font-bold space-y-1">
                    <p>🎉 تم الدفع وتفعيل الوصول بنجاح!</p>
                    <p className="text-[10px] text-emerald-400">ستجد دوراتك وخدماتك في لوحتك الخاصة (+300 نقطة).</p>
                  </div>
                )}

                <button
                  onClick={handlePay}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 transition-all transform hover:-translate-y-0.5"
                >
                  تأكيد وإتمام الدفع الآمن (${finalTotal})
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
