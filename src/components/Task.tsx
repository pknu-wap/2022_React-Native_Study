import styled from '@emotion/native';
import React, { useState } from 'react';
import Input from './Input';

interface Props {
  item: any;
  deleteTask: any;
  toggleTask: any;
  updateTask: any;
}

const Task = ({ item, deleteTask, toggleTask, updateTask }: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [text, setText] = useState(item.text);
  const _handleUpdateButtonPress = () => {};
  const _onSubmitEditing = () => {};
  const _onBlur = () => {};

  return isEditing ? (
    <Input value={text} onChangeText={} onSubmitEditing={} onBlur={_onBlur} />
  ) : (
    <Container>Task</Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.itemBackground};
  border-radius: 10px;
  padding: 5px;
  margin: 3px 0;
`;

const Contents = styled.Text<{ completed: boolean }>`
  flex: 1;
  font-size: 24px;
  color: ${({ theme, completed }) => (completed ? theme.done : theme.text)};
  text-decoration-line: ${({ completed }) =>
    completed ? 'Line-through' : 'none'};
`;

export default Task;
