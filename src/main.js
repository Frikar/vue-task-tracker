import {createApp} from 'vue'
import App from './App.vue'
import {createRouter, createWebHashHistory}from 'vue-router'
import About from "@/views/About";
import Home from "@/views/Home";

const routes = [
    { path: '/about', component: About },
    { path: '/', component: Home},
]
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    routes: routes,
    history: createWebHashHistory(process.env.BASE_URL),
    // short for `routes: routes`
})

createApp(App).use(router).mount('#app')
