<script setup lang="ts">
import { reactive, toRefs } from "vue";

const state = reactive({ drawer: false });

const { drawer } = toRefs(state);
</script>

<template>
  <v-app>
    <v-navigation-drawer v-model="drawer">
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <!--  -->
    </v-main>
  </v-app>
</template>

<style lang="scss"></style>
