import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key-123";

// In-memory data store
const users: any[] = [
  {
    id: "1",
    email: "admin@example.com",
    password: bcrypt.hashSync("admin123", 10),
    role: "admin",
    name: "Admin User",
    status: "active",
  },
  {
    id: "2",
    email: "student@example.com",
    password: bcrypt.hashSync("student123", 10),
    role: "user",
    name: "Student User",
    status: "active",
  },
];

const courses: any[] = [
  {
    id: "ds",
    title: "Data Science",
    price: "₹15,000",
    duration: "6 Months",
    level: "Beginner to Advanced",
    description: "Master data analysis, visualization, and statistical modeling with Python. This comprehensive program covers everything from basic statistics to advanced machine learning techniques used by top data scientists.",
    features: [
      "Python for Data Science",
      "Machine Learning Basics",
      "Data Visualization",
      "Real-world Projects",
      "SQL for Data Analysis",
      "Statistical Modeling"
    ],
    roadmap: {
      learn: ["Python Fundamentals", "Statistics & Probability", "Data Cleaning & Preprocessing", "Exploratory Data Analysis (EDA)", "SQL for Data Science", "Data Visualization with Seaborn"],
      moreLearn: ["Advanced Machine Learning", "Deep Learning with TensorFlow", "Big Data Tools (Spark/Hadoop)", "Model Deployment", "Time Series Analysis", "Natural Language Processing"]
    },
    resources: [
      { title: "Andrew Ng: ML Specialization", link: "#" },
      { title: "Kaggle: Intro to ML", link: "#" }
    ],
    support: "24/7 community access and weekly live doubt sessions.",
    projects: "Build 5+ industry-grade projects for your portfolio.",
    activeStudents: "12,400+",
    enrolled: [],
    comments: [],
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    price: "₹18,000",
    duration: "8 Months",
    level: "Intermediate",
    description: "Deep dive into neural networks, computer vision, and NLP. Learn to build and deploy state-of-the-art AI models using industry-standard frameworks like TensorFlow and PyTorch.",
    features: [
      "Deep Learning",
      "TensorFlow & PyTorch",
      "Computer Vision",
      "Generative AI",
      "Natural Language Processing",
      "Reinforcement Learning"
    ],
    roadmap: {
      learn: ["Neural Networks Architecture", "Convolutional Neural Networks (CNNs)", "Recurrent Neural Networks (RNNs)", "Optimization Algorithms", "Supervised & Unsupervised Learning", "Model Evaluation & Tuning"],
      moreLearn: ["Large Language Models (LLMs)", "Generative Adversarial Networks (GANs)", "AI Ethics & Safety", "Edge AI & IoT", "Reinforcement Learning", "Computer Vision Applications"]
    },
    resources: [
      { title: "DeepLearning.AI: Neural Networks", link: "#" },
      { title: "Fast.ai: Practical Deep Learning", link: "#" }
    ],
    enrolled: [],
    comments: [],
  },
  {
    id: "cyber",
    title: "Cybersecurity",
    price: "₹20,000",
    duration: "5 Months",
    level: "Beginner",
    description: "Learn to protect systems, networks, and data from digital attacks. This course prepares you for industry certifications like CompTIA Security+ and CEH.",
    features: [
      "Ethical Hacking",
      "Network Security",
      "Cryptography",
      "Incident Response",
      "Cloud Security",
      "Penetration Testing"
    ],
    roadmap: {
      learn: ["Networking Fundamentals", "Linux Administration", "Security Principles & CIA Triad", "Common Threats & Vulnerabilities", "Identity & Access Management", "Security Operations Basics"],
      moreLearn: ["Digital Forensics", "Malware Analysis", "SecOps & Automation", "Compliance & Frameworks (ISO/NIST)", "Cloud Security Architecture", "Advanced Penetration Testing"]
    },
    resources: [
      { title: "CompTIA Security+ Guide", link: "#" },
      { title: "TryHackMe: Cyber Fundamentals", link: "#" }
    ],
    enrolled: [],
    comments: [],
  },
  {
    id: "fsa",
    title: "Full Stack Development",
    price: "₹22,000",
    duration: "7 Months",
    level: "Beginner",
    description: "Build complete web applications from front-end to back-end. Master the MERN stack and learn modern DevOps practices to deploy your applications at scale.",
    features: [
      "React & Next.js",
      "Node.js & Express",
      "MongoDB & SQL",
      "DevOps Basics",
      "System Design",
      "Cloud Deployment"
    ],
    roadmap: {
      learn: ["Modern HTML5 & CSS3", "JavaScript ES6+", "React.js Fundamentals", "Node.js & Express", "Database Design (SQL & NoSQL)", "RESTful API Development"],
      moreLearn: ["Microservices Architecture", "GraphQL & Apollo", "Real-time Apps with WebSockets", "Cloud Infrastructure (AWS/GCP)", "Docker & Kubernetes", "CI/CD Pipelines"]
    },
    resources: [
      { title: "MDN Web Docs", link: "#" },
      { title: "React Official Documentation", link: "#" }
    ],
    enrolled: [],
    comments: [],
  },
  {
    id: "excel",
    title: "Excel & Advanced Excel",
    price: "₹5,000",
    duration: "2 Months",
    level: "Beginner",
    description: "Master data manipulation, complex formulas, and automation. Transform from a basic user to an Excel power user capable of building complex dashboards and automated workflows.",
    features: [
      "Pivot Tables",
      "VLOOKUP/XLOOKUP",
      "VBA & Macros",
      "Power Query",
      "Data Modeling",
      "Dashboard Design"
    ],
    roadmap: {
      learn: ["Basic & Intermediate Formulas", "Conditional Formatting", "Advanced Charts & Graphs", "Data Validation & Protection", "Pivot Tables & Slicers", "Lookup Functions (XLOOKUP/INDEX)"],
      moreLearn: ["Power BI Integration", "Advanced VBA & Macros", "Financial Modeling Techniques", "Business Process Automation", "Power Query & Data Transformation", "Complex Dashboard Design"]
    },
    resources: [
      { title: "Microsoft Excel Help Center", link: "#" },
      { title: "ExcelJet: Excel Formulas", link: "#" }
    ],
    enrolled: [],
    comments: [],
  }
];

