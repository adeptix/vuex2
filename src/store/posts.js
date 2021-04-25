import axios from "axios";
import {BASE_URL, POSTS_COUNT as limit} from "@/consts";


export default {
    namespaced: true,
    state: {
        posts: [],
        lastPage: 0,
        currentPage: 1,

        currentPost: {}
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
        },

        getEditedPost(state) {
            return state.currentPost
        },

        isEdited(state) {
            return state.currentPost.id !== undefined
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

        CLEAR_CURRENT_POST(state) {
            state.currentPost = {}
        },

        START_UPDATE_POST(state, id) {
            state.currentPost = Object.assign({}, state.posts.find(p => p.id == id))
        },

        CANCEL_UPDATE_POST(state) {
            state.currentPost = {}
        },

        UPDATE_POST(state) {
            const index = state.posts.findIndex(c => c.id == state.currentPost.id)
            if (index === -1) {
                return
            }

            state.posts.splice(index, 1, state.currentPost)
            state.currentPost = {}
        },

        DELETE_POST(state, id) {
            const index = state.posts.findIndex(c => c.id == id)
            if (index === -1) {
                return
            }

            state.posts.splice(index, 1)
            state.currentPost = {}
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

        createPost({state}) {
            return new Promise((resolve, reject) => {
                axios
                    .post(BASE_URL + "posts", state.currentPost)
                    .then(response => {
                        resolve(response)

                        state.currentPost = {}
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        updatePost({commit, state}) {
            return new Promise((resolve, reject) => {
                axios
                    .put(BASE_URL + `posts/${state.currentPost.id}`, state.currentPost)
                    .then(response => {
                        commit("UPDATE_POST")
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
