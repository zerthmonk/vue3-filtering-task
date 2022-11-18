<template>
  <v-app>
    <v-container>
      <header>
        <v-row align="center" justify="center" class="ma-4">
          <h3>{{ store.labels.title }}</h3>
        </v-row>
      </header>

      <main>
        <v-row align="start" justify="center" class="ma-4">
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>filters</v-card-title>
              <v-card-text :class="$style.filters">
                <BlogFilter field="country" />
                <BlogFilter field="score" />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>{{ store.labels.list }}</v-card-title>
              <v-list lines="three">
                <BlogItem
                  v-for="(item, index) in store.items"
                  :key="index"
                  v-bind="item"
                >
                  <v-divider v-if="index < store.items.length - 1"></v-divider>
                </BlogItem>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </main>

      <footer>
        <AppFooter></AppFooter>
      </footer>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { useBlogStore } from "@/stores/blog";
import BlogFilter from "@/components/BlogFilter.vue";
import BlogItem from "@/components/BlogItem.vue";
import AppFooter from "./components/AppFooter.vue";

const store = useBlogStore();
store.getFakeItems();
</script>
<style module lang="scss">
.filters {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
