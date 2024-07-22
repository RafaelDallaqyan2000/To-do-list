import React, { useState } from 'react';

interface Task {
    id: number;
    title: string;
    description: string;
    createdAt: string;
}

interface TaskItemProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: () => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task);

    const handleEdit = () => {
        onEdit(editedTask);
        setIsEditing(false);
    };

    return (
        <li className="flex justify-between items-center mb-2 p-2 border">
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={editedTask.title}
                        onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                        className="border p-1 mr-2"
                    />
                    <input
                        type="text"
                        value={editedTask.description}
                        onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                        className="border p-1 mr-2"
                    />
                    <input
                        type="date"
                        value={editedTask.createdAt}
                        onChange={(e) => setEditedTask({ ...editedTask, createdAt: e.target.value })}
                        className="border p-1 mr-2"
                    />
                    <button onClick={handleEdit} className="p-1 bg-blue-500 text-white mr-2">Save</button>
                    <button onClick={() => setIsEditing(false)} className="p-1 bg-gray-500 text-white">Cancel</button>
                </div>
            ) : (
                <div className="flex justify-between items-center w-full">
                    <div>
                        <h2 className="font-bold">{task.title}</h2>
                        <p>{task.description}</p>
                        <p className="text-gray-500 text-sm">{task.createdAt}</p>
                    </div>
                    <div>
                        <button onClick={() => setIsEditing(true)} className="mr-2">Edit</button>
                        <button onClick={onDelete}>Delete</button>
                    </div>
                </div>
            )}
        </li>
    );
};
