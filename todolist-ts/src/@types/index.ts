export interface ITask {
  id: string;
  text: string;
  completed: boolean;
}

export interface ITasks {
  [key: string]: ITask;
}
