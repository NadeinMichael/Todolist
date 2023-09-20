import { TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';

export type EditableSpanPropsType = {
  title: string;
  onChange: (newValue: string) => void;
};

export function EditableSpan({ title, onChange }: EditableSpanPropsType) {
  const [editMode, setEditMode] = useState(false);
  const [titleValue, setTitleValue] = useState('');

  const activateEditMode = () => {
    setEditMode(true);
    setTitleValue(title);
  };
  const activateViewMode = () => {
    setEditMode(false);
    onChange(titleValue);
  };

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setTitleValue(e.currentTarget.value);

  return editMode ? (
    <TextField
      variant={'standard'}
      value={titleValue}
      onChange={onChangeTitleHandler}
      onBlur={activateViewMode}
      autoFocus
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{title}</span>
  );
}
