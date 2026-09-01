'use client';

import { useState, useEffect } from 'react';
import { FiCheck, FiX, FiAlertTriangle } from 'react-icons/fi';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

export default function ManagePostsClient() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${baseURL}/api/admin/posts`);
      const data = await res.json();
      if (Array.isArray(data)) setPosts(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Approve Post
  const handleApprove = async (postId) => {
    try {
      const res = await fetch(`${baseURL}/api/admin/posts/${postId}/approve`, {
        method: 'PATCH',
      });
      if (res.ok) fetchPosts();
    } catch (err) {
      console.error('Failed to approve post:', err);
    }
  };

  // Open Reject Modal
  const openRejectModal = (item) => {
    setSelectedPost(item);
    setIsModalOpen(true);
  };

  // Confirm Rejection (Deletes document)
  const confirmReject = async () => {
    if (!selectedPost) return;

    try {
      const res = await fetch(`${baseURL}/api/admin/posts/${selectedPost._id}/reject`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setIsModalOpen(false);
        setSelectedPost(null);
        fetchPosts();
      }
    } catch (err) {
      console.error('Failed to reject post:', err);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto text-white font-sans relative">
      {/* Header */}
      <div className="space-y-1">
        <span className="text-[#f97316] text-[10px] font-extrabold tracking-[0.2em] uppercase">
          COMMUNITY
        </span>
        <h1 className="text-4xl font-black uppercase tracking-tight text-white">
          MANAGE POSTS
        </h1>
        <p className="text-xs text-[#9CA3AF]/80">
          Review forum posts, approve active discussions, or delete submissions that break rules.
        </p>
      </div>

      {/* Table Container */}
      <div className="bg-[#120c09] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[11px] font-extrabold text-[#9CA3AF]/60 uppercase tracking-wider">
                <th className="py-4 px-6">Title & Preview</th>
                <th className="py-4 px-6">Author</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-[#9CA3AF]/60">
                    Loading posts...
                  </td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-[#9CA3AF]/60">
                    No forum posts found.
                  </td>
                </tr>
              ) : (
                posts.map((item) => {
                  const status = item.status?.toLowerCase() || 'pending';

                  return (
                    <tr key={item._id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6 max-w-xs">
                        <div className="font-bold text-white/90 truncate">
                          {item.title}
                        </div>
                        <div className="text-[10px] text-[#9CA3AF]/60 truncate">
                          {item.content || item.description}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-[#9CA3AF]">
                        <div>{item.trainerName || item.trainer || 'N/A'}</div>
                        <div className="text-[10px] text-[#9CA3AF]/50">{item.authorEmail}</div>
                      </td>
                      <td className="py-4 px-6">
                        {status === 'approved' ? (
                          <span className="inline-block bg-emerald-950/40 text-emerald-500 border border-emerald-500/20 px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider">
                            APPROVED
                          </span>
                        ) : (
                          <span className="inline-block bg-amber-950/40 text-amber-500 border border-amber-500/20 px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider">
                            PENDING
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-3">
                          {status !== 'approved' && (
                            <button
                              onClick={() => handleApprove(item._id)}
                              className="flex items-center gap-1 text-xs font-semibold text-emerald-500 hover:text-emerald-400 transition-colors cursor-pointer"
                            >
                              <FiCheck className="w-3.5 h-3.5" />
                              <span>Approve</span>
                            </button>
                          )}

                          <button
                            onClick={() => openRejectModal(item)}
                            className="flex items-center gap-1 text-xs font-semibold text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                          >
                            <FiX className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rejection Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#120c09] border border-white/10 rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-500">
              <div className="p-2 rounded-full bg-red-500/10 border border-red-500/20">
                <FiAlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold uppercase text-white">Reject Post?</h3>
            </div>

            <p className="text-xs text-[#9CA3AF] leading-relaxed">
              Are you sure you want to reject <span className="text-white font-bold">"{selectedPost?.title}"</span>? This action will permanently remove the post.
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-white/70 hover:text-white transition-colors rounded-lg bg-white/5 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={confirmReject}
                className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-500 transition-colors rounded-lg shadow-lg"
              >
                Reject & Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}