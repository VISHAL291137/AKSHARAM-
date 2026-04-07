import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { BookOpen, Clock, BarChart3, ChevronRight, Zap, ShieldCheck, Code } from "lucide-react";
import { Link } from "react-router-dom";

export const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/courses")
      .then(res => res.json())
      .then(data => {
        setCourses(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-slate-950 min-h-screen p-8">
      <header className="max-w-7xl mx-auto mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-6">
          <BookOpen className="w-4 h-4" /> Professional Programs
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
          Master the <span className="text-blue-400">AI Toolset</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Discover the most powerful AI tools used by industry professionals to boost productivity and innovation.
        </p>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-full flex justify-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          courses.map((course, i) => (
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
              
              <div className="space-y-4 mb-8">
                {course.features.slice(0, 3).map((f: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-slate-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    {f}
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Starting at</span>
                  <span className="text-2xl font-bold text-white">{course.price}</span>
                </div>
                <Link
                  to={`/courses/${course.id}`}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2"
                >
                  View Details <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};
