import axios from "axios";
import {BASE_URL} from "@/consts";


export default {
    namespaced: true,
    state: {
        comments: []
    },

    getters: {
        getCommentsByPostID: (state) => (postID) => {
            return state.comments.filter(c => c.postID == postID)
        }
    },

    mutations: {
        SET_COMMENTS(state, payload) {
            state.comments = payload
        },

        CREATE_COMMENT(state, payload) {
            state.comments.push(payload)
        },

        UPDATE_COMMENT(state, {id, payload}) {
            const index = state.comments.findIndex(c => c.id == id)
            if (index === -1) {
                return
            }

            state.comments.splice(index, 1, payload)
        },

        DELETE_COMMENT(state, id) {
            const index = state.comments.findIndex(c => c.id == id)
            if (index === -1) {
                return
            }

            state.comments.splice(index, 1)
        }
    },
    actions: {
        getComments({commit}) {
            return new Promise((resolve, reject) => {
                axios
                    .get(BASE_URL + "comments")
                    .then(response => {
                        commit("SET_COMMENTS", response.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        createComment({commit}, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post(BASE_URL + "comments", payload)
                    .then(response => {
                        commit("CREATE_COMMENT", response.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        updateComment({commit}, {id, payload}) {
            return new Promise((resolve, reject) => {
                axios
                    .put(BASE_URL + `comments/${id}`, payload)
                    .then(response => {
                        commit("UPDATE_COMMENT", {id, payload})
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        deleteComment({commit}, id) {
            return new Promise((resolve, reject) => {
                axios
                    .delete(BASE_URL + `comments/${id}`)
                    .then(response => {
                        commit("DELETE_COMMENT", id)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
    }
}
