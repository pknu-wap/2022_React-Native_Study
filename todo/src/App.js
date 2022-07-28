import React,  {useState, useEffect} from 'react';
import { StatusBar, Dimensions, Text } from 'react-native';
import styled, {ThemeProvider} from 'styled-components/native';
import Input from './components/Input';
import {theme} from './theme';
import Task from './components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.background};
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: ${({theme}) => theme.main};
  align-self: flex-start;
  margin: 0px 20px;
`;

const List = styled.ScrollView`
  flex:1;
  width: ${({ width }) => width -40}px;
`;

export default function App() {
  const width = Dimensions.get('window').width;

  const [isReady, setIsReady] = useState(false)
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState({});

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

  const _saveTasks = async tasks => {
    try{
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      setTasks(tasks);
    } catch(e) {
      console.error(e);
    }
  };

  const _loadTasks = async() =>{
    const loadedTasks = await AsyncStorage.getItem('tasks');
    setTasks(JSON.parse(loadedTasks || '{}'));
  };

  const _addTask = () => {
    const ID =Date.now().toString();
    const newTaskObject = {
      [ID]: {id: ID, text: newTask, completed: false },
    };
    setNewTask('');
    _saveTasks({...tasks, ...newTaskObject });
  };

  const _deleteTask = id => {
    const currentTasks = Object.assign({}, tasks);
    delete currentTasks[id];
    _saveTasks(currentTasks);
    
  };

  const _toggleTask = id => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[id]['completed'] = !currentTasks[id]['completed'];
    _saveTasks(currentTasks);
  };
  
  const _updateTask = item => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[item.id] = item;
    _saveTasks(currentTasks);
  };

  const _handleTextChange = text => {
    setNewTask(text);
  };

  const _onBlur = () => {
    setNewTask('');
  }

  return (
    isReady ? (
    <ThemeProvider theme={theme}>
      <Container>
        <StatusBar
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
            <Task key={item.id} 
                  item={item} 
                  deleteTask={_deleteTask}
                  toggleTask={_toggleTask}
                  updateTask={_updateTask} 
                  onBlur={_onBlur}
                />
          ))}
        </List>
      </Container>
    </ThemeProvider>)
    : <Container><Text>loading...</Text></Container>
  );
}