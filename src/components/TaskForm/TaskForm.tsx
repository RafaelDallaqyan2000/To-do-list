import React, { useState } from 'react';

interface Task {
    id: number;
    title: string;
    description: string;
    createdAt: string;
}

interface TaskFormProps {
    onSave: (task: Task) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onSave }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [createdAt, setCreatedAt] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const newTask: Task = {
            id: Date.now(),
            title,
            description,
            createdAt,
        };
        onSave(newTask);
        setTitle('');
        setDescription('');
        setCreatedAt('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="border p-2 mr-2"
                required
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="border p-2 mr-2"
                required
            />
            <input
                type="date"
                value={createdAt}
                onChange={(e) => setCreatedAt(e.target.value)}
                className="border p-2 mr-2"
                required
            />
            <button type="submit" className="p-2 bg-blue-500 text-white">Add Task</button>
        </form>
    );
};
