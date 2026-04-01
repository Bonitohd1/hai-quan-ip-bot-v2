'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FilePlus, 
  Upload, 
  Trash2, 
  FileText, 
  Search, 
  Settings, 
  LogOut, 
  LayoutDashboard, 
  Download,
  AlertTriangle,
  CheckCircle2,
  Package,
  ShieldAlert,
  ArrowUpRight,
  ChevronRight,
  Database,
  BarChart3,
  Users
} from 'lucide-react';

interface Document {
  id: string;
  code: string;
  name: string;
  type: string;
  date: string;
  filename: string;
}

export default function AdminDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState({ text: '', type: '' });
  const router = useRouter();

  const [singleForm, setSingleForm] = useState({
    code: '',
    name: '',
    type: 'Gia hạn',
    date: new Date().toISOString().split('T')[0].split('-').reverse().join(''),
    description: '',
    file: null as File | null
  });

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async (q = '') => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/documents?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setDocuments(data.documents || []);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    router.push('/admin/login');
  };

  const handleSingleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadLoading(true);
    setUploadMessage({ text: '', type: '' });

    try {
      const formData = new FormData();
      formData.append('code', singleForm.code);
      formData.append('name', singleForm.name);
      formData.append('type', singleForm.type);
      formData.append('date', singleForm.date);
      formData.append('description', singleForm.description);
      if (singleForm.file) formData.append('file', singleForm.file);

      const res = await fetch('/api/documents', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setUploadMessage({ text: 'Hệ thống đã nhận tệp và lưu trữ thành công.', type: 'success' });
        setSingleForm({ code: '', name: '', type: 'Gia hạn', date: '', description: '', file: null });
        fetchDocuments();
      } else {
        const data = await res.json();
        setUploadMessage({ text: data.error || 'Lỗi xử lý tệp tin', type: 'error' });
      }
    } catch (err) {
      setUploadMessage({ text: 'Lỗi hệ thống nghiêm trọng', type: 'error' });
    } finally {
      setUploadLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hành động này không thể hoàn tác. Bạn chắc chắn muốn xóa?')) return;
    try {
      const res = await fetch(`/api/documents/${id}`, { method: 'DELETE' });
      if (res.ok) fetchDocuments();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/5 blur-[120px] rounded-full -z-10" />

      {/* Control Navigation */}
      <nav className="h-24 px-12 flex items-center justify-between border-b border-white/5 backdrop-blur-3xl sticky top-0 z-50">
        <div className="flex items-center gap-12 h-full">
          <div 
            className="flex items-center gap-4 cursor-pointer group"
            onClick={() => router.push('/')}
          >
             <div className="w-12 h-12 bg-gradient-to-br from-[#1a2b56] to-[#020617] rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl group-hover:rotate-6 transition-transform">
                <Settings className="w-6 h-6 text-yellow-400 group-hover:animate-spin-slow" />
             </div>
             <div className="flex flex-col">
                <span className="text-lg font-black tracking-tighter uppercase italic">Control Center</span>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.5em] mt-0.5">Admin Management</span>
             </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-10 h-full pl-12 border-l border-white/5">
             <NavLink active label="Data Vault" icon={<Database className="w-4 h-4" />} />
             <NavLink label="Analytics" icon={<BarChart3 className="w-4 h-4" />} />
             <NavLink label="Personnel" icon={<Users className="w-4 h-4" />} />
             <NavLink label="Security Logs" icon={<ShieldAlert className="w-4 h-4" />} />
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-8 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest border border-red-500/20 active:scale-95"
        >
          <LogOut className="w-4 h-4" />
          End Session
        </button>
      </nav>

      <div className="flex flex-col lg:flex-row flex-1 p-8 lg:p-14 gap-12 h-auto max-w-screen-2xl mx-auto w-full">
        {/* Upload Terminal */}
        <aside className="lg:w-[450px] w-full shrink-0">
          <div className="bg-white/5 backdrop-blur-3xl p-10 rounded-[4rem] border border-white/10 shadow-3xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-600 shadow-[0_0_20px_rgba(250,204,21,0.5)]" />
            
            <div className="flex items-center gap-6 mb-12">
               <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-yellow-400 shadow-inner group-hover:rotate-12 transition-transform duration-700 border border-white/5">
                  <FilePlus className="w-8 h-8" />
               </div>
               <div className="space-y-1">
                  <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">Data Ingestion</h2>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Hệ thống tải tệp tin bảo mật</p>
               </div>
            </div>

            <form onSubmit={handleSingleUpload} className="space-y-6">
               <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Product / Trademark Name</label>
                  <input 
                    type="text" 
                    value={singleForm.name}
                    onChange={e => setSingleForm({...singleForm, name: e.target.value})}
                    placeholder="VD: Gia hạn Hermes, Cấp mới Nike..."
                    className="w-full px-6 py-5 bg-white/5 border border-white/5 rounded-3xl outline-none focus:bg-white/10 focus:border-yellow-400/50 font-bold text-sm transition-all placeholder:text-slate-600"
                    required
                  />
               </div>
               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Case ID / Mã CV</label>
                    <input 
                      type="text" 
                      value={singleForm.code}
                      onChange={e => setSingleForm({...singleForm, code: e.target.value})}
                      placeholder="VD: 24541"
                      className="w-full px-6 py-5 bg-white/5 border border-white/5 rounded-3xl outline-none focus:bg-white/10 focus:border-yellow-400/50 font-bold text-sm transition-all placeholder:text-slate-600 uppercase"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Security Level</label>
                    <select 
                      value={singleForm.type}
                      onChange={e => setSingleForm({...singleForm, type: e.target.value})}
                      className="w-full px-6 py-5 bg-white/5 border border-white/5 rounded-3xl outline-none focus:bg-white/10 focus:border-yellow-400/50 font-black text-sm transition-all cursor-pointer appearance-none uppercase tracking-tighter"
                    >
                       <option className="bg-[#020617]">Gia hạn</option>
                       <option className="bg-[#020617]">Cấp mới</option>
                       <option className="bg-[#020617]">Thông tư</option>
                       <option className="bg-[#020617]">Luật SHTT</option>
                       <option className="bg-[#020617]">Vi phạm</option>
                    </select>
                  </div>
               </div>

               <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Digital Document (PDF)</label>
                  <div className="relative border-2 border-dashed border-white/10 rounded-[2.5rem] p-10 flex flex-col items-center justify-center gap-4 bg-white/5 hover:bg-white/10 hover:border-yellow-400/30 transition-all cursor-pointer group/upload">
                     <input 
                      type="file" 
                      onChange={e => setSingleForm({...singleForm, file: e.target.files?.[0] || null})}
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                     />
                     <div className="w-14 h-14 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 shadow-2xl group-hover/upload:scale-110 transition-transform">
                        <Upload className="w-6 h-6 text-slate-400 group-hover/upload:text-yellow-400 transition-colors" />
                     </div>
                     <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">
                       {singleForm.file ? singleForm.file.name : 'Select or drop secure file'}
                     </p>
                  </div>
               </div>

               {uploadMessage.text && (
                 <div className={`p-5 rounded-[2rem] flex items-center gap-4 animate-fade-in ${uploadMessage.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                    {uploadMessage.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertTriangle className="w-5 h-5 shrink-0" />}
                    <p className="text-[11px] font-black uppercase tracking-widest leading-tight">{uploadMessage.text}</p>
                 </div>
               )}

               <button 
                type="submit"
                disabled={uploadLoading}
                className="w-full py-6 bg-gradient-to-r from-yellow-500 to-amber-600 text-[#020617] rounded-[2rem] font-black text-sm uppercase tracking-[0.3em] shadow-3xl shadow-yellow-400/10 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
               >
                 {uploadLoading ? <div className="w-5 h-5 border-2 border-[#020617]/20 border-t-[#020617] rounded-full animate-spin" /> : <ShieldAlert className="w-4 h-4" />}
                 {uploadLoading ? 'Processing...' : 'Authorize Upload'}
               </button>
            </form>
          </div>
        </aside>

        {/* Main Vault Terminal */}
        <main className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
          <div className="bg-white/5 backdrop-blur-3xl rounded-[4rem] h-full flex flex-col overflow-hidden relative border border-white/10 shadow-3xl">
             {/* Terminal Header */}
             <div className="p-10 border-b border-white/5 flex flex-col lg:flex-row justify-between items-center gap-8 bg-gradient-to-b from-white/5 to-transparent">
                <div className="flex items-center gap-6">
                   <div className="w-14 h-14 bg-white/5 rounded-3xl flex items-center justify-center text-slate-500 shadow-inner border border-white/5">
                      <Database className="w-6 h-6" />
                   </div>
                   <div className="space-y-1">
                      <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">Encrypted Vault</h2>
                      <div className="flex items-center gap-3">
                         <span className="flex items-center h-5 px-2.5 bg-emerald-500/10 text-emerald-500 rounded-full text-[9px] font-black border border-emerald-500/20 uppercase tracking-widest animate-pulse">Live</span>
                         <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
                           {documents.length} Records Detected
                         </p>
                      </div>
                   </div>
                </div>

                <div className="relative w-full lg:w-[400px]">
                   <input 
                    type="text" 
                    value={searchTerm}
                    onChange={e => {
                      setSearchTerm(e.target.value);
                      fetchDocuments(e.target.value);
                    }}
                    placeholder="Search Secure Registry..."
                    className="w-full pl-14 pr-8 py-5 bg-white/5 border border-white/5 rounded-[2.5rem] outline-none focus:bg-white/10 focus:border-yellow-400/50 font-bold text-sm transition-all shadow-inner placeholder:text-slate-600 italic"
                   />
                   <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                </div>
             </div>

             {/* Terminal Table */}
             <div className="flex-1 overflow-y-auto px-10 py-6">
                {isLoading ? (
                  <div className="h-full flex flex-col items-center justify-center gap-6">
                     <div className="w-16 h-16 border-[4px] border-white/5 border-t-yellow-400 rounded-full animate-spin shadow-2xl" />
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] animate-pulse">Syncing Secure Channels...</p>
                  </div>
                ) : documents.length > 0 ? (
                  <table className="w-full text-left border-separate border-spacing-y-4">
                    <thead>
                       <tr className="text-slate-500">
                          <th className="pb-4 text-[10px] font-black uppercase tracking-[0.4em] pl-6">Case Code</th>
                          <th className="pb-4 text-[10px] font-black uppercase tracking-[0.4em]">Trademark / Subject</th>
                          <th className="pb-4 text-[10px] font-black uppercase tracking-[0.4em]">Class</th>
                          <th className="pb-4 text-[10px] font-black uppercase tracking-[0.4em]">Timeline</th>
                          <th className="pb-4 text-[10px] font-black uppercase tracking-[0.4em] text-center">Auth Actions</th>
                       </tr>
                    </thead>
                    <tbody className="">
                      {documents.map((doc, i) => (
                        <tr key={doc.id} className="group transition-all">
                           <td className="py-6 pl-6 bg-white/5 rounded-l-[2rem] border-y border-l border-white/5 group-hover:bg-white/10 transition-colors">
                             <div className="text-[11px] font-black text-yellow-400/80 bg-yellow-400/5 px-4 py-2 rounded-xl inline-block border border-yellow-400/10 italic">
                               {doc.code}
                             </div>
                           </td>
                           <td className="py-6 bg-white/5 border-y border-white/5 group-hover:bg-white/10 transition-colors text-sm font-black tracking-tight text-white/90">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:text-white transition-colors">
                                    <FileText className="w-4 h-4" />
                                 </div>
                                 {doc.name}
                              </div>
                           </td>
                           <td className="py-6 bg-white/5 border-y border-white/5 group-hover:bg-white/10 transition-colors">
                              <span className="px-5 py-2 bg-white/5 border border-white/10 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest group-hover:text-white group-hover:border-white/20 transition-all">
                                {doc.type}
                              </span>
                           </td>
                           <td className="py-6 bg-white/5 border-y border-white/5 group-hover:bg-white/10 transition-colors">
                              <div className="flex flex-col gap-1">
                                 <span className="text-[11px] font-black text-white/70 italic">{doc.date.slice(0,2)}/{doc.date.slice(2,4)}/{doc.date.slice(4)}</span>
                                 <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-1 group-hover:text-slate-400">{doc.filename.slice(0,10)}...</span>
                              </div>
                           </td>
                           <td className="py-6 bg-white/5 rounded-r-[2rem] border-y border-r border-white/5 group-hover:bg-white/10 transition-colors">
                             <div className="flex items-center justify-center gap-3">
                                <button className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-2xl border border-white/5 transition-all active:scale-95">
                                   <Download className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => handleDelete(doc.id)}
                                  className="w-10 h-10 flex items-center justify-center bg-red-500/5 hover:bg-red-500/20 text-red-500/60 hover:text-red-500 rounded-2xl border border-red-500/10 transition-all active:scale-95"
                                >
                                   <Trash2 className="w-4 h-4" />
                                </button>
                             </div>
                           </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center gap-8 opacity-20 grayscale scale-90">
                     <div className="w-32 h-32 bg-white/5 rounded-[4rem] flex items-center justify-center border-2 border-white/10 shadow-inner">
                        <Package className="w-14 h-14 text-slate-500" />
                     </div>
                     <div className="text-center space-y-2">
                        <p className="text-3xl font-black italic uppercase tracking-tighter">Empty Archive</p>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">No secure signatures found in main vault</p>
                     </div>
                  </div>
                )}
             </div>

             {/* Terminal Status Bar */}
             <div className="px-12 py-8 bg-white/2 backdrop-blur-md flex items-center justify-between border-t border-white/5">
                <div className="flex items-center gap-6">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Protocol V3.4 Secure-Core</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                      <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Encrypted Tunnel Active</span>
                   </div>
                </div>
                <div className="flex items-center gap-3">
                   {[1, 2, 3].map(p => (
                     <button key={p} className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center text-[10px] font-black border border-white/10 hover:border-yellow-400 group transition-all">
                        <span className="text-slate-600 group-hover:text-yellow-400">{p}</span>
                     </button>
                   ))}
                </div>
             </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function NavLink({ label, active, icon }: any) {
  return (
    <button className={`flex items-center gap-3 h-full px-2 border-b-2 transition-all group ${active ? 'border-yellow-400 text-white' : 'border-transparent text-slate-500 hover:text-white'}`}>
       <div className={`transition-transform group-hover:scale-110 ${active ? 'text-yellow-400' : ''}`}>{icon}</div>
       <span className="text-[10px] font-black uppercase tracking-[0.3em]">{label}</span>
    </button>
  );
}
