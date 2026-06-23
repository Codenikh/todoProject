import "../style/Addtask.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, getAuthHeaders } from "../helper/api";

export default function AddTask() {
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!task.title || !task.description) {
        alert("Please fill all fields");
        return;
      }

      const response = await fetch(`${API_URL}/task/add-task`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(task),
      });

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (response.ok) {
        console.log(data.message);
        navigate("/list");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-task-container">
      <h1>Add Task</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>

        <input
          type="text"
          id="title"
          name="title"
          placeholder="Task Title"
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description</label>

        <textarea
          id="description"
          name="description"
          rows="4"
          placeholder="Task Description"
          onChange={handleChange}
          required
        />

        <labe htmlFor="dueDate">dueDate</labe>
        <input
          type="datetime-local"
          name="dueDate"
          id="dueDate"
          placeholder="Select Due Date"
          onChange={handleChange}
        />

        <button className="submit" type="submit">
          Add Task
        </button>
      </form>
    </div>
  );
}
