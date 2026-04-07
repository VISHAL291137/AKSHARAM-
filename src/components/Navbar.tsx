import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BookOpen, LogOut, User, Shield, LayoutDashboard } from "lucide-react";

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 border-b border-slate-800 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              AKSHARAM <span className="text-blue-600">Academy</span>
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/courses" className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors">
              Courses
            </Link>

            {user ? (
              <>
                {user.role === "admin" ? (
                  <Link to="/admin" className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors">
                    <Shield className="w-4 h-4" /> Admin Panel
                  </Link>
                ) : (
                  <Link to="/dashboard" className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors">
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Link>
                )}
                <div className="flex items-center gap-4 pl-4 border-l border-slate-800">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <User className="w-4 h-4" /> {user.name}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-lg hover:bg-slate-900 text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
