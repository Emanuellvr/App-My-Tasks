import React from "react";
import { render } from "@testing-library/react-native";
import { renderHook, act } from "@testing-library/react-hooks";
import { TasksProvider, useTaskList } from "../../src/context/TaskContext";
import { Tasklist } from "../../src/components/Tasklist";

describe("TaskList component", () => {
  it("verifica se um item é removido da lista de tarefas", async () => {
    render(<Tasklist />, {
      wrapper: TasksProvider,
    });

    const { result } = renderHook(() => useTaskList(), {
      wrapper: TasksProvider,
    });

    const data = { id: "Task01", title: "Title01" };

    await act(() => result.current.addTask(data));

    await expect(result.current.tasks[0].title).toEqual(data.title);

    await act(() => result.current.removeTask(data.id));
    expect(result.current.tasks.length).toEqual(0);
  });
});
