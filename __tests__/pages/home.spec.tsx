import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { renderHook, act } from "@testing-library/react-hooks";

import { TasksProvider, useTaskList } from "../../src/context/TaskContext";
import { Home } from "../../src/pages/Home";

describe("Home Page", () => {
  it("Renders correctly", () => {
    const { getByPlaceholderText } = render(<Home />);

    const inpuTNewTask = getByPlaceholderText("Nova Tarefa...");

    expect(inpuTNewTask).toBeDefined();

    expect(inpuTNewTask.props.placeholder).toBeTruthy();
  });

  it("Verifica a inserção de um item na lista tarefas", async () => {
    const { result } = renderHook(() => useTaskList(), {
      wrapper: TasksProvider,
    });

    const data = { id: "Task01", title: "Task01" };

    await act(() => result.current.addTask(data));

    expect(result.current.tasks).toBeTruthy();
  });

  it("Verificar se o clique no botão insere um item na lista", async () => {
    const { getByPlaceholderText, getByTestId } = render(<Home />, {
      wrapper: TasksProvider,
    });

    const { result } = renderHook(() => useTaskList(), {
      wrapper: TasksProvider,
    });

    const inpuTNewTask = getByPlaceholderText("Nova Tarefa...");

    const button = getByTestId("addButton");

    const data = { id: "Taks01", title: "Task01" };

    act(() => fireEvent.changeText(inpuTNewTask, data.title));

    await act(async () => {
      await fireEvent.press(button);
    });

    expect(result.current.tasks).toBeTruthy();
  });
});
