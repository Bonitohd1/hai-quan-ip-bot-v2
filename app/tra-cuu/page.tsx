'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Document {
  id: string;
  code: string;
  date: string;
  name: string;
  filename: string;
  type: string;
  description: string;
}

export default function TraCuu() {
  const [searchType, setSearchType] = useState('cong-van');
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [searched, setSearched] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const res = await fetch('/api/documents');
      const data = await res.json();
      setDocuments(data.documents || []);
    } catch (error) {
      console.error('Error loading documents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const stats = [
    { label: 'Tổng công văn', value: documents.length.toString(), color: 'bg-blue-500' },
    { label: 'Gia hạn', value: documents.filter(d => d.type === 'Gia hạn').length.toString(), color: 'bg-green-500' },
    { label: 'Cấp mới', value: documents.filter(d => d.type === 'Cấp mới').length.toString(), color: 'bg-yellow-500' },
    { label: 'Khác', value: documents.filter(d => !['Gia hạn', 'Cấp mới'].includes(d.type)).length.toString(), color: 'bg-purple-500' },
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearched(false);
      setResults([]);
      return;
    }

    if (searchType === 'cong-van') {
      // Tìm kiếm công văn từ dữ liệu thực
      const filtered = documents.filter(doc =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.code.includes(searchQuery) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered);
    } else if (searchType === 'san-pham') {
      // Tìm kiếm sản phẩm trong công văn (nếu tên sản phẩm nằm trong tên công văn)
      const filtered = documents.filter(doc =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered);
    } else if (searchType === 'vi-pham') {
      // Hiển thị công văn liên quan đến vi phạm
      const filtered = documents.filter(doc =>
        doc.description.toLowerCase().includes('vi phạm') ||
        doc.type.toLowerCase().includes('vi phạm') ||
        doc.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered);
    }
    setSearched(true);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-950 text-white p-8 rounded-lg shadow-lg border-b-4 border-yellow-500">
        <h1 className="text-3xl font-bold">🔎 Tra Cứu Sở hữu Trí tuệ</h1>
        <p className="text-sm opacity-90 mt-2">Tìm kiếm thông tin về sản phẩm, nhà sản xuất và các vi phạm SHTT</p>
      </div>

      {/* Search Section */}
      <div className="bg-white p-5 lg:p-8 rounded-xl shadow-lg max-w-4xl">
        <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-5 lg:mb-6">Tìm kiếm</h2>
        
        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6 lg:mb-8">
          {stats.map((stat, i) => (
            <div key={i} className={`${stat.color} text-white rounded-xl p-4 lg:p-5 shadow-md`}>
              <p className="text-xs lg:text-sm opacity-90 mb-1.5 font-medium">{stat.label}</p>
              <p className="text-xl lg:text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
        
        {/* Search Type */}
        <div className="mb-5 lg:mb-6">
          <label className="block text-gray-700 font-semibold mb-3 text-sm lg:text-base">Loại tra cứu:</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 lg:gap-3">
            {[
              { value: 'cong-van', label: '📄 Công văn' },
              { value: 'san-pham', label: '📦 Sản phẩm' },
              { value: 'vi-pham', label: '⚠️ Vi phạm' }
            ].map(option => (
              <button
                key={option.value}
                onClick={() => setSearchType(option.value)}
                className={`p-3 lg:p-4 rounded-xl font-semibold transition text-sm lg:text-base active:scale-95 ${
                  searchType === option.value
                    ? 'bg-blue-900 text-yellow-400'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Input */}
        <div className="mb-5 lg:mb-6">
          <label className="block text-gray-700 font-semibold mb-3 text-sm lg:text-base">Nhập từ khóa:</label>
          <div className="flex flex-col sm:flex-row gap-2 lg:gap-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Ví dụ: Áo thun, Nike..."
              className="flex-1 px-4 py-3 text-base border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-900"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-900 text-yellow-400 px-6 lg:px-8 py-3 rounded-xl font-semibold hover:bg-blue-950 transition border-2 border-yellow-500 active:scale-95 text-sm lg:text-base"
            >
              🔍 Tra cứu
            </button>
          </div>
        </div>

        {/* Filter Options */}
        <div className="mb-5 lg:mb-6">
          <label className="block text-gray-700 font-semibold mb-3 text-sm lg:text-base">Bộ lọc:</label>
          <div className="flex gap-2 lg:gap-3 flex-wrap">
            {['Tất cả', 'Hàng giả', 'Sản phẩm xác thực', 'Chưa rõ'].map(filter => (
              <button
                key={filter}
                className="px-3 lg:px-4 py-2 border-2 border-gray-300 rounded-xl hover:bg-gray-100 transition text-xs lg:text-sm active:scale-95"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {searched && (
        <div className="max-w-4xl">
          <div className="mb-6 p-4 lg:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <h2 className="text-xl lg:text-2xl font-bold text-blue-900 mb-2">
              📋 Kết quả tìm kiếm: {results.length}
              {results.length === 0 ? ' (Không tìm thấy)' : ' công văn'}
            </h2>
            <p className="text-gray-600 text-sm">
              {results.length > 0 
                ? `Tìm thấy ${results.length} công văn liên quan`
                : 'Vui lòng thay đổi từ khóa và thử lại'}
            </p>
          </div>

          {results.length === 0 ? (
            <div className="bg-white p-8 rounded-xl text-center">
              <p className="text-gray-500 text-lg">Không tìm thấy công văn phù hợp</p>
              <p className="text-gray-400 text-sm mt-2">Hãy thử tìm kiếm với từ khóa khác</p>
            </div>
          ) : (
            <div className="space-y-3 lg:space-y-4">
              {results.map((result, idx) => (
                <div key={result.id || idx} className="bg-white p-4 lg:p-6 rounded-xl border-l-4 border-indigo-600 shadow hover:shadow-lg transition hover:scale-105 transform">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-2">
                        <span className="text-2xl">📄</span>
                        <div className="flex-1">
                          <h3 className="text-base lg:text-lg font-bold text-blue-900">
                            CV {result.code} - {result.name}
                          </h3>
                          <p className="text-gray-500 text-xs mt-0.5">
                            📅 Ngày: {result.date.slice(0, 2)}/{result.date.slice(2, 4)}/{result.date.slice(4)}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mt-2.5 leading-relaxed">
                        {result.description}
                      </p>
                    </div>
                    <span className="px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-xs lg:text-sm font-semibold w-fit bg-blue-100 text-blue-900 flex-shrink-0">
                      {result.type}
                    </span>
                  </div>
                  <div className="flex gap-2 lg:gap-3 mt-4 flex-wrap">
                    {result.filename && (
                      <>
                        <a
                          href={`/documents/${result.filename}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-600 hover:bg-green-700 text-white px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-xs lg:text-sm font-semibold transition active:scale-95"
                        >
                          👁️ Xem PDF
                        </a>
                        <a
                          href={`/documents/${result.filename}`}
                          download
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-xs lg:text-sm font-semibold transition active:scale-95"
                        >
                          ⬇️ Tải xuống
                        </a>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {searched && results.length === 0 && (
        <div className="bg-blue-50 p-6 lg:p-8 rounded-xl text-center max-w-4xl">
          <p className="text-gray-600 text-sm lg:text-base">Không tìm thấy kết quả. Vui lòng thử từ khóa khác.</p>
        </div>
      )}

      {/* Back Link */}
      <Link href="/" className="text-blue-600 hover:underline">
        ← Quay lại trang chính
      </Link>
    </div>
  );
}
