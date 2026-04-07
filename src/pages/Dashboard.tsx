import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "motion/react";
import { BookOpen, Clock, Award, ChevronRight, LayoutDashboard, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

export const Dashboard: React.FC = () => {
  const { user, token, logout } = useAuth();
  const [myCourses, setMyCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const res = await fetch("/api/my-enrollments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setMyCourses(data);
        }
      } catch (err) {
        console.error("Failed to fetch enrollments:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyCourses();
  }, [token]);

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">AKSHARAM</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600/10 text-blue-400 font-bold">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link to="/courses" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
            <BookOpen className="w-5 h-5" /> My Courses
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
            <Award className="w-5 h-5" /> Certificates
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
            <Settings className="w-5 h-5" /> Settings
          </button>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-red-400 transition-all"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.name}! 👋</h1>
          <p className="text-slate-400">Track your progress and continue your learning journey.</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: "Enrolled Courses", value: myCourses.length, icon: <BookOpen className="text-blue-500" /> },
            { label: "Hours Learned", value: "24", icon: <Clock className="text-purple-500" /> },
            { label: "Certificates", value: "0", icon: <Award className="text-emerald-500" /> },
          ].map((stat, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-slate-800">{stat.icon}</div>
                <span className="text-2xl font-bold text-white">{stat.value}</span>
              </div>
              <p className="text-slate-400 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* My Courses */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">My Enrolled Courses</h2>
            <Link to="/courses" className="text-blue-500 text-sm font-bold hover:underline">Browse More</Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
            </div>
          ) : myCourses.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {myCourses.map((course) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex gap-6 group hover:border-blue-500/50 transition-all"
                >
                  <div className="w-24 h-24 rounded-2xl bg-slate-800 flex items-center justify-center text-3xl">
                    {course.id === 'ds' ? '📊' : course.id === 'ai-ml' ? '🤖' : '💻'}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{course.title}</h3>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-1">{course.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        <Clock className="w-3 h-3" /> {course.duration}
                      </div>
                      <button className="flex items-center gap-1 text-blue-500 text-sm font-bold group-hover:gap-2 transition-all">
                        Continue Learning <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-900/50 border border-dashed border-slate-800 rounded-3xl p-12 text-center">
              <BookOpen className="w-12 h-12 text-slate-700 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">No courses enrolled yet</h3>
              <p className="text-slate-500 mb-6">Explore our professional programs and start learning today.</p>
              <Link to="/courses" className="inline-flex bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
                Browse Courses
              </Link>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};
