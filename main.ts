
import { createApp } from 'vue';
import App from './app.vue';
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const app = createApp(App);

app.use(Toast, {
  position: POSITION.BOTTOM_RIGHT
});

app.mount('#app');
