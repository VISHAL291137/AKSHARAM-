import { useState, FormEvent, useEffect } from 'react';
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
  ChevronLeft,
  ChevronRight,
  Zap
} from 'lucide-react';

const courses = [
  {
    id: 'ds',
    title: 'Data Science',
    price: '₹15,000',
    duration: '6 Months',
    level: 'Beginner to Advanced',
    description: 'Master data analysis, visualization, and statistical modeling with Python. This comprehensive program covers everything from basic statistics to advanced machine learning techniques used by top data scientists.',
    icon: <Database className="w-8 h-8 text-blue-500" />,
    features: ['Python for Data Science', 'Machine Learning Basics', 'Data Visualization', 'Real-world Projects', 'SQL for Data Analysis', 'Statistical Modeling'],
    isFreeStarter: true
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    price: '₹18,000',
    duration: '8 Months',
    level: 'Intermediate',
    description: 'Deep dive into neural networks, computer vision, and NLP. Learn to build and deploy state-of-the-art AI models using industry-standard frameworks like TensorFlow and PyTorch.',
    icon: <Zap className="w-8 h-8 text-purple-500" />,
    features: ['Deep Learning', 'TensorFlow & PyTorch', 'Computer Vision', 'Generative AI', 'Natural Language Processing', 'Reinforcement Learning'],
  },
  {
    id: 'cyber',
    title: 'Cybersecurity',
    price: '₹20,000',
    duration: '5 Months',
    level: 'Beginner',
    description: 'Learn to protect systems, networks, and data from digital attacks. This course prepares you for industry certifications like CompTIA Security+ and CEH.',
    icon: <ShieldCheck className="w-8 h-8 text-red-500" />,
    features: ['Ethical Hacking', 'Network Security', 'Cryptography', 'Incident Response', 'Cloud Security', 'Penetration Testing'],
  },
  {
    id: 'fsa',
    title: 'Full Stack Development',
    price: '₹22,000',
    duration: '7 Months',
    level: 'Beginner',
    description: 'Build complete web applications from front-end to back-end. Master the MERN stack and learn modern DevOps practices to deploy your applications at scale.',
    icon: <Code className="w-8 h-8 text-green-500" />,
    features: ['React & Next.js', 'Node.js & Express', 'MongoDB & SQL', 'DevOps Basics', 'System Design', 'Cloud Deployment'],
  },
  {
    id: 'excel',
    title: 'Excel & Advanced Excel',
    price: '₹5,000',
    duration: '2 Months',
    level: 'Beginner',
    description: 'Master data manipulation, complex formulas, and automation. Transform from a basic user to an Excel power user capable of building complex dashboards and automated workflows.',
    icon: <BarChart3 className="w-8 h-8 text-emerald-500" />,
    features: ['Pivot Tables', 'VLOOKUP/XLOOKUP', 'VBA & Macros', 'Power Query', 'Data Modeling', 'Dashboard Design'],
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

const aiToolsList = [
  {
    name: 'ChatGPT',
    use: 'Text Generation & Coding',
    where: 'Content creation, debugging, brainstorming, and automated customer support.',
    icon: '🤖'
  },
  {
    name: 'Midjourney',
    use: 'Image Generation',
    where: 'Graphic design, concept art, marketing visuals, and architectural visualization.',
    icon: '🎨'
  },
  {
    name: 'GitHub Copilot',
    use: 'Coding Assistant',
    where: 'Software development, auto-completing functions, and writing unit tests.',
    icon: '💻'
  },
  {
    name: 'Claude',
    use: 'Reasoning & Analysis',
    where: 'Legal document review, long-form writing, and complex data interpretation.',
    icon: '🧠'
  },
  {
    name: 'Perplexity',
    use: 'AI Search & Research',
    where: 'Academic research, fact-checking, and real-time information retrieval.',
    icon: '🔍'
  },
  {
    name: 'ElevenLabs',
    use: 'Voice Synthesis',
    where: 'Audiobooks, video voiceovers, and accessibility tools for the visually impaired.',
    icon: '🎙️'
  },
  {
    name: 'Runway Gen-2',
    use: 'Generative Video',
    where: 'Film production, social media content, and experimental motion graphics.',
    icon: '🎬'
  },
  {
    name: 'Jasper',
    use: 'Marketing Copy',
    where: 'Ad copy, blog posts, email campaigns, and SEO optimization.',
    icon: '✍️'
  },
  {
    name: 'DALL-E 3',
    use: 'Precise Image Creation',
    where: 'Product mockups, illustrative icons, and creative storytelling.',
    icon: '🖼️'
  },
  {
    name: 'Grammarly AI',
    use: 'Writing Enhancement',
    where: 'Professional emails, academic papers, and business reports.',
    icon: '📝'
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
  },
  {
    id: 'aitools',
    title: 'AI Tools & Ecosystem',
    description: 'Master the industry-standard AI tools used by professionals worldwide.',
    icon: <Zap className="w-8 h-8" />,
    topics: [
      'ChatGPT: Advanced Prompt Engineering & Content Creation',
      'Midjourney: Professional AI Image Generation & Design',
      'GitHub Copilot: AI-Powered Coding & Development',
      'Claude: Complex Reasoning & Long-form Analysis',
      'Perplexity: AI-Driven Research & Information Retrieval',
      'ElevenLabs: High-Fidelity Voice Synthesis & Audio',
      'Runway: Generative Video Editing & Motion Graphics',
      'Jasper: Enterprise Marketing & Copywriting',
      'DALL-E 3: Precise Image Creation & Editing',
      'Grammarly: AI Writing Enhancement & Clarity'
    ],
    links: [
      { name: 'OpenAI: ChatGPT Guide', url: 'https://openai.com/blog/chatgpt' },
      { name: 'Midjourney: Documentation', url: 'https://docs.midjourney.com/' }
    ]
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoadmap, setSelectedRoadmap] = useState<typeof roadmapData[0] | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<typeof courses[0] | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    course: '',
    phone: '',
    email: ''
  });
  const [completedTopics, setCompletedTopics] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['hero', 'courses', 'roadmap', 'features', 'testimonials'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this to a backend
    console.log('Form submitted:', contactForm);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsContactModalOpen(false);
      setContactForm({ name: '', course: '', phone: '', email: '' });
    }, 2000);
  };

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
              <a 
                href="#courses" 
                className={`text-sm font-medium transition-all relative py-1 ${
                  activeSection === 'courses' 
                    ? 'text-blue-600' 
                    : darkMode ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                Courses
                {activeSection === 'courses' && (
                  <motion.div layoutId="activeNav" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </a>
              <a 
                href="#roadmap" 
                className={`text-sm font-medium transition-all relative py-1 ${
                  activeSection === 'roadmap' 
                    ? 'text-blue-600' 
                    : darkMode ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                Roadmap
                {activeSection === 'roadmap' && (
                  <motion.div layoutId="activeNav" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </a>
              <a 
                href="#features" 
                className={`text-sm font-medium transition-all relative py-1 ${
                  activeSection === 'features' 
                    ? 'text-blue-600' 
                    : darkMode ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                Features
                {activeSection === 'features' && (
                  <motion.div layoutId="activeNav" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </a>
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full transition-colors ${darkMode ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {darkMode ? <Zap className="w-5 h-5 fill-current" /> : <Zap className="w-5 h-5" />}
              </button>
              <button 
                onClick={() => setIsContactModalOpen(true)}
                className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
              >
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
              <motion.div 
                initial="closed"
                animate="open"
                variants={{
                  open: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
                  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                }}
                className="px-4 py-8 space-y-4"
              >
                {[
                  { id: 'courses', label: 'Courses' },
                  { id: 'roadmap', label: 'Roadmap' },
                  { id: 'features', label: 'Features' }
                ].map((item) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    variants={{
                      open: { opacity: 1, x: 0 },
                      closed: { opacity: 0, x: -20 }
                    }}
                    className={`flex items-center justify-between p-4 rounded-2xl text-lg font-bold transition-all ${
                      activeSection === item.id 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                        : darkMode ? 'text-slate-300 hover:bg-slate-900' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                    {activeSection === item.id && <motion.div layoutId="mobileActive" className="w-2 h-2 bg-white rounded-full" />}
                  </motion.a>
                ))}
                
                <motion.button 
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: 10 }
                  }}
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsContactModalOpen(true);
                  }}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-500/20"
                >
                  Enroll Now
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-20 pb-32 overflow-hidden">
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
              <button 
                onClick={() => setIsContactModalOpen(true)}
                className={`w-full sm:w-auto bg-transparent border-2 px-8 py-4 rounded-2xl font-bold text-lg transition-all ${darkMode ? 'text-white border-slate-700 hover:bg-slate-800' : 'text-slate-900 border-slate-200 hover:bg-slate-50'}`}
              >
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
                  <button 
                    onClick={() => setSelectedCourse(course)}
                    className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all flex items-center gap-2 group/btn shadow-lg shadow-blue-500/20"
                  >
                    View Details 
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
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

          {/* AI Tools Ecosystem Section */}
          <div className="mt-32">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-6"
              >
                <Zap className="w-4 h-4" /> AI Tools Ecosystem
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight">
                Master the <span className="text-blue-400">AI Toolset</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                Discover the most powerful AI tools used by industry professionals to boost productivity and innovation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiToolsList.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 hover:border-blue-500/50 hover:bg-slate-800/60 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-4xl">{tool.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{tool.name}</h3>
                      <span className="text-blue-500 text-xs font-bold uppercase tracking-widest">{tool.use}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800 group-hover:border-blue-500/30 transition-colors">
                      <p className="text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">Primary Use Case</p>
                      <p className="text-slate-300 text-sm leading-relaxed">{tool.where}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
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

        {/* Course Detail Modal */}
        <AnimatePresence>
          {selectedCourse && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCourse(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className={`relative w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden border ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-5 h-full max-h-[90vh] overflow-y-auto">
                  {/* Left Sidebar - Info */}
                  <div className={`lg:col-span-2 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                    <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-8 ${darkMode ? 'bg-slate-800' : 'bg-white shadow-xl shadow-slate-200'}`}>
                      {selectedCourse.icon}
                    </div>
                    <h3 className={`text-3xl font-bold mb-4 leading-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>{selectedCourse.title}</h3>
                    <p className={`text-lg mb-8 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{selectedCourse.description}</p>
                    
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                          <Zap className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Duration</p>
                          <p className={`font-bold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{selectedCourse.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                          <BarChart3 className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Level</p>
                          <p className={`font-bold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{selectedCourse.level}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                          <Award className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Certificate</p>
                          <p className={`font-bold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>Industry Recognized</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-slate-200/10">
                      <div className="flex items-baseline gap-2 mb-6">
                        <span className={`text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{selectedCourse.price}</span>
                        <span className="text-slate-500 text-sm">Full Course Access</span>
                      </div>
                      <button 
                        onClick={() => setIsContactModalOpen(true)}
                        className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200"
                      >
                        Enroll Now
                      </button>

                      {/* Course Navigation */}
                      <div className="mt-6 flex items-center gap-3">
                        <button
                          disabled={courses.findIndex(c => c.id === selectedCourse.id) === 0}
                          onClick={() => {
                            const idx = courses.findIndex(c => c.id === selectedCourse.id);
                            if (idx > 0) setSelectedCourse(courses[idx - 1]);
                          }}
                          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border font-bold transition-all ${
                            courses.findIndex(c => c.id === selectedCourse.id) === 0
                              ? 'opacity-30 cursor-not-allowed border-slate-700 text-slate-500'
                              : darkMode 
                                ? 'border-slate-700 text-white hover:bg-slate-800' 
                                : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <ChevronLeft className="w-4 h-4" /> Previous
                        </button>
                        <button
                          disabled={courses.findIndex(c => c.id === selectedCourse.id) === courses.length - 1}
                          onClick={() => {
                            const idx = courses.findIndex(c => c.id === selectedCourse.id);
                            if (idx < courses.length - 1) setSelectedCourse(courses[idx + 1]);
                          }}
                          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border font-bold transition-all ${
                            courses.findIndex(c => c.id === selectedCourse.id) === courses.length - 1
                              ? 'opacity-30 cursor-not-allowed border-slate-700 text-slate-500'
                              : darkMode 
                                ? 'border-slate-700 text-white hover:bg-slate-800' 
                                : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          Next <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Content - Curriculum */}
                  <div className="lg:col-span-3 p-8 lg:p-12">
                    <div className="flex justify-between items-center mb-10">
                      <h4 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Course Curriculum</h4>
                      <button 
                        onClick={() => setSelectedCourse(null)}
                        className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      {selectedCourse.features.map((feature, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className={`flex items-center gap-4 p-5 rounded-2xl border transition-all ${darkMode ? 'bg-slate-900/50 border-slate-800 hover:border-blue-500/50' : 'bg-white border-slate-100 hover:border-blue-200 shadow-sm'}`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold text-sm">
                            {idx + 1}
                          </div>
                          <span className={`font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{feature}</span>
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-auto" />
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-10 grid grid-cols-2 gap-4">
                      <div className={`p-6 rounded-3xl border border-dashed ${darkMode ? 'border-slate-800 bg-slate-900/30' : 'border-slate-200 bg-slate-50'}`}>
                        <h5 className={`font-bold mb-2 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                          <Users className="w-5 h-5 text-blue-500" /> Support
                        </h5>
                        <p className="text-slate-500 text-xs leading-relaxed">
                          24/7 community access and weekly live doubt sessions.
                        </p>
                      </div>
                      <div className={`p-6 rounded-3xl border border-dashed ${darkMode ? 'border-slate-800 bg-slate-900/30' : 'border-slate-200 bg-slate-50'}`}>
                        <h5 className={`font-bold mb-2 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                          <Star className="w-5 h-5 text-yellow-500" /> Projects
                        </h5>
                        <p className="text-slate-500 text-xs leading-relaxed">
                          Build 5+ industry-grade projects for your portfolio.
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
                <button 
                  onClick={() => setIsContactModalOpen(true)}
                  className="w-full sm:w-auto bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all"
                >
                  Get Started Now
                </button>
                <button 
                  onClick={() => setIsContactModalOpen(true)}
                  className="w-full sm:w-auto bg-transparent text-white border-2 border-slate-700 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all"
                >
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
        {/* Contact Modal */}
        <AnimatePresence>
          {isContactModalOpen && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsContactModalOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className={`relative w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}
              >
                <div className="p-8 md:p-10">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Contact Us</h3>
                      <p className="text-slate-500 text-sm">Fill out the form and we'll get back to you.</p>
                    </div>
                    <button 
                      onClick={() => setIsContactModalOpen(false)}
                      className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {isSubmitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-12 text-center"
                    >
                      <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h4 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Thank You!</h4>
                      <p className="text-slate-500">Your message has been received. We'll contact you shortly.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-5">
                      <div>
                        <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Full Name</label>
                        <input 
                          required
                          type="text" 
                          placeholder="John Doe"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                          className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Email Address</label>
                        <input 
                          required
                          type="email" 
                          placeholder="john@example.com"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                          className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Phone Number</label>
                        <input 
                          required
                          type="tel" 
                          placeholder="+91 98765 43210"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                          className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Select Course</label>
                        <select 
                          required
                          value={contactForm.course}
                          onChange={(e) => setContactForm({...contactForm, course: e.target.value})}
                          className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                        >
                          <option value="">Choose a course</option>
                          {courses.map(c => (
                            <option key={c.id} value={c.title}>{c.title}</option>
                          ))}
                        </select>
                      </div>
                      <button 
                        type="submit"
                        className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 mt-4"
                      >
                        Send Message
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </footer>
    </div>
  );
}
