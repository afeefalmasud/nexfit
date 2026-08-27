"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FiThumbsUp,
  FiThumbsDown,
  FiCornerDownRight,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import { useSession } from "@/lib/auth-client";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

export default function ForumDetailsClient({ postId, initialPostData }) {
  const { data: session } = useSession();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (session?.user) {
      setCurrentUser({
        id: session.user.id || session.user.uid,
        name: session.user.name,
        email: session.user.email,
      });
    }
  }, [session]);

  const [post, setPost] = useState(initialPostData);
  const [comments, setComments] = useState(initialPostData?.comments || []);
  const [commentText, setCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const refreshPost = async () => {
    try {
      const res = await fetch(
        `${baseURL}/api/forum/${postId}?userId=${currentUser?.id || ""}`
      );
      if (res.ok) {
        const data = await res.json();
        setPost(data);
        setComments(data.comments || []);
      }
    } catch (err) {
      console.error("Failed to refresh post data:", err);
    }
  };

  // 1. FIXED VOTE HANDLER: Changed key from voteType to type
  const handleVote = async (type) => {
    if (!currentUser) return alert("Please login to vote.");

    try {
      const res = await fetch(`${baseURL}/api/forum/${postId}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser.id,
          type: type, // Fixed: backend expects 'type', not 'voteType'
        }),
      });

      if (res.ok) {
        refreshPost();
      }
    } catch (err) {
      console.error("Vote failed:", err);
    }
  };

  // 2. FIXED ADD COMMENT HANDLER: Nested user object to match backend expected format
  const handleAddComment = async (parentId = null) => {
    if (!currentUser) return alert("Please login to comment.");
    const textToSend = parentId ? replyText : commentText;
    if (!textToSend.trim()) return;

    try {
      const res = await fetch(`${baseURL}/api/forum/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: {
            id: currentUser.id,
            name: currentUser.name,
            email: currentUser.email,
          }, // Fixed: backend expects req.body.user object
          text: textToSend,
          parentId: parentId || null,
        }),
      });

      if (res.ok) {
        if (parentId) {
          setReplyingTo(null);
          setReplyText("");
        } else {
          setCommentText("");
        }
        refreshPost();
      }
    } catch (err) {
      console.error("Comment failed:", err);
    }
  };

  const handleEditComment = async (commentId) => {
    await fetch(`${baseURL}/api/forum/${postId}/comments/${commentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentUser.id, text: editText }),
    });
    setEditingId(null);
    refreshPost();
  };

  const handleDeleteComment = async (commentId) => {
    if (!confirm("Delete this comment?")) return;
    await fetch(
      `${baseURL}/api/forum/${postId}/comments/${commentId}?userId=${currentUser.id}`,
      { method: "DELETE" }
    );
    refreshPost();
  };

  const topComments = comments.filter((c) => !c.parentId);

  return (
    <div className="min-h-screen bg-[#0a0604] text-white py-30 px-4 md:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Link
              href="/community"
              className="text-xs text-gray-400 hover:text-gray-200 transition-colors"
            >
              ← Back to forum
            </Link>
            <span className="bg-[#1f1610] text-[#f97316] text-[10px] font-bold px-2 py-0.5 rounded uppercase">
              {post?.category || "Trainer"}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-wide leading-tight text-white">
            {post?.title}
          </h1>

          <div className="text-xs text-gray-400">
            <span className="font-bold text-gray-200">
              {post?.authorName || "Dana Whitlock"}
            </span>
            <span className="mx-2">•</span>
            <span>{post?.date || "Mar 14, 2026"}</span>
            <span className="mx-2">•</span>
            <span>{post?.readTime || "4 min read"}</span>
          </div>
        </div>

        {/* Hero Post Image */}
        <div className="rounded-xl overflow-hidden border border-white/5">
          <img
            src={post?.coverImage || "https://via.placeholder.com/1000x500"}
            alt={post?.title || "Forum image"}
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* Description Body */}
        <div className="text-sm md:text-base text-gray-300 leading-relaxed space-y-4 font-normal">
          {post?.description?.split("\n").map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          )) || <p>{post?.description}</p>}
        </div>

        {/* Voting Bar */}
        <div className="bg-[#120c09] border border-white/5 rounded-xl p-4 flex items-center justify-between">
          <span className="text-xs text-gray-400 font-medium">Was this useful?</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleVote("like")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                post?.userReaction === "like"
                  ? "bg-[#f97316] text-white"
                  : "bg-[#1a120d] text-gray-300 hover:bg-[#251b14]"
              }`}
            >
              <FiThumbsUp /> {post?.likeCount || 0}
            </button>
            <button
              onClick={() => handleVote("dislike")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                post?.userReaction === "dislike"
                  ? "bg-red-600 text-white"
                  : "bg-[#1a120d] text-gray-300 hover:bg-[#251b14]"
              }`}
            >
              <FiThumbsDown /> {post?.dislikeCount || 0}
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="space-y-6 pt-6">
          <h2 className="text-2xl font-black uppercase tracking-wider">
            {comments.length} COMMENTS
          </h2>

          {/* Post Comment Input Box */}
          <div className="bg-[#120c09] border border-white/5 rounded-2xl p-4 space-y-4">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Share your thoughts..."
              rows={3}
              className="w-full bg-transparent text-xs md:text-sm text-white placeholder-gray-500 outline-none resize-none"
            />
            <div className="flex justify-end">
              <button
                onClick={() => handleAddComment()}
                className="bg-[#f97316] hover:bg-[#e0650d] text-white text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-lg transition-colors"
              >
                POST COMMENT
              </button>
            </div>
          </div>

          {/* Comment Cards */}
          <div className="space-y-4">
            {topComments.map((comment) => {
              const replies = comments.filter((c) => c.parentId === comment._id);
              return (
                <div
                  key={comment._id}
                  className="bg-[#120c09] border border-white/5 rounded-2xl p-5 space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">
                        {comment.userName}
                      </span>
                      <span className="text-[10px] text-gray-500">
                        {new Date(comment.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    {editingId === comment._id ? (
                      <div className="mt-2 space-y-2">
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="w-full bg-[#1a120d] border border-white/10 rounded p-2 text-xs text-white"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditComment(comment._id)}
                            className="text-xs text-[#f97316] font-bold"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="text-xs text-gray-400"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-300 mt-1">{comment.text}</p>
                    )}

                    <div className="flex items-center gap-4 mt-3 text-[11px] text-gray-400 font-medium">
                      <button
                        onClick={() => {
                          setReplyingTo(comment._id);
                          setReplyText("");
                        }}
                        className="flex items-center gap-1 hover:text-white"
                      >
                        <FiCornerDownRight /> Reply
                      </button>
                      {currentUser?.id === comment.userId && (
                        <>
                          <button
                            onClick={() => {
                              setEditingId(comment._id);
                              setEditText(comment.text);
                            }}
                            className="flex items-center gap-1 hover:text-white"
                          >
                            <FiEdit2 /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteComment(comment._id)}
                            className="flex items-center gap-1 text-red-400 hover:text-red-300"
                          >
                            <FiTrash2 /> Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Inline Reply Input */}
                  {replyingTo === comment._id && (
                    <div className="ml-4 pl-4 border-l border-white/10 space-y-2">
                      <input
                        type="text"
                        placeholder="Write a reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="w-full bg-[#1a120d] border border-white/10 rounded-lg p-2 text-xs text-white outline-none"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddComment(comment._id)}
                          className="bg-[#f97316] text-white text-[10px] font-bold px-3 py-1 rounded"
                        >
                          Reply
                        </button>
                        <button
                          onClick={() => setReplyingTo(null)}
                          className="text-xs text-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Nested Replies */}
                  {replies.length > 0 && (
                    <div className="ml-4 pl-4 border-l border-white/10 space-y-3">
                      {replies.map((reply) => (
                        <div key={reply._id} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">
                              {reply.userName}
                            </span>
                          </div>
                          <p className="text-xs text-gray-300">{reply.text}</p>
                          {currentUser?.id === reply.userId && (
                            <div className="flex gap-2 text-[10px] text-gray-400">
                              <button
                                onClick={() => handleDeleteComment(reply._id)}
                                className="text-red-400 hover:underline"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}