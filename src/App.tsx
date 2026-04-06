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

const roadmapData = [
  {
    id: 'math',
    title: 'Mathematics & Statistics',
    description: 'The foundation of AI. Master the numbers behind the algorithms.',
    icon: <BarChart3 className="w-8 h-8" />,
    topics: ['Linear Algebra', 'Multivariate Calculus', 'Probability Theory', 'Inferential Statistics', 'Optimization Algorithms'],
    links: [
      { name: 'Khan Academy: Statistics', url: 'https://www.khanacademy.org/math/statistics-probability' },
      { name: 'MIT OCW: Linear Algebra', url: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/' }
    ]
  },
  {
    id: 'econometrics',
    title: 'Econometrics',
    description: 'Causal inference and statistical modeling for economic data.',
    icon: <Database className="w-8 h-8" />,
    topics: ['Simple & Multiple Regression', 'Time Series Analysis', 'Causal Inference', 'Instrumental Variables', 'Panel Data'],
    links: [
      { name: 'Coursera: Econometrics', url: 'https://www.coursera.org/learn/erasmus-econometrics' },
      { name: 'edX: Data Analysis for Social Scientists', url: 'https://www.edx.org/course/data-analysis-for-social-scientists' }
    ]
  },
  {
    id: 'coding',
    title: 'Programming & Coding',
    description: 'Build the tools. Master Python, SQL, and software engineering.',
    icon: <Code className="w-8 h-8" />,
    topics: ['Python for Data Science', 'SQL Mastery', 'Git & Version Control', 'Data Structures', 'Algorithms'],
    links: [
      { name: 'Kaggle: Python Course', url: 'https://www.kaggle.com/learn/python' },
      { name: 'Codecademy: SQL', url: 'https://www.codecademy.com/learn/learn-sql' }
    ]
  },
  {
    id: 'eda',
    title: 'Exploratory Data Analysis',
    description: 'Understand your data. Visualization and cleaning techniques.',
    icon: <BarChart3 className="w-8 h-8" />,
    topics: ['Pandas & NumPy', 'Matplotlib & Seaborn', 'Data Cleaning', 'Feature Engineering', 'Storytelling with Data'],
    links: [
      { name: 'Kaggle: Data Visualization', url: 'https://www.kaggle.com/learn/data-visualization' },
      { name: 'DataCamp: EDA in Python', url: 'https://www.datacamp.com/courses/exploratory-data-analysis-in-python' }
    ]
  },
  {
    id: 'ml',
    title: 'Machine Learning',
    description: 'Predict the future. Supervised and unsupervised learning.',
    icon: <Zap className="w-8 h-8" />,
    topics: ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation', 'Scikit-Learn', 'Ensemble Methods'],
    links: [
      { name: 'Andrew Ng: ML Specialization', url: 'https://www.coursera.org/specializations/machine-learning-introduction' },
      { name: 'Kaggle: Intro to ML', url: 'https://www.kaggle.com/learn/intro-to-machine-learning' }
    ]
  },
  {
    id: 'dl',
    title: 'Deep Learning',
    description: 'Neural networks and beyond. Computer vision and NLP.',
    icon: <ShieldCheck className="w-8 h-8" />,
    topics: ['Neural Networks', 'CNNs & RNNs', 'Transformers & LLMs', 'PyTorch / TensorFlow', 'Generative AI'],
    links: [
      { name: 'DeepLearning.AI', url: 'https://www.deeplearning.ai/' },
      { name: 'Fast.ai: Practical Deep Learning', url: 'https://www.fast.ai/' }
    ]
  },
  {
    id: 'mlops',
    title: 'MLOps',
    description: 'Productionize your models. Deployment and monitoring.',
    icon: <Award className="w-8 h-8" />,
    topics: ['Model Deployment', 'Docker & Kubernetes', 'CI/CD for ML', 'Model Monitoring', 'Scalable Systems'],
    links: [
      { name: 'Coursera: MLOps Specialization', url: 'https://www.coursera.org/specializations/machine-learning-engineering-for-production-mlops' },
      { name: 'Made With ML', url: 'https://madewithml.com/' }
    ]
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoadmap, setSelectedRoadmap] = useState<typeof roadmapData[0] | null>(null);
  const [completedTopics, setCompletedTopics] = useState<Record<string, string[]>>({});

  const toggleTopic = (sectionId: string, topic: string) => {
    setCompletedTopics(prev => {
      const section = prev[sectionId] || [];
      const newSection = section.includes(topic)
        ? section.filter(t => t !== topic)
        : [...section, topic];
      return { ...prev, [sectionId]: newSection };
    });
  };

  const filteredRoadmap = roadmapData.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100 dark' : 'bg-slate-50 text-slate-900'}`}>
      {/* Navigation */}
      <nav className={`sticky top-0 z-50 border-b transition-colors duration-300 ${darkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-200'} backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className={`text-xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>AKSHARAM <span className="text-blue-600">Academy</span></span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#courses" className={`text-sm font-medium transition-colors ${darkMode ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'}`}>Courses</a>
              <a href="#roadmap" className={`text-sm font-medium transition-colors ${darkMode ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'}`}>Roadmap</a>
              <a href="#features" className={`text-sm font-medium transition-colors ${darkMode ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'}`}>Features</a>
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full transition-colors ${darkMode ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {darkMode ? <Zap className="w-5 h-5 fill-current" /> : <Zap className="w-5 h-5" />}
              </button>
              <button className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                Enroll Now
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center gap-2 md:hidden">
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full transition-colors ${darkMode ? 'bg-slate-800 text-yellow-400' : 'bg-slate-100 text-slate-600'}`}
              >
                {darkMode ? <Zap className="w-5 h-5 fill-current" /> : <Zap className="w-5 h-5" />}
              </button>
              <button className={`p-2 ${darkMode ? 'text-white' : 'text-slate-900'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden border-b overflow-hidden ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}
            >
              <div className="px-4 py-6 space-y-4">
                <a href="#courses" className={`block text-lg font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`} onClick={() => setIsMenuOpen(false)}>Courses</a>
                <a href="#roadmap" className={`block text-lg font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`} onClick={() => setIsMenuOpen(false)}>Roadmap</a>
                <a href="#features" className={`block text-lg font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`} onClick={() => setIsMenuOpen(false)}>Features</a>
                <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold">Enroll Now</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
          <div className={`absolute top-0 left-0 w-72 h-72 rounded-full blur-3xl ${darkMode ? 'bg-blue-900/20' : 'bg-blue-400/10'}`} />
          <div className={`absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl ${darkMode ? 'bg-purple-900/20' : 'bg-purple-400/10'}`} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className={`inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide uppercase rounded-full ${darkMode ? 'text-blue-400 bg-blue-900/30' : 'text-blue-600 bg-blue-50'}`}>
              Empower Your Future
            </span>
            <h1 className={`text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Master the Most <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">In-Demand Tech Skills</span>
            </h1>
            <p className={`max-w-2xl mx-auto text-lg md:text-xl mb-10 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Join 50,000+ students learning Data Science, AI, Full Stack, and Cybersecurity from industry experts. Start for free today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-2 group">
                Explore Courses <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className={`w-full sm:w-auto bg-transparent border-2 px-8 py-4 rounded-2xl font-bold text-lg transition-all ${darkMode ? 'text-white border-slate-700 hover:bg-slate-800' : 'text-slate-900 border-slate-200 hover:bg-slate-50'}`}>
                Free Trial
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-12 border-y transition-colors duration-300 ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'}`}>
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
                <div className={`text-sm font-medium uppercase tracking-wider ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Our Professional Programs</h2>
            <p className={`max-w-2xl mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
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
                className={`group rounded-3xl p-8 border transition-all duration-300 relative flex flex-col ${darkMode ? 'bg-slate-900 border-slate-800 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-900/20' : 'bg-white border-slate-200 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-100'}`}
              >
                {course.isFreeStarter && (
                  <div className="absolute top-6 right-6 bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Free Starter
                  </div>
                )}
                <div className={`mb-6 w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${darkMode ? 'bg-slate-800 group-hover:bg-blue-900/30' : 'bg-slate-50 group-hover:bg-blue-50'}`}>
                  {course.icon}
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{course.title}</h3>
                <p className={`mb-6 flex-grow ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{course.description}</p>
                
                <div className="space-y-3 mb-8">
                  {course.features.map((feature, idx) => (
                    <div key={idx} className={`flex items-center gap-2 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      <CheckCircle2 className="w-4 h-4 text-blue-500" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className={`pt-6 border-t flex items-center justify-between ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                  <div>
                    <span className="text-sm text-slate-400 block">Starting at</span>
                    <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{course.price}</span>
                  </div>
                  <button className="bg-slate-900 text-white p-3 rounded-xl hover:bg-blue-600 transition-all group-hover:scale-110 dark:bg-blue-600 dark:hover:bg-blue-700">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI & Data Scientist Roadmap Section */}
      <section id="roadmap" className={`py-24 transition-colors duration-300 ${darkMode ? 'bg-black' : 'bg-slate-900'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold mb-6"
            >
              <Zap className="w-4 h-4" /> Interactive Learning Path
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
              AI & Data Scientist <span className="text-emerald-400">Roadmap</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-10">
              A comprehensive, step-by-step guide to mastering Artificial Intelligence and Data Science. Track your progress as you learn.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <BarChart3 className="w-5 h-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search roadmap topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 text-white pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-slate-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoadmap.map((item, i) => {
              const progress = completedTopics[item.id]?.length || 0;
              const total = item.topics.length;
              const percentage = Math.round((progress / total) * 100);

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedRoadmap(item)}
                  className="group relative bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 cursor-pointer hover:border-emerald-500/50 hover:bg-slate-800/60 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    {item.icon}
                  </div>
                  
                  <div className="mb-6 inline-flex p-3 rounded-2xl bg-emerald-500/10 text-emerald-400">
                    {item.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">{item.title}</h3>
                  <p className="text-slate-400 text-sm mb-6 line-clamp-2">{item.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                      <span className="text-slate-500">Progress</span>
                      <span className="text-emerald-400">{percentage}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center text-emerald-400 text-sm font-bold gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                    View Details <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Roadmap Modal */}
        <AnimatePresence>
          {selectedRoadmap && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedRoadmap(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden"
              >
                <div className="p-8 md:p-12">
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center gap-4">
                      <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-400">
                        {selectedRoadmap.icon}
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-white">{selectedRoadmap.title}</h3>
                        <p className="text-slate-400">Master the fundamentals and advanced concepts.</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedRoadmap(null)}
                      className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-6">Topics to Master</h4>
                      <div className="space-y-3">
                        {selectedRoadmap.topics.map((topic) => {
                          const isCompleted = completedTopics[selectedRoadmap.id]?.includes(topic);
                          return (
                            <div 
                              key={topic}
                              onClick={() => toggleTopic(selectedRoadmap.id, topic)}
                              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${isCompleted ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-slate-800/50 border border-transparent hover:border-slate-700'}`}
                            >
                              <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${isCompleted ? 'bg-emerald-500 text-white' : 'border-2 border-slate-600'}`}>
                                {isCompleted && <CheckCircle2 className="w-3 h-3" />}
                              </div>
                              <span className={`text-sm font-medium ${isCompleted ? 'text-emerald-400' : 'text-slate-300'}`}>{topic}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div>
                        <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-6">Recommended Resources</h4>
                        <div className="space-y-4">
                          {selectedRoadmap.links.map((link) => (
                            <a 
                              key={link.name}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-4 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-emerald-500/50 hover:bg-slate-800 transition-all group"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-slate-300 group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-colors">
                                  <Star className="w-4 h-4" />
                                </div>
                                <span className="text-sm font-bold text-white">{link.name}</span>
                              </div>
                              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                            </a>
                          ))}
                        </div>
                      </div>
                      
                      <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-500/20">
                        <h5 className="text-white font-bold mb-2 flex items-center gap-2">
                          <Award className="w-5 h-5 text-emerald-400" /> Certification Path
                        </h5>
                        <p className="text-slate-400 text-xs leading-relaxed">
                          Complete all topics in this section to unlock the intermediate assessment and earn your digital badge.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* Why Choose Us */}
      <section id="features" className={`py-24 transition-colors duration-300 ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className={`text-3xl md:text-4xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Why AKSHARAM Academy?</h2>
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
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className={`text-xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{feature.title}</h4>
                      <p className={`${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{feature.desc}</p>
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
      <section id="testimonials" className={`py-24 transition-colors duration-300 ${darkMode ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Success Stories</h2>
            <p className={`${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Hear from our alumni who transformed their careers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className={`p-8 rounded-3xl border shadow-sm transition-colors ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="flex items-center gap-1 text-yellow-400 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <p className={`text-lg italic mb-8 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-white shadow-md" referrerPolicy="no-referrer" />
                  <div>
                    <h5 className={`font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t.name}</h5>
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
      <footer className={`border-t pt-20 pb-10 transition-colors duration-300 ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className={`text-xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>AKSHARAM <span className="text-blue-600">Academy</span></span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Empowering the next generation of tech leaders through quality education and mentorship.
              </p>
            </div>
            <div>
              <h6 className={`font-bold mb-6 uppercase tracking-wider text-xs ${darkMode ? 'text-white' : 'text-slate-900'}`}>Courses</h6>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Data Science</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">AI & ML</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Cybersecurity</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Full Stack</a></li>
              </ul>
            </div>
            <div>
              <h6 className={`font-bold mb-6 uppercase tracking-wider text-xs ${darkMode ? 'text-white' : 'text-slate-900'}`}>Company</h6>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-blue-600 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Partners</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h6 className={`font-bold mb-6 uppercase tracking-wider text-xs ${darkMode ? 'text-white' : 'text-slate-900'}`}>Newsletter</h6>
              <p className="text-sm text-slate-500 mb-4">Get the latest tech news and course updates.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Email" className={`border rounded-xl px-4 py-2 text-sm w-full focus:outline-none focus:border-blue-500 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200'}`} />
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
