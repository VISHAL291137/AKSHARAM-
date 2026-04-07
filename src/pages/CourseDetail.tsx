import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, 
  Clock, 
  BarChart3, 
  Award, 
  Zap, 
  CheckCircle2, 
  ChevronLeft, 
  ArrowRight, 
  AlertCircle, 
  MessageSquare, 
  Send,
  Users
} from "lucide-react";

export const CourseDetail: React.FC = () => {
  const { id } = useParams();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [comment, setComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  const fetchCourse = async () => {
    try {
      const res = await fetch("/api/courses");
      const data = await res.json();
      setAllCourses(data);
      const found = data.find((c: any) => c.id === id);
      setCourse(found);
    } catch (err) {
      console.error("Failed to fetch course", err);
    } finally {
      setLoading(false);
    }
  };

  const [allCourses, setAllCourses] = useState<any[]>([]);

  const navigateCourse = (direction: 'prev' | 'next') => {
    const currentIndex = allCourses.findIndex(c => c.id === id);
    let nextIndex;
    if (direction === 'prev') {
      nextIndex = currentIndex > 0 ? currentIndex - 1 : allCourses.length - 1;
    } else {
      nextIndex = currentIndex < allCourses.length - 1 ? currentIndex + 1 : 0;
    }
    navigate(`/courses/${allCourses[nextIndex].id}`);
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    if (!user) {
      navigate("/login", { state: { from: { pathname: `/courses/${id}` } } });
      return;
    }

    setEnrolling(true);
    setError("");
    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId: id }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        setError(data.error || "Enrollment failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setEnrolling(false);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    if (!comment.trim()) return;

    setSubmittingComment(true);
    try {
      const res = await fetch(`/api/courses/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: comment }),
      });

      if (res.ok) {
        setComment("");
        fetchCourse(); // Refresh course to show new comment
      }
    } catch (err) {
      console.error("Failed to post comment", err);
    } finally {
      setSubmittingComment(false);
    }
  };

  const toggleTopic = async (topic: string) => {
    if (!user) return;
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId: id, topic }),
      });
      if (res.ok) {
        fetchCourse();
      }
    } catch (err) {
      console.error("Failed to update progress", err);
    }
  };

  const isTopicCompleted = (topic: string) => {
    return course?.completedTopics?.includes(topic);
  };

  const progressPercentage = course?.features ? Math.round(((course.completedTopics?.length || 0) / course.features.length) * 100) : 0;

  if (loading) return (
    <div className="min-h-screen bg-white dark:bg-[#020617] flex items-center justify-center transition-colors duration-300">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
    </div>
  );

  if (!course) return (
    <div className="min-h-screen bg-white dark:bg-[#020617] flex items-center justify-center text-slate-900 dark:text-white transition-colors duration-300">
      Course not found
    </div>
  );

  return (
    <div className="bg-white dark:bg-[#020617] min-h-screen p-4 sm:p-8 md:p-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12 md:mb-16">
          <Link to="/courses" className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-bold uppercase tracking-widest text-[10px] md:text-xs">
            <ChevronLeft className="w-4 h-4" /> Back to Courses
          </Link>
          
          <div className="flex gap-3 md:gap-4 w-full sm:w-auto justify-end">
            <button 
              onClick={() => navigateCourse('prev')}
              className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/50 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-emerald-500/30 transition-all shadow-sm hover:shadow-xl"
              title="Previous Course"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => navigateCourse('next')}
              className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-slate-50 dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/50 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-emerald-500/30 transition-all shadow-sm hover:shadow-xl"
              title="Next Course"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-2">
            <div className="mb-12 md:mb-16">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-[1.5rem] md:rounded-[2rem] bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500 text-3xl md:text-4xl mb-8 md:mb-10 shadow-2xl shadow-emerald-500/10 border border-emerald-500/20">
                <Zap className="w-8 h-8 md:w-10 md:h-10 fill-current" />
              </div>
              <h1 className="text-3xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 md:mb-8 tracking-tight leading-tight">
                {course.title}
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg md:text-2xl leading-relaxed max-w-3xl">
                {course.description}
              </p>
            </div>

            <div className="space-y-12 md:space-y-16">
              {user && course.enrolled?.includes(user.id) && (
                <section className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/50 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 shadow-sm hover:shadow-2xl transition-all">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white tracking-tight">Your Progress</h3>
                    <span className="text-emerald-600 dark:text-emerald-500 font-black text-lg md:text-xl">{progressPercentage}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800/50 rounded-full h-3 md:h-4 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.6)]"
                    />
                  </div>
                </section>
              )}

              <section>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-8 md:mb-10 flex items-center gap-4 tracking-tight">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500 border border-emerald-500/20">
                    <BookOpen className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  Course Curriculum
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  {course.features.map((feature: string, idx: number) => (
                    <div 
                      key={idx} 
                      onClick={() => user && course.enrolled?.includes(user.id) && toggleTopic(feature)}
                      className={`bg-white dark:bg-[#0f172a] border p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-between group transition-all duration-500 shadow-sm hover:shadow-xl ${
                        isTopicCompleted(feature) 
                          ? 'border-emerald-500/40 bg-emerald-500/5' 
                          : 'border-slate-200 dark:border-slate-800/50 hover:border-emerald-500/30'
                      } ${user && course.enrolled?.includes(user.id) ? 'cursor-pointer' : ''}`}
                    >
                      <div className="flex items-center gap-4 md:gap-6">
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center font-black text-base md:text-lg transition-all duration-500 ${
                          isTopicCompleted(feature) ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-white dark:bg-slate-800/50 text-emerald-600 dark:text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white border border-slate-200 dark:border-transparent'
                        }`}>
                          {idx + 1}
                        </div>
                        <span className={`font-bold text-base md:text-lg ${isTopicCompleted(feature) ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-200'}`}>
                          {feature}
                        </span>
                      </div>
                      {user && course.enrolled?.includes(user.id) && (
                        <div className={`w-7 h-7 md:w-8 md:h-8 rounded-lg md:rounded-xl border-2 flex items-center justify-center transition-all duration-500 ${
                          isTopicCompleted(feature) ? 'bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-500/20' : 'border-slate-300 dark:border-slate-700'
                        }`}>
                          {isTopicCompleted(feature) && <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-white" />}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {course.roadmap && (
                <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
                  <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/50 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 shadow-sm hover:shadow-2xl transition-all">
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-6 md:mb-8 flex items-center gap-4 tracking-tight">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-500 border border-blue-500/20">
                        <BookOpen className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                      What you'll learn
                    </h3>
                    <ul className="space-y-4 md:space-y-5">
                      {course.roadmap.learn.map((item: string, i: number) => (
                        <li key={i} className="flex items-center gap-3 md:gap-4 text-slate-600 dark:text-slate-400 text-base md:text-lg">
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/50 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 shadow-sm hover:shadow-2xl transition-all">
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-6 md:mb-8 flex items-center gap-4 tracking-tight">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500 border border-emerald-500/20">
                        <Zap className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                      </div>
                      Advanced Roadmap
                    </h3>
                    <ul className="space-y-4 md:space-y-5">
                      {course.roadmap.moreLearn.map((item: string, i: number) => (
                        <li key={i} className="flex items-center gap-3 md:gap-4 text-slate-600 dark:text-slate-400 text-base md:text-lg">
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}

              {/* Resources Section */}
              {course.resources && course.resources.length > 0 && (
                <section>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-8 md:mb-10 flex items-center gap-4 tracking-tight">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-500 border border-purple-500/20">
                      <BookOpen className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    Learning Resources
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {course.resources.map((resource: any, idx: number) => (
                      <a 
                        key={idx}
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/50 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-between group hover:border-emerald-500/30 transition-all duration-500 shadow-sm hover:shadow-xl"
                      >
                        <div className="flex items-center gap-4 md:gap-6">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white dark:bg-slate-800/50 flex items-center justify-center text-emerald-600 dark:text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white border border-slate-200 dark:border-transparent transition-all">
                            <BookOpen className="w-4 h-4 md:w-5 md:h-5" />
                          </div>
                          <span className="font-bold text-base md:text-lg text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                            {resource.title}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                      </a>
                    ))}
                  </div>
                </section>
              )}

              {/* Comments Section */}
              <section className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/50 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 shadow-sm hover:shadow-2xl transition-all">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-8 md:mb-10 flex items-center gap-4 tracking-tight">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-500 border border-blue-500/20">
                    <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  Student Discussions
                </h2>
                
                {/* Comment Form */}
                <form onSubmit={handleCommentSubmit} className="mb-10 md:mb-12">
                  <div className="relative group">
                    <textarea 
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder={user ? "Share your thoughts or ask a question..." : "Please login to join the discussion"}
                      disabled={!user || submittingComment}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800/50 rounded-[1.5rem] md:rounded-[2rem] px-6 md:px-8 py-5 md:py-6 text-slate-900 dark:text-white focus:border-emerald-500 outline-none transition-all h-32 md:h-40 resize-none disabled:opacity-50 shadow-inner text-base md:text-lg"
                    />
                    <button 
                      type="submit"
                      disabled={!user || submittingComment || !comment.trim()}
                      className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-emerald-600 text-white p-3 md:p-4 rounded-xl md:rounded-2xl hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-emerald-600/20"
                    >
                      <Send className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                  </div>
                </form>

                {/* Comment List */}
                <div className="space-y-6 md:space-y-8">
                  {course.comments && course.comments.length > 0 ? (
                    course.comments.map((c: any) => (
                      <div key={c.id} className="p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-white dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800/50 hover:border-emerald-500/20 transition-all group shadow-sm">
                        <div className="flex items-center justify-between mb-4 md:mb-6">
                          <div className="flex items-center gap-3 md:gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center text-emerald-600 dark:text-emerald-500 font-black text-base md:text-lg group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-inner border border-slate-200 dark:border-transparent">
                              {c.userName.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 dark:text-white text-sm md:text-base">{c.userName}</div>
                              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{new Date(c.date).toLocaleDateString()}</div>
                            </div>
                          </div>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base md:text-lg">
                          {c.content}
                        </p>
                      </div>
                    )).reverse()
                  ) : (
                    <div className="text-center py-12 md:py-16">
                      <div className="bg-slate-100 dark:bg-slate-800/30 w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-slate-200 dark:border-slate-800/50">
                        <MessageSquare className="w-8 h-8 md:w-10 md:h-10 text-slate-400 dark:text-slate-600" />
                      </div>
                      <p className="text-slate-500 font-bold text-base md:text-lg">No discussions yet. Be the first to start one!</p>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-32 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/50 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 shadow-sm hover:shadow-2xl backdrop-blur-xl transition-all">
              <div className="flex items-baseline gap-3 mb-8 md:mb-10">
                <span className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">{course.price}</span>
                <span className="text-slate-500 text-[10px] md:text-sm font-black uppercase tracking-[0.2em]">Full Access</span>
              </div>

              <div className="space-y-6 md:space-y-8 mb-10 md:mb-12">
                <div className="flex items-center gap-4 md:gap-5 text-slate-600 dark:text-slate-300">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-500 border border-blue-500/20">
                    <Clock className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <span className="font-bold text-base md:text-lg">{course.duration}</span>
                </div>
                <div className="flex items-center gap-4 md:gap-5 text-slate-600 dark:text-slate-300">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-500 border border-purple-500/20">
                    <BarChart3 className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <span className="font-bold text-base md:text-lg">{course.level}</span>
                </div>
                <div className="flex items-center gap-4 md:gap-5 text-slate-600 dark:text-slate-300">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500 border border-emerald-500/20">
                    <Award className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <span className="font-bold text-base md:text-lg">Industry Certificate</span>
                </div>
                <div className="flex items-center gap-4 md:gap-5 text-slate-600 dark:text-slate-300">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-600 dark:text-yellow-500 border border-yellow-500/20">
                    <Zap className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                  </div>
                  <span className="font-bold text-base md:text-lg">Lifetime Access</span>
                </div>
              </div>

              {error && (
                <div className="mb-6 md:mb-8 p-4 md:p-5 bg-red-500/10 border border-red-500/20 rounded-xl md:rounded-2xl flex items-center gap-3 md:gap-4 text-red-600 dark:text-red-400 font-bold text-xs md:text-sm">
                  <AlertCircle className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-6 md:mb-8 p-4 md:p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl md:rounded-2xl flex items-center gap-3 md:gap-4 text-emerald-600 dark:text-emerald-400 font-bold text-xs md:text-sm">
                  <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
                  Successfully enrolled! Redirecting...
                </div>
              )}

              <button
                onClick={handleEnroll}
                disabled={enrolling || success}
                className="w-full bg-emerald-600 text-white py-5 md:py-6 rounded-xl md:rounded-[1.5rem] font-black text-lg md:text-xl hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-600/30 flex items-center justify-center gap-3 md:gap-4 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {enrolling ? "Enrolling..." : success ? "Enrolled" : "Enroll Now"}
                {!success && <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />}
              </button>

              <p className="text-center text-slate-500 text-[10px] md:text-xs mt-6 md:mt-8 font-bold uppercase tracking-widest">
                30-day money-back guarantee
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
