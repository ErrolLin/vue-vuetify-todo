<script setup lang="ts">
import TodoField from "@/components/Todo/TodoField.vue";
import TodoList from "@/components/Todo/TodoList.vue";
import NoTodo from "@/components/Todo/NoTodo.vue";

import { storeToRefs } from "pinia";

import { useTaskStore } from "@/stores";

const taskStore = useTaskStore();
const { tasks } = storeToRefs(taskStore);
</script>

<template>
  <div class="todo">
    <TodoField />
    <TodoList v-if="tasks.length" />
    <NoTodo v-else />
  </div>
</template>

<style lang="scss" scoped></style>
