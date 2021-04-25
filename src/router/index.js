import Vue from 'vue'
import VueRouter from 'vue-router'
import MainLayout from "@/views/MainLayout";
import AllPostsPage from "@/views/AllPostsPage";
import PostPage from "@/views/PostPage";
import PostEditPage from "@/views/PostEditPage";
import PostLayout from "@/views/PostLayout";
import PostCreatePage from "@/views/PostCreatePage";

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
                component: PostLayout,
                children: [
                    {
                        path: "",
                        name: "PostPage",
                        component: PostPage,
                    },
                    {
                        path: "edit",
                        name: "PostEditPage",
                        component: PostEditPage
                    },
                ]
            },
            {
                path: "posts/create",
                name: "PostCreate",
                component: PostCreatePage
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
