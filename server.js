import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import adminRoutes from "./routes/adminRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import sendCodeRoutes from "./routes/sendCode.js";
import signupRoutes from "./routes/signup.js";

import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// ✅ CORS fix for localhost + deployed frontend
const allowedOrigins = [
  // "http://localhost:3000",
  // "http://localhost:5000",
  "https://admin-panel-six-vert.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `CORS policy does not allow access from ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api", adminRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/sendcode", sendCodeRoutes);
app.use("/api/signup", signupRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

// connectDB().then(() => {
//   console.log("✅ MongoDB connected successfully");
//   app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
// });

export default server;


// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";

// import vuserrouter from "./routers/vuserrouter.js";
// import authrouer from "./routers/authrouter.js";
// import Productsrouter from "./routers/Productsrouter.js";
// import categoryrouter from "./routers/categoryrouter.js";
// import vadminrouter from "./routers/vadminrouter.js";
// import shippingrouter from "./routers/shippingrouter.js";
// import checkoutrouter from "./routers/checkoutrouter.js";
// import orderRoutes from "./routers/checkoutrouter.js";
// import blogrouter from "./routers/blogrouter.js"
// import blogcategory from "./routers/blogcategory.js"
// import striproute from "./routers/striperoute.js";

// dotenv.config();

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());

// // Database Connection
// connectDB();






// // ✅ Routes
// app.use("/api/auth", authrouer);     // Register/Login
// app.use("/api", vuserrouter);         // CRUD routes
// app.use("/api", vadminrouter);

// // products k liya 
// app.use("/api", Productsrouter);
// // categories  k liya 
// app.use("/api", categoryrouter);

// // shipping k liya 
// app.use("/api", shippingrouter);
// // chakout k liya 
// app.use("/api", checkoutrouter);

// app.use("/api/orders", orderRoutes);
// //blog k liya 
// app.use("/api", blogrouter);
// //blog category k liya 
// app.use("/api", blogcategory);

// //payment k liya 
// app.use("/api", striproute);





// // Default Route
// app.get("/", (req, res) => {
//   res.send("✅ Backend server is running!");
// });

// // Server Start
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });


// export default app;

// ya hy mera app.js