'use client';

import { useState } from 'react';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

export default function ApplyTrainer({ user }) {
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    experience: '',
    specialty: '',
    availableTimes: '',
    coachingPhilosophy: '',
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
        userId: user?.id,
        fullName: formData.fullName,
        email: formData.email,
        experience: formData.experience,
        specialty: formData.specialty,
        availableTimes: formData.availableTimes,
        coachingPhilosophy: formData.coachingPhilosophy,
        status: 'pending',
        appliedAt: new Date(),
      };

      const res = await fetch(`${baseURL}/api/trainer-applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setStatusMessage({
          type: 'success',
          text: 'Application submitted successfully! An admin will review it within 48 hours.',
        });
        setFormData((prev) => ({
          ...prev,
          experience: '',
          specialty: '',
          availableTimes: '',
          coachingPhilosophy: '',
        }));
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (error) {
      setStatusMessage({
        type: 'error',
        text: error.message || 'Failed to submit application. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl space-y-6">
      {/* Header Info */}
      <div className="space-y-1">
        <span className="text-[#f97316] text-[10px] font-extrabold tracking-[0.2em] uppercase">
          MEMBER
        </span>
        <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white">
          APPLY AS TRAINER
        </h1>
        <p className="text-xs text-[#9CA3AF]">
          Tell us about your coaching experience. Applications are reviewed by an admin within 48 hours.
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-[#120c09] border border-white/5 rounded-2xl p-6 sm:p-8 max-w-2xl space-y-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Status Message Alert */}
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

          {/* Row 1: Full Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#9CA3AF]">
                Full name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Jordan Ellis"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#17100c] border border-white/10 text-xs text-white placeholder-[#9CA3AF]/40 focus:outline-none focus:border-[#f97316] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#9CA3AF]">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="jordan@nexfit.io"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#17100c] border border-white/10 text-xs text-white placeholder-[#9CA3AF]/40 focus:outline-none focus:border-[#f97316] transition-colors"
              />
            </div>
          </div>

          {/* Row 2: Experience & Specialty */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#9CA3AF]">
                Experience (years)
              </label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="e.g. 4"
                min="0"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#17100c] border border-white/10 text-xs text-white placeholder-[#9CA3AF]/40 focus:outline-none focus:border-[#f97316] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#9CA3AF]">
                Specialty
              </label>
              <div className="relative">
                <select
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#17100c] border border-white/10 text-xs text-white focus:outline-none focus:border-[#f97316] transition-colors appearance-none cursor-pointer invalid:text-[#9CA3AF]/40"
                >
                  <option value="" disabled hidden>
                    Choose a specialty
                  </option>
                  <option value="Strength & Conditioning" className="bg-[#17100c] text-white">
                    Strength & Conditioning
                  </option>
                  <option value="HIIT & Cardio" className="bg-[#17100c] text-white">
                    HIIT & Cardio
                  </option>
                  <option value="Yoga & Mobility" className="bg-[#17100c] text-white">
                    Yoga & Mobility
                  </option>
                  <option value="Boxing & Combat" className="bg-[#17100c] text-white">
                    Boxing & Combat
                  </option>
                  <option value="Pilates" className="bg-[#17100c] text-white">
                    Pilates
                  </option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-[#9CA3AF]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Available Times */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#9CA3AF]">
              Available times
            </label>
            <input
              type="text"
              name="availableTimes"
              value={formData.availableTimes}
              onChange={handleChange}
              placeholder="Weekday evenings, Saturday mornings"
              required
              className="w-full px-4 py-3 rounded-xl bg-[#17100c] border border-white/10 text-xs text-white placeholder-[#9CA3AF]/40 focus:outline-none focus:border-[#f97316] transition-colors"
            />
          </div>

          {/* Row 4: Coaching Philosophy */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#9CA3AF]">
              Why do you want to coach at NexFit?
            </label>
            <textarea
              name="coachingPhilosophy"
              rows={4}
              value={formData.coachingPhilosophy}
              onChange={handleChange}
              placeholder="Tell us about your coaching philosophy..."
              required
              className="w-full px-4 py-3 rounded-xl bg-[#17100c] border border-white/10 text-xs text-white placeholder-[#9CA3AF]/40 focus:outline-none focus:border-[#f97316] transition-colors resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3.5 rounded-xl bg-[#f97316] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(249,115,22,0.4)] hover:bg-[#ea580c] active:scale-95 transition-all duration-150 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? 'SUBMITTING...' : 'SUBMIT APPLICATION'}
          </button>
        </form>
      </div>
    </div>
  );
}