<template>
  <span :class="$style.label">{{ label }}</span>
  <select :class="$style.select" @change="handleSelect" v-model="selected">
    <option select>{{ empty }}</option>
    <option v-for="(option, index) in options" :key="index">
      {{ option }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { nanoid } from "nanoid";
import type { AllowedFields } from "@/types/blog";
import type { PropType } from "vue";
import { computed, ref } from "vue";
import { useBlogStore } from "@/stores/blog";

const props = defineProps({
  field: {
    type: String as PropType<AllowedFields>,
    required: true,
  },
});

const filterId = nanoid();
const store = useBlogStore();

const empty = "";
const selected = ref(empty);
const label = computed(() => `Filter by ${props.field}`);
const items = store.getFilterOptions(props.field);
const options = computed(() => Object.keys(items));

function handleSelect() {
  if (selected.value !== empty) {
    store.updateFilter(filterId, items[selected.value]);
  } else {
    store.dropFilter(filterId);
  }
}
</script>
<style module lang="scss">
// немного быстрой и грязной верстки
.select {
  width: 100%;
  height: 2.5em;
  border: 1px solid rgba(155, 155, 155, 0.3);
  border-radius: 0;
  padding: 0.25em;
  line-height: 2em;
}
</style>
