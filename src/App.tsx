import './App.css';
import { TaskType, TodoList } from './components/TodoList';

let tasks1: Array<TaskType> = [
  { id: 1, title: 'CSS', isDone: true },
  { id: 2, title: 'JS', isDone: true },
  { id: 3, title: 'React', isDone: false },
];

let tasks2 = [
  { id: 1, title: 'Terminator', isDone: true },
  { id: 2, title: 'Game of Throns', isDone: true },
  { id: 3, title: 'Spider-men', isDone: false },
];

function App() {
  return (
    <div className="App">
      <TodoList title="What to learn" tasks={tasks1} />
      <TodoList title="Movies" tasks={tasks2} />
    </div>
  );
}

export default App;
