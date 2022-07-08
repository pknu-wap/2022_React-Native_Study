import React from 'react';
import styled from '@emotion/native';
import { Dimensions } from 'react-native';

interface Props {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onSubmitEditing: () => void;
  onBlur: () => void;
}
const Input = ({
  placeholder,
  value,
  onChangeText,
  onSubmitEditing,
  onBlur,
}: Props) => {
  // 현재 화면 너비
  const width = Dimensions.get('window').width;

  return (
    <StyledInput
      width={width}
      placeholder={placeholder}
      maxLength={50}
      autoCapitalize="none" // 자동 대문자 전환
      autoCorrect={false} // 자동 수정 기능
      returnKeyType="done" // ios 키보드 완료 버튼
      keyboardAppearance="dark" // ios 키보드 배경색
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      onBlur={onBlur}
    />
  );
};

const StyledInput = styled.TextInput<{ width: number }>`
  width: ${({ width }) => width - 40}px;
  height: 60px;
  margin: 3px 0;
  padding: 15px 20px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.itemBackground};
  font-size: 25px;
  color: ${({ theme }) => theme.text};
`;

export default Input;
