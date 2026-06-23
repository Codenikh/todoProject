import "../style/Addtask.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL, getAuthHeaders, formatDateTimeLocal } from "../helper/api";

export default function UpdateTask() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [task, setTask] = useState({
    _id: "",
    title: "",
    description: "",
    dueDate: "",
  });

  useEffect(() => {
    fetchById();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchById = async () => {
    try {
      const response = await fetch(`${API_URL}/task/task/${id}`, {
        headers: getAuthHeaders(),
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      const data = await response.json();

      if (response.ok) {
        setTask({
          ...data.data,
          dueDate: formatDateTimeLocal(data.data.dueDate),
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error retrieving task:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!task.title || !task.description || !task.dueDate) {
        alert("Please fill all fields");
        return;
      }

      const response = await fetch(`${API_URL}/task/update-task`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(task),
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
        navigate("/list");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="add-task-container">
      <h1>Update Task</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>

        <input
          type="text"
          id="title"
          name="title"
          value={task.title}
          placeholder="Task Title"
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description</label>

        <textarea
          id="description"
          name="description"
          rows="4"
          value={task.description}
          placeholder="Task Description"
          onChange={handleChange}
          required
        />

        <label htmlFor="dueDate">Due Date</label>

        <input
          type="datetime-local"
          id="dueDate"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          required
        />

        <button className="submit" type="submit">
          Update Task
        </button>
      </form>
    </div>
  );
}
