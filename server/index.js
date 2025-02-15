// Set up express, bodyparser and EJS
const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
// Set up SQLite
// Items in the global namespace are accessible throught out the node application
const sqlite3 = require("sqlite3").verbose();
global.db = new sqlite3.Database("./database.db", function (err) {
  if (err) {
    console.error(err);
    process.exit(1); // bail out we can't connect to the DB
  } else {
    console.log("Database connected");
    global.db.run("PRAGMA foreign_keys=ON"); // tell SQLite to pay attention to foreign key constraints
  }
});
const userRoutes = require("./routes/User.routes");
const donationRoutes = require("./routes/Donation.routes.js");
// Configure body-parser middleware for parsing URL-encoded bodies
// Enable CORS for all requests
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from 'node_modules' folder
app.use("/node_modules", express.static("node_modules"));

// Session middleware setup
app.use(
  session({
    secret: "no-fapp", // Secret key for session encryption
    resave: false, // Do not save the session if unmodified
    saveUninitialized: false, // Do not save new sessions that have not been modified
    cookie: {
      secure: false, // Cookie is not secure (not using HTTPS)
      maxAge: 30 * 60 * 1000, // Session expires after 30 minutes of inactivity
    },
  })
);
app.use("/api/users", userRoutes);
app.use("/api/donations", donationRoutes);
// Start Server on Port 3000
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

