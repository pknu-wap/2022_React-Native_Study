import React, { useEffect, useState } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import styled from '@emotion/native';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import Input from './components/Input';
import Task from './components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ITask, ITasks } from './@types';

const App = () => {
  useEffect(() => {
    async function go() {
      await _loadTasks();
      setTimeout(() => {
        setIsReady(true);
      }, 2000);
    }
    go();
    return () => {};
  }, []);

  const width = Dimensions.get('window').width;

  const [newTask, setNewTask] = useState<string>('');
  const [isReady, setIsReady] = useState<boolean>(false);
  const [tasks, setTasks] = useState<ITasks>({});

  const _addTask = () => {
    const ID = Date.now().toString();
    const newTaskObject = {
      [ID]: { id: ID, text: newTask, completed: false },
    };
    setNewTask('');
    _saveTasks({ ...tasks, ...newTaskObject });
  };

  const _handleTextChange = (text: string) => {
    setNewTask(text);
  };

  const _saveTasks = async (tasks: ITasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      setTasks(tasks);
    } catch (e) {
      console.error(e);
    }
  };

  const _loadTasks = async () => {
    const loadTasks = await AsyncStorage.getItem('tasks');
    setTasks(JSON.parse(loadTasks || '{}'));
  };

  const _deleteTask = (id: string) => {
    const currentTasks = Object.assign({}, tasks);
    delete currentTasks[id];
    _saveTasks(currentTasks);
  };

  const _toggleTask = (id: string) => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[id].completed = !currentTasks[id].completed;
    _saveTasks(currentTasks);
  };

  const _updateTask = (item: ITask) => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[item.id] = item;
    _saveTasks(currentTasks);
  };

  const _onBlur = () => {
    setNewTask('');
  };

  return isReady ? (
    <ThemeProvider theme={theme}>
      <Container>
        <StatusBar
          // android의 상태바 색 해결
          barStyle="light-content"
          backgroundColor={theme.background}
        />
        <Title>TODO List</Title>
        <Input
          placeholder="+ Add a Task"
          value={newTask}
          onChangeText={_handleTextChange}
          onSubmitEditing={_addTask}
          onBlur={_onBlur}
        />
        <List width={width}>
          {Object.values(tasks)
            .reverse()
            .map(item => (
              <Task
                key={item.id}
                item={item}
                deleteTask={_deleteTask}
                toggleTask={_toggleTask}
                updateTask={_updateTask}
              />
            ))}
        </List>
      </Container>
    </ThemeProvider>
  ) : (
    <Container>
      <Title>로딩중</Title>
    </Container>
  );
};

// styled.View의 ios 노치 디자인 해결
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: ${({ theme }) => theme.main};
  align-self: flex-start;
  margin: 0px 20px;
`;

const List = styled.ScrollView<{ width: number }>`
  flex: 1;
  width: ${({ width }) => width - 40}px;
`;

export default App;
