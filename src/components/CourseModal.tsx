import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check, Star, ArrowRight, Award, ShieldCheck } from "lucide-react";

interface CourseModalProps {
  course: any;
  isOpen: boolean;
  onClose: () => void;
  completedTopics: string[];
  onToggleTopic: (topic: string) => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({
  course,
  isOpen,
  onClose,
  completedTopics,
  onToggleTopic,
}) => {
  const topics = course.roadmap?.learn || [];
  const progress = topics.length > 0 ? Math.round((completedTopics.length / topics.length) * 100) : 0;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-[#0a0f1e] text-white w-full max-w-4xl max-h-[90vh] rounded-[3rem] overflow-hidden shadow-2xl border border-slate-800/50 flex flex-col"
          >
            {/* Header */}
            <div className="p-8 md:p-12 flex justify-between items-start shrink-0">
              <div className="flex gap-6 items-center">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-1">{course.title}</h2>
                  <p className="text-slate-400 text-lg font-medium">Master the fundamentals and advanced concepts.</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-800 rounded-xl transition-all text-slate-500 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 md:p-12 pt-0 grid grid-cols-1 lg:grid-cols-2 gap-12 overflow-y-auto">
              {/* Left Side: Topics */}
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-emerald-500 font-black tracking-[0.2em] uppercase text-xs">Topics to Master</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          className="h-full bg-emerald-500"
                        />
                      </div>
                      <span className="text-emerald-500 font-black text-sm">{progress}%</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {topics.map((topic: string) => {
                      const isCompleted = completedTopics.includes(topic);
                      return (
                        <button
                          key={topic}
                          onClick={() => onToggleTopic(topic)}
                          className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition-all text-left group ${
                            isCompleted 
                              ? "bg-emerald-500/5 border-emerald-500/20 text-white" 
                              : "bg-slate-900/40 border-slate-800/50 text-slate-400 hover:border-emerald-500/30"
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all shrink-0 ${
                            isCompleted ? "bg-emerald-500 border-emerald-500" : "border-slate-700 group-hover:border-emerald-500/50"
                          }`}>
                            {isCompleted && <Check className="w-4 h-4 text-white" />}
                          </div>
                          <span className={`font-bold text-base transition-colors ${isCompleted ? "text-emerald-400" : "text-slate-300 group-hover:text-white"}`}>
                            {topic}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Side: Resources & Path */}
              <div className="space-y-10">
                <div>
                  <h3 className="text-emerald-500 font-black tracking-[0.2em] uppercase text-xs mb-8">Recommended Resources</h3>
                  <div className="space-y-4">
                    {course.resources?.map((res: any, idx: number) => (
                      <a
                        key={idx}
                        href={res.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-6 rounded-2xl border border-slate-800/50 bg-slate-900/40 hover:bg-slate-800/60 hover:border-emerald-500/20 transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-500 group-hover:text-emerald-500 transition-colors">
                            <Star className="w-5 h-5" />
                          </div>
                          <span className="font-bold text-base text-slate-300 group-hover:text-white transition-colors">{res.title}</span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="p-8 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/10">
                  <div className="flex items-center gap-4 mb-4 text-emerald-500">
                    <Award className="w-6 h-6" />
                    <h4 className="font-black text-xl tracking-tight text-white">Certification Path</h4>
                  </div>
                  <p className="text-slate-400 leading-relaxed text-sm font-medium">
                    Complete all topics in this section to unlock the intermediate assessment and earn your digital badge.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
