import { createRouter,createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useCompanyStore } from "../stores/company";


const routes = [
    {
        path : "/",
        name:"home",
        component: ()=> import('../components/Home/home.vue') ,
    },
    {
        path : "/login",
        name:"login",
        component: ()=> import('../components/Authentication/Login.vue') ,
    },
    {
        path : "/register",
        name:"register",
        component: ()=> import('../components/Authentication/Register.vue'),
    },
    {
        path : "/reset",
        name:"reset",
        component: ()=> import('../components/Authentication/Reset.vue') ,
    },
    {
        path : "/forgot",
        name:"forgot",
        component: ()=> import('../components/Authentication/Forgot.vue') ,
    },
    {
        path : "/companies",
        name:"companies",
        component: ()=> import('../components/Home/companies.vue') ,
    },
    {
        path : "/reviews",
        name:"reviews",
        component: ()=> import('../components/Home/reviews.vue') ,
    },
    {
        path : "/company/:name",
        name:"company",
        component: ()=> import('../components/Home/company.vue') ,
    },
    {
        path : "/review",
        name:"review",
        component: ()=> import('../components/Home/review.vue') ,
    },
    {
        path : "/verify-email",
        name:"verify-email",
        component: ()=> import('../components/Authentication/verify-email.vue') ,
    },
    {
        // beforeEnter: async (to, from, next) => {
        //     if(useAuthStore().getUser==null){
        //         await useAuthStore().checkAuth();
        //     }
        //     next();
        // },
        path : "/profile",
        name:"profile",

        component: ()=> import('../components/Home/profile.vue') ,
    },
    {
        beforeEnter: async (to, from, next) => {
            if(useAuthStore().getUser==null){
                await useAuthStore().checkAuth();
            }
            next();
        },
        path : "/manager",
        name:"manager",
        component: ()=> import('../components/manager/dash.vue'),
    },
    {
        path : "/not-found",
        name:"not-found",
        component: ()=> import('../components/error_pages/not_found.vue') ,
    },
    {
        path :"/server-error",
        name:"server-error",
        component: ()=> import('../components/error_pages/server_error.vue') ,
    },

];


const router =createRouter({
    history : createWebHistory(),
    routes,
});

export default router ;