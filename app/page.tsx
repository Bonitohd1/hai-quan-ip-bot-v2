'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ChatBot from '@/components/ChatBot';
import Link from 'next/link';
import { ShieldCheck, Search, Database, Fingerprint, Lock, Globe, ArrowRight, CheckCircle2, ChevronRight, Menu, Zap } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col font-sans relative overflow-hidden text-white">
      {/* Premium Background Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[120px] opacity-40 animate-float" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px] opacity-30" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light" />

      {/* Navigation Header */}
      <nav className="w-full h-24 flex items-center justify-between px-10 relative z-30 sticky top-0 bg-transparent backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => router.push('/')}>
          <div className="p-3 bg-gradient-to-br from-[#1a2b56] to-[#020617] rounded-2xl shadow-2xl border border-white/10 group-hover:rotate-6 transition-transform duration-500 relative">
            <ShieldCheck className="w-6 h-6 text-yellow-400" />
            <div className="absolute inset-0 bg-yellow-400/20 blur-lg rounded-full -z-10 group-hover:scale-150 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-white tracking-tighter leading-none">HẢI QUAN IP</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Sở hữu Trí tuệ Việt Nam</span>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-12">
          <NavLink label="Home" href="/" active />
          <NavLink label="Tra cứu" href="/tra-cuu" />
          <NavLink label="Luật lệ" href="/tra-cuu" />
          <NavLink label="Cộng đồng" href="/#ai" />
        </div>

        <div className="flex items-center gap-6">
           <Link 
            href="/admin/login"
            className="flex items-center gap-3 px-6 py-2.5 bg-white/5 border border-white/10 hover:border-yellow-400/50 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all group pointer-events-auto z-40"
           >
              <Lock className="w-4 h-4 text-slate-500 group-hover:text-yellow-400 transition-colors" />
              <span className="text-slate-300 group-hover:text-white">Admin Login</span>
           </Link>
           <button className="lg:hidden p-3 bg-white/5 rounded-xl border border-white/10">
              <Menu className="w-5 h-5 text-white" />
           </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-10 py-20 flex flex-col items-center justify-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12 fade-in">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-yellow-400/5 border border-yellow-400/20 rounded-2xl text-yellow-500 shadow-xl shadow-yellow-400/5 group">
              <Zap className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Hệ thống truy xuất dữ liệu cấp cao</span>
            </div>
            
            <h1 className="text-8xl font-black text-white tracking-tighter leading-[0.85] drop-shadow-2xl">
              Cổng Dữ Liệu <br />
              <span className="bg-gradient-to-r from-yellow-400 via-amber-200 to-yellow-500 bg-clip-text text-transparent italic">Bảo Hộ SHTT</span>
            </h1>
            
            <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-xl">
              Nền tảng tập trung quản lý bảo hộ quyền tác giả, nhãn hiệu và hồ xơ vi phạm dành cho Chi cục Hải quan. Đồng bộ thời thực, bảo mật tuyệt đối.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 pt-6">
              <button 
                onClick={() => router.push('/tra-cuu')}
                className="bg-white hover:bg-slate-100 text-[#020617] px-12 py-7 rounded-[2.5rem] font-black text-sm uppercase tracking-widest flex items-center justify-center gap-4 transition-all shadow-white/10 shadow-[0_20px_40px_-5px] active:scale-95 group overflow-hidden relative"
              >
                <Search className="w-5 h-5 group-hover:scale-125 transition-transform" />
                Dữ liệu công vản
              </button>
              <button 
                className="bg-white/5 hover:bg-white/10 text-white px-12 py-7 rounded-[2.5rem] font-black text-sm border border-white/10 flex items-center justify-center gap-4 transition-all active:scale-95 group"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 group-hover:animate-ping" />
                Hiện trạng vi phạm
              </button>
            </div>

            <div className="flex items-center gap-14 pt-12 border-t border-white/5">
              <Metric value="52k" label="Trường hợp" />
              <Metric value="100%" label="Xác thực" />
              <Metric value="25/24" label="Giám sát AI" />
            </div>
          </div>

          <div className="relative fade-in h-auto" style={{ animationDelay: '0.2s' }}>
            <div className="relative z-10 bg-white/5 p-6 rounded-[5rem] border border-white/10 shadow-[0_48px_80px_-16px_rgba(0,0,0,0.8)] rotate-2 backdrop-blur-2xl group overflow-hidden">
               {/* Internal Card Decor */}
               <div className="bg-gradient-to-br from-[#1a2b56] to-[#020617] rounded-[4rem] overflow-hidden aspect-[4/5] relative border border-white/5 shadow-2xl">
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30" />
                  <Image 
                    src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800" 
                    alt="Digital Security" 
                    fill
                    className="object-cover opacity-60 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-black via-black/40 to-transparent">
                     <div className="flex flex-col gap-6">
                        <div className="w-16 h-16 bg-yellow-400 rounded-3xl flex items-center justify-center shadow-2xl shadow-yellow-400/20 group-hover:-rotate-12 transition-transform">
                           <Fingerprint className="w-8 h-8 text-[#020617]" />
                        </div>
                        <div className="space-y-2">
                           <p className="text-white text-3xl font-black uppercase tracking-tighter italic">Xác thực 0-Trust</p>
                           <p className="text-slate-400 text-[11px] font-bold leading-relaxed uppercase tracking-widest">Tiết hợp xác thực đa tố Google Workscape Admin Core.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            
            {/* Decors */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-[3rem] border border-white/10 backdrop-blur-2xl shadow-2xl p-8 flex flex-col justify-between items-center -rotate-12 group hover:rotate-2 transition-transform duration-700 hover:z-20">
              <CheckCircle2 className="w-16 h-16 text-yellow-400" />
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Verified Security</p>
            </div>
            <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-[4rem] shadow-2xl p-10 flex flex-col justify-between rotate-6 group hover:rotate-0 transition-transform duration-700 hover:z-20">
               <Globe className="w-12 h-12 text-[#020617]" />
               <p className="text-sm font-black uppercase tracking-tighter leading-tight text-[#020617]">Dữ liệu liên <br />phòng quốc tế</p>
            </div>
          </div>
        </div>
      </main>

      <ChatBot />
      <footer className="w-full py-12 px-10 flex flex-col lg:flex-row items-center justify-between border-t border-white/5 bg-transparent backdrop-blur-md gap-6">
        <div className="flex flex-col gap-2 items-center lg:items-start text-center lg:text-left">
           <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.5em]">Hệ Thống Thông Tin SHTT - Tổng Cục Hải Quan</p>
           <p className="text-slate-700 text-[9px] font-bold">Lưu ý: Mọi hành vi truy cập trái phép đều bị xử lý theo pháp luật hiện hành.</p>
        </div>
        <div className="flex gap-12">
          <Link href="#" className="font-black text-[10px] text-slate-500 hover:text-white transition-colors uppercase tracking-widest">Privacy Policy</Link>
          <Link href="#" className="font-black text-[10px] text-slate-500 hover:text-white transition-colors uppercase tracking-widest">Terms of Access</Link>
          <Link href="#" className="font-black text-[10px] text-slate-500 hover:text-white transition-colors uppercase tracking-widest">Support Portal</Link>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ label, href, active }: any) {
  return (
    <Link 
      href={href} 
      className={`font-black text-xs uppercase tracking-[0.3em] transition-all hover:text-white relative py-2 ${active ? 'text-white' : 'text-slate-500'}`}
    >
      {label}
      {active && <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)]" />}
    </Link>
  );
}

function Metric({ value, label }: any) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-4xl font-black text-white leading-none tracking-tighter italic">{value}</span>
      <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">{label}</span>
    </div>
  );
}
