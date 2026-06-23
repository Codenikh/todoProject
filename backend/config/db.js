import dotenv from "dotenv";
dotenv.config();
import  MongoClient  from "mongodb";

const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

const client = new MongoClient(uri);

let db = null;

export async function connectToDatabase() {
  try {
    if (db) {
      return db;
    }

    await client.connect();

    console.log("Connected to MongoDB");

    db = client.db(dbName);

    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);

    throw error;
  }
}
