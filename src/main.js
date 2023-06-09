import { createApp,markRaw } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import './lib/axios';
import App from './App.vue';
const app  = createApp(App);
const pinia = createPinia();
pinia.use(({ store }) => {
    store.router = markRaw(router)
});
app.use(pinia);
app.use(router);

import "bootstrap/dist/css/bootstrap.min.css";
app.mount('#app');
import "bootstrap/dist/js/bootstrap.min.js";
