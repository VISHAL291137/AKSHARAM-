import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, 
  Clock, 
  Award, 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  ShieldCheck, 
  ArrowRight,
  Menu,
  X,
  Bell
} from "lucide-react";
import { Link } from "react-router-dom";

export const Dashboard: React.FC = () => {
  const { user, token, logout } = useAuth();
  const [myCourses, setMyCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white dark:bg-[#0f172a] border-r border-slate-200 dark:border-slate-800/50 p-6 md:p-8 transition-colors duration-300">
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="bg-emerald-600 p-2 rounded-xl shadow-lg shadow-emerald-600/20">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">AKSHARAM</span>
      </div>

      <nav className="space-y-2 flex-grow">
        <Link 
          to="/dashboard" 
          onClick={() => setIsSidebarOpen(false)}
          className="flex items-center gap-4 px-4 py-4 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 font-black border border-emerald-500/20 transition-all"
        >
          <LayoutDashboard className="w-5 h-5" /> Dashboard
        </Link>
        <Link 
          to="/courses" 
          onClick={() => setIsSidebarOpen(false)}
          className="flex items-center gap-4 px-4 py-4 rounded-2xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50 font-bold transition-all"
        >
          <BookOpen className="w-5 h-5" /> My Courses
        </Link>
        <button className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50 font-bold transition-all">
          <Award className="w-5 h-5" /> Certificates
        </button>
        <button className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50 font-bold transition-all">
          <Settings className="w-5 h-5" /> Settings
        </button>
      </nav>

      <div className="pt-8 border-t border-slate-200 dark:border-slate-800/50">
        <button 
          onClick={() => {
            logout();
            setIsSidebarOpen(false);
          }}
          className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-slate-500 hover:text-red-600 dark:hover:text-red-400 transition-all hover:bg-red-50 dark:hover:bg-red-500/5 font-bold"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] flex relative transition-colors duration-300">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-0 h-screen">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-72 lg:hidden"
            >
              <SidebarContent />
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="absolute top-6 right-[-3rem] p-2 bg-emerald-600 text-white rounded-xl lg:hidden shadow-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className="flex-grow p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700/50 shadow-sm"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
                Welcome back, <span className="text-emerald-600 dark:text-emerald-500">{user?.name}</span>! 👋
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm md:text-lg font-medium">Track your progress and continue your learning journey.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-3 md:p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700/50 transition-all shadow-sm">
              <Bell className="w-6 h-6" />
            </button>
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500 border border-emerald-500/20 font-black text-xl shadow-2xl shadow-emerald-500/10">
              {user?.name?.charAt(0)}
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-16">
          {[
            { label: "Enrolled Courses", value: myCourses.length, icon: <BookOpen className="text-emerald-600 dark:text-emerald-500" />, bg: "bg-emerald-500/10" },
            { label: "Hours Learned", value: "24", icon: <Clock className="text-blue-600 dark:text-blue-500" />, bg: "bg-blue-500/10" },
            { label: "Certificates", value: "0", icon: <Award className="text-purple-600 dark:text-purple-500" />, bg: "bg-purple-500/10" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/50 p-6 md:p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`p-3 md:p-4 rounded-2xl ${stat.bg}`}>{stat.icon}</div>
                <span className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">{stat.value}</span>
              </div>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] md:text-xs">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* My Courses */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">My Enrolled Courses</h2>
            <Link to="/courses" className="text-emerald-600 dark:text-emerald-500 text-sm font-bold hover:underline">Browse More</Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-emerald-500"></div>
            </div>
          ) : myCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {myCourses.map((course, i) => {
                const totalTopics = course.roadmap?.learn?.length || 0;
                const completedCount = course.completedTopics?.length || 0;
                const progress = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

                return (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/50 p-6 md:p-8 rounded-[2.5rem] flex flex-col group hover:border-emerald-500/30 transition-all duration-500 shadow-sm hover:shadow-2xl"
                  >
                    <div className="mb-8 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500 transition-transform group-hover:scale-110 duration-500">
                      <ShieldCheck className="w-7 h-7 md:w-8 md:h-8" />
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors tracking-tight">
                      {course.title}
                    </h3>
                    
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-8 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>
                    
                    <div className="mt-auto">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Progress</span>
                        <span className="text-sm font-bold text-emerald-600 dark:text-emerald-500">{progress}%</span>
                      </div>
                      
                      <div className="w-full bg-slate-200 dark:bg-slate-800/50 rounded-full h-1.5 overflow-hidden mb-8">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                        />
                      </div>

                      <Link 
                        to={`/courses/${course.id}`} 
                        className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-500 font-bold text-sm hover:gap-3 transition-all group/link"
                      >
                        View Details 
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white dark:bg-[#0f172a]/50 border border-dashed border-slate-300 dark:border-slate-800 rounded-[2.5rem] p-10 md:p-20 text-center backdrop-blur-sm shadow-sm">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-100 dark:bg-slate-800/50 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-slate-400 dark:text-slate-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">No courses enrolled yet</h3>
              <p className="text-slate-600 dark:text-slate-500 mb-10 max-w-md mx-auto text-sm md:text-lg leading-relaxed">Explore our professional programs and start your learning journey today.</p>
              <Link to="/courses" className="inline-flex bg-emerald-600 text-white px-8 md:px-10 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20">
                Browse Courses
              </Link>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};
