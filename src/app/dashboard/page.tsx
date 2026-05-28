'use client';

import TopBar from '@/components/TopBar';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <TopBar />
      <main className="p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Dashboard</h1>
        <div className="bg-white rounded-lg p-6 border border-slate-300 shadow-sm">
          <p className="text-slate-600">Dashboard page is under development.</p>
        </div>
      </main>
    </div>
  );
}
