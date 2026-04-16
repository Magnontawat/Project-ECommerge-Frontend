import React from 'react';

export default function MembershipBanner({ isLoggedIn = false }) {
  // ไม่แสดงถ้าทำการล็อคอินแล้ว
  if (isLoggedIn) return null;

  return (
    <section className="bg-[#EEF2FF] rounded-[24px] sm:rounded-[32px] border border-[#E0E7FF] mt-4 sm:mt-8
                        p-6 sm:p-10 lg:p-12
                        flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6
                        shadow-[0_4px_20px_rgba(238,242,255,0.8)]">
      <div className="max-w-xl">
        <h2 className="text-2xl sm:text-[32px] font-extrabold text-[#0F172A] mb-3 tracking-tight">Become a Member</h2>
        <p className="text-[#475569] text-sm leading-relaxed font-medium">
          Join Shopter today to unlock exclusive benefits, early access to new drops, and personalized recommendations.
        </p>
      </div>
      <button className="bg-[#0F172A] text-white font-bold py-4 px-10 rounded-full hover:bg-black transition-colors shadow-lg hover:-translate-y-1 shrink-0 w-full sm:w-auto">
        Register Now
      </button>
    </section>
  );
}