const enrollments: any[] = [];
const userProgress: any[] = []; // { userId, courseId, completedTopics: [] }

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Middleware to verify JWT
  const authenticateToken = (req: any, res: any, next: any) => {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];

      if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

      jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
        if (err) {
          console.error("Token verification error:", err.message);
          return res.status(403).json({ error: "Invalid or expired token" });
        }
        req.user = user;
        next();
      });
    } catch (error) {
      console.error("Authentication middleware error:", error);
      res.status(500).json({ error: "An error occurred during authentication" });
    }
  };

  // Middleware to check role
  const authorizeRole = (role: string) => {
    return (req: any, res: any, next: any) => {
      try {
        if (!req.user) {
          return res.status(401).json({ error: "Authentication required" });
        }
        if (req.user.role !== role) {
          return res.status(403).json({ error: "Forbidden: Insufficient permissions" });
        }
        next();
      } catch (error) {
        console.error("Authorization middleware error:", error);
        res.status(500).json({ error: "An error occurred during authorization" });
      }
    };
  };

  // Auth Routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { email, password, name } = req.body;

      if (!email || !password || !name) {
        return res.status(400).json({ error: "Email, password, and name are required" });
      }

      if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters" });
      }

      if (users.find((u) => u.email === email)) {
        return res.status(400).json({ error: "User already exists" });
      }

      const newUser = {
        id: Date.now().toString(),
        email,
        password: bcrypt.hashSync(password, 10),
        role: "user",
        name,
        status: "active",
      };
      users.push(newUser);
      const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name }, JWT_SECRET);
      res.json({ token, user: { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name } });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "An error occurred during registration" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }

      const user = users.find((u) => u.email === email);
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      if (user.status === "inactive") {
        return res.status(403).json({ error: "Account is inactive. Contact support." });
      }

      const token = jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, JWT_SECRET);
      res.json({ token, user: { id: user.id, email: user.email, role: user.role, name: user.name } });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "An error occurred during login" });
    }
  });

  app.get("/api/auth/me", authenticateToken, (req: any, res) => {
    try {
      res.json({ user: req.user });
    } catch (error) {
      console.error("Auth verification error:", error);
      res.status(500).json({ error: "An error occurred while verifying authentication" });
    }
  });

  // Course Routes
  app.get("/api/courses", (req, res) => {
    try {
      res.json(courses);
    } catch (error) {
      console.error("Fetch courses error:", error);
      res.status(500).json({ error: "An error occurred while fetching courses" });
    }
  });

  app.post("/api/courses", authenticateToken, authorizeRole("admin"), async (req, res) => {
    try {
      const { title, price, duration, level, description, features } = req.body;

      if (!title || !price || !duration || !level || !description || !features) {
        return res.status(400).json({ error: "All course fields are required" });
      }

      if (!Array.isArray(features)) {
        return res.status(400).json({ error: "Features must be an array" });
      }

      const newCourse = {
        ...req.body,
        id: Date.now().toString(),
        enrolled: [],
        comments: []
      };
      courses.push(newCourse);
      res.status(201).json(newCourse);
    } catch (error) {
      console.error("Create course error:", error);
      res.status(500).json({ error: "An error occurred while creating the course" });
    }
  });

  app.put("/api/courses/:id", authenticateToken, authorizeRole("admin"), async (req, res) => {
    try {
      const index = courses.findIndex((c) => c.id === req.params.id);
      if (index === -1) return res.status(404).json({ error: "Course not found" });

      courses[index] = { ...courses[index], ...req.body };
      res.json(courses[index]);
    } catch (error) {
      console.error("Update course error:", error);
      res.status(500).json({ error: "An error occurred while updating the course" });
    }
  });

  app.delete("/api/courses/:id", authenticateToken, authorizeRole("admin"), async (req, res) => {
    try {
      const index = courses.findIndex((c) => c.id === req.params.id);
      if (index === -1) return res.status(404).json({ error: "Course not found" });

      courses.splice(index, 1);
      res.json({ message: "Course deleted" });
    } catch (error) {
      console.error("Delete course error:", error);
      res.status(500).json({ error: "An error occurred while deleting the course" });
    }
  });

  app.post("/api/courses/:id/comments", authenticateToken, async (req: any, res) => {
    try {
      const { content } = req.body;

      if (!content || content.trim().length === 0) {
        return res.status(400).json({ error: "Comment content is required" });
      }

      const course = courses.find((c) => c.id === req.params.id);
      if (!course) return res.status(404).json({ error: "Course not found" });

      const comment = {
        id: Date.now().toString(),
        userId: req.user.id,
        userName: req.user.name,
        content: content.trim(),
        date: new Date()
      };

      if (!course.comments) course.comments = [];
      course.comments.push(comment);
      res.status(201).json(comment);
    } catch (error) {
      console.error("Post comment error:", error);
      res.status(500).json({ error: "An error occurred while posting the comment" });
    }
  });

  // Enrollment Routes
  app.post("/api/enroll", authenticateToken, async (req: any, res) => {
    try {
      const { courseId } = req.body;

      if (!courseId) {
        return res.status(400).json({ error: "Course ID is required" });
      }

      const course = courses.find((c) => c.id === courseId);
      if (!course) return res.status(404).json({ error: "Course not found" });

      const alreadyEnrolled = enrollments.find(e => e.userId === req.user.id && e.courseId === courseId);
      if (alreadyEnrolled) return res.status(400).json({ error: "Already enrolled" });

      const enrollment = { id: Date.now().toString(), userId: req.user.id, courseId, date: new Date() };
      enrollments.push(enrollment);
      res.json(enrollment);
    } catch (error) {
      console.error("Enrollment error:", error);
      res.status(500).json({ error: "An error occurred while enrolling in the course" });
    }
  });

  app.get("/api/my-enrollments", authenticateToken, async (req: any, res) => {
    try {
      const myEnrollments = enrollments.filter(e => e.userId === req.user.id);
      const myCourses = myEnrollments.map(e => {
        const course = courses.find(c => c.id === e.courseId);
        const progress = userProgress.find(p => p.userId === req.user.id && p.courseId === e.courseId);
        return { ...course, completedTopics: progress ? progress.completedTopics : [] };
      });
      res.json(myCourses);
    } catch (error) {
      console.error("Fetch enrollments error:", error);
      res.status(500).json({ error: "An error occurred while fetching your enrollments" });
    }
  });

  app.post("/api/progress", authenticateToken, async (req: any, res) => {
    try {
      const { courseId, topic } = req.body;

      if (!courseId || !topic) {
        return res.status(400).json({ error: "Course ID and topic are required" });
      }

      let progress = userProgress.find(p => p.userId === req.user.id && p.courseId === courseId);

      if (!progress) {
        progress = { userId: req.user.id, courseId, completedTopics: [] };
        userProgress.push(progress);
      }

      if (!progress.completedTopics.includes(topic)) {
        progress.completedTopics.push(topic);
      } else {
        progress.completedTopics = progress.completedTopics.filter((t: string) => t !== topic);
      }

      res.json(progress);
    } catch (error) {
      console.error("Update progress error:", error);
      res.status(500).json({ error: "An error occurred while updating progress" });
    }
  });

  // User Management (Admin only)
  app.get("/api/admin/users", authenticateToken, authorizeRole("admin"), async (req, res) => {
    try {
      res.json(users.map(u => ({ id: u.id, email: u.email, name: u.name, role: u.role, status: u.status })));
    } catch (error) {
      console.error("Fetch users error:", error);
      res.status(500).json({ error: "An error occurred while fetching users" });
    }
  });

  app.put("/api/admin/users/:id", authenticateToken, authorizeRole("admin"), async (req, res) => {
    try {
      const { role, status } = req.body;
      const user = users.find(u => u.id === req.params.id);
      if (!user) return res.status(404).json({ error: "User not found" });

      if (role && !["admin", "user"].includes(role)) {
        return res.status(400).json({ error: "Invalid role. Must be 'admin' or 'user'" });
      }

      if (status && !["active", "inactive"].includes(status)) {
        return res.status(400).json({ error: "Invalid status. Must be 'active' or 'inactive'" });
      }

      if (role) {
        user.role = role;
      }
      if (status) {
        user.status = status;
      }

      res.json({ message: "User updated", user: { id: user.id, email: user.email, name: user.name, role: user.role, status: user.status } });
    } catch (error) {
      console.error("Update user error:", error);
      res.status(500).json({ error: "An error occurred while updating the user" });
    }
  });

  // Global error handler middleware
  app.use((err: any, req: any, res: any, next: any) => {
    console.error("Unhandled error:", err);

    if (err.name === "JsonWebTokenError") {
      return res.status(403).json({ error: "Invalid token" });
    }

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }

    if (err.type === "entity.parse.failed") {
      return res.status(400).json({ error: "Invalid JSON in request body" });
    }

    res.status(err.status || 500).json({
      error: err.message || "An unexpected error occurred on the server",
      ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    });
  });

  // 404 handler for undefined API routes
  app.use("/api/*", (req, res) => {
    res.status(404).json({ error: "API endpoint not found" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
