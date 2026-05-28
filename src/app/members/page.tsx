'use client';

import { useState, useEffect } from 'react';
import TopBar from '@/components/TopBar';
import MembersTable from '@/components/MembersTable';

interface Member {
  name: string;
  email: string;
  society: string;
  date: string;
  role: string;
  regId: string;
  event: string;
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    // Initialize with 4 empty entries
    setMembers([
      { name: '', email: '', society: '', date: '', role: '', regId: '', event: '' },
      { name: '', email: '', society: '', date: '', role: '', regId: '', event: '' },
      { name: '', email: '', society: '', date: '', role: '', regId: '', event: '' },
      { name: '', email: '', society: '', date: '', role: '', regId: '', event: '' },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <TopBar />
      <MembersTable members={members} onMembersChange={setMembers} />
    </div>
  );
}
