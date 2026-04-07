import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { BookOpen, Zap, ShieldCheck, BarChart3, Code, ArrowRight, Star, Users, Award, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export const Home: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/courses")
      .then(res => res.json())
      .then(data => setCourses(data));
  }, []);

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
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-600/5 text-blue-700 dark:text-blue-400 text-[10px] md:text-xs font-black mb-8 md:mb-10 uppercase tracking-[0.2em] border border-blue-600/10"
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500">
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
                className="w-full sm:w-auto bg-blue-600 text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black text-lg md:text-xl hover:bg-blue-700 transition-all shadow-[0_20px_50px_rgba(37,99,235,0.25)] flex items-center justify-center gap-3 group"
              >
                Explore Courses <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/register"
                className="w-full sm:w-auto bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black text-lg md:text-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center shadow-sm"
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
            <Link to="/courses" className="flex items-center gap-2 text-blue-600 dark:text-blue-500 font-bold hover:gap-3 transition-all text-sm md:text-base">
              View All Courses <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {courses.slice(0, 3).map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 hover:border-blue-500/50 hover:bg-white dark:hover:bg-slate-800/50 transition-all duration-300 flex flex-col shadow-sm hover:shadow-xl"
              >
                <div className="mb-6 md:mb-8 w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-2xl md:text-3xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                  {course.id === 'ds' ? '📊' : course.id === 'ai-ml' ? '🤖' : '💻'}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 md:mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{course.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 md:mb-8 flex-grow leading-relaxed text-sm md:text-base">{course.description}</p>
                
                <div className="pt-6 md:pt-8 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Starting at</span>
                    <span className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">{course.price}</span>
                  </div>
                  <Link
                    to={`/courses/${course.id}`}
                    className="bg-blue-600 text-white p-2.5 md:p-3 rounded-lg md:rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
                  >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { label: "Active Students", value: "50K+", icon: <Users className="text-blue-600 dark:text-blue-500 w-5 h-5 md:w-6 md:h-6" /> },
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
