import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { BookOpen, ArrowRight, Code, Database, Shield, Layout, BarChart3, CheckCircle2, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { CourseModal } from "../components/CourseModal";

import { CourseCard } from "../components/CourseCard";

export const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userProgress, setUserProgress] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/api/courses")
      .then(res => res.json())
      .then(data => {
        setCourses(data);
        setLoading(false);
      });

    const token = localStorage.getItem("token");
    if (token) {
      fetch("/api/my-enrollments", {
        headers: { "Authorization": `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setUserProgress(data);
          }
        });
    }
  }, []);

  const handleToggleTopic = async (courseId: string, topic: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ courseId, topic })
      });
      const data = await res.json();
      
      // Update local state
      setUserProgress(prev => prev.map(p => 
        p.id === courseId ? { ...p, completedTopics: data.completedTopics } : p
      ));
    } catch (err) {
      console.error("Failed to update progress", err);
    }
  };

  const getCompletedTopics = (courseId: string) => {
    const progress = userProgress.find(p => p.id === courseId);
    return progress ? progress.completedTopics : [];
  };

  const getIcon = (id: string) => {
    switch (id) {
      case 'fsa': return <Code className="w-10 h-10" />;
      case 'ds': return <BarChart3 className="w-10 h-10" />;
      case 'ai-ml': return <Layout className="w-10 h-10" />;
      case 'cyber': return <Shield className="w-10 h-10" />;
      case 'excel': return <Database className="w-10 h-10" />;
      default: return <Code className="w-10 h-10" />;
    }
  };

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-[#020617] min-h-screen p-4 sm:p-8 md:p-16 transition-colors duration-300">
      <header className="max-w-7xl mx-auto mb-16 md:mb-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs md:text-sm font-bold mb-6 md:mb-8">
          <BookOpen className="w-4 h-4" /> Professional Programs
        </div>
        <h1 className="text-3xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 md:mb-8 tracking-tight leading-tight">
          Master the <span className="text-emerald-500">AI Toolset</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg md:text-2xl leading-relaxed px-4 mb-12">
          Discover the most powerful AI tools used by industry professionals to boost productivity and innovation.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative group">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search className="w-6 h-6 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search for courses, tools, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/50 rounded-[2rem] pl-16 pr-16 py-6 text-lg md:text-xl text-slate-900 dark:text-white focus:border-emerald-500 outline-none transition-all shadow-inner placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-6 flex items-center text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {loading ? (
          <div className="col-span-full flex justify-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        ) : filteredCourses.length > 0 ? (
          filteredCourses.map((course, i) => (
            <CourseCard 
              key={course.id} 
              course={{
                ...course,
                icon: getIcon(course.id)
              }} 
              onOpenModal={() => {
                setSelectedCourse(course);
                setIsModalOpen(true);
              }}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-24">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-900/50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-slate-200 dark:border-slate-800/50">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">No courses found</h3>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-md mx-auto">
              We couldn't find any courses matching "{searchQuery}". Try a different search term.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-8 text-emerald-600 dark:text-emerald-500 font-bold hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          completedTopics={getCompletedTopics(selectedCourse.id)}
          onToggleTopic={(topic) => handleToggleTopic(selectedCourse.id, topic)}
        />
      )}
    </div>
  );
};
