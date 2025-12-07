import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../../../services/api"; // We'll use the generic post helper

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await post("/register/", formData);
      navigate("/login"); // Redirect to login on success
    } catch (err) {
      setError(
        err.response?.data?.error || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-8 shadow-xl dark:shadow-none backdrop-blur transition-colors">
        <h2 className="mb-2 text-3xl font-serif font-bold text-gray-900 dark:text-white transition-colors">Create an account</h2>
        <p className="mb-8 text-sm text-gray-500 dark:text-gray-400 font-sans transition-colors">
          Join our community to start publishing
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">
              Username
            </label>
            <input
              type="text"
              required
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2.5 text-gray-900 dark:text-white focus:border-black dark:focus:border-white focus:outline-none transition-colors"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2.5 text-gray-900 dark:text-white focus:border-black dark:focus:border-white focus:outline-none transition-colors"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2.5 text-gray-900 dark:text-white focus:border-black dark:focus:border-white focus:outline-none transition-colors"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-black dark:bg-white px-5 py-2.5 text-center text-sm font-medium text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none disabled:opacity-50 transition-colors shadow-sm"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400 transition-colors">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-black dark:text-white hover:underline transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
