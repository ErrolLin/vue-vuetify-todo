<script setup lang="ts">
import { onMounted, onUpdated, reactive, toRefs } from "vue";

import { storeToRefs } from "pinia";

import { useDialogStore } from "@/stores";

const state = reactive<{ dialogInputText: string | undefined }>({
  dialogInputText: "",
});

const { dialogInputText } = toRefs(state);

const dialogStore = useDialogStore();
const { isShow, dialog } = storeToRefs(dialogStore);

const handleConfirmDialog = () => {
  dialog.value.confirm.event(dialogInputText.value);
};

const handleCancelDialog = () => {
  dialogStore.hideDialog();
};

onMounted(() => {
  dialogInputText.value = dialog.value.data;
});

onUpdated(() => {
  dialogInputText.value = dialog.value.data;
});
</script>
<template>
  <v-dialog
    v-model="isShow"
    max-width="350"
    max-height="300"
    v-if="dialog.title"
  >
    <v-card>
      <v-card-title>
        {{ dialog.title }}
      </v-card-title>
      <v-card-text v-if="dialog.type === 'ALERT'">
        {{ dialog.content }}
      </v-card-text>
      <v-card-subtitle v-if="dialog.type === 'PROMPT'">
        {{ dialog.content }}
        <v-text-field
          v-if="dialog.type === 'PROMPT' && dialog.data"
          color="pink-accent-2"
          density="compact"
          placeholder="Please enter a task."
          variant="underlined"
          hide-details
          clearable
          v-model:model-value="dialogInputText"
          @keyup.enter="handleConfirmDialog"
        />
      </v-card-subtitle>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="text" @click="handleCancelDialog">
          {{ dialog.cancel }}
        </v-btn>
        <v-btn
          variant="text"
          color="pink-accent-2"
          :disabled="!dialogInputText"
          @click="handleConfirmDialog"
        >
          {{ dialog.confirm.text }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped></style>
