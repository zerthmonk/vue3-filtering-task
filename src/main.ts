import { createApp } from "vue";
import { createPinia } from "pinia";
// vuetify is plugged in, but still not works
import vuetify from "./plugins/vuetify";
import App from "./App.vue";

const pinia = createPinia();

createApp(App).use(pinia).use(vuetify).mount("#app");
