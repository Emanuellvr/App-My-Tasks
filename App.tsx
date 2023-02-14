import { TasksContext, TasksProvider } from "./src/context/TaskContext";
import { Home } from "./src/pages/Home";

const App = () => {
  return (
    <TasksProvider>
      <Home />
    </TasksProvider>
  );
};
export default App;
