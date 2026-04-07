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
    <div className="min-h-screen bg-slate-950 p-8">
      <header className="max-w-7xl mx-auto mb-12 flex justify-between items-end">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-6">
            <Shield className="w-4 h-4" /> Admin Dashboard
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Platform Management</h1>
          <p className="text-slate-400 text-lg">Manage courses, users, and platform settings.</p>
        </div>
        <button 
          onClick={() => {
            setEditingCourse(null);
            setCourseForm({ title: "", price: "", duration: "", level: "Beginner", description: "", features: "" });
            setIsCourseModalOpen(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 group"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" /> Add New Course
        </button>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course Management */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden">
            <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-blue-500" /> Course Catalog
              </h2>
              <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">{courses.length} Total</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-500 text-xs font-bold uppercase tracking-widest">
                    <th className="px-8 py-6">Course Name</th>
                    <th className="px-8 py-6">Price</th>
                    <th className="px-8 py-6">Level</th>
                    <th className="px-8 py-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {courses.map((course) => (
                    <tr key={course.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-8 py-6">
                        <div className="font-bold text-white">{course.title}</div>
                        <div className="text-xs text-slate-500 mt-1">{course.duration}</div>
                      </td>
                      <td className="px-8 py-6 text-slate-300 font-medium">{course.price}</td>
                      <td className="px-8 py-6">
                        <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-xs font-bold border border-slate-700">
                          {course.level}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right space-x-2">
                        <button 
                          onClick={() => openEditModal(course)}
                          className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-blue-400 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteCourse(course.id)}
                          className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
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
        <div className="space-y-8">
          <section className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden">
            <div className="p-8 border-b border-slate-800 bg-slate-900/50">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <Users className="w-6 h-6 text-purple-500" /> Platform Users
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {users.map((u) => (
                <div key={u.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/50 border border-slate-800 hover:border-slate-700 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold group-hover:bg-blue-600 group-hover:text-white transition-all">
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">{u.name}</div>
                      <div className="text-xs text-slate-500">{u.email}</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleUserRole(u)}
                    className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-widest transition-all ${u.role === 'admin' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20' : 'bg-slate-800 text-slate-500 hover:bg-slate-700'}`}
                  >
                    {u.role}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Notifications */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-sm"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 text-emerald-400 text-sm"
              >
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                {success}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Course Modal */}
      <AnimatePresence>
        {isCourseModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCourseModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <form onSubmit={handleCourseSubmit} className="p-8 md:p-12 space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-white">{editingCourse ? "Edit Course" : "Add New Course"}</h3>
                  <button type="button" onClick={() => setIsCourseModalOpen(false)} className="text-slate-400 hover:text-white">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Title</label>
                    <input 
                      required
                      value={courseForm.title}
                      onChange={e => setCourseForm({...courseForm, title: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Price</label>
                    <input 
                      required
                      value={courseForm.price}
                      onChange={e => setCourseForm({...courseForm, price: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Duration</label>
                    <input 
                      required
                      value={courseForm.duration}
                      onChange={e => setCourseForm({...courseForm, duration: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Level</label>
                    <select 
                      value={courseForm.level}
                      onChange={e => setCourseForm({...courseForm, level: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all"
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Description</label>
                  <textarea 
                    required
                    value={courseForm.description}
                    onChange={e => setCourseForm({...courseForm, description: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all h-24"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Features (comma separated)</label>
                  <input 
                    required
                    value={courseForm.features}
                    onChange={e => setCourseForm({...courseForm, features: e.target.value})}
                    placeholder="Feature 1, Feature 2, Feature 3"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all"
                  />
                </div>

                <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20">
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
