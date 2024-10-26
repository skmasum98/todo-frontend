// src/components/tasks/TaskList.js
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { TextField, Button, List, ListItem, ListItemText, IconButton, Typography, Box, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const TaskList = ({ token }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState('');

  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get('https://todo-app-o2jp.onrender.com/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [token]);

  const handleAddTask = async () => {
    if (!newTask) return;
    try {
      await axios.post(
        'https://todo-app-o2jp.onrender.com/tasks',
        { title: newTask },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewTask('');
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`https://todo-app-o2jp.onrender.com/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditTask = async (id) => {
    try {
      await axios.patch(
        `https://todo-app-o2jp.onrender.com/tasks/${id}`,
        { title: editingTaskTitle },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingTaskId(null);
      setEditingTaskTitle('');
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCompleteTask = async (id, completed) => {
    try {
      await axios.patch(
        `https://todo-app-o2jp.onrender.com/tasks/${id}`,
        { completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h4">Tasks</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <TextField
          fullWidth
          label="New task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddTask} sx={{ ml: 2 }}>
          Add Task
        </Button>
      </Box>
      <List sx={{ mt: 2 }}>
        {tasks.map((task) => (
          <ListItem key={task._id} secondaryAction={
            <>
              <Checkbox
                checked={task.completed}
                onChange={() => handleCompleteTask(task._id, !task.completed)}
              />
              {editingTaskId === task._id ? (
                <IconButton edge="end" aria-label="save" onClick={() => handleEditTask(task._id)}>
                  <SaveIcon />
                </IconButton>
              ) : (
                <IconButton edge="end" aria-label="edit" onClick={() => { setEditingTaskId(task._id); setEditingTaskTitle(task.title); }}>
                  <EditIcon />
                </IconButton>
              )}
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task._id)}>
                <DeleteIcon />
              </IconButton>
            </>
          }>
            {editingTaskId === task._id ? (
              <TextField
                fullWidth
                value={editingTaskTitle}
                onChange={(e) => setEditingTaskTitle(e.target.value)}
              />
            ) : (
              <ListItemText primary={task.title} />
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TaskList;
