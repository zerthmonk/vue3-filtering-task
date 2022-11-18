<template>
  <v-list-item :key="title">
    <div class="d-flex align-center mb-4">
      <v-avatar
        :image="avatar"
        @click="toggleUserDetails"
        :class="$style.pointer"
      ></v-avatar>
      <h6 v-show="userDetails" class="ml-5 text-align-left">
        {{ fullname }} is from {{ address }}, {{ country }}
      </h6>
    </div>
    <div class="pb-6">
      <h4 class="pb-2">{{ title }}</h4>
      <span>{{ content }}</span>
    </div>
    <slot></slot>
  </v-list-item>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

export interface BlogItem {
  avatar: string;
  score: number;
  fullname: string;
  country: string;
  address: string;
  title: string;
  content: string;
}

const props = defineProps<BlogItem>();
const avatar = computed(() => props.avatar);

const userDetails = ref(false);

function toggleUserDetails() {
  userDetails.value = !userDetails.value;
}
</script>
<style module lang="scss">
.pointer {
  cursor: pointer;
}
</style>
