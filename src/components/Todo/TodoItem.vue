<script setup lang="ts">
import { computed } from "vue";
import { useTaskStore } from "@/stores";
import type { Task } from "@/types";

const props = defineProps<{ task: Task }>();

const task = computed<Task>(() => {
  return props.task;
});

const taskStore = useTaskStore();

const handleDoneTask = (id: number) => {
  taskStore.doneTask(id);
};

const handleDeleteTask = (id: number) => {
  taskStore.deleteTask(id);
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
          <v-checkbox-btn :model-value="task.done"></v-checkbox-btn>
        </v-list-item-action>
      </template>

      <v-list-item-title
        :class="{ 'text-decoration-line-through': task.done }"
        >{{ task.title }}</v-list-item-title
      >

      <template v-slot:append>
        <v-btn
          @click.stop="handleDeleteTask(task.id)"
          color="pink-accent-2"
          icon="mdi-delete"
          variant="text"
        ></v-btn>
      </template>
    </v-list-item>
    <v-divider></v-divider>
  </div>
</template>

<style lang="scss" scoped></style>
