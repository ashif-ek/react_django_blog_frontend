import { Routes, Route, Link, useNavigate } from "react-router-dom";
import PostsPage from "./features/posts/pages/PostsPage";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import { logout } from "./services/api";

export default function App() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("accessToken");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
      <header className="border-b border-gray-100 py-6 sticky top-0 z-10 bg-white/95 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 flex items-baseline justify-between">
          <Link to="/" className="text-3xl font-serif font-black tracking-tighter text-black hover:text-gray-700 transition-colors">
            The Daily Blog.
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium tracking-wide">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-black transition-colors"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-500 hover:text-black transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-5xl mx-auto px-6 py-12 w-full">
        <Routes>
          <Route path="/" element={<PostsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>

      <footer className="border-t border-gray-100 py-12 mt-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} The Daily Blog. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
