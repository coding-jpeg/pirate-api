const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000; // Use dynamic port for deployment

// ✅ Middleware
app.use(cors()); // Moved before routes
app.use(express.json()); // Parses JSON requests

// ✅ Sample data: List of pirates
let pirates = [
  { id: 1, name: "Luffy", bounty: 3000000000 },
  { id: 2, name: "Zoro", bounty: 1500000000 },
  { id: 3, name: "Sanji", bounty: 1000000000 },
];

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the Pirate API! 🏴‍☠️");
});

// ✅ GET: Fetch all pirates
app.get("/pirates", (req, res) => {
  res.json(pirates);
});

// ✅ GET: Fetch a pirate by ID
app.get("/pirates/:id", (req, res) => {
  const pirateId = parseInt(req.params.id);
  const pirate = pirates.find((p) => p.id === pirateId);

  if (pirate) {
    res.json(pirate);
  } else {
    res.status(404).json({ message: "Pirate not found!" });
  }
});

// ✅ POST: Add a new pirate
app.post("/pirates", (req, res) => {
  const newPirate = req.body;
  pirates.push(newPirate);
  res.json({ message: "Pirate added!", newPirate });
});

// ✅ DELETE: Remove a pirate by ID
app.delete("/pirates/:id", (req, res) => {
  const pirateId = parseInt(req.params.id);
  const index = pirates.findIndex((p) => p.id === pirateId);

  if (index !== -1) {
    pirates.splice(index, 1);
    res.json({ message: "Pirate removed!" });
  } else {
    res.status(404).json({ message: "Pirate not found!" });
  }
});

// ✅ Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
