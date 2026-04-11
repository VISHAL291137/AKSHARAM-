import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { BookOpen, Zap, ShieldCheck, BarChart3, Code, ArrowRight, Star, Users, Award, ChevronRight, Layout, Shield, Database } from "lucide-react";
import { Link } from "react-router-dom";
import { CourseCard } from "../components/CourseCard";
import { CourseModal } from "../components/CourseModal";

export const Home: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userProgress, setUserProgress] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/courses")
      .then(res => res.json())
      .then(data => setCourses(data));

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

  const getIcon = (id: string) => {
    switch (id) {
      case 'fsa': return <Code className="w-8 h-8" />;
      case 'ds': return <BarChart3 className="w-8 h-8" />;
      case 'ai-ml': return <Layout className="w-8 h-8" />;
      case 'cyber': return <Shield className="w-8 h-8" />;
      case 'excel': return <Database className="w-8 h-8" />;
      default: return <Zap className="w-8 h-8" />;
    }
  };

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

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative pt-20 md:pt-32 pb-24 md:pb-40 overflow-hidden bg-white dark:bg-slate-950">
        {/* Subtle background glow like the image - centered and soft */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-40">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[70%] h-[70%] bg-blue-400/10 blur-[100px] rounded-full" />
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[50%] h-[50%] bg-purple-400/5 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-600/5 text-emerald-700 dark:text-emerald-400 text-[10px] md:text-xs font-black mb-8 md:mb-10 uppercase tracking-[0.2em] border border-emerald-600/10"
            >
              Empower Your Future
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white mb-8 md:mb-10 tracking-tight leading-[1.05] px-2"
            >
              Master the Most <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 dark:from-emerald-400 dark:to-teal-500">
                In-Demand Tech Skills
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-500 dark:text-slate-400 text-base sm:text-lg md:text-2xl mb-12 md:mb-16 leading-relaxed max-w-3xl mx-auto font-medium px-4"
            >
              Join 50,000+ students learning Data Science, AI, Full Stack, and <br className="hidden md:block" />
              Cybersecurity from industry experts. Start for free today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 px-6"
            >
              <Link
                to="/courses"
                className="w-full sm:w-auto bg-emerald-600 text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black text-lg md:text-xl hover:bg-emerald-700 transition-all shadow-[0_20px_50px_rgba(16,185,129,0.25)] flex items-center justify-center gap-3 group relative z-10"
              >
                Explore Courses <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/register"
                className="w-full sm:w-auto bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black text-lg md:text-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center shadow-sm relative z-10"
              >
                Free Trial
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 md:py-24 border-t border-slate-200 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Professional Programs</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-xl">Industry-aligned curriculums designed to take you from beginner to job-ready professional.</p>
            </div>
            <Link to="/courses" className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500 font-bold hover:gap-3 transition-all text-sm md:text-base relative z-10">
              View All Courses <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {courses.slice(0, 3).map((course, i) => (
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
            ))}
          </div>
        </div>
      </section>

      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          completedTopics={getCompletedTopics(selectedCourse.id)}
          onToggleTopic={(topic) => handleToggleTopic(selectedCourse.id, topic)}
        />
      )}

      {/* Trust Stats */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { label: "Active Students", value: "50K+", icon: <Users className="text-emerald-600 dark:text-emerald-500 w-5 h-5 md:w-6 md:h-6" /> },
              { label: "Expert Mentors", value: "200+", icon: <Star className="text-yellow-500 w-5 h-5 md:w-6 md:h-6" /> },
              { label: "Hiring Partners", value: "500+", icon: <Award className="text-emerald-600 dark:text-emerald-500 w-5 h-5 md:w-6 md:h-6" /> },
              { label: "Success Rate", value: "94%", icon: <Zap className="text-purple-600 dark:text-purple-500 w-5 h-5 md:w-6 md:h-6" /> },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="flex justify-center mb-3 md:mb-4">{stat.icon}</div>
                <div className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white mb-1 md:mb-2">{stat.value}</div>
                <div className="text-[10px] md:text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
