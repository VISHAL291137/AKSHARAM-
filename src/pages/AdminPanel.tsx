import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "motion/react";
import { Users, BookOpen, Shield, Plus, Trash2, Edit2, AlertCircle, CheckCircle2, X } from "lucide-react";

export const AdminPanel: React.FC = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Modal states
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [courseForm, setCourseForm] = useState({
    title: "",
    price: "",
    duration: "",
    level: "Beginner",
    description: "",
    features: ""
  });

  const fetchData = async () => {
    try {
      const [usersRes, coursesRes] = await Promise.all([
        fetch("/api/admin/users", { headers: { Authorization: `Bearer ${token}` } }),
        fetch("/api/courses")
      ]);
      
      if (usersRes.ok && coursesRes.ok) {
        const usersData = await usersRes.json();
        const coursesData = await coursesRes.json();
        setUsers(usersData);
        setCourses(coursesData);
      } else {
        setError("Failed to fetch data");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleDeleteCourse = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    
    try {
      const res = await fetch(`/api/courses/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setCourses(courses.filter(c => c.id !== id));
        setSuccess("Course deleted successfully");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError("Failed to delete course");
      }
    } catch (err) {
      setError("An error occurred");
    }
  };

  const handleCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingCourse ? `/api/courses/${editingCourse.id}` : "/api/courses";
    const method = editingCourse ? "PUT" : "POST";
    
    const payload = {
      ...courseForm,
      features: courseForm.features.split(",").map(f => f.trim())
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setSuccess(editingCourse ? "Course updated!" : "Course added!");
        setIsCourseModalOpen(false);
        setEditingCourse(null);
        setCourseForm({ title: "", price: "", duration: "", level: "Beginner", description: "", features: "" });
        fetchData();
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError("Failed to save course");
      }
    } catch (err) {
      setError("An error occurred");
    }
  };

  const toggleUserRole = async (user: any) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ role: newRole })
      });
      if (res.ok) {
        setUsers(users.map(u => u.id === user.id ? { ...u, role: newRole } : u));
        setSuccess(`User role updated to ${newRole}`);
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      setError("Failed to update role");
    }
  };

  const openEditModal = (course: any) => {
    setEditingCourse(course);
    setCourseForm({
      title: course.title,
      price: course.price,
      duration: course.duration,
      level: course.level,
      description: course.description,
      features: course.features.join(", ")
    });
    setIsCourseModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] p-4 sm:p-8 md:p-12 transition-colors duration-300">
      <header className="max-w-7xl mx-auto mb-10 md:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs md:text-sm font-bold mb-4 md:mb-6">
            <Shield className="w-3.5 h-3.5 md:w-4 md:h-4" /> Admin Dashboard
          </div>
          <h1 className="text-3xl md:text-6xl font-black text-slate-900 dark:text-white mb-2 md:mb-3 tracking-tight">Platform Management</h1>
          <p className="text-slate-600 dark:text-slate-400 text-base md:text-xl">Manage courses, users, and platform settings.</p>
        </div>
        <button 
          onClick={() => {
            setEditingCourse(null);
            setCourseForm({ title: "", price: "", duration: "", level: "Beginner", description: "", features: "" });
            setIsCourseModalOpen(true);
          }}
          className="w-full md:w-auto flex items-center justify-center gap-3 bg-emerald-600 text-white px-6 py-4 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-600/20 group text-sm md:text-base"
        >
          <Plus className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-90 transition-transform" /> Add New Course
        </button>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
        {/* Course Management */}
        <div className="lg:col-span-2 space-y-6 md:space-y-10">
          <section className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/50 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all">
            <div className="p-6 md:p-10 border-b border-slate-200 dark:border-slate-800/50 flex justify-between items-center bg-slate-50 dark:bg-[#0f172a]/50">
              <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3 md:gap-4 tracking-tight">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500 border border-emerald-500/20">
                  <BookOpen className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                Course Catalog
              </h2>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{courses.length} Total</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[600px] md:min-w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800/50 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                    <th className="px-6 md:px-10 py-6 md:py-8">Course Name</th>
                    <th className="px-6 md:px-10 py-6 md:py-8">Price</th>
                    <th className="px-6 md:px-10 py-6 md:py-8">Level</th>
                    <th className="px-6 md:px-10 py-6 md:py-8 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800/50">
                  {courses.map((course) => (
                    <tr key={course.id} className="hover:bg-slate-100 dark:hover:bg-slate-800/20 transition-colors group">
                      <td className="px-6 md:px-10 py-6 md:py-8">
                        <div className="font-bold text-slate-900 dark:text-white text-base md:text-lg group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{course.title}</div>
                        <div className="text-[10px] text-slate-500 mt-1 font-bold uppercase tracking-widest">{course.duration}</div>
                      </td>
                      <td className="px-6 md:px-10 py-6 md:py-8 text-slate-700 dark:text-slate-300 font-black text-base md:text-lg">{course.price}</td>
                      <td className="px-6 md:px-10 py-6 md:py-8">
                        <span className="px-3 py-1 md:px-4 md:py-1.5 rounded-lg md:rounded-xl bg-white dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-[9px] md:text-[10px] font-black uppercase tracking-widest border border-slate-200 dark:border-slate-700/50">
                          {course.level}
                        </span>
                      </td>
                      <td className="px-6 md:px-10 py-6 md:py-8 text-right space-x-2 md:space-x-3">
                        <button 
                          onClick={() => openEditModal(course)}
                          className="p-2 md:p-3 rounded-lg md:rounded-xl bg-white dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-all border border-slate-200 dark:border-transparent hover:border-emerald-500/20"
                        >
                          <Edit2 className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteCourse(course.id)}
                          className="p-2 md:p-3 rounded-lg md:rounded-xl bg-white dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all border border-slate-200 dark:border-transparent hover:border-red-500/20"
                        >
                          <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* User Management */}
        <div className="space-y-6 md:space-y-10">
          <section className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/50 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all">
            <div className="p-6 md:p-10 border-b border-slate-200 dark:border-slate-800/50 bg-slate-50 dark:bg-[#0f172a]/50">
              <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3 md:gap-4 tracking-tight">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-500 border border-purple-500/20">
                  <Users className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                Platform Users
              </h2>
            </div>
            <div className="p-6 md:p-8 space-y-4 md:space-y-5">
              {users.map((u) => (
                <div key={u.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 md:p-5 rounded-[1.5rem] bg-white dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800/50 hover:border-emerald-500/20 transition-all group gap-4 shadow-sm">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center text-emerald-600 dark:text-emerald-500 font-black text-base md:text-lg group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-inner border border-slate-200 dark:border-transparent">
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white text-sm md:text-base">{u.name}</div>
                      <div className="text-[10px] md:text-xs text-slate-500 font-medium">{u.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3 w-full sm:w-auto justify-end">
                    <button 
                      onClick={() => toggleUserRole(u)}
                      className={`text-[8px] md:text-[9px] font-black px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg uppercase tracking-[0.15em] transition-all ${u.role === 'admin' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20' : 'bg-slate-100 dark:bg-slate-800/50 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                    >
                      {u.role}
                    </button>
                    <button 
                      onClick={async () => {
                        const newStatus = u.status === "active" ? "inactive" : "active";
                        try {
                          const res = await fetch(`/api/admin/users/${u.id}`, {
                            method: "PUT",
                            headers: { 
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${token}` 
                            },
                            body: JSON.stringify({ status: newStatus })
                          });
                          if (res.ok) {
                            setUsers(users.map(user => user.id === u.id ? { ...user, status: newStatus } : user));
                            setSuccess(`User status updated to ${newStatus}`);
                            setTimeout(() => setSuccess(""), 3000);
                          }
                        } catch (err) {
                          setError("Failed to update status");
                        }
                      }}
                      className={`text-[8px] md:text-[9px] font-black px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg uppercase tracking-[0.15em] transition-all ${u.status === 'active' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20' : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 hover:bg-red-500/20'}`}
                    >
                      {u.status}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Notifications */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="p-6 bg-red-500/10 border border-red-500/20 rounded-[1.5rem] flex items-center gap-4 text-red-600 dark:text-red-400 font-bold text-sm shadow-2xl"
              >
                <AlertCircle className="w-6 h-6 flex-shrink-0" />
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-[1.5rem] flex items-center gap-4 text-emerald-600 dark:text-emerald-400 font-bold text-sm shadow-2xl"
              >
                <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                {success}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Course Modal */}
      <AnimatePresence>
        {isCourseModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/50 rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden my-8"
            >
              <form onSubmit={handleCourseSubmit} className="p-8 md:p-16 space-y-6 md:space-y-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">{editingCourse ? "Edit Course" : "Add New Course"}</h3>
                  <button type="button" onClick={() => setIsCourseModalOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-400 hover:text-slate-900 dark:hover:text-white">
                    <X className="w-6 h-6 md:w-8 md:h-8" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2 md:space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Title</label>
                    <input 
                      required
                      value={courseForm.title}
                      onChange={e => setCourseForm({...courseForm, title: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/50 rounded-xl md:rounded-2xl px-5 md:px-6 py-3 md:py-4 text-slate-900 dark:text-white focus:border-emerald-500 outline-none transition-all shadow-inner text-sm md:text-base"
                    />
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Price</label>
                    <input 
                      required
                      value={courseForm.price}
                      onChange={e => setCourseForm({...courseForm, price: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/50 rounded-xl md:rounded-2xl px-5 md:px-6 py-3 md:py-4 text-slate-900 dark:text-white focus:border-emerald-500 outline-none transition-all shadow-inner text-sm md:text-base"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2 md:space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Duration</label>
                    <input 
                      required
                      value={courseForm.duration}
                      onChange={e => setCourseForm({...courseForm, duration: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/50 rounded-xl md:rounded-2xl px-5 md:px-6 py-3 md:py-4 text-slate-900 dark:text-white focus:border-emerald-500 outline-none transition-all shadow-inner text-sm md:text-base"
                    />
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Level</label>
                    <select 
                      value={courseForm.level}
                      onChange={e => setCourseForm({...courseForm, level: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/50 rounded-xl md:rounded-2xl px-5 md:px-6 py-3 md:py-4 text-slate-900 dark:text-white focus:border-emerald-500 outline-none transition-all shadow-inner appearance-none text-sm md:text-base"
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 md:space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Description</label>
                  <textarea 
                    required
                    value={courseForm.description}
                    onChange={e => setCourseForm({...courseForm, description: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/50 rounded-xl md:rounded-2xl px-5 md:px-6 py-3 md:py-4 text-slate-900 dark:text-white focus:border-emerald-500 outline-none transition-all h-24 md:h-32 resize-none shadow-inner text-sm md:text-base"
                  />
                </div>

                <div className="space-y-2 md:space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Features (comma separated)</label>
                  <input 
                    required
                    value={courseForm.features}
                    onChange={e => setCourseForm({...courseForm, features: e.target.value})}
                    placeholder="Feature 1, Feature 2, Feature 3"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/50 rounded-xl md:rounded-2xl px-5 md:px-6 py-3 md:py-4 text-slate-900 dark:text-white focus:border-emerald-500 outline-none transition-all shadow-inner text-sm md:text-base"
                  />
                </div>

                <button className="w-full bg-emerald-600 text-white py-5 md:py-6 rounded-xl md:rounded-[1.5rem] font-black text-lg md:text-xl hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-600/30">
                  {editingCourse ? "Update Course" : "Create Course"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
