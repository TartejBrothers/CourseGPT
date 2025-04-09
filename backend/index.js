require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5001;
const mongoose = require("mongoose");

app.use(
  cors(
    {
      origin: ["http://localhost:5173", "https://course-gpt-ai.web.app"],
      credentials: true,
    } // Allow credentials
  )
);
const allowedOrigins = [
  "http://localhost:5173",
  "https://course-gpt-ai.web.app",
];
app.use(express.json());
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // Preflight request
  }

  next();
});
app.get("/", (req, res) => {
  res.send("Backend");
});
app.use("/api/auth", require("./routes/auth"));
app.use("/api/ai", require("./routes/ai"));
app.use("/api/module", require("./routes/module"));
app.use("/api/editor", require("./routes/editor"));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    console.log("Successfully connected to Database.");
  } catch (error) {
    console.log("Failed to connect to Database.", error);
  }
};
connectDB();
