import { ChangeEvent } from 'react';
import { EditableSpan } from './EditableSpan';
import { Checkbox, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

type ItemType = {
  id: string;
  title: string;
  isDone: boolean;
  removeTask: Function;
  changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void;
  key: string;
  todoListId: string;
  changeTaskTitle: (id: string, newTitle: string, todoListId: string) => void;
};

export function TodoItem({
  isDone,
  id,
  title,
  removeTask,
  changeStatus,
  todoListId,
  changeTaskTitle,
}: ItemType) {
  const onRemoveTaskHandler = () => removeTask(id, todoListId);
  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    changeStatus(id, e.currentTarget.checked, todoListId);
  };
  const onChangeTitleHandler = (newValue: string) => {
    changeTaskTitle(id, newValue, todoListId);
  };

  return (
    <div className={isDone ? 'is-done' : ''}>
      <Checkbox onChange={onChangeStatusHandler} checked={isDone} />
      <EditableSpan title={title} onChange={onChangeTitleHandler} />
      <IconButton
        aria-label='delete'
        onClick={onRemoveTaskHandler}
        size={'small'}
      >
        <Delete fontSize='inherit' />
      </IconButton>
    </div>
  );
}
