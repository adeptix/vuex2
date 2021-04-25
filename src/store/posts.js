import axios from "axios";
import {BASE_URL} from "@/consts";


export default {
    namespaced: true,
    state: {
        posts: []
    },

    getters: {
        getPosts: (state) => {
            return state.posts
        },

        getPostByID: (state) => (id) => {
            return state.posts.find(p => p.id == id)
        }
    },

    mutations: {
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
        getPosts({commit}) {
            return new Promise((resolve, reject) => {
                axios
                    .get(BASE_URL + "posts")
                    .then(response => {
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
