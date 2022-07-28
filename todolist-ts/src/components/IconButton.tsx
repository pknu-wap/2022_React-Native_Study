import { ImageSourcePropType, TouchableOpacity } from 'react-native';
import styled from '@emotion/native';
import React from 'react';

interface Props {
  type: ImageSourcePropType;
  onPressOut?: Function;
  id?: string;
  completed?: boolean;
}

const IconButton = ({
  type,
  onPressOut = () => {},
  id,
  completed = false,
}: Props) => {
  const _onPressOut = () => {
    onPressOut(id);
  };

  return (
    <TouchableOpacity onPressOut={_onPressOut}>
      <Icon source={type} completed={completed} />
    </TouchableOpacity>
  );
};

const Icon = styled.Image<{ completed: boolean }>`
  background-color: ${({ theme, completed }) =>
    completed ? theme.done : theme.text};
  width: 30px;
  height: 30px;
  margin: 10px;
`;

export default IconButton;
