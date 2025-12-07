import { Routes, Route, Link, useNavigate } from "react-router-dom";
import PostsPage from "./features/posts/pages/PostsPage";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import { logout } from "./services/api";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function AppContent() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("accessToken");
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <header className="border-b border-gray-100 dark:border-gray-800 py-6 sticky top-0 z-10 bg-white/90 dark:bg-black/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/60">
        <div className="max-w-5xl mx-auto px-6 flex items-baseline justify-between">
          <Link to="/" className="text-3xl font-serif font-black tracking-tighter text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            The Daily Blog.
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium tracking-wide">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-xl"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="bg-black dark:bg-white text-white dark:text-black px-5 py-2 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
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

      <footer className="border-t border-gray-100 dark:border-gray-800 py-12 mt-12 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-5xl mx-auto px-6 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} The Daily Blog. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
