import { get, post, del } from "../../services/api";

export const fetchPosts = () => get("/posts/");
export const fetchPost = (slug) => get(`/posts/${slug}/`);
export const createPost = (data) => post("/posts/", data);
export const deletePost = (slug) => del(`/posts/${slug}/`);
