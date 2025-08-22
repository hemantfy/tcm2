export default function TaskList({ tasks }) {
    return (
      <div className="bg-white shadow rounded p-4 mt-4">
        <h2 className="text-lg font-semibold mb-2">📝 Task List</h2>
        <ul className="space-y-2">
          {tasks.length === 0 ? (
            <li className="text-gray-500">No tasks added yet.</li>
          ) : (
            tasks.map((task, index) => (
              <li
                key={index}
                className="flex justify-between border-b pb-2 text-gray-800"
              >
                <span>{task.task}</span>
                <span className="text-sm text-gray-500">{task.dueDate}</span>
              </li>
            ))
          )}
        </ul>
      </div>
    );
  }
  