const colors = require("colors");
const path = require("path");
const http = require("http");
const express = require("express");
const cors = require('cors')
const { notFound, errorHandler } = require("./middleware/error");
const connectDB = require("./db");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
// const { emailJobsQueue } = require("./controllers/queues/emailQueue");

const routes = require("./routes");

const { json, urlencoded } = express;

connectDB();
// emailJobsQueue;

const app = express();
const server = http.createServer(app);

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}
app.use(cors({credentials: true, origin: 'https://kanban-system.herokuapp.com'}));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use(routes);
app.get("/", (req, res) => {
  res.send("API is running");
});


app.use(notFound);
app.use(errorHandler);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = { app, server };
