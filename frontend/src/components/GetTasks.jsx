import { useEffect, useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/GetTasks.css";
import { API_URL, getAuthHeaders, formatDateTimeLocal } from "../helper/api";

export default function GetTasks() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks();

    const interval = setInterval(() => {
      getTasks();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/task/tasks`, {
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (response.ok) {
        setTasks(data.data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/task/delete-task/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (response.ok) {
        console.log("Task-Deleted");
        getTasks();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="get-tasks-container">
      <h1>To Do List</h1>

      <ul className="tasks-list">
        <li className="List-header">
          <strong>S.No</strong>
        </li>
        <li className="List-header">
          <strong>Title</strong>
        </li>
        <li className="List-header">
          <strong>Description</strong>
        </li>
        <li className="List-header">
          <strong>Action</strong>
        </li>
        <li className="List-header">
          <strong>Due-Date</strong>
        </li>

        {tasks.map((task, index) => (
          <Fragment key={task._id}>
            <li className="list-item">{index + 1}</li>
            <li className="list-item">{task.title}</li>
            <li className="list-item">{task.description}</li>

            <li className="list-item btn">
              <button
                className="delete-button"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>

              <button className="update-button">
                <Link to={`/update-task/${task._id}`}>Update</Link>
              </button>
            </li>
            <li className="list-item">{formatDateTimeLocal(task.dueDate)}</li>
          </Fragment>
        ))}
      </ul>
    </div>
  );
}
