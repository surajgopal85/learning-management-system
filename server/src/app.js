const express = require("express");
const app = express();
const port = 3001;

// Middleware
app.use(express.json());

// Routes
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
