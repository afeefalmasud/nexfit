'use client'

import { useState, useRef } from 'react';
import { FiImage, FiX } from 'react-icons/fi';

export default function AddForumPost() {
  const [formData, setFormData] = useState({
    title: '',
    coverImage: null,
    imagePreview: '',
    description: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleTitleChange = (e) => {
    setFormData((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleDescriptionChange = (e) => {
    setFormData((prev) => ({ ...prev, description: e.target.value }));
  };

  // Image Upload Handlers
  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        coverImage: file,
        imagePreview: previewUrl,
      }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveImage = () => {
    if (formData.imagePreview) {
      URL.revokeObjectURL(formData.imagePreview);
    }
    setFormData((prev) => ({
      ...prev,
      coverImage: null,
      imagePreview: '',
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage({ type: '', text: '' });

    try {
      // Replace with your API route call (e.g., FormData upload to Next.js API endpoint)
      // const body = new FormData();
      // body.append('title', formData.title);
      // body.append('description', formData.description);
      // if (formData.coverImage) body.append('coverImage', formData.coverImage);
      // await fetch('/api/forum', { method: 'POST', body });

      setStatusMessage({
        type: 'success',
        text: 'Post published successfully to the forum!',
      });

      // Clear Form
      handleRemoveImage();
      setFormData({
        title: '',
        coverImage: null,
        imagePreview: '',
        description: '',
      });
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
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="Progressive overload without burning out"
              required
              className="w-full bg-[#1b120c]/60 border border-white/5 rounded-xl px-4 py-3 text-xs text-white placeholder-[#9CA3AF]/40 focus:outline-none focus:border-[#f97316]/50 transition-colors"
            />
          </div>

          {/* Cover Image Drag & Drop Area */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-white uppercase tracking-tight">
              Cover image
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            />

            {!formData.imagePreview ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${
                  isDragging
                    ? 'border-[#f97316] bg-[#f97316]/10'
                    : 'border-white/10 bg-[#1b120c]/40 hover:bg-[#1b120c]/70 hover:border-white/20'
                }`}
              >
                <div className="p-2.5 rounded-xl bg-white/5 text-[#f97316]">
                  <FiImage className="w-5 h-5" />
                </div>
                <p className="text-xs text-[#9CA3AF] text-center font-medium">
                  Drop an image here or <span className="text-white underline">click to upload</span>
                </p>
              </div>
            ) : (
              <div className="relative rounded-2xl overflow-hidden border border-white/10 h-44 group bg-[#1b120c]">
                <img
                  src={formData.imagePreview}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/60 text-white hover:bg-black/90 transition-colors cursor-pointer"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Description Textarea */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-white uppercase tracking-tight">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={handleDescriptionChange}
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