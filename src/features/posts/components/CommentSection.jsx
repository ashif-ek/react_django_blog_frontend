import { useState, useEffect } from "react";
import { fetchComments, createComment } from "../postApi";

export default function CommentSection({ slug }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadComments();
  }, [slug]);

  const loadComments = async () => {
    try {
      const data = await fetchComments(slug);
      setComments(data);
    } catch (err) {
      console.error("Failed to load comments", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const addedComment = await createComment(slug, { content: newComment });
      setComments([...comments, addedComment]);
      setNewComment("");
      setError(null);
    } catch (err) {
      setError("Please log in to comment.");
    }
  };

  if (loading) return <div className="text-gray-400">Loading comments...</div>;

  return (
    <div className="mt-16 pt-12 border-t border-gray-100">
      <h3 className="text-2xl font-serif font-bold mb-8 text-gray-900">
        Responses ({comments.length})
      </h3>

      <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-12">
        <form onSubmit={handleSubmit} className="relative">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="What are your thoughts?"
            className="w-full bg-transparent border-none p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 resize-none text-base"
            rows={3}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Respond
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-8">
        {comments.length === 0 ? (
          <p className="text-gray-500 italic">No responses yet. Start the conversation.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="group">
              <div className="flex justify-between items-baseline mb-2">
                <span className="font-bold text-gray-900 text-sm">
                  {comment.author_username}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(comment.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm">{comment.content}</p>
              <div className="mt-4 border-b border-gray-100 pb-4 group-last:border-0" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
