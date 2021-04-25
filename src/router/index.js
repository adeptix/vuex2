import Vue from 'vue'
import VueRouter from 'vue-router'
import MainLayout from "@/views/MainLayout";
import AllPostsPage from "@/views/AllPostsPage";
import PostPage from "@/views/PostPage";
import PostEditPage from "@/views/PostEditPage";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path: '',
                name: "AllPostsPage",
                component: AllPostsPage
            },
            {
                path: "posts/:id",
                name: "PostPage",
                component: PostPage,
                children: [
                    {
                        path: "edit",
                        name: "PostEditPage",
                        component: PostEditPage
                    }
                ]
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
