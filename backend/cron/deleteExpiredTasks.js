import cron from "node-cron";
import { connectToDatabase } from "../config/db.js";

const deleteExpiredTasks = () => {
  console.log("Cron Started.....");

  cron.schedule("* * * * *", async () => {
    console.log("Cron running....", new Date());

    try {
      const db = await connectToDatabase();

      const collection = db.collection(process.env.COLLECTION_NAME);

      const result = await collection.deleteMany({
        dueDate: {
          $lte: new Date(),
        },
      });

      if (result.deletedCount > 0) {
        console.log(`🗑️ ${result.deletedCount} expired task(s) deleted.`);
      } else {
        console.log("No expired tasks found.");
      }
    } catch (error) {
      console.log("Cron Error :", error);
    }
  });
};

export default deleteExpiredTasks;
