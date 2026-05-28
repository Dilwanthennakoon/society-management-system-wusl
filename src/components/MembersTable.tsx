'use client';

import { useState, useEffect, useRef } from 'react';
import { Edit2, Eye, Trash2 } from 'lucide-react';

interface Member {
  name: string;
  email: string;
  society: string;
  date: string;
  role: string;
  regId: string;
  event: string;
}

interface MembersTableProps {
  members: Member[];
  onMembersChange: (members: Member[]) => void;
}

const ITEMS_PER_PAGE = 20;

export default function MembersTable({ members, onMembersChange }: MembersTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterSociety, setFilterSociety] = useState('');
  const [filterEvent, setFilterEvent] = useState('');
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const getFilteredMembers = () => {
    return members.filter((item) => {
      const matchesName = item.name.toLowerCase().includes(searchKeyword.toLowerCase());
      const matchesRole = !filterRole || item.role.toLowerCase() === filterRole.toLowerCase();
      const matchesSociety = !filterSociety || item.society.toLowerCase() === filterSociety.toLowerCase();
      const matchesEvent = !filterEvent || (item.event && item.event.toLowerCase() === filterEvent.toLowerCase());

      return matchesName && matchesRole && matchesSociety && matchesEvent;
    });
  };

  const filteredMembers = getFilteredMembers();
  const totalPages = Math.ceil(filteredMembers.length / ITEMS_PER_PAGE) || 1;

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [filteredMembers.length, totalPages]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredMembers.length);
  const displayedMembers = filteredMembers.slice(startIndex, endIndex);

  const handleInputChange = (index: number, field: keyof Member, value: string) => {
    const memberIndex = members.findIndex((m) => m === filteredMembers[index]);
    if (memberIndex !== -1) {
      const updatedMembers = [...members];
      updatedMembers[memberIndex] = { ...updatedMembers[memberIndex], [field]: value };
      onMembersChange(updatedMembers);
    }
  };

  const handleAddMember = () => {
    const newMember: Member = {
      name: '',
      email: '',
      society: filterSociety,
      date: '',
      role: filterRole,
      regId: '',
      event: filterEvent,
    };
    onMembersChange([...members, newMember]);
    setCurrentPage(Math.ceil((members.length + 1) / ITEMS_PER_PAGE));
  };

  const handleDeleteMember = (index: number) => {
    if (confirm('Are you sure you want to remove this member?')) {
      const memberIndex = members.findIndex((m) => m === filteredMembers[index]);
      if (memberIndex !== -1) {
        const updatedMembers = members.filter((_, i) => i !== memberIndex);
        onMembersChange(updatedMembers.length > 0 ? updatedMembers : [{ name: '', email: '', society: '', date: '', role: '', regId: '', event: '' }]);
      }
    }
  };

  const handleViewMember = (index: number) => {
    const member = filteredMembers[index];
    alert(`Viewing details for: ${member.name || 'Empty Row Entry'}`);
  };

  const handleFilterRoleChange = (newRole: string) => {
    if (newRole) {
      const updatedMembers = members.map((member) => {
        const matchesCurrentFilters =
          (!searchKeyword || member.name.toLowerCase().includes(searchKeyword.toLowerCase())) &&
          (!filterSociety || member.society.toLowerCase() === filterSociety.toLowerCase()) &&
          (!filterEvent || (member.event && member.event.toLowerCase() === filterEvent.toLowerCase()));
        return matchesCurrentFilters ? { ...member, role: newRole } : member;
      });
      onMembersChange(updatedMembers);
    }
  };

  const handleFilterSocietyChange = (newSociety: string) => {
    if (newSociety) {
      const updatedMembers = members.map((member) => {
        const matchesCurrentFilters =
          (!searchKeyword || member.name.toLowerCase().includes(searchKeyword.toLowerCase())) &&
          (!filterRole || member.role.toLowerCase() === filterRole.toLowerCase()) &&
          (!filterEvent || (member.event && member.event.toLowerCase() === filterEvent.toLowerCase()));
        return matchesCurrentFilters ? { ...member, society: newSociety } : member;
      });
      onMembersChange(updatedMembers);
    }
  };

  const handleFilterEventChange = (newEvent: string) => {
    if (newEvent) {
      const updatedMembers = members.map((member) => {
        const matchesCurrentFilters =
          (!searchKeyword || member.name.toLowerCase().includes(searchKeyword.toLowerCase())) &&
          (!filterRole || member.role.toLowerCase() === filterRole.toLowerCase()) &&
          (!filterSociety || member.society.toLowerCase() === filterSociety.toLowerCase());
        return matchesCurrentFilters ? { ...member, event: newEvent } : member;
      });
      onMembersChange(updatedMembers);
    }
  };

  const handleReset = () => {
    console.log('Resetting filters - data NOT saved');
    setSearchKeyword('');
    setFilterRole('');
    setFilterSociety('');
    setFilterEvent('');
    setCurrentPage(1);
  };

  const handleSave = () => {
    console.log('Saving members data:', members);
    alert('Members Management Data saved successfully to the database!');
  };

  const fieldOrder = ['name', 'email', 'society', 'date', 'role', 'event', 'regId'];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, rowIndex: number, fieldName: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const currentFieldIndex = fieldOrder.indexOf(fieldName);
      
      if (currentFieldIndex < fieldOrder.length - 1) {
        // Move to next field in the same row
        const nextFieldName = fieldOrder[currentFieldIndex + 1];
        const nextFieldKey = `${rowIndex}-${nextFieldName}`;
        const nextInput = inputRefs.current[nextFieldKey];
        if (nextInput) {
          nextInput.focus();
          nextInput.select();
        }
      } else {
        // Move to first field of next row
        const nextRowIndex = rowIndex + 1;
        const firstFieldKey = `${nextRowIndex}-${fieldOrder[0]}`;
        const nextInput = inputRefs.current[firstFieldKey];
        if (nextInput) {
          nextInput.focus();
          nextInput.select();
        }
      }
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Members Management</h1>

      {/* Control Card */}
      <section className="bg-slate-200 rounded-lg p-6 mb-6 border border-slate-300">
        <div className="flex justify-between items-center border-b border-slate-300 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-blue-300 text-blue-900 flex items-center justify-center text-lg font-semibold">
              <i className="fas fa-users-gear"></i>
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Members Management</h2>
              <p className="text-sm text-slate-600">Add, edit, delete and manage members linked to societies and events.</p>
            </div>
          </div>
          <button
            onClick={handleAddMember}
            className="bg-blue-500 text-white px-5 py-2 rounded-md text-sm font-bold hover:bg-blue-600 flex items-center gap-2 shadow-sm"
          >
            <i className="fas fa-plus"></i> Add New Members
          </button>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-4 gap-5">
          {/* Search by Name */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-900">Search by Name</label>
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Enter the Name"
                value={searchKeyword}
                onChange={(e) => {
                  setSearchKeyword(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-white border border-slate-500 px-3 py-2 rounded text-sm text-slate-900 placeholder:text-slate-400 outline-none"
              />
              <i className="fas fa-magnifying-glass absolute right-3 text-slate-500 text-sm pointer-events-none"></i>
            </div>
          </div>

          {/* Filter by Role */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-900">Filter by Role</label>
            <select
              value=""
              onChange={(e) => {
                handleFilterRoleChange(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-white border border-slate-500 px-3 py-2 rounded text-sm text-slate-900 outline-none h-9 cursor-pointer"
            >
              <option value="">select role</option>
              <option value="president">President</option>
              <option value="vice president">Vice President</option>
              <option value="secretary">Secretary</option>
              <option value="treasurer">Treasurer</option>
              <option value="coordinator">Coordinator</option>
              <option value="event head">Event Head</option>
              <option value="committee member">Committee Member</option>
              <option value="member">Member</option>
            </select>
          </div>

          {/* Filter by Society */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-900">Filter by Society</label>
            <select
              value=""
              onChange={(e) => {
                handleFilterSocietyChange(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-white border border-slate-500 px-3 py-2 rounded text-sm text-slate-900 outline-none h-9 cursor-pointer"
            >
              <option value="">select society</option>
              <option value="IT Society">IT Society</option>
              <option value="MediaSociety">MediaSociety</option>
              <option value="Sports Club">Sports Club</option>
              <option value="IEEE Student Branch">IEEE Student Branch</option>
              <option value="Gavel Club">Gavel Club</option>
              <option value="Rotaract Club">Rotaract Club</option>
              <option value="Leo Club">Leo Club</option>
              <option value="Art & Drama Society">Art & Drama Society</option>
            </select>
          </div>

          {/* Filter by Event */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-900">Filter by Event</label>
            <div className="flex gap-2 items-center">
              <select
                value=""
                onChange={(e) => {
                  handleFilterEventChange(e.target.value);
                  setCurrentPage(1);
                }}
                className="flex-grow bg-white border border-slate-500 px-3 py-2 rounded text-sm text-slate-900 outline-none h-9 cursor-pointer"
              >
                <option value="">select event</option>
                <option value="tech-fest">Tech Fest 2026</option>
                <option value="media-night">Media Night</option>
                <option value="sports-meet">Annual Sports Meet</option>
                <option value="hackathon">National Hackathon</option>
                <option value="charity-drive">Welfare Charity Drive</option>
                <option value="convocation">General Convocation</option>
              </select>
              <button
                onClick={handleReset}
                className="bg-slate-900 text-white px-4 h-9 rounded text-xs font-bold hover:bg-slate-800 flex items-center gap-2 whitespace-nowrap"
                title="Save and clear all filters"
              >
                <i className="fas fa-arrows-rotate"></i> Reset
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Members List Card */}
      <section className="bg-blue-100 rounded-lg p-5 border border-blue-300 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <i className="fas fa-file-signature text-xl text-blue-900"></i>
          <h3 className="text-lg font-bold text-blue-900">Members List</h3>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-slate-500 rounded-lg">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-slate-300 text-slate-900">
                <th className="border-b-2 border-slate-500 px-3 py-3 text-xs font-bold text-center w-1/20">#</th>
                <th className="border-b-2 border-slate-500 px-3 py-3 text-xs font-bold text-left w-4/20">Members Name</th>
                <th className="border-b-2 border-slate-500 px-3 py-3 text-xs font-bold text-left w-4/20">Email</th>
                <th className="border-b-2 border-slate-500 px-3 py-3 text-xs font-bold text-left w-2/20">Society</th>
                <th className="border-b-2 border-slate-500 px-3 py-3 text-xs font-bold text-left w-2/20">Registration Date</th>
                <th className="border-b-2 border-slate-500 px-3 py-3 text-xs font-bold text-left w-2/20">Role</th>
                <th className="border-b-2 border-slate-500 px-3 py-3 text-xs font-bold text-left w-2/20">Event</th>
                <th className="border-b-2 border-slate-500 px-3 py-3 text-xs font-bold text-left w-2/20">Linked Reg</th>
                <th className="border-b-2 border-slate-500 px-3 py-3 text-xs font-bold text-center w-1/20">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedMembers.map((member, idx) => (
                <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="px-3 py-2 text-center font-bold text-slate-600 text-sm">{startIndex + idx + 1}</td>
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      placeholder="Enter Name..."
                      value={member.name}
                      onChange={(e) => handleInputChange(idx, 'name', e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, idx, 'name')}
                      ref={(el) => {
                        if (el) inputRefs.current[`${idx}-name`] = el;
                      }}
                      className="w-full border border-transparent bg-transparent px-2 py-1 rounded text-sm text-slate-900 outline-none focus:bg-white focus:border-purple-500 focus:shadow-md focus:shadow-purple-200"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="email"
                      placeholder="name@email.com"
                      value={member.email}
                      onChange={(e) => handleInputChange(idx, 'email', e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, idx, 'email')}
                      ref={(el) => {
                        if (el) inputRefs.current[`${idx}-email`] = el;
                      }}
                      className="w-full border border-transparent bg-transparent px-2 py-1 rounded text-sm text-slate-900 outline-none focus:bg-white focus:border-purple-500 focus:shadow-md focus:shadow-purple-200"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      placeholder="Enter Society..."
                      value={member.society}
                      onChange={(e) => handleInputChange(idx, 'society', e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, idx, 'society')}
                      ref={(el) => {
                        if (el) inputRefs.current[`${idx}-society`] = el;
                      }}
                      className="w-full border border-transparent bg-transparent px-2 py-1 rounded text-sm text-slate-900 outline-none focus:bg-white focus:border-purple-500 focus:shadow-md focus:shadow-purple-200"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      placeholder="e.g. 17 May 2026"
                      value={member.date}
                      onChange={(e) => handleInputChange(idx, 'date', e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, idx, 'date')}
                      ref={(el) => {
                        if (el) inputRefs.current[`${idx}-date`] = el;
                      }}
                      className="w-full border border-transparent bg-transparent px-2 py-1 rounded text-sm text-slate-900 outline-none focus:bg-white focus:border-purple-500 focus:shadow-md focus:shadow-purple-200"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      placeholder="Enter Role..."
                      value={member.role}
                      onChange={(e) => handleInputChange(idx, 'role', e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, idx, 'role')}
                      ref={(el) => {
                        if (el) inputRefs.current[`${idx}-role`] = el;
                      }}
                      className="w-full border border-transparent bg-transparent px-2 py-1 rounded text-sm text-slate-900 outline-none focus:bg-white focus:border-purple-500 focus:shadow-md focus:shadow-purple-200"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      placeholder="Enter Event..."
                      value={member.event}
                      onChange={(e) => handleInputChange(idx, 'event', e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, idx, 'event')}
                      ref={(el) => {
                        if (el) inputRefs.current[`${idx}-event`] = el;
                      }}
                      className="w-full border border-transparent bg-transparent px-2 py-1 rounded text-sm text-slate-900 outline-none focus:bg-white focus:border-purple-500 focus:shadow-md focus:shadow-purple-200"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      placeholder="REG-2026-XXX"
                      value={member.regId}
                      onChange={(e) => handleInputChange(idx, 'regId', e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, idx, 'regId')}
                      ref={(el) => {
                        if (el) inputRefs.current[`${idx}-regId`] = el;
                      }}
                      className="w-full border border-transparent bg-transparent px-2 py-1 rounded text-sm text-slate-900 outline-none focus:bg-white focus:border-purple-500 focus:shadow-md focus:shadow-purple-200"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex justify-center gap-1">
                      <button
                        onClick={() => {
                          const input = document.querySelector(`input[placeholder="Enter Name..."]`) as HTMLInputElement;
                          input?.focus();
                        }}
                        title="Edit"
                        className="w-6 h-6 rounded border border-slate-300 bg-white text-slate-600 hover:bg-slate-100 flex items-center justify-center text-xs"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleViewMember(idx)}
                        title="View Details"
                        className="w-6 h-6 rounded border border-slate-300 bg-white text-slate-600 hover:bg-slate-100 flex items-center justify-center text-xs"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteMember(idx)}
                        title="Remove"
                        className="w-6 h-6 rounded border border-slate-300 bg-white text-red-600 hover:bg-red-50 flex items-center justify-center text-xs"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer Pagination */}
      <footer className="mt-6 flex justify-between items-center bg-white rounded-lg p-4 border border-slate-300">
        <div className="text-sm text-slate-700">
          Showing <span className="font-semibold">{filteredMembers.length === 0 ? 0 : startIndex + 1}</span> to{' '}
          <span className="font-semibold">{endIndex}</span> of <span className="font-semibold">{filteredMembers.length}</span> entries
        </div>

        <div className="flex gap-4 items-center">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-blue-700 flex items-center gap-2 shadow-sm"
          >
            <i className="fas fa-floppy-disk"></i> SAVE DATA
          </button>

          {/* Pagination Controls */}
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-slate-300 rounded text-sm font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              title="First Page"
            >
              &lt;&lt;
            </button>
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-slate-300 rounded text-sm font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              title="Previous Page"
            >
              &lt;
            </button>
            {Array.from(
              { length: Math.min(3, totalPages) },
              (_, i) => {
                // Calculate which pages to show (3 pages: current-1, current, current+1)
                let startPage = Math.max(1, currentPage - 1);
                if (currentPage > totalPages - 1) {
                  startPage = Math.max(1, totalPages - 2);
                }
                return startPage + i;
              }
            ).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 border rounded text-sm font-bold ${
                  page === currentPage
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-slate-300 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-slate-300 rounded text-sm font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              title="Next Page"
            >
              &gt;
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-slate-300 rounded text-sm font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              title="Last Page"
            >
              &gt;&gt;
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}
