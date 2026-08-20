'use client';

import { addForum } from '@/lib/actions/addforum';
import { useSession } from '@/lib/auth-client';
import { useState } from 'react';

export default function AddForumPost() {
  const { data: session } = useSession();
  const user = session?.user;

  const [formData, setFormData] = useState({
    title: '',
    coverImage: '',
    description: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage({ type: '', text: '' });

    try {
      const payload = {
        title: formData.title,
        coverImage: formData.coverImage,
        description: formData.description,
        trainerId: user?.id,
        trainerEmail: user?.email,
        status: 'approved',
      };

      const res = await addForum(payload);

      if (res?.insertedId) {
        setStatusMessage({
          type: 'success',
          text: 'Post published successfully to the forum!',
        });
        setFormData({
          title: '',
          coverImage: '',
          description: '',
        });
      } else {
        throw new Error('Insert failed');
      }
    } catch (error) {
      setStatusMessage({
        type: 'error',
        text: 'Failed to publish post. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header Info */}
      <div className="space-y-1">
        <span className="text-[#f97316] text-[10px] font-extrabold tracking-[0.2em] uppercase">
          COMMUNITY
        </span>
        <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white">
          ADD FORUM POST
        </h1>
        <p className="text-xs text-[#9CA3AF]">
          Share coaching insight with the NexFit community. Posts appear on the forum immediately.
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-[#120c09] border border-white/5 rounded-2xl p-6 md:p-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Alert Message */}
          {statusMessage.text && (
            <div
              className={`p-3.5 rounded-xl text-xs font-semibold ${
                statusMessage.type === 'success'
                  ? 'bg-[#f97316]/10 text-[#f97316] border border-[#f97316]/20'
                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}
            >
              {statusMessage.text}
            </div>
          )}

          {/* Title Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-white uppercase tracking-tight">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Progressive overload without burning out"
              required
              className="w-full bg-[#1b120c]/60 border border-white/5 rounded-xl px-4 py-3 text-xs text-white placeholder-[#9CA3AF]/40 focus:outline-none focus:border-[#f97316]/50 transition-colors"
            />
          </div>

          {/* Cover Image URL Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-white uppercase tracking-tight">
              Cover Image URL
            </label>
            <input
              type="url"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/photo-..."
              required
              className="w-full bg-[#1b120c]/60 border border-white/5 rounded-xl px-4 py-3 text-xs text-white placeholder-[#9CA3AF]/40 focus:outline-none focus:border-[#f97316]/50 transition-colors"
            />
          </div>

          {/* Optional Image Preview */}
          {formData.coverImage && (
            <div className="relative rounded-2xl overflow-hidden border border-white/10 h-44 bg-[#1b120c]">
              <img
                src={formData.coverImage}
                alt="Cover preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Description Textarea */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-white uppercase tracking-tight">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              placeholder="Write your post..."
              required
              className="w-full bg-[#1b120c]/60 border border-white/5 rounded-xl px-4 py-3 text-xs text-white placeholder-[#9CA3AF]/40 focus:outline-none focus:border-[#f97316]/50 transition-colors resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-[#f97316] hover:bg-[#ea580c] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? 'PUBLISHING...' : 'PUBLISH POST'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}