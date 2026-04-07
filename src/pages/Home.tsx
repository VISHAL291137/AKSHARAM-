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
    <div className="bg-slate-950 min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-8"
            >
              <Zap className="w-4 h-4" /> The Future of Learning is Here
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight leading-[1.1]"
            >
              Master the Skills of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Tomorrow</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-xl mb-12 leading-relaxed max-w-2xl mx-auto"
            >
              Join 50,000+ students mastering AI, Data Science, and Full Stack Development with industry experts.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Link
                to="/register"
                className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/20 flex items-center justify-center gap-2 group"
              >
                Get Started Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/courses"
                className="w-full sm:w-auto bg-slate-900 text-white border border-slate-800 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
              >
                View Courses
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-24 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Professional Programs</h2>
              <p className="text-slate-400 max-w-xl">Industry-aligned curriculums designed to take you from beginner to job-ready professional.</p>
            </div>
            <Link to="/courses" className="hidden md:flex items-center gap-2 text-blue-500 font-bold hover:gap-3 transition-all">
              View All Courses <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.slice(0, 3).map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 hover:border-blue-500/50 hover:bg-slate-800/50 transition-all duration-300 flex flex-col"
              >
                <div className="mb-8 w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-3xl group-hover:bg-blue-600 transition-all">
                  {course.id === 'ds' ? '📊' : course.id === 'ai-ml' ? '🤖' : '💻'}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{course.title}</h3>
                <p className="text-slate-400 mb-8 flex-grow leading-relaxed">{course.description}</p>
                
                <div className="pt-8 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Starting at</span>
                    <span className="text-2xl font-bold text-white">{course.price}</span>
                  </div>
                  <Link
                    to={`/courses/${course.id}`}
                    className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-24 bg-slate-900/50 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "Active Students", value: "50K+", icon: <Users className="text-blue-500" /> },
              { label: "Expert Mentors", value: "200+", icon: <Star className="text-yellow-500" /> },
              { label: "Hiring Partners", value: "500+", icon: <Award className="text-emerald-500" /> },
              { label: "Success Rate", value: "94%", icon: <Zap className="text-purple-500" /> },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
