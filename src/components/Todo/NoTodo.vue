<script setup lang="ts"></script>

<template>
  <div class="no-todo">
    <v-icon size="100" color="pink-lighten-2"> mdi-check </v-icon>
    <div class="text-h5 text-pink-lighten-2">No Tasks</div>
  </div>
</template>

<style lang="scss" scoped>
.no-todo {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.5;
}
</style>
