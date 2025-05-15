const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

// ✅ All API Routes should come first
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const locationRoutes = require("./routes/locationRoutes");
const partRoutes = require("./routes/partRoutes");
const complainRoutes = require("./routes/complainRoutes");
const technicianduedateRoutes = require("./routes/technicianduedateRoutes");
const refillerduedateRoutes = require("./routes/refillerduedateRoutes");
const technicianpendingtaskRoutes = require("./routes/technicianpendingtaskRoutes");
const techniciannewtaskRoutes = require("./routes/techniciannewtaskRoutes");
const technicianComplaintRoutes = require("./routes/technicianComplaintRoutes");
const refillerpendingtaskRoutes = require("./routes/refillerpendingtaskRoutes");
const refillernewtaskRoutes = require("./routes/refillernewtaskRoutes");
const refillerComplaintRoutes = require("./routes/refillerComplaintRoutes");
const clientComplaintRoutes = require("./routes/clientComplaintRoutes");
const adminComplaintRoues = require("./routes/adminComplaintRoutes");

app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/api", locationRoutes);
app.use("/api", partRoutes);
app.use("/api", complainRoutes);
app.use("/api", technicianduedateRoutes);
app.use("/api", refillerduedateRoutes);
app.use("/api", technicianpendingtaskRoutes);
app.use("/api", techniciannewtaskRoutes);
app.use("/api", technicianComplaintRoutes);
app.use("/api", refillerpendingtaskRoutes);
app.use("/api", refillernewtaskRoutes);
app.use("/api", refillerComplaintRoutes);
app.use("/api", clientComplaintRoutes);
app.use("/api", adminComplaintRoues);

// ✅ Serve frontend only AFTER all API routes
const _dirname = path.dirname("");
const buildPath = path.join(__dirname, "../frontend/build");
app.use(express.static(buildPath));

app.get("/*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../frontend/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

// ✅ Start server
app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});
