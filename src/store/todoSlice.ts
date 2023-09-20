import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
  },
  reducers: {
    adTodo(store, action) {},
    removeTodo(store, action) {},
    toggleTodoComplete(store, action) {},
  },
});
