'use client';

import TopBar from '@/components/TopBar';

export default function AdminManagementPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <TopBar />
      <main className="p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Admin Management</h1>
        <div className="bg-white rounded-lg p-6 border border-slate-300 shadow-sm">
          <p className="text-slate-600">Admin Management page is under development.</p>
        </div>
      </main>
    </div>
  );
}
