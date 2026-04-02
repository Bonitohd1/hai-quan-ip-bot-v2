'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Bell, Search, Settings, ShieldAlert, CheckCircle2, 
  FileText, PackageSearch, Clock, User
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const NOTIFICATIONS = [
  {
    id: 1,
    type: 'critical',
    title: 'Phát hiện rủi ro cấp độ ĐỎ',
    desc: 'Hệ thống AI vừa khoanh vùng Container SEGU-9382103 tại Cảng Cát Lái có 94% nguy cơ chứa áo thun Adidas giả mạo.',
    time: '5 phút trước',
    icon: ShieldAlert,
    read: false,
  },
  {
    id: 2,
    type: 'success',
    title: 'Thông quan thành công',
    desc: 'Hồ sơ Tờ khai số #104825941 đã được xác minh tính hợp pháp của Quyền SHTT.',
    time: '1 giờ trước',
    icon: CheckCircle2,
    read: false,
  },
  {
    id: 3,
    type: 'warning',
    title: 'Yêu cầu phối hợp giám định',
    desc: 'Chi cục Hải quan CK Sân bay Nội Bài phát lệnh yêu cầu chuyên gia hỗ trợ.',
    time: 'Hôm qua, 09:15',
    icon: PackageSearch,
    read: true,
  }
];

export default function Topbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full h-16 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 flex items-center justify-between px-6 lg:px-12 transition-all">
      {/* Left side: Search */}
      <div className="flex-1 flex items-center">
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer border border-slate-200 w-64">
           <Search className="w-4 h-4 shrink-0" />
           <span className="text-xs font-semibold">Tìm kiếm hồ sơ...</span>
        </div>
      </div>

      {/* Right side: Actions & Profile */}
      <div className="flex items-center gap-4 relative">
        {/* Notifications Popover */}
        <div ref={notifRef} className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative p-2 rounded-full transition-colors ${showNotifications ? 'bg-blue-50 text-blue-600' : 'hover:bg-slate-100 text-slate-500'}`}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 border border-white rounded-full"></span>
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-80 md:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden outline-none z-50"
              >
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <h3 className="text-sm font-bold text-slate-800">Thông báo</h3>
                  <button className="text-xs font-semibold text-blue-600 hover:text-blue-800">Đánh dấu đã đọc</button>
                </div>
                <div className="max-h-[360px] overflow-y-auto divide-y divide-slate-100">
                  {NOTIFICATIONS.map((notif) => {
                      const bgBadge = notif.type === 'critical' ? 'bg-rose-100 text-rose-600' :
                                      notif.type === 'success' ? 'bg-emerald-100 text-emerald-600' :
                                      'bg-amber-100 text-amber-600';
                      return (
                        <div key={notif.id} className={`p-4 flex gap-3 hover:bg-slate-50 transition-colors cursor-pointer ${!notif.read ? 'bg-blue-50/20' : ''}`}>
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${bgBadge}`}>
                            <notif.icon className="w-5 h-5" />
                          </div>
                          <div>
                             <h4 className={`text-sm mb-0.5 ${!notif.read ? 'font-bold text-slate-900' : 'font-semibold text-slate-700'}`}>{notif.title}</h4>
                             <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-1">{notif.desc}</p>
                             <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1 uppercase">
                               <Clock className="w-3 h-3" /> {notif.time}
                             </span>
                          </div>
                        </div>
                      )
                  })}
                </div>
                <Link href="/thong-bao" onClick={() => setShowNotifications(false)} className="block p-3 border-t border-slate-100 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                  <span className="text-xs font-bold text-blue-600">Xem tất cả thông báo</span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Global Settings */}
        <Link href="/tai-khoan" className="hidden sm:flex p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
          <Settings className="w-5 h-5" />
        </Link>

        <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block" />

        {/* User Profile */}
        <Link href="/tai-khoan" className="flex items-center gap-3 p-1 pl-2 pr-3 rounded-full hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200 group">
          <div className="hidden sm:block text-right">
             <p className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">Admin HQ</p>
             <p className="text-[10px] uppercase font-bold tracking-wider text-emerald-600">Workspace</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border-2 border-white shadow-sm shrink-0 relative overflow-hidden group-hover:border-blue-100 transition-colors">
             <User className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
             <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full z-10"></div>
          </div>
        </Link>
      </div>
    </header>
  );
}
