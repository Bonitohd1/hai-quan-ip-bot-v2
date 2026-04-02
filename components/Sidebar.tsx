'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { 
  Home, Search, FileText, History, BarChart3, 
  Menu, X, Shield, ChevronRight, UserCircle, Bell
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Tổng quan', icon: Home, href: '/' },
  { label: 'Tra cứu hồ sơ', icon: Search, href: '/tra-cuu' },
  { label: 'Văn bản pháp luật', icon: FileText, href: '/van-ban-phap-luat' },
  { label: 'Lịch sử SHTT', icon: History, href: '/lich-su-shtt' },
  { label: 'Báo cáo thống kê', icon: BarChart3, href: '/thong-ke-shtt' },
];

const USER_ITEMS = [
  { label: 'Tài khoản cá nhân', icon: UserCircle, href: '/tai-khoan' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden w-10 h-10 bg-white text-slate-900 rounded-lg flex items-center justify-center border border-slate-200 shadow-sm"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden" 
          onClick={() => setMobileOpen(false)} 
        />
      )}

      {/* SIDEBAR: ENTERPRISE NAVY */}
      <aside className={`
        fixed top-0 left-0 h-screen z-40 w-[260px]
        bg-slate-900 text-slate-300
        flex flex-col
        transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:sticky
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* BRANDING */}
        <div className="p-6 pb-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0">
               <Image src="/logoHQdaxoanen.png" alt="HQ Logo" width={28} height={28} className="object-contain" />
            </div>
            <div>
               <h1 className="text-base font-semibold text-white leading-tight">Hải Quan Việt Nam</h1>
               <p className="text-xs text-slate-400 font-medium mt-0.5 tracking-wider uppercase">Sở Hữu Trí Tuệ</p>
            </div>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          <div className="px-3 mb-2 mt-4">
             <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Chức năng nghiệp vụ</span>
          </div>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                 className={`
                  group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                  ${isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                   <Icon className={`w-4 h-4 ${isActive ? 'text-blue-200' : 'text-slate-500 group-hover:text-slate-300'}`} />
                   <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* USER / SYSTEM STATUS */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center justify-between px-2 py-3 rounded-lg bg-slate-800/50">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600">
                   <Shield className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                   <p className="text-xs font-semibold text-white">Hệ thống bảo mật</p>
                   <p className="text-[10px] text-emerald-400 font-medium">Hoạt động tốt</p>
                </div>
             </div>
          </div>
          
          <div className="mt-4 px-3 mb-2">
             <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Cá nhân</span>
          </div>
          <div className="space-y-1">
            {USER_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                    ${isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                     <Icon className={`w-4 h-4 ${isActive ? 'text-blue-200' : 'text-slate-500 group-hover:text-slate-300'}`} />
                     <span>{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
}
