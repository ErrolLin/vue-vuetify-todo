import { reactive, toRefs } from "vue";
import { defineStore } from "pinia";

import type { Ref } from "vue";

import type { Task } from "@/types";

export const useTaskStore = defineStore("task", () => {
  const taskState = reactive<{ tasks: Array<Task> }>({
    tasks: [
      { id: 1, title: "Wake Up", done: false },
      { id: 2, title: "Get Bananas", done: false },
      { id: 3, title: "Eat Bananas", done: false },
    ],
  });

  const { tasks } = toRefs(taskState);

  function addTask(newTaskTitle: Ref<string>) {
    const newTask = {
      id: Date.now(),
      title: newTaskTitle.value,
      done: false,
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

  return {
    tasks,
    addTask,
    doneTask,
    deleteTask,
  };
});
