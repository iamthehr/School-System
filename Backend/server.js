require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
connectDB();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://school-system-kappa.vercel.app"],
  })
);

app.use("/auth", require("./routes/auth"));
app.use("/admin", require("./routes/admin"));
app.use("/teacher", require("./routes/teacher"));
app.use("/student", require("./routes/student"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
