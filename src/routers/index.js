import { createRouter, createWebHistory } from 'vue-router';

const LoginView = ()=> import ('@/pages/login/LoginView.vue') ;
export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'LoginView',
            component: LoginView,
            children: []
        },
    ]
})
const routerFactory = (i18n) => {
    router.beforeEach((to, from, next) => {
        if(to.name){
            document.title = i18n.t(to.name);
        }
        next();
    });
    return router;
}

export default routerFactory
