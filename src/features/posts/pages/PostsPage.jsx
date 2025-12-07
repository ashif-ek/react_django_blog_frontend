import { useEffect } from "react";
import { fetchPosts, createPost, fetchPost, deletePost } from "../postApi";
import { useFetch } from "../../../hooks/useFetch";

import PostList from "../components/PostList";
import PostDetail from "../components/PostDetail";
import PostForm from "../components/PostForm";
import SearchBar from "../../../components/SearchBar";

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
    selected.setData(null); // now valid
    posts.run();
  };

  const handleSearch = (query) => {
    posts.run(query);
  };

  return (
    <div className="space-y-12">
      {/* Top Section: Header & Search */}
      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-6">
          <h2 className="text-4xl font-serif font-bold tracking-tight text-gray-900">
            Latest News
          </h2>
          <p className="mt-2 text-lg text-gray-500 font-light">
            Insights, stories, and updates from the team.
          </p>
        </div>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_350px]">
        {/* Main Content: Post List (Left) */}
        <section>
          {posts.error && (
            <div className="mb-6 p-4 rounded bg-red-50 text-red-600 text-sm">
              Unable to load posts. Please check your connection.
            </div>
          )}

          {posts.loading ? (
             <div className="text-gray-400 italic">Updating feed...</div>
          ) : (
            <div className="space-y-12">
              <PostList posts={posts.data || []} onSelect={handleSelect} />
              {(!posts.data || posts.data.length === 0) && (
                <p className="text-gray-500">No articles found.</p>
              )}
            </div>
          )}
        </section>

        {/* Sidebar: Detail View or Create Form (Right) */}
        <aside className="space-y-12">
           {/* If a post is selected, show detail, else show create form */}
           {selected.data ? (
             <div className="sticky top-24">
                <button 
                  onClick={() => selected.setData(null)}
                  className="mb-6 text-sm text-gray-500 hover:text-black hover:underline"
                >
                  &larr; Back to Create
                </button>
                <PostDetail post={selected.data} onDelete={handleDelete} />
             </div>
           ) : (
             <div className="sticky top-24 bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="text-xl font-serif font-bold mb-4">Write a Story</h3>
                <PostForm onSubmit={handleCreate} />
             </div>
           )}
        </aside>
      </div>
    </div>
  );
}
