<script setup lang="ts">
import { reactive, toRefs } from "vue";

import { useTaskStore } from "@/stores";

const state = reactive<{
  newTaskTitle: string;
}>({
  newTaskTitle: "",
});

const { newTaskTitle } = toRefs(state);

const taskStore = useTaskStore();

const handleAddTask = () => {
  if (newTaskTitle.value === "") {
    return;
  }
  taskStore.addTask(newTaskTitle);
  newTaskTitle.value = "";
};
</script>

<template>
  <v-text-field
    class="pa-3"
    color="pink-accent-1"
    density="compact"
    label="Add Task"
    append-inner-icon="mdi-plus"
    placeholder="Please enter a new task."
    variant="outlined"
    hide-details
    clearable
    v-model:model-value="newTaskTitle"
    @click:append-inner="handleAddTask"
    @keyup.enter="handleAddTask"
  >
    <!-- <template v-slot:append-inner="{ isFocused }">
        <v-icon
          icon="mdi-plus"
          color="pink-accent-1"
          @click="handleAddTask"
        ></v-icon>
      </template> -->
  </v-text-field>
</template>

<style lang="scss" scoped></style>
