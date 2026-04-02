'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push('/'); // Redirecting to main dashboard
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f6f9fc] via-[#eef2f6] to-[#e2e8f0] font-sans relative overflow-hidden">
      {/* Decorative Pastel Orbs mimicking the sample's soft colorful bottom/top */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-200/40 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-200/30 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-[20%] w-[400px] h-[300px] rounded-full bg-amber-100/40 blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-[400px] p-8 md:p-10 flex flex-col items-center z-10"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-12">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-20 h-20 bg-blue-600 rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-blue-500/30 mb-5 relative overflow-hidden"
          >
            {/* Logo Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
            <ShieldCheck className="w-10 h-10 text-white relative z-10" />
          </motion.div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-1">HQ IP Bot</h1>
          <p className="text-[13px] font-medium text-slate-500">Hệ thống Quản trị Hải quan</p>
        </div>

        {/* Login Form Section */}
        <div className="w-full bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50">
          <div className="mb-8">
            <h2 className="text-[22px] font-bold text-slate-900 mb-2">Đăng nhập</h2>
            <p className="text-[13px] font-medium text-slate-500">
              Sử dụng tài khoản Gmail công vụ để tiếp tục
            </p>
          </div>

          <div className="space-y-4">
            {/* Gmail Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full relative group flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-blue-600/20 transition-all overflow-hidden focus:ring-4 focus:ring-blue-100 active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {isLoading ? (
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              ) : (
                <img src="https://authjs.dev/img/providers/google.svg" alt="Google" className="w-5 h-5 bg-white rounded-full p-[2px]" />
              )}
              <span className="text-[15px]">
                {isLoading ? 'Đang xác thực...' : 'Đăng nhập với Google'}
              </span>
            </button>
            
            {/* Disclaimer */}
            <p className="text-center text-[12px] font-medium text-slate-400 mt-6 px-4">
              Hệ thống chỉ cấp quyền cho địa chỉ email có đuôi <br/>
              <span className="text-blue-600 font-semibold">@customs.gov.vn</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
