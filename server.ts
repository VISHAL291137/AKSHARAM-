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
  },
  {
    id: "2",
    email: "student@example.com",
    password: bcrypt.hashSync("student123", 10),
    role: "user",
    name: "Student User",
  },
];

const courses: any[] = [
  {
    id: "ds",
    title: "Data Science",
    price: "₹15,000",
    duration: "6 Months",
    level: "Beginner to Advanced",
    description: "Master data analysis, visualization, and statistical modeling with Python.",
    features: ["Python for Data Science", "Machine Learning Basics", "Data Visualization"],
    enrolled: [],
    comments: [],
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    price: "₹18,000",
    duration: "8 Months",
    level: "Intermediate",
    description: "Deep dive into neural networks, computer vision, and NLP.",
    features: ["Deep Learning", "TensorFlow & PyTorch", "Computer Vision"],
    enrolled: [],
    comments: [],
  },
];

const enrollments: any[] = [];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Middleware to verify JWT
  const authenticateToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Access denied" });

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
      if (err) return res.status(403).json({ error: "Invalid token" });
      req.user = user;
      next();
    });
  };

  // Middleware to check role
  const authorizeRole = (role: string) => {
    return (req: any, res: any, next: any) => {
      if (req.user.role !== role) {
        return res.status(403).json({ error: "Forbidden: Insufficient permissions" });
      }
      next();
    };
  };

  // Auth Routes
  app.post("/api/auth/register", (req, res) => {
    const { email, password, name } = req.body;
    if (users.find((u) => u.email === email)) {
      return res.status(400).json({ error: "User already exists" });
    }
    const newUser = {
      id: Date.now().toString(),
      email,
      password: bcrypt.hashSync(password, 10),
      role: "user",
      name,
    };
    users.push(newUser);
    const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name }, JWT_SECRET);
    res.json({ token, user: { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name } });
  });

  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    const user = users.find((u) => u.email === email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, JWT_SECRET);
    res.json({ token, user: { id: user.id, email: user.email, role: user.role, name: user.name } });
  });

  app.get("/api/auth/me", authenticateToken, (req: any, res) => {
    res.json({ user: req.user });
  });

  // Course Routes
  app.get("/api/courses", (req, res) => {
    res.json(courses);
  });

  app.post("/api/courses", authenticateToken, authorizeRole("admin"), (req, res) => {
    const newCourse = { ...req.body, id: Date.now().toString(), enrolled: [] };
    courses.push(newCourse);
    res.status(201).json(newCourse);
  });

  app.put("/api/courses/:id", authenticateToken, authorizeRole("admin"), (req, res) => {
    const index = courses.findIndex((c) => c.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Course not found" });
    courses[index] = { ...courses[index], ...req.body };
    res.json(courses[index]);
  });

  app.delete("/api/courses/:id", authenticateToken, authorizeRole("admin"), (req, res) => {
    const index = courses.findIndex((c) => c.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Course not found" });
    courses.splice(index, 1);
    res.json({ message: "Course deleted" });
  });

  app.post("/api/courses/:id/comments", authenticateToken, (req: any, res) => {
    const { content } = req.body;
    const course = courses.find((c) => c.id === req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });
    
    const comment = {
      id: Date.now().toString(),
      userId: req.user.id,
      userName: req.user.name,
      content,
      date: new Date()
    };
    
    if (!course.comments) course.comments = [];
    course.comments.push(comment);
    res.status(201).json(comment);
  });

  // Enrollment Routes
  app.post("/api/enroll", authenticateToken, (req: any, res) => {
    const { courseId } = req.body;
    const course = courses.find((c) => c.id === courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });
    
    const alreadyEnrolled = enrollments.find(e => e.userId === req.user.id && e.courseId === courseId);
    if (alreadyEnrolled) return res.status(400).json({ error: "Already enrolled" });

    const enrollment = { id: Date.now().toString(), userId: req.user.id, courseId, date: new Date() };
    enrollments.push(enrollment);
    res.json(enrollment);
  });

  app.get("/api/my-enrollments", authenticateToken, (req: any, res) => {
    const myEnrollments = enrollments.filter(e => e.userId === req.user.id);
    const myCourses = myEnrollments.map(e => courses.find(c => c.id === e.courseId));
    res.json(myCourses);
  });

  // User Management (Admin only)
  app.get("/api/admin/users", authenticateToken, authorizeRole("admin"), (req, res) => {
    res.json(users.map(u => ({ id: u.id, email: u.email, name: u.name, role: u.role })));
  });

  app.put("/api/admin/users/:id", authenticateToken, authorizeRole("admin"), (req, res) => {
    const { role } = req.body;
    const user = users.find(u => u.id === req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    
    if (role && ["admin", "user"].includes(role)) {
      user.role = role;
      res.json({ message: "User role updated", user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    } else {
      res.status(400).json({ error: "Invalid role" });
    }
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
