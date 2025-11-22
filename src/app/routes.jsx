import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import PostsPage from "../features/posts/pages/PostsPage";
import PostDetailPage from "../features/posts/pages/PostDetailPage";

import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
// import AdminDashboard from "../features/admin/pages/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <PostsPage />,
      },
      {
        path: "posts/:slug",
        element: <PostDetailPage />,
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute>
            {/* <AdminDashboard /> */}
            <div>Admin area placeholder</div>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
