'use client';

import { motion } from 'framer-motion';
import { 
  Bell, AlertTriangle, CheckCircle2, Info, PackageSearch, 
  ShieldAlert, Settings, FileText, CheckCircle, Clock
} from 'lucide-react';

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
    desc: 'Hồ sơ Tờ khai số #104825941 đã được xác minh tính hợp pháp của Quyền SHTT (Ủy quyền hợp lệ từ Apple Inc).',
    time: '1 giờ trước',
    icon: CheckCircle2,
    read: false,
  },
  {
    id: 3,
    type: 'info',
    title: 'Cập nhật Văn bản Pháp luật mới',
    desc: 'Nghị định 99/2013/NĐ-CP (Sửa đổi 2026) về xử phạt hành chính trong lĩnh vực Sở hữu công nghiệp đã được cập nhật vào CSDL.',
    time: 'Hôm qua, 14:30',
    icon: FileText,
    read: true,
  },
  {
    id: 4,
    type: 'warning',
    title: 'Yêu cầu phối hợp giám định',
    desc: 'Chi cục Hải quan CK Sân bay Nội Bài phát lệnh yêu cầu chuyên gia SHTT hỗ trợ giám định 500 mẫu đồng hồ Casio.',
    time: 'Hôm qua, 09:15',
    icon: PackageSearch,
    read: true,
  },
  {
    id: 5,
    type: 'system',
    title: 'Hệ thống đã tự động sao lưu',
    desc: 'Bản sao lưu toàn bộ nhật ký tác nghiệp tháng vừa qua đã được đồng bộ lên Cloud.',
    time: '2 ngày trước',
    icon: Settings,
    read: true,
  }
];

export default function ThongBao() {
  return (
    <div className="max-w-4xl mx-auto w-full font-sans">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            Thông báo hệ thống
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-rose-500 text-white text-xs font-bold shadow-sm shadow-rose-500/30">
              2 mới
            </span>
          </h1>
          <p className="text-slate-500 mt-2 text-sm font-medium">Trung tâm theo dõi sự kiện & tín hiệu cảnh báo AI.</p>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors shadow-sm focus:ring-4 focus:ring-slate-100">
          <CheckCircle className="w-4 h-4 text-emerald-500" /> Đánh dấu đã đọc tất cả
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Header filter tags */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-wrap items-center gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm shadow-blue-500/20 whitespace-nowrap">Tất cả</button>
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-colors whitespace-nowrap">Chưa đọc (2)</button>
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-colors whitespace-nowrap flex items-center gap-2"><ShieldAlert className="w-4 h-4 text-rose-500"/> Cảnh báo đỏ</button>
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-colors whitespace-nowrap">Hành chính</button>
        </div>

        {/* List */}
        <div className="divide-y divide-slate-100">
          {NOTIFICATIONS.map((notif, i) => {
            const bgBadge = notif.type === 'critical' ? 'bg-rose-100 text-rose-600' :
                            notif.type === 'success' ? 'bg-emerald-100 text-emerald-600' :
                            notif.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                            notif.type === 'info' ? 'bg-blue-100 text-blue-600' : 
                            'bg-slate-100 text-slate-600';
            
            const borderLeft = notif.type === 'critical' ? 'border-l-rose-500' :
                               notif.type === 'success' ? 'border-l-emerald-500' :
                               notif.type === 'warning' ? 'border-l-amber-500' :
                               notif.type === 'info' ? 'border-l-blue-500' : 
                               'border-l-slate-300';
            
            return (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                key={notif.id}
                className={`relative p-6 hover:bg-slate-50 transition-colors border-l-4 ${borderLeft} ${notif.read ? 'opacity-70' : 'bg-blue-50/20'}`}
              >
                {!notif.read && (
                  <div className="absolute top-6 right-6 w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                )}
                
                <div className="flex gap-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${bgBadge}`}>
                    <notif.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className={`text-base flex-1 ${!notif.read ? 'font-bold text-slate-900' : 'font-semibold text-slate-700'}`}>
                        {notif.title}
                      </h3>
                    </div>
                    <p className="text-sm font-medium text-slate-500 mb-3 leading-relaxed max-w-2xl">
                      {notif.desc}
                    </p>
                    <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 uppercase tracking-wide">
                      <Clock className="w-3.5 h-3.5" /> {notif.time}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex justify-center">
          <button className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">
            Tải thêm 20 thông báo cũ...
          </button>
        </div>
      </div>
    </div>
  );
}
