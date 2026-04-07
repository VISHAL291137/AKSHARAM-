import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "motion/react";
import { BookOpen, Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data.token, data.user);
        navigate(from, { replace: true });
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] flex items-center justify-center p-4 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/50 rounded-[2.5rem] p-10 shadow-xl dark:shadow-2xl transition-all"
      >
        <div className="text-center mb-10">
          <div className="inline-flex bg-emerald-600 p-4 rounded-2xl mb-6 shadow-lg shadow-emerald-600/20">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Welcome Back</h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium">Login to your account to continue</p>
        </div>

        {error && (
          <div className="mb-8 p-5 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-4 text-red-600 dark:text-red-400 font-bold text-sm">
            <AlertCircle className="w-6 h-6 flex-shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] pl-1">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-slate-400 dark:text-slate-500 group-focus-within:text-emerald-600 dark:group-focus-within:text-emerald-500 transition-colors" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/50 text-slate-900 dark:text-white pl-14 pr-6 py-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-inner"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] pl-1">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-slate-400 dark:text-slate-500 group-focus-within:text-emerald-600 dark:group-focus-within:text-emerald-500 transition-colors" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/50 text-slate-900 dark:text-white pl-14 pr-6 py-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-inner"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-600/20 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login Now"}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-slate-500 text-sm font-bold">
            Don't have an account?{" "}
            <Link to="/register" className="text-emerald-600 dark:text-emerald-500 font-black hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors ml-1">
              Sign Up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
