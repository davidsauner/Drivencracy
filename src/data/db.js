import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);

try {
  await mongoClient.connect();
  console.log("Mongo connected");
} catch (err) {
  console.log(err);
}

const db = mongoClient.db("drivencracy");

export const pollColection = db.collection("poll");
export const choiceColection = db.collection("choice");
export const voteColection = db.collection("vote");


