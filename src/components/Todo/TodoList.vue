<script setup lang="ts">
import TodoItem from "@/components/Todo/TodoItem.vue";

import { storeToRefs } from "pinia";

import { useTaskStore } from "@/stores";

const taskStore = useTaskStore();
const { tasks } = storeToRefs(taskStore);
</script>

<template>
  <v-list class="pt-0" density="default" lines="one" select-strategy="leaf">
    <TodoItem v-for="task in tasks" :key="task.id" :task="task" />
    <v-divider></v-divider>
  </v-list>
</template>

<style lang="scss" scoped></style>
