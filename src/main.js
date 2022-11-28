import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import VueApexCharts from "vue3-apexcharts";
import ApexCharts from 'apexcharts';
import './assets/main.css'

const app = createApp(App)
app.config.globalProperties.$apexcharts = ApexCharts;

app.use(createPinia())
app.use(router)
app.use(VueApexCharts);
app.mount('#app')
