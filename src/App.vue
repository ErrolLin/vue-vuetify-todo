<script setup lang="ts">
import { reactive, toRefs } from "vue";
import { RouterView } from "vue-router";

const state = reactive({
  drawer: false,
  items: [
    { title: "Todo", value: "todo", icon: "mdi-format-list-checks", url: "/" },
    { title: "About", value: "about", icon: "mdi-help-box", url: "/about" },
  ],
});

const { drawer, items } = toRefs(state);
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

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped></style>
