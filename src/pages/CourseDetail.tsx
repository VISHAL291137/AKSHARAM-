import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Clock, BarChart3, Award, Zap, CheckCircle2, ChevronLeft, ArrowRight, AlertCircle, MessageSquare, Send } from "lucide-react";

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

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (!course) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
      Course not found
    </div>
  );

  return (
    <div className="bg-slate-950 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <Link to="/courses" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs">
            <ChevronLeft className="w-4 h-4" /> Back to Courses
          </Link>
          
          <div className="flex gap-4">
            <button 
              onClick={() => navigateCourse('prev')}
              className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
              title="Previous Course"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => navigateCourse('next')}
              className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
              title="Next Course"
            >
              <ArrowRight className="w-5 h-5 rotate-0" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <div className="mb-12">
              <div className="w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center text-4xl mb-8 shadow-2xl shadow-blue-500/20">
                {course.id === 'ds' ? '📊' : course.id === 'ai-ml' ? '🤖' : '💻'}
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
                {course.title}
              </h1>
              <p className="text-slate-400 text-xl leading-relaxed max-w-2xl">
                {course.description}
              </p>
            </div>

            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-blue-500" /> Course Curriculum
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.features.map((feature: string, idx: number) => (
                    <div key={idx} className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl flex items-center gap-4 group hover:border-blue-500/30 transition-all">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-blue-500 font-bold group-hover:bg-blue-600 group-hover:text-white transition-all">
                        {idx + 1}
                      </div>
                      <span className="text-slate-300 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-12">
                <h2 className="text-2xl font-bold text-white mb-8">What you'll learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    "Master industry-standard tools and frameworks",
                    "Build a professional portfolio with real projects",
                    "Learn from top-tier industry experts",
                    "Get 100% placement support and guidance"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="mt-1 p-1 rounded-full bg-emerald-500/10 text-emerald-500">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <p className="text-slate-400 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Comments Section */}
              <section className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-12">
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-blue-500" /> Student Discussions
                </h2>
                
                {/* Comment Form */}
                <form onSubmit={handleCommentSubmit} className="mb-12">
                  <div className="relative group">
                    <textarea 
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder={user ? "Share your thoughts or ask a question..." : "Please login to join the discussion"}
                      disabled={!user || submittingComment}
                      className="w-full bg-slate-950 border border-slate-800 rounded-3xl px-6 py-5 text-white focus:border-blue-500 outline-none transition-all h-32 resize-none disabled:opacity-50"
                    />
                    <button 
                      type="submit"
                      disabled={!user || submittingComment || !comment.trim()}
                      className="absolute bottom-4 right-4 bg-blue-600 text-white p-3 rounded-2xl hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-blue-500/20"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </form>

                {/* Comment List */}
                <div className="space-y-6">
                  {course.comments && course.comments.length > 0 ? (
                    course.comments.map((c: any) => (
                      <div key={c.id} className="p-6 rounded-3xl bg-slate-950/50 border border-slate-800 hover:border-slate-700 transition-all">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-blue-500 font-bold">
                              {c.userName.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-white text-sm">{c.userName}</div>
                              <div className="text-xs text-slate-500">{new Date(c.date).toLocaleDateString()}</div>
                            </div>
                          </div>
                        </div>
                        <p className="text-slate-300 leading-relaxed text-sm">
                          {c.content}
                        </p>
                      </div>
                    )).reverse()
                  ) : (
                    <div className="text-center py-12">
                      <div className="bg-slate-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageSquare className="w-8 h-8 text-slate-500" />
                      </div>
                      <p className="text-slate-500 font-medium">No discussions yet. Be the first to start one!</p>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-32 bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 shadow-2xl">
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-4xl font-extrabold text-white">{course.price}</span>
                <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">Full Access</span>
              </div>

              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-4 text-slate-400">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex items-center gap-4 text-slate-400">
                  <BarChart3 className="w-5 h-5 text-purple-500" />
                  <span className="font-medium">{course.level}</span>
                </div>
                <div className="flex items-center gap-4 text-slate-400">
                  <Award className="w-5 h-5 text-emerald-500" />
                  <span className="font-medium">Industry Certificate</span>
                </div>
                <div className="flex items-center gap-4 text-slate-400">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium">Lifetime Access</span>
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-sm">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 text-emerald-400 text-sm">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  Successfully enrolled! Redirecting...
                </div>
              )}

              <button
                onClick={handleEnroll}
                disabled={enrolling || success}
                className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/20 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {enrolling ? "Enrolling..." : success ? "Enrolled" : "Enroll Now"}
                {!success && <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />}
              </button>

              <p className="text-center text-slate-500 text-sm mt-6 font-medium">
                30-day money-back guarantee
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
