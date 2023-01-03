<script setup lang="ts">
import { reactive, toRefs } from "vue";

const state = reactive<{
  newTaskTitle: string;
  tasks: Array<{ id: number; title: string; done: boolean }>;
}>({
  newTaskTitle: "",
  tasks: [
    // { id: 1, title: "Wake Up", done: false },
    // { id: 2, title: "Get Bananas", done: false },
    // { id: 3, title: "Eat Bananas", done: false },
  ],
});

const { newTaskTitle, tasks } = toRefs(state);

const handleDoneTask = (id: number) => {
  console.log("id: ", id);

  let task = tasks.value.filter((task) => {
    return task.id === id;
  })[0];
  task.done = !task.done;
};

const handleDeleteTask = (id: number) => {
  tasks.value = tasks.value.filter((task) => {
    return task.id !== id;
  });
};

const handleAddTask = () => {
  if (newTaskTitle.value === "") {
    return;
  }
  let newTask = {
    id: Date.now(),
    title: newTaskTitle.value,
    done: false,
  };
  tasks.value.push(newTask);
};
</script>

<template>
  <div class="todo">
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

    <v-list
      v-if="tasks.length"
      class="pt-0"
      density="default"
      lines="one"
      select-strategy="leaf"
    >
      <div class="todo-list" v-for="task in tasks" :key="task.id">
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
    </v-list>
    <div v-else class="todo-no-tasks">
      <v-icon size="100" color="pink-lighten-2"> mdi-check </v-icon>
      <div class="text-h5 text-pink-lighten-2">No Tasks</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.todo {
  &-no-tasks {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.5;
  }
}
</style>
