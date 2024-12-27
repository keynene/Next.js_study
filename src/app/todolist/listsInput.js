"use client"

import { useEffect, useState } from "react";


export default function ListsInput(){
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  return (
    <>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task"
        data-testid="task-input"
      />
      <button onClick={addTask} data-testid="add-button">Add</button>
    </>
  )
}