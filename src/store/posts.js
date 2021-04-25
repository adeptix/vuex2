import axios from "axios";
import {BASE_URL, POSTS_COUNT as limit} from "@/consts";


export default {
    namespaced: true,
    state: {
        posts: [],
        lastPage: 0,
        currentPage: 1,
    },

    getters: {
        getPosts: (state) => {
            return state.posts
        },

        getPostByID: (state) => (id) => {
            return state.posts.find(p => p.id == id)
        },

        getLastPage(state) {
            return state.lastPage
        },

        getCurrentPage(state) {
            return state.currentPage
        }
    },

    mutations: {
        SET_CURRENT_PAGE(state, page) {
            state.currentPage = page
        },

        INC_PAGE(state) {
            state.currentPage++
        },

        DEC_PAGE(state) {
            state.currentPage--
        },

        SET_LAST_PAGE(state, page) {
            state.lastPage = page
        },

        SET_POSTS(state, payload) {
            state.posts = payload
        },

        CREATE_POST(state, payload) {
            state.posts.push(payload)
        },

        UPDATE_POST(state, {id, payload}) {
            const index = state.posts.findIndex(c => c.id == id)
            if (index === -1) {
                return
            }

            state.posts.splice(index, 1, payload)
        },

        DELETE_POST(state, id) {
            const index = state.posts.findIndex(c => c.id == id)
            if (index === -1) {
                return
            }

            state.posts.splice(index, 1)
        }
    },
    actions: {
        getPosts({commit}, page) {
            return new Promise((resolve, reject) => {
                axios
                    .get(BASE_URL + `posts?_page=${page}&_limit=${limit}}`)
                    .then(response => {
                        commit("SET_CURRENT_PAGE", page)
                        commit("SET_LAST_PAGE", Math.ceil(response.headers["x-total-count"] / limit))
                        commit("SET_POSTS", response.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        createPost({commit}, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post(BASE_URL + "posts", payload)
                    .then(response => {
                        commit("CREATE_POST", response.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        updatePost({commit}, {id, payload}) {
            return new Promise((resolve, reject) => {
                axios
                    .put(BASE_URL + `posts/${id}`, payload)
                    .then(response => {
                        commit("UPDATE_POST", {id, payload})
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        deletePost({commit}, id) {
            return new Promise((resolve, reject) => {
                axios
                    .delete(BASE_URL + `posts/${id}`)
                    .then(response => {
                        commit("DELETE_POST", id)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
    }
}
