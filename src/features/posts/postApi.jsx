import { get, post, del } from "../../services/api";

// Fetch posts with optional search query
export const fetchPosts = (search = "") => {
  const query = search ? `?search=${encodeURIComponent(search)}` : "";
  return get(`/posts/${query}`);
};

export const fetchPost = (slug) => get(`/posts/${slug}/`);
export const createPost = (data) => post("/posts/", data);
export const deletePost = (slug) => del(`/posts/${slug}/`);

// Comments API
export const fetchComments = (slug) => get(`/posts/${slug}/comments/`);
export const createComment = (slug, data) => post(`/posts/${slug}/comments/`, data);
