'use client';

import TopBar from '@/components/TopBar';
import { User, Mail, Shield, Calendar, Phone, MapPin } from 'lucide-react';

export default function UserProfilePage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <TopBar />
      <main className="p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">User Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg p-6 border border-slate-300 shadow-sm">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 rounded-full bg-blue-300 text-blue-900 flex items-center justify-center text-4xl border-4 border-blue-600">
                  <User size={48} />
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-xl font-bold text-slate-900 mb-1">Administrator</h2>
                <p className="text-sm text-slate-600 mb-4">admin@wyb.ac.lk</p>
                <div className="flex items-center justify-center gap-2 text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-2 rounded">
                  <Shield size={16} />
                  System Administrator
                </div>
              </div>
            </div>
          </div>

          {/* Details Card */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg p-6 border border-slate-300 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                <i className="fas fa-id-card text-blue-600"></i>
                User Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    <Mail size={14} className="inline mr-1" />
                    Email Address
                  </label>
                  <p className="text-sm text-slate-900 bg-slate-50 px-4 py-2 rounded border border-slate-200">
                    admin@wyb.ac.lk
                  </p>
                </div>

                {/* Role */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    <Shield size={14} className="inline mr-1" />
                    User Role
                  </label>
                  <p className="text-sm text-slate-900 bg-slate-50 px-4 py-2 rounded border border-slate-200">
                    System Administrator
                  </p>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    <i className="fas fa-circle-check text-green-600 mr-1"></i>
                    Account Status
                  </label>
                  <p className="text-sm text-green-700 bg-green-50 px-4 py-2 rounded border border-green-200 font-semibold">
                    Active
                  </p>
                </div>

                {/* Last Login */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    <Calendar size={14} className="inline mr-1" />
                    Last Login
                  </label>
                  <p className="text-sm text-slate-900 bg-slate-50 px-4 py-2 rounded border border-slate-200">
                    May 18, 2026 - 10:30 AM
                  </p>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    <Phone size={14} className="inline mr-1" />
                    Phone Number
                  </label>
                  <p className="text-sm text-slate-900 bg-slate-50 px-4 py-2 rounded border border-slate-200">
                    +94 71 234 5678
                  </p>
                </div>

                {/* Department */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    <MapPin size={14} className="inline mr-1" />
                    Department
                  </label>
                  <p className="text-sm text-slate-900 bg-slate-50 px-4 py-2 rounded border border-slate-200">
                    Information Technology
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Permissions Card */}
        <div className="mt-6 bg-white rounded-lg p-6 border border-slate-300 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
            <Shield size={20} className="text-blue-600" />
            Permissions & Access
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Members Management',
              'Society Management',
              'Event Management',
              'Finance Management',
              'User Management',
              'Reports & Analytics',
              'Student Registration',
              'Task Management'
            ].map((permission, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded border border-slate-200">
                <i className="fas fa-check-circle text-green-600"></i>
                <span className="text-sm font-semibold text-slate-700">{permission}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
