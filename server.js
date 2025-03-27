require("dotenv").config();
const express = require("express");
const cors = require("cors");
const client = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 🟢 Fetch all pirates
app.get("/pirates", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM pirates");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error fetching pirates" });
  }
});

// 🟢 Add a new pirate
app.post("/pirates", async (req, res) => {
  const { name, bounty } = req.body;
  try {
    const result = await client.query(
      "INSERT INTO pirates (name, bounty) VALUES ($1, $2) RETURNING *",
      [name, bounty]
    );
    res.json({ message: "Pirate added!", pirate: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: "Error adding pirate" });
  }
});

// 🟢 Delete a pirate
app.delete("/pirates/:id", async (req, res) => {
  const pirateId = req.params.id;
  try {
    await client.query("DELETE FROM pirates WHERE id = $1", [pirateId]);
    res.json({ message: "Pirate removed!" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting pirate" });
  }
});

// 🟢 Update a pirate
app.put("/pirates/:id", async (req, res) => {
  const pirateId = req.params.id;
  const { name, bounty } = req.body;
  try {
    const result = await client.query(
      "UPDATE pirates SET name = $1, bounty = $2 WHERE id = $3 RETURNING *",
      [name, bounty, pirateId]
    );
    res.json({ message: "Pirate updated!", pirate: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: "Error updating pirate" });
  }
});

// Root route
app.get("/", (req, res) => {
  res.send("🏴‍☠️ Welcome to Pirate API!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
