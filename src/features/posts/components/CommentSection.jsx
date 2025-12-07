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

  if (loading) return <div className="text-slate-400">Loading comments...</div>;

  return (
    <div className="mt-12 border-t border-slate-800 pt-8">
      <h3 className="text-2xl font-bold mb-6 text-indigo-400">
        Comments ({comments.length})
      </h3>

      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Leave a thought..."
          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
          rows={3}
        />
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        <div className="mt-2 text-right">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Post Comment
          </button>
        </div>
      </form>

      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-slate-500 italic">No comments yet. Be the first!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-slate-900/50 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold text-indigo-300">
                  {comment.author_username}
                </span>
                <span className="text-xs text-slate-500">
                  {new Date(comment.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-slate-300">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
