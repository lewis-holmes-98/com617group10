const { MongoClient } = require("mongodb");
require("dotenv").config();
const fs = require("fs").promises;
const path = require("path");
const loading = require("loading-cli");
const bcrypt = require('bcrypt');

// URIs defined in .env
const { MONGODB_URI, MONGODB__PRODUCTION_URI } = process.env;
const client = new MongoClient(
  process.env.NODE_ENV === "production" ? MONGODB__PRODUCTION_URI : MONGODB_URI
); 

// Seed database.
async function main() {
  try {
      await client.connect();
      const db = client.db();
      const results = await db.collection("historic").countDocuments();

      // If database already exists drop it
      if(results){
        db.dropDatabase();
      };
  
      const load = loading("Creating collections").start();

      // Seed database with json data
      const historicData = await fs.readFile(path.join(__dirname, "/data/resort_historical_data.json"), "utf8");
      const resortData = await fs.readFile(path.join(__dirname, "/data/resort.json"), "utf8");
      const userData = await fs.readFile(path.join(__dirname, "/data/user_data.json"), "utf8");
      
      // Insert json data to collections
      await db.collection("historics").insertMany(JSON.parse(historicData));
      await db.collection("resorts").insertMany(JSON.parse(resortData));
      await db.collection("users").insertMany(JSON.parse(userData));

      // Update user passwords to hashes
      const updateUsersRef = db.collection("users").find({});
      const updateUsers = await updateUsersRef.toArray();
      updateUsers.forEach(async ({_id,password}) => {

        const hash = await bcrypt.hash(password, 10);
        const hashedPass = " " + hash; // cannot use $ for the first value

        await db.collection("users").updateOne({_id: _id}, [
          { $set: {password: hashedPass},},]);
      });

      const addResortRef = db.collection("resorts").find({});
      const addResort = await addResortRef.toArray();

      // Update historics data with references to resort Id
      addResort.forEach(async ({_id, name}) => {
        await db.collection("historics").updateMany({resort: name}, [{ $set: { resort_id: _id},},]);
      });

      // Remove resort column from historic collection
      await db.collection("historics").updateMany({}, { $unset: { resort: ""} });

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