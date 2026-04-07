import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Clock, CheckCircle2, Zap, Award } from "lucide-react";
import { Link } from "react-router-dom";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    price: string;
    duration: string;
    level: string;
    features: string[];
    icon?: React.ReactNode;
  };
  onOpenModal?: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onOpenModal }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className="group perspective-1000 w-full h-[450px] cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={handleFlip}
      aria-label={`Course card for ${course.title}. Click to flip for more details.`}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-700 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-[2.5rem] p-8 md:p-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between overflow-hidden group-hover:shadow-2xl group-hover:shadow-blue-500/10 transition-all">
          {/* ATM Style Chip/Icon Area */}
          <div className="flex justify-between items-start mb-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-600/10 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-600/20 shadow-inner">
              {course.icon || <Zap className="w-8 h-8" />}
            </div>
            <div className="w-12 h-8 rounded-md bg-slate-200 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 opacity-50" />
          </div>

          <div className="flex-grow">
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-tight">
              {course.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg line-clamp-3 leading-relaxed">
              {course.description}
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Starting at</span>
              <span className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">{course.price}</span>
            </div>
            <div className="bg-blue-600 text-white p-3 rounded-xl shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
              <ArrowRight className="w-6 h-6" />
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl rounded-full -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-600/5 blur-2xl rounded-full -ml-12 -mb-12" />
        </div>

        {/* Back Side */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden rounded-[2.5rem] p-8 md:p-10 bg-slate-900 dark:bg-slate-950 border border-slate-800 shadow-2xl flex flex-col justify-between overflow-hidden"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/20">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-white font-bold text-lg">{course.duration}</span>
              <span className="text-slate-500 ml-auto text-xs font-black uppercase tracking-widest">{course.level}</span>
            </div>

            <h4 className="text-blue-400 font-black text-xs uppercase tracking-[0.2em] mb-6">Skills Covered</h4>
            <div className="space-y-3 mb-8">
              {course.features.slice(0, 4).map((skill, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                  <span className="font-bold text-sm md:text-base">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal?.();
              }}
              className="w-full bg-emerald-600/10 text-emerald-500 border border-emerald-500/20 py-4 rounded-2xl font-black text-lg hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center gap-3 group/btn"
            >
              View Roadmap <Zap className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
            </button>
            <Link
              to={`/courses/${course.id}`}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/30 flex items-center justify-center gap-3 group/btn"
            >
              Enroll Now <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
            <p className="text-center text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              30-Day Money-Back Guarantee
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 blur-2xl rounded-full -ml-16 -mb-16" />
        </div>
      </motion.div>
    </div>
  );
};
