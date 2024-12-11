const express = require("express");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const cors = require('cors')

dotenv.config();
const app = express();
const port = 3000;

app.use(bodyparser.json()); // Middleware to parse JSON request bodies
app.use(cors())

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "PassOP";

async function main() {
  // Connect to the MongoDB server
  await client.connect();
  console.log("Connected successfully to MongoDB");

  // GET: Fetch all passwords
  app.get("/", async (req, res) => {
    try {
      const password = req.body;
      const db = client.db(dbName);
      const collection = db.collection("passwords");

      // Fetch all documents from the collection
      const findResult = await collection.find({}).toArray();
      res.json(findResult);
    } catch (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Failed to fetch data" });
    }
  });

  // POST: Save a password
  app.post("/", async (req, res) => {
    try {
      const password = req.body;
      const db = client.db(dbName);
      const collection = db.collection("passwords");

      // Insert the data from the request body into the collection
      const findResult = await collection.insertOne(password);
      res.json({
        success: true,
        result: findResult,
      });
    } catch (err) {
      console.error("Error saving data:", err);
      res.status(500).json({ error: "Failed to save data" });
    }
  });

  // delete

  app.delete("/", async (req, res) => {
    try {
      const password = req.body;
      const db = client.db(dbName);
      const collection = db.collection("passwords");

      const findResult = await collection.deleteOne(password);
      res.json({
        success: true,
        result: findResult,
      });
    } catch (err) {
      console.error("Error saving data:", err);
      res.status(500).json({ error: "Failed to save data" });
    }
  });


  // Start the server
  app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
  });
}

// Run the main function
main().catch((err) => {
  console.error("Error starting server:", err);
});
