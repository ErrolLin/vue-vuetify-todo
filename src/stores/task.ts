import { reactive, toRefs } from "vue";
import { defineStore } from "pinia";

import type { Ref } from "vue";

import type { Task } from "@/types";

export const useTaskStore = defineStore("task", () => {
  const taskState = reactive<{ tasks: Array<Task> }>({
    tasks: [
      {
        id: 1,
        title: "Wake Up",
        done: false,
        deadline: "2023-01-14",
      },
      {
        id: 2,
        title: "Get Bananas",
        done: false,
        deadline: "2023-01-21",
      },
      {
        id: 3,
        title: "Eat Bananas",
        done: false,
        deadline: null,
      },
    ],
  });

  const { tasks } = toRefs(taskState);

  function addTask(newTaskTitle: Ref<string>) {
    const newTask = {
      id: Date.now(),
      title: newTaskTitle.value,
      done: false,
      deadline: null,
    };
    tasks.value.push(newTask);
  }

  function doneTask(id: number) {
    const task = tasks.value.filter((task) => {
      return task.id === id;
    })[0];
    task.done = !task.done;
  }

  function deleteTask(id: number) {
    tasks.value = tasks.value.filter((task) => {
      return task.id !== id;
    });
  }

  function updateTask(editTask: Task) {
    const task = tasks.value.filter((task) => {
      return task.id === editTask.id;
    })[0];
    task.title = editTask.title;
  }

  function getTaskById(id: number) {
    return tasks.value.filter((task) => {
      return task.id === id;
    })[0];
  }

  return {
    tasks,
    addTask,
    doneTask,
    deleteTask,
    updateTask,
    getTaskById,
  };
});
