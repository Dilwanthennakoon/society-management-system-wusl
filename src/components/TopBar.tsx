'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, ChevronDown, LogOut, User } from 'lucide-react';
import Link from 'next/link';

export default function TopBar() {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  const getLinkClass = (href: string) => {
    const baseClass = 'flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-all border-b border-slate-100';
    if (isActive(href)) {
      return `${baseClass} bg-blue-50 text-blue-600`;
    }
    return `${baseClass} text-slate-500 hover:bg-slate-100 hover:text-blue-600`;
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNavOpen(!navOpen);
    if (profileOpen) setProfileOpen(false);
  };

  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setProfileOpen(!profileOpen);
    if (navOpen) setNavOpen(false);
  };

  const handleBackdropClick = () => {
    setNavOpen(false);
    setProfileOpen(false);
  };

  return (
    <>
      {/* Backdrop */}
      {(navOpen || profileOpen) && (
        <div className="fixed inset-0 z-40" onClick={handleBackdropClick} />
      )}

      <div className="bg-blue-600 text-white h-16 px-8 flex justify-between items-center shadow-md relative z-50">
        {/* Left Section */}
        <div className="flex items-center gap-5">
          <button
            onClick={handleMenuClick}
            className="bg-transparent border-none text-white text-xl cursor-pointer p-1 flex items-center justify-center hover:bg-blue-500 rounded transition-transform active:scale-90"
            title="Main Menu"
          >
            <Menu size={24} />
          </button>
          <span className="text-lg font-semibold">Members Management</span>

          {/* Navigation Dropdown */}
          {navOpen && (
            <div className="absolute top-14 left-5 bg-white border border-slate-300 rounded-lg w-64 shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-200">
              <div className="bg-slate-900 text-white px-4 py-3 text-xs font-bold uppercase tracking-wider">
                Navigation Menu
              </div>
              <ul className="list-none">
                <li>
                  <Link href="/society" onClick={handleBackdropClick} className={getLinkClass('/society')}>
                    <i className="fas fa-sitemap w-4"></i>
                    Society Management
                  </Link>
                </li>
                <li>
                  <Link href="/registration" onClick={handleBackdropClick} className={getLinkClass('/registration')}>
                    <i className="fas fa-user-plus w-4"></i>
                    Student Registration
                  </Link>
                </li>
                <li>
                  <Link href="/members" onClick={handleBackdropClick} className={getLinkClass('/members')}>
                    <i className="fas fa-users-gear w-4"></i>
                    Members Management
                  </Link>
                </li>
                <li>
                  <Link href="/admin" onClick={handleBackdropClick} className={getLinkClass('/admin')}>
                    <i className="fas fa-user-shield w-4"></i>
                    Admin Management
                  </Link>
                </li>
                <li>
                  <Link href="/events" onClick={handleBackdropClick} className={getLinkClass('/events')}>
                    <i className="fas fa-calendar-days w-4"></i>
                    Event Management
                  </Link>
                </li>
                <li>
                  <Link href="/tasks" onClick={handleBackdropClick} className={getLinkClass('/tasks')}>
                    <i className="fas fa-list-check w-4"></i>
                    Task / Activity
                  </Link>
                </li>
                <li>
                  <Link href="/finance" onClick={handleBackdropClick} className={getLinkClass('/finance')}>
                    <i className="fas fa-money-check-dollar w-4"></i>
                    Finance / Payment
                  </Link>
                </li>
                <li>
                  <Link href="/reports" onClick={handleBackdropClick} className={getLinkClass('/reports')}>
                    <i className="fas fa-chart-pie w-4"></i>
                    Reporting
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" onClick={handleBackdropClick} className={getLinkClass('/dashboard')}>
                    <i className="fas fa-gauge w-4"></i>
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="relative">
          <button
            onClick={handleProfileClick}
            className="bg-transparent border-none text-white flex items-center gap-3 cursor-pointer px-3 py-1 rounded-full hover:bg-blue-500 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white"></div>
            <span className="text-sm font-semibold flex items-center gap-1">
              Admin User <ChevronDown size={14} className="text-blue-200" />
            </span>
          </button>

          {/* Profile Popover */}
          {profileOpen && (
            <div className="absolute top-14 right-0 bg-white border border-slate-300 rounded-lg w-48 shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-200">
              <div className="px-4 py-3 border-b border-slate-200">
                <strong className="text-sm text-slate-900">Administrator</strong>
                <div className="text-xs text-slate-500">admin@wyb.ac.lk</div>
              </div>
              <Link
                href="/user-profile"
                onClick={handleBackdropClick}
                className="flex items-center gap-2 px-4 py-3 text-slate-700 text-sm font-semibold hover:bg-slate-100 transition-colors border-b border-slate-200"
              >
                <User size={16} />
                User Details
              </Link>
              <Link
                href="/logout"
                className="flex items-center gap-2 px-4 py-3 text-red-600 text-sm font-bold bg-red-50 hover:bg-red-100 transition-colors"
              >
                <LogOut size={16} />
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
