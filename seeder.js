const { MongoClient } = require("mongodb");
require("dotenv").config();
const fs = require("fs").promises;
const path = require("path");
const loading = require("loading-cli");

/* URIs defined in .env */

const { MONGODB_URI, MONGODB__PRODUCTION_URI } = process.env;
const client = new MongoClient(
  process.env.NODE_ENV === "production" ? MONGODB__PRODUCTION_URI : MONGODB_URI
); 

async function main() {
  try {
      await client.connect();
      const db = client.db();
      const results = await db.collection("historic").find({}).count();
  
      const load = loading("Creating collections").start();

      /* Import json data */
      const data = await fs.readFile(path.join(__dirname, "/data/resort_historical_data.json"), "utf8");
      await db.collection("historic").insertMany(JSON.parse(data));

      load.stop();
      console.info(
        `Collections created, database ready...`
      );

      process.exit();
  } catch (error) {
      console.error("error:", error);
      process.exit();
  }
}

main();