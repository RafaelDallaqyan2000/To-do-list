import React, { useEffect, useState } from 'react';
import {deleteListItem, editListItem, getAllTasks} from '../../api';
import {TaskItem} from '../TaskItem/TaskItem';
import {TaskForm} from '../TaskForm/TaskForm';

interface Task {
    id: number;
    title: string;
    description: string;
    createdAt: string;
}

export const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getAllTasks()
            .then((data => {
                setTasks(data);
            }))
            .catch(err => {
                setError('Ошибка при загрузке задач.');
            })
    }, []);

    const addTask = (task: Task) => {
        setTasks([...tasks, task]);
    };

    const editTask = (updatedTask: Task) => {
        setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
        console.log(updatedTask)
        editListItem(updatedTask);
    };

    const deleteTask = (taskId: number) => {
        setTasks(tasks.filter(task => task.id !== taskId));
        deleteListItem(taskId);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
            {error && <p className="text-red-500">{error}</p>}
            <TaskForm onSave={addTask} />
            <ul>
                {tasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onEdit={editTask}
                        onDelete={() => deleteTask(task.id)}
                    />
                ))}
            </ul>
        </div>
    );
};
