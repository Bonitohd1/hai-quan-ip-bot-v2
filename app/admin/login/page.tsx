'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ShieldCheck, Fingerprint, ChevronRight, Globe } from 'lucide-react';
import Link from 'next/link';

export default function AdminLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Mock Google Login for UI demonstration
  const handleGoogleLogin = () => {
    setIsLoading(true);
    // In real implementation: signIn('google')
    setTimeout(() => {
      router.push('/admin/documents');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#020617] relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,#1e1b4b_0%,transparent_50%)]" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,#1e1b4b_0%,transparent_50%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 blur-[120px] rounded-full" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" />

      <div className="w-full max-w-lg relative z-10 fade-in">
        {/* Elite Branding */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2.5rem] bg-gradient-to-br from-[#1a2b56] to-[#0f172a] shadow-2xl mb-8 relative border border-white/10 group">
             <ShieldCheck className="w-12 h-12 text-yellow-400 group-hover:scale-110 transition-transform duration-500" />
             <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-[#020617] border-2 border-yellow-400/50 flex items-center justify-center shadow-lg">
                <Fingerprint className="w-5 h-5 text-yellow-500" />
             </div>
             {/* Glowing Pulse */}
             <div className="absolute inset-0 rounded-[2.5rem] bg-yellow-400/20 animate-pulse blur-xl -z-10" />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter mb-3 uppercase">Admin Portal</h1>
          <div className="flex items-center justify-center gap-3">
             <div className="h-px w-8 bg-gradient-to-r from-transparent to-yellow-400/50" />
             <p className="text-yellow-400 font-bold text-[10px] uppercase tracking-[0.4em]">Internal Security System</p>
             <div className="h-px w-8 bg-gradient-to-l from-transparent to-yellow-400/50" />
          </div>
        </div>

        {/* Login Container */}
        <div className="bg-white/5 backdrop-blur-3xl rounded-[3rem] p-12 border border-white/10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)] relative group overflow-hidden">
           {/* Visual Flourish */}
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-50" />
           
           <div className="space-y-10">
              <div className="text-center space-y-2">
                 <h2 className="text-xl font-black text-white">Xác thực quyền quản trị</h2>
                 <p className="text-slate-400 text-xs font-medium">Sử dụng tài khoản nội bộ Google Workspace để truy cập</p>
              </div>

              <div className="space-y-4">
                 <button
                   onClick={handleGoogleLogin}
                   disabled={isLoading}
                   className="w-full flex items-center justify-between px-8 py-5 bg-white hover:bg-slate-100 text-[#020617] rounded-3xl font-black text-sm transition-all duration-500 shadow-xl hover:shadow-white/10 active:scale-[0.98] group/btn"
                 >
                    <div className="flex items-center gap-4">
                       <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shadow-inner group-hover/btn:rotate-12 transition-transform">
                          <img src="https://authjs.dev/img/providers/google.svg" alt="Google" className="w-4 h-4" />
                       </div>
                       <span>Tiếp tục với Gmail</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover/btn:translate-x-1 transition-transform" />
                 </button>

                 <div className="flex items-center gap-4 py-2">
                    <div className="h-px flex-1 bg-white/5" />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">hoặc dùng Token</span>
                    <div className="h-px flex-1 bg-white/5" />
                 </div>

                 <div className="relative group/input">
                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                       <Mail className="h-4 w-4 text-slate-500 group-focus-within/input:text-yellow-400 transition-colors" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-14 pr-6 py-5 bg-white/5 border border-white/5 rounded-3xl outline-none focus:border-yellow-400/50 focus:bg-white/10 text-white text-sm font-bold transition-all placeholder:text-slate-600"
                      placeholder="Email xác nhận"
                    />
                 </div>
              </div>

              <div className="pt-6 border-t border-white/5 flex flex-col items-center gap-6">
                 <div className="flex items-center gap-10 opacity-30">
                    <Globe className="w-4 h-4 text-white" />
                    <div className="h-4 w-px bg-white" />
                    <ShieldCheck className="w-4 h-4 text-white" />
                    <div className="h-4 w-px bg-white" />
                    <Lock className="w-4 h-4 text-white" />
                 </div>
                 <Link href="/" className="text-[10px] font-black text-slate-500 hover:text-yellow-400 transition-colors uppercase tracking-[0.2em] flex items-center gap-2">
                    ← Trở lại trang chủ công cộng
                 </Link>
              </div>
           </div>
        </div>

        <p className="mt-12 text-center text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] opacity-40">
           © 2026 Secured Custom IP Portal v3.0
        </p>
      </div>
    </div>
  );
}
