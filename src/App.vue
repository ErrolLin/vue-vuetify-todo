<script setup lang="ts">
import { SnackBar, DialogBox } from "@/components/common";

import { reactive, toRefs } from "vue";
import { RouterView } from "vue-router";

import MountainImg from "@/assets/images/mountain.jpg";

const state = reactive({
  drawer: false,
  items: [
    { title: "Todo", value: "todo", icon: "mdi-format-list-checks", url: "/" },
    { title: "About", value: "about", icon: "mdi-help-box", url: "/about" },
  ],
  barIcons: [
    { id: 1, icon: "mdi-magnify" },
    { id: 2, icon: "mdi-heart" },
    { id: 3, icon: "mdi-dots-vertical" },
  ],
});

const { drawer, items, barIcons } = toRefs(state);
</script>

<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <template v-slot:prepend>
        <v-list-item
          lines="two"
          title="Vuetify Todo"
          subtitle="Errol Lin's Todo List"
        ></v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :prepend-icon="item.icon"
          :title="item.title"
          :value="item.value"
          :to="item.url"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" density="prominent" :image="MountainImg">
      <template v-slot:image>
        <v-img
          gradient="to top right, rgba(197,17,98,.5), rgba(128,20,199,.5)"
        ></v-img>
      </template>

      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </template>

      <template v-slot:title>
        <v-toolbar-title>Vuetify Todo</v-toolbar-title>
      </template>

      <template v-slot:append>
        <v-btn icon v-for="item in barIcons" :key="item.id">
          <v-icon>{{ item.icon }}</v-icon>
        </v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <RouterView />
      <SnackBar />
      <DialogBox />
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped></style>
