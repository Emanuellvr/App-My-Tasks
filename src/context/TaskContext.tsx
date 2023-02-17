import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  FunctionComponent,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

interface IProps {
  children: ReactElement;
}

export interface ITask {
  id: string;
  title: string;
}

export interface ITasksContext {
  tasks: ITask[];
  addTask(task: ITask): void;
  removeTask(id: string): void;
}

const tasksData = "@MyTasks:Tasks";

export const TasksContext = createContext<ITasksContext>({} as ITasksContext);

export const TasksProvider: FunctionComponent<IProps> = ({ children }) => {
  const [data, setData] = useState<ITask[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      const taskList = await AsyncStorage.getItem(tasksData);

      if (taskList) {
        setData(JSON.parse(taskList));
      }
    };

    loadTasks();
  }, []);

  const addTask = async (task: ITask) => {
    try {
      const newTaskList = [...data, task];
      setData(newTaskList);
      await AsyncStorage.setItem(tasksData, JSON.stringify(newTaskList));
    } catch (e) {
      throw new Error(e as string);
    }
  };

  const removeTask = async (id: string) => {
    try {
      const newTaskList = data.filter((task) => task.id !== id);
      setData(newTaskList);
      await AsyncStorage.setItem(tasksData, JSON.stringify(newTaskList));
    } catch (e) {
      throw new Error(e as string);
    }
  };

  return (
    <TasksContext.Provider value={{ tasks: data, addTask, removeTask }}>
      {children}
    </TasksContext.Provider>
  );
};

export function useTaskList(): ITasksContext {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error("useTaskList deve ser usado em um TaskProvider");
  }

  return context;
}
