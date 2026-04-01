'use client';

import { useState, useEffect } from 'react';
import { Search, Info, FileText, Package, AlertTriangle, ArrowRight, Download, Filter, LayoutGrid, List as ListIcon, ChevronRight, Zap, Database, ShieldCheck } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Link from 'next/link';

interface Document {
  id: string;
  code: string;
  name: string;
  type: string;
  date: string;
  description: string;
}

export default function TraCuu() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState('cong-van');
  const [results, setResults] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    giaHan: 0,
    capMoi: 0,
    viPham: 0
  });

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const res = await fetch('/api/documents');
      const data = await res.json();
      const docs = data.documents || [];
      
      setStats({
        total: docs.length,
        giaHan: docs.filter((d: any) => d.type?.includes('Gia hạn')).length,
        capMoi: docs.filter((d: any) => d.type?.includes('Cấp mới')).length,
        viPham: docs.filter((d: any) => d.type?.includes('Vi phạm')).length
      });
    } catch (error) {
      console.error('Lỗi tải dữ liệu ban đầu:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    try {
      const typeMapping: {[key: string]: string} = {
        'cong-van': 'all',
        'san-pham': 'Sản phẩm',
        'vi-pham': 'Vi phạm'
      };
      
      const searchType = typeMapping[activeType] || 'all';
      const res = await fetch(`/api/documents?q=${encodeURIComponent(searchQuery)}&type=${searchType}`);
      const data = await res.json();
      setResults(data.documents || []);
      setSearched(true);
    } catch (error) {
      console.error('Lỗi tìm kiếm:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#020617] text-white">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 lg:p-14 relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full -z-10" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-soft-light" />

        <div className="max-w-6xl mx-auto space-y-16 pb-20">
          {/* Header Section */}
          <header className="flex flex-col gap-4 items-start fade-in">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-yellow-400/5 border border-yellow-400/10 rounded-2xl text-yellow-500 shadow-xl shadow-yellow-400/5">
              <Zap className="w-3.5 h-3.5" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Global IP Registry v3.0</span>
            </div>
            <h1 className="text-6xl font-black italic tracking-tighter uppercase leading-none drop-shadow-2xl">
              Public <span className="text-yellow-400">Database</span>
            </h1>
            <p className="text-slate-500 font-medium max-w-2xl text-lg uppercase tracking-widest text-[11px] opacity-80 leading-relaxed">
              Truy cập dữ liệu tập trung về quyền sở hữu trí tuệ, nhãn hiệu quốc tế và thông tin vi phạm giám sát bởi Tổng cục Hải quan.
            </p>
          </header>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 fade-in h-auto" style={{ animationDelay: '0.1s' }}>
            <StatCard icon={<Database />} label="Tổng bản ghi" value={stats.total} color="slate" />
            <StatCard icon={<ArrowRight className="rotate-45" />} label="Gia hạn" value={stats.giaHan} color="yellow" />
            <StatCard icon={<ShieldCheck />} label="Cấp mới" value={stats.capMoi} color="blue" />
            <StatCard icon={<AlertTriangle />} label="Vi phạm" value={stats.viPham} color="red" />
          </div>

          {/* Search Console */}
          <div className="bg-white/5 backdrop-blur-3xl p-12 rounded-[4rem] border border-white/5 shadow-2xl space-y-12 fade-in relative overflow-hidden" style={{ animationDelay: '0.2s' }}>
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />
            
            <div className="flex flex-col lg:flex-row gap-10 items-end">
              <div className="flex-1 w-full space-y-4">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-6">Phân loại truy vấn</label>
                <div className="flex flex-wrap gap-3">
                  <TypeButton active={activeType === 'cong-van'} icon={<FileText className="w-4 h-4" />} label="Công văn" onClick={() => setActiveType('cong-van')} />
                  <TypeButton active={activeType === 'san-pham'} icon={<Package className="w-4 h-4" />} label="Sản phẩm" onClick={() => setActiveType('san-pham')} />
                  <TypeButton active={activeType === 'vi-pham'} icon={<AlertTriangle className="w-4 h-4" />} label="Vi phạm" onClick={() => setActiveType('vi-pham')} />
                </div>
              </div>
              <div className="flex-[2] w-full space-y-4">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-6">Nội dung xác thực</label>
                <div className="relative group">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Nhập mã Case ID, tên nhãn hiệu hoặc từ khóa..."
                    className="w-full px-10 py-6 bg-white/5 border border-white/5 rounded-[2.5rem] outline-none focus:bg-white/10 focus:border-yellow-400/50 transition-all text-sm font-bold tracking-tight pr-40 italic placeholder:text-slate-600"
                  />
                  <button
                    onClick={handleSearch}
                    disabled={isLoading}
                    className="absolute right-3 top-2.5 bottom-2.5 px-8 bg-yellow-400 hover:bg-yellow-500 text-[#020617] rounded-[2rem] font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 group shadow-xl shadow-yellow-400/10 disabled:opacity-50"
                  >
                    {isLoading ? <div className="w-4 h-4 border-2 border-[#020617]/20 border-t-[#020617] rounded-full animate-spin" /> : <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />}
                    <span>Xác thực</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="pt-10 border-t border-white/5 flex flex-wrap items-center justify-between gap-8">
               <div className="flex items-center gap-6">
                  <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.5em]">Tác vụ nhanh:</span>
                  <div className="flex gap-2">
                     {['Hàng giả', 'Xác thực', 'Gia hạn'].map(t => (
                       <button key={t} className="text-[10px] font-black text-slate-400 hover:text-white px-4 py-2 bg-white/5 rounded-xl border border-white/5 transition-all">{t}</button>
                     ))}
                  </div>
               </div>
               <div className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-2xl border border-white/5 shadow-inner">
                  <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.5em]">Hạ tầng:</span>
                  <div className="flex gap-4">
                     <span className="text-[9px] font-black bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg border border-blue-500/10 italic">Core IP-Bot 4.0</span>
                     <span className="text-[9px] font-black bg-purple-500/10 text-purple-400 px-3 py-1 rounded-lg border border-purple-500/10 italic">Secured Protocol</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Results Section */}
          <section className="space-y-10 fade-in h-auto" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between pb-6 border-b border-white/5">
              <div className="flex items-center gap-6">
                <h2 className="text-3xl font-black italic uppercase tracking-tighter">Vault Results</h2>
                <div className="flex items-center h-7 px-3 bg-yellow-400 text-[#020617] rounded-xl text-[11px] font-black shadow-lg shadow-yellow-400/10">{results.length}</div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 p-1.5 rounded-2xl border border-white/5">
                <button className="p-2.5 px-4 bg-white/10 text-white rounded-xl shadow-2xl border border-white/10"><LayoutGrid className="w-4 h-4" /></button>
                <button className="p-2.5 px-4 text-slate-600 hover:text-white transition-colors"><ListIcon className="w-4 h-4" /></button>
              </div>
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {results.map((doc, i) => (
                  <div 
                    key={doc.id} 
                    className="bg-white/5 backdrop-blur-md p-10 rounded-[4rem] flex flex-col gap-6 group fade-in hover:bg-white/10 border border-white/5 hover:border-yellow-400/20 transition-all duration-700 hover:-translate-y-2 shadow-2xl"
                    style={{ animationDelay: `${0.1 + i * 0.05}s` }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:text-yellow-400 group-hover:scale-110 transition-all duration-700 border border-white/5 shadow-inner">
                        <FileText className="w-8 h-8" />
                      </div>
                      <span className="px-5 py-2 bg-yellow-400/5 text-yellow-500 text-[10px] font-black rounded-2xl uppercase tracking-[0.2em] border border-yellow-400/10 shadow-lg">{doc.type}</span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        <span className="text-yellow-400/60 font-black italic">CASE ID: {doc.code}</span>
                        <div className="w-1 h-1 bg-slate-800 rounded-full" />
                        <span>DATE: {doc.date.slice(0,2)}/{doc.date.slice(2,4)}/{doc.date.slice(4)}</span>
                      </div>
                      <h3 className="text-2xl font-black text-white italic group-hover:text-yellow-400 transition-colors leading-tight">{doc.name}</h3>
                      <p className="text-sm text-slate-500 font-medium line-clamp-3 leading-relaxed opacity-80">{doc.description}</p>
                    </div>
                    <div className="pt-8 mt-auto border-t border-white/5 flex items-center justify-between gap-4">
                      <button className="flex-1 flex items-center justify-center gap-3 py-4 bg-white text-[#020617] rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-yellow-400 transition-all active:scale-95 shadow-xl">
                        <Download className="w-4 h-4" />
                        Download PDF
                      </button>
                      <button className="w-12 h-12 flex items-center justify-center bg-white/5 text-slate-500 rounded-[1.5rem] border border-white/5 hover:text-white hover:bg-white/10 transition-all">
                        <Info className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : searched ? (
              <div className="bg-white/5 border border-white/5 p-24 rounded-[5rem] text-center flex flex-col items-center gap-10">
                <div className="w-32 h-32 bg-white/5 rounded-[4rem] flex items-center justify-center relative shadow-inner overflow-hidden border border-white/5 animate-float">
                  <Search className="w-12 h-12 text-slate-800" />
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-4xl font-black italic uppercase tracking-tighter">Null Result</h3>
                  <p className="text-slate-500 font-medium max-w-sm text-lg leading-relaxed italic">Hệ thống đã quét toàn bộ kho dữ liệu nhưng không tìm thấy thông tin phù hợp với tệp truy vấn **"{searchQuery}"**.</p>
                </div>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-6 px-12 py-5 bg-white/5 text-white font-black text-[11px] uppercase tracking-[0.4em] rounded-[2rem] border border-white/10 hover:bg-white/10 hover:border-yellow-400/30 transition-all active:scale-95"
                >
                  Clear Command
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 opacity-30">
                {[1,2,3].map(i => (
                  <div key={i} className="bg-white/5 p-12 rounded-[4rem] h-80 flex flex-col gap-6 relative overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Footer Backlink */}
          <footer className="pt-20 flex border-t border-white/5 pb-20 justify-center">
            <Link href="/" className="text-[11px] font-black text-slate-600 flex items-center gap-4 hover:translate-x-2 transition-all uppercase tracking-[0.5em] hover:text-white group">
              <ChevronRight className="w-4 h-4 group-hover:text-yellow-400" />
              Return Main Console
            </Link>
          </footer>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, color }: any) {
  const configs: any = {
    slate: 'bg-white/5 text-white border-white/5',
    yellow: 'bg-yellow-400/5 text-yellow-400 border-yellow-400/10',
    blue: 'bg-blue-600/5 text-blue-500 border-blue-600/10',
    red: 'bg-red-600/5 text-red-500 border-red-600/10'
  };

  return (
    <div className={`${configs[color]} p-10 rounded-[3.5rem] border relative overflow-hidden transition-all duration-700 group hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] hover:-translate-y-1`}>
      <div className="relative z-10 space-y-6">
        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
          {icon}
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-50">{label}</p>
          <p className="text-5xl font-black italic tracking-tighter">{value}</p>
        </div>
      </div>
      <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-current rounded-full blur-[100px] opacity-[0.03] group-hover:scale-150 transition-transform duration-1000" />
    </div>
  );
}

function TypeButton({ active, icon, label, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-5 rounded-[2rem] flex items-center gap-4 transition-all duration-500 font-black text-[11px] uppercase tracking-[0.2em] active:scale-95 border-2 ${
        active 
        ? 'bg-yellow-400 text-[#020617] border-transparent shadow-2xl shadow-yellow-400/20' 
        : 'bg-white/5 text-slate-500 border-white/5 hover:border-yellow-400/30 hover:text-white shadow-xl'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
