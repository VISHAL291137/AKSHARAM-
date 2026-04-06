import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Code, 
  Database, 
  ShieldCheck, 
  BarChart3, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  Users, 
  Award, 
  Menu, 
  X,
  ChevronRight,
  Zap
} from 'lucide-react';

const courses = [
  {
    id: 'ds',
    title: 'Data Science',
    price: '₹15,000',
    description: 'Master data analysis, visualization, and statistical modeling with Python.',
    icon: <Database className="w-8 h-8 text-blue-500" />,
    features: ['Python for Data Science', 'Machine Learning Basics', 'Data Visualization', 'Real-world Projects'],
    isFreeStarter: true
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    price: '₹18,000',
    description: 'Deep dive into neural networks, computer vision, and NLP.',
    icon: <Zap className="w-8 h-8 text-purple-500" />,
    features: ['Deep Learning', 'TensorFlow & PyTorch', 'Computer Vision', 'Generative AI'],
  },
  {
    id: 'cyber',
    title: 'Cybersecurity',
    price: '₹20,000',
    description: 'Learn to protect systems, networks, and data from digital attacks.',
    icon: <ShieldCheck className="w-8 h-8 text-red-500" />,
    features: ['Ethical Hacking', 'Network Security', 'Cryptography', 'Incident Response'],
  },
  {
    id: 'fsa',
    title: 'Full Stack Development',
    price: '₹22,000',
    description: 'Build complete web applications from front-end to back-end.',
    icon: <Code className="w-8 h-8 text-green-500" />,
    features: ['React & Next.js', 'Node.js & Express', 'MongoDB & SQL', 'DevOps Basics'],
  },
  {
    id: 'excel',
    title: 'Excel & Advanced Excel',
    price: '₹5,000',
    description: 'Master data manipulation, complex formulas, and automation.',
    icon: <BarChart3 className="w-8 h-8 text-emerald-500" />,
    features: ['Pivot Tables', 'VLOOKUP/XLOOKUP', 'VBA & Macros', 'Power Query'],
  }
];

const testimonials = [
  {
    name: 'Rahul Sharma',
    role: 'Data Analyst at Google',
    content: 'The Data Science course was life-changing. The projects were very practical.',
    avatar: 'https://picsum.photos/seed/rahul/100/100'
  },
  {
    name: 'Priya Patel',
    role: 'Full Stack Developer',
    content: 'Comprehensive curriculum and great support. I landed my dream job in 6 months.',
    avatar: 'https://picsum.photos/seed/priya/100/100'
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">AKSHARAM <span className="text-blue-600">Academy</span></span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#courses" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Courses</a>
              <a href="#features" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#testimonials" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Testimonials</a>
              <button className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                Enroll Now
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                <a href="#courses" className="block text-lg font-medium text-slate-900" onClick={() => setIsMenuOpen(false)}>Courses</a>
                <a href="#features" className="block text-lg font-medium text-slate-900" onClick={() => setIsMenuOpen(false)}>Features</a>
                <a href="#testimonials" className="block text-lg font-medium text-slate-900" onClick={() => setIsMenuOpen(false)}>Testimonials</a>
                <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold">Enroll Now</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-blue-600 uppercase bg-blue-50 rounded-full">
              Empower Your Future
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
              Master the Most <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">In-Demand Tech Skills</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
              Join 50,000+ students learning Data Science, AI, Full Stack, and Cybersecurity from industry experts. Start for free today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-2 group">
                Explore Courses <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto bg-white text-slate-900 border-2 border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
                Free Trial
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Active Students', value: '50K+' },
              { label: 'Courses', value: '100+' },
              { label: 'Expert Mentors', value: '200+' },
              { label: 'Hiring Partners', value: '500+' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Professional Programs</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Industry-aligned curriculums designed to take you from beginner to job-ready professional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-3xl p-8 border border-slate-200 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-300 relative flex flex-col"
              >
                {course.isFreeStarter && (
                  <div className="absolute top-6 right-6 bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Free Starter
                  </div>
                )}
                <div className="mb-6 bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                  {course.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{course.title}</h3>
                <p className="text-slate-600 mb-6 flex-grow">{course.description}</p>
                
                <div className="space-y-3 mb-8">
                  {course.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-blue-500" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-sm text-slate-400 block">Starting at</span>
                    <span className="text-2xl font-bold text-slate-900">{course.price}</span>
                  </div>
                  <button className="bg-slate-900 text-white p-3 rounded-xl hover:bg-blue-600 transition-all group-hover:scale-110">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Why TechEdu Academy?</h2>
              <div className="space-y-8">
                {[
                  {
                    title: 'Industry Expert Mentors',
                    desc: 'Learn from professionals working at top tech giants like Google, Amazon, and Meta.',
                    icon: <Users className="w-6 h-6 text-blue-600" />
                  },
                  {
                    title: '100% Placement Support',
                    desc: 'Dedicated career services including resume building and mock interviews.',
                    icon: <Award className="w-6 h-6 text-purple-600" />
                  },
                  {
                    title: 'Hands-on Projects',
                    desc: 'Build real-world applications and portfolios that impress recruiters.',
                    icon: <Code className="w-6 h-6 text-emerald-600" />
                  }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-1">{feature.title}</h4>
                      <p className="text-slate-600">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-600 to-purple-600 rounded-[3rem] rotate-3 absolute inset-0 -z-10 opacity-10" />
              <img 
                src="https://picsum.photos/seed/learning/800/800" 
                alt="Learning" 
                className="rounded-[3rem] shadow-2xl w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Success Stories</h2>
            <p className="text-slate-600">Hear from our alumni who transformed their careers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-1 text-yellow-400 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-lg text-slate-700 italic mb-8">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-white shadow-md" referrerPolicy="no-referrer" />
                  <div>
                    <h5 className="font-bold text-slate-900">{t.name}</h5>
                    <p className="text-sm text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to Start Your Tech Journey?</h2>
              <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
                Join thousands of students and start learning today. Get unlimited access to all courses with our premium plan.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="w-full sm:w-auto bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all">
                  Get Started Now
                </button>
                <button className="w-full sm:w-auto bg-transparent text-white border-2 border-slate-700 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all">
                  Contact Admissions
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900">AKSHARAM <span className="text-blue-600">Academy</span></span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Empowering the next generation of tech leaders through quality education and mentorship.
              </p>
            </div>
            <div>
              <h6 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Courses</h6>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Data Science</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">AI & ML</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Cybersecurity</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Full Stack</a></li>
              </ul>
            </div>
            <div>
              <h6 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Company</h6>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-blue-600 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Partners</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h6 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Newsletter</h6>
              <p className="text-sm text-slate-500 mb-4">Get the latest tech news and course updates.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Email" className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm w-full focus:outline-none focus:border-blue-500" />
                <button className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-all">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-400">© 2026 AKSHARAM Academy. All rights reserved.</p>
            <div className="flex gap-8 text-xs text-slate-400">
              <a href="#" className="hover:text-slate-600">Privacy Policy</a>
              <a href="#" className="hover:text-slate-600">Terms of Service</a>
              <a href="#" className="hover:text-slate-600">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
