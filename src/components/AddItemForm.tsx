import { ChangeEvent, useState, KeyboardEvent } from 'react';

export type AddItemsPropsType = {
  addItem: (title: string) => void;
};

export function AddItemForm({ addItem }: AddItemsPropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setNewTaskTitle(e.currentTarget.value);

  const addNewItem = () => {
    if (newTaskTitle.trim().length) {
      addItem(newTaskTitle.trim());
      setNewTaskTitle('');
    } else {
      setError('Title is required');
    }
  };

  const OnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === 'Enter') {
      addNewItem();
      setNewTaskTitle('');
    }
  };

  return (
    <div>
      <input
        className={error ? 'error' : ''}
        value={newTaskTitle}
        onChange={onChangeHandler}
        onKeyDown={OnKeyPressHandler}
      />
      <button onClick={addNewItem}>+</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
