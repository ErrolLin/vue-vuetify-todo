<script setup lang="ts">
import TodoMenu from "@/components/Todo/TodoMenu.vue";

import { computed, reactive, toRefs } from "vue";

import { useTaskStore, useDialogStore, useSnackBarStore } from "@/stores";
import type { Menu, Task } from "@/types";

const props = defineProps<{ task: Task }>();

const task = computed<Task>(() => {
  return props.task;
});

const state = reactive<{
  menus: Array<Menu>;
}>({
  menus: [
    {
      title: "EDIT",
      icon: "mdi-pencil",
      event: () => {
        handleEditTask();
      },
    },
    {
      title: "DUE DATE",
      icon: "mdi-calendar",
      event: () => {},
    },
    {
      title: "DELETE",
      icon: "mdi-delete",
      event: () => {
        handleDeleteTask();
      },
    },
  ],
});

const { menus } = toRefs(state);

const taskStore = useTaskStore();
const dialogStore = useDialogStore();
const snackBarStore = useSnackBarStore();

const handleDoneTask = (id: number) => {
  taskStore.doneTask(id);
  dialogStore.hideDialog();
};

const handleDeleteTask = () => {
  dialogStore.showDialog({
    type: "ALERT",
    title: "WARNING",
    content: "Do you want to delete this task?",
    confirm: {
      text: "Yes",
      event: () => {
        handleConfirmDelete();
      },
    },
    cancel: "No",
  });
};

const handleConfirmDelete = () => {
  taskStore.deleteTask(task.value.id);
  snackBarStore.showSnackBar("Task Deleted!");
};

const handleEditTask = () => {
  dialogStore.showDialog({
    type: "PROMPT",
    title: "INFO",
    content: "Please edit the current todo content.",
    confirm: {
      text: "SAVE",
      event: (taskTitle: string) => {
        handleConfirmEdit(task.value.id, taskTitle);
      },
    },
    cancel: "CANCEL",
    data: task.value.title,
  });
};

const handleConfirmEdit = (taskId: number, taskTitle: string) => {
  if (taskTitle == "" || taskTitle == null) {
    snackBarStore.showSnackBar("Task title can't be empty!");
    return;
  }
  let task = taskStore.getTaskById(taskId);
  if (task.title == taskTitle) {
    snackBarStore.showSnackBar("Task title is the same as before!");
    return;
  }
  task.title = taskTitle;
  taskStore.updateTask(task);
  snackBarStore.showSnackBar("Task Updated!");
  dialogStore.hideDialog();
};
</script>

<template>
  <div class="todo-list-item">
    <v-list-item
      @click="handleDoneTask(task.id)"
      :value="task.title"
      :class="{ 'bg-pink-lighten-4': task.done }"
    >
      <template v-slot:prepend>
        <v-list-item-action start>
          <v-checkbox-btn
            color="pink-accent-2"
            :model-value="task.done"
          ></v-checkbox-btn>
        </v-list-item-action>
      </template>

      <v-list-item-title :class="{ 'text-decoration-line-through': task.done }">
        {{ task.title }}
      </v-list-item-title>

      <template v-slot:append>
        <TodoMenu :menus="menus" />
      </template>
    </v-list-item>
    <v-divider></v-divider>
  </div>
</template>

<style lang="scss" scoped></style>
