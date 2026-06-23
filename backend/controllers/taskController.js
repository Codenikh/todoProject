import { ObjectId } from "mongodb";
import { connectToDatabase } from "../config/db.js";

/* ================= ADD TASK ================= done*/

export const addTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    if (!title || !description || !dueDate) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const db = await connectToDatabase();
    const collection = db.collection(process.env.COLLECTION_NAME);
    const result = await collection.insertOne({
      title,
      description,
      dueDate: new Date(dueDate),
      createdAt: new Date(),
      updatedAt: new Date(),
      // Logged in user
      userId: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Task Added",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/* ================= GET TASKS ================= done */

export const getTasks = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection(process.env.COLLECTION_NAME);
    const tasks = await collection
      .find({
        userId: req.user.id,
      })
      .toArray();

    return res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/* ================= GET SINGLE TASK ================= done */

export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Id",
      });
    }
    const db = await connectToDatabase();
    const collection = db.collection(process.env.COLLECTION_NAME);
    const task = await collection.findOne({
      _id: new ObjectId(id),
      userId: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/* ================= UPDATE ================= Done */

export const updateTask = async (req, res) => {
  try {
    const { _id, title, description, dueDate } = req.body;
    console.log(_id);

    if (!ObjectId.isValid(_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Id",
      });
    }

    const db = await connectToDatabase();
    const collection = db.collection(process.env.COLLECTION_NAME);
    const result = await collection.updateOne(
      {
        _id: new ObjectId(_id),
        userId: req.user.id,
      },
      {
        $set: {
          title,
          description,
          dueDate: new Date(dueDate),
          updatedAt: new Date(),
        },
      },
    );

    if (!result.modifiedCount) {
      return res.status(404).json({
        success: false,
        message: "Task Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/* ================= DELETE ================= */
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Id",
      });
    }

    const db = await connectToDatabase();
    const collection = db.collection(process.env.COLLECTION_NAME);
    const result = await collection.deleteOne({
      _id: new ObjectId(id),
      userId: req.user.id,
    });

    if (!result.deletedCount) {
      return res.status(404).json({
        success: false,
        message: "Task Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task Deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
