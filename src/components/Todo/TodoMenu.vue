<script setup lang="ts">
import { computed } from "vue";

import type { Menu } from "@/types";

const props = defineProps<{
  menus: Array<Menu>;
}>();

const menus = computed(() => {
  return props.menus;
});
</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn
        variant="text"
        color="pink-accent-2"
        icon="mdi-dots-vertical"
        v-bind="props"
      ></v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="(menu, index) in menus"
        :key="index"
        @click="menu.event"
      >
        <template v-if="menu.icon" v-slot:prepend>
          <v-icon :icon="menu.icon" color="pink-accent-3"></v-icon>
        </template>

        <v-list-item-title>{{ menu.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style lang="scss" scoped>
.v-list-item__prepend {
  .v-icon {
    margin-inline-end: 16px;
  }
}
</style>
