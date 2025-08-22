import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task || !dueDate) return;
    onAdd({ task, dueDate });
    setTask("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2 my-4">
      <input
        type="text"
        placeholder="Enter task"
        className="p-2 border rounded flex-1"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <input
        type="date"
        className="p-2 border rounded"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Task
      </button>
    </form>
  );
}
