import { createApp } from 'vue';
import App from './App.vue';
import 'virtual:uno.css'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);
app.use(ElementPlus);
app.mount(
  (() => {
    const app = document.createElement('div');
    document.body.append(app);
    return app;
  })(),
);