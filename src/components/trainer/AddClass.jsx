'use client'

import { useState } from 'react';

export default function AddClass() {
  const [formData, setFormData] = useState({
    className: '',
    coverImage: '',
    category: '',
    difficulty: '',
    duration: '',
    price: '',
    schedule: '',
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
      // Replace with your API submission logic
      // await fetch('/api/classes', { method: 'POST', body: JSON.stringify(formData) });
      
      setStatusMessage({
        type: 'success',
        text: 'Class submitted successfully! Pending admin approval.',
      });
      setFormData({
        className: '',
        coverImage: '',
        category: '',
        difficulty: '',
        duration: '',
        price: '',
        schedule: '',
        description: '',
      });
    } catch (error) {
      setStatusMessage({
        type: 'error',
        text: 'Failed to submit class. Please try again.',
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
          COACHING
        </span>
        <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white">
          ADD A CLASS
        </h1>
        <p className="text-xs text-[#9CA3AF]">
          New classes are submitted with a Pending status and go live once an admin approves them.
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-[#120c09] border border-white/5 rounded-2xl p-6 md:p-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Status Alert Message */}
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

          {/* Class Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-white uppercase tracking-tight">
              Class name
            </label>
            <input
              type="text"
              name="className"
              value={formData.className}
              onChange={handleChange}
              placeholder="Ember HIIT 45"
              required
              className="w-full bg-[#1b120c]/60 border border-white/5 rounded-xl px-4 py-3 text-xs text-white placeholder-[#9CA3AF]/40 focus:outline-none focus:border-[#f97316]/50 transition-colors"
            />
          </div>

          {/* Cover Image URL */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-white uppercase tracking-tight">
              Cover image URL
            </label>
            <input
              type="url"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="https://..."
              required
              className="w-full bg-[#1b120c]/60 border border-white/5 rounded-xl px-4 py-3 text-xs text-white placeholder-[#9CA3AF]/40 focus:outline-none focus:border-[#f97316]/50 transition-colors"
            />
          </div>

          {/* Category & Difficulty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-white uppercase tracking-tight">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full bg-[#1b120c]/60 border border-white/5 rounded-xl px-4 py-3 text-xs text-white placeholder-[#9CA3AF]/40 focus:outline-none focus:border-[#f97316]/50 transition-colors cursor-pointer appearance-none"
              >
                <option value="" disabled className="bg-[#120c09] text-[#9CA3AF]">
                  Select category
                </option>
                <option value="Yoga" className="bg-[#120c09]">Yoga</option>
                <option value="Boxing" className="bg-[#120c09]">Boxing</option>
                <option value="Cardio" className="bg-[#120c09]">Cardio</option>
                <option value="Strength" className="bg-[#120c09]">Strength</option>
                <option value="HIIT" className="bg-[#120c09]">HIIT</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-white uppercase tracking-tight">
                Difficulty
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                required
                className="w-full bg-[#1b120c]/60 border border-white/5 rounded-xl px-4 py-3 text-xs text-white placeholder-[#9CA3AF]/40 focus:outline-none focus:border-[#f97316]/50 transition-colors cursor-pointer appearance-none"
              >
                <option value="" disabled className="bg-[#120c09] text-[#9CA3AF]">
                  Select level
                </option>
                <option value="Beginner" className="bg-[#120c09]">Beginner</option>
                <option value="Intermediate" className="bg-[#120c09]">Intermediate</option>
                <option value="Advanced" className="bg-[#120c09]">Advanced</option>
                <option value="All Levels" className="bg-[#120c09]">All Levels</option>
              </select>
            </div>
          </div>

          {/* Duration & Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-white uppercase tracking-tight">
                Duration
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="45 min"
                required
                className="w-full bg-[#1b120c]/60 border border-white/5 rounded-xl px-4 py-3 text-xs text-white placeholder-[#9CA3AF]/40 focus:outline-none focus:border-[#f97316]/50 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-white uppercase tracking-tight">
                Price (USD)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="24"
                required
                className="w-full bg-[#1b120c]/60 border border-white/5 rounded-xl px-4 py-3 text-xs text-white placeholder-[#9CA3AF]/40 focus:outline-none focus:border-[#f97316]/50 transition-colors"
              />
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-white uppercase tracking-tight">
              Schedule (days & time)
            </label>
            <input
              type="text"
              name="schedule"
              value={formData.schedule}
              onChange={handleChange}
              placeholder="Mon, Wed, Fri — 6:30 AM"
              required
              className="w-full bg-[#1b120c]/60 border border-white/5 rounded-xl px-4 py-3 text-xs text-white placeholder-[#9CA3AF]/40 focus:outline-none focus:border-[#f97316]/50 transition-colors"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-white uppercase tracking-tight">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="What should members expect?"
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
              {isSubmitting ? 'SUBMITTING...' : 'SUBMIT CLASS'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}