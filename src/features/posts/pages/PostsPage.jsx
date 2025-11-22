import { useEffect } from "react";
import { fetchPosts, createPost, fetchPost, deletePost } from "../postApi";
import { useFetch } from "../../../hooks/useFetch";

import PostList from "../components/PostList";
import PostDetail from "../components/PostDetail";
import PostForm from "../components/PostForm";

export default function PostsPage() {
  const posts = useFetch(fetchPosts);
  const selected = useFetch(fetchPost);

  useEffect(() => {
    posts.run();
  }, []);

  const handleCreate = async (data) => {
    await createPost(data);
    posts.run();
  };

  const handleSelect = async (slug) => {
    await selected.run(slug);
  };

  const handleDelete = async (slug) => {
    await deletePost(slug);
    selected.setData(null);
    posts.run();
  };

  return (
    <div className="space-y-6">
      {/* page heading */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Content workspace
          </h2>
          <p className="text-sm text-slate-400">
            Create, preview and manage your posts in a focused layout.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/80 px-3 py-1 text-[11px] text-slate-400 shadow-inner shadow-slate-950/70">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span>Connected to Django API</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_2fr]">
        {/* Left column: create + list */}
        <section className="space-y-5">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-lg shadow-slate-950/70">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-100">
                New post
              </h3>
              <span className="text-[11px] text-slate-500">
                Autosaves via API
              </span>
            </div>
            <PostForm onSubmit={handleCreate} />
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-lg shadow-slate-950/70">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-100">
                Posts ({posts.data?.length ?? 0})
              </h3>
              {posts.loading && (
                <span className="text-[11px] text-slate-500">Loading…</span>
              )}
            </div>

            {posts.error && (
              <p className="mb-2 text-xs text-red-400">
                Failed to load posts. Check your API.
              </p>
            )}

            <div className="max-h-[420px] overflow-y-auto pr-1 custom-scroll">
              <PostList posts={posts.data || []} onSelect={handleSelect} />
              {!posts.loading && (!posts.data || posts.data.length === 0) && (
                <p className="mt-3 text-sm text-slate-500">
                  No posts yet. Create your first article above.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Right column: detail panel */}
        <section className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 shadow-xl shadow-slate-950/70">
          {selected.loading ? (
            <div className="space-y-3">
              <div className="h-4 w-1/3 rounded bg-slate-800/80" />
              <div className="h-3 w-2/3 rounded bg-slate-800/80" />
              <div className="mt-4 space-y-2">
                <div className="h-3 w-full rounded bg-slate-800/70" />
                <div className="h-3 w-5/6 rounded bg-slate-800/70" />
                <div className="h-3 w-4/6 rounded bg-slate-800/70" />
              </div>
            </div>
          ) : selected.data ? (
            <PostDetail post={selected.data} onDelete={handleDelete} />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-slate-500">
              <p className="text-sm font-medium text-slate-400">
                No post selected
              </p>
              <p className="text-xs">
                Choose a post from the list to preview its full content here.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
