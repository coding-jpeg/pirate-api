const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON data
app.use(express.json());

// Sample data: List of pirates
let pirates = [
  { id: 1, name: "Luffy", bounty: 3000000000 },
  { id: 2, name: "Zoro", bounty: 1500000000 },
  { id: 3, name: "sanji", bounty: 1000000000 },
];

// GET: Fetch all pirates
app.get("/pirates", (req, res) => {
  res.json(pirates);
});

// POST: Add a new pirate
app.post("/pirates", (req, res) => {
  const newPirate = req.body;
  pirates.push(newPirate);
  res.json({ message: "Pirate added!", newPirate });
});
// GET: Fetch a pirate by ID
app.get("/pirates/:id", (req, res) => {
  const pirateId = parseInt(req.params.id); // Convert id to a number
  const pirate = pirates.find((p) => p.id === pirateId);

  if (pirate) {
    res.json(pirate);
  } else {
    res.status(404).json({ message: "Pirate not found!" });
  }
});
// DELETE: Remove a pirate by ID
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
const cors = require("cors");
app.use(cors());



// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
