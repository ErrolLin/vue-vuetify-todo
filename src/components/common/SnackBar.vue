<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useSnackBarStore } from "@/stores";

const snackBarStore = useSnackBarStore();
const { isShow, text } = storeToRefs(snackBarStore);

const handleCloseSnackBar = () => {
  snackBarStore.hideSnackBar();
};
</script>
<template>
  <v-snackbar
    color="pink-accent-2"
    v-model="isShow"
    variant="flat"
    :timeout="3000"
  >
    <span class="font-weight-medium">
      {{ text }}
    </span>

    <template v-slot:actions>
      <v-btn @click="handleCloseSnackBar"> CLOSE </v-btn>
    </template>
  </v-snackbar>
</template>

<style lang="scss" scoped></style>
