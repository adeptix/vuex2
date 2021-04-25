import axios from "axios";
import {BASE_URL} from "@/consts";


export default {
    namespaced: true,
    state: {
        comments: [],
        currentComment: {}
    },

    getters: {
        getCommentsByPostID: (state) => (postID) => {
            return state.comments.filter(c => c.post_id == postID)
        },

        getEditedComment(state) {
            return state.currentComment
        },

        isEdited(state) {
            return state.currentComment.id !== undefined
        }
    },

    mutations: {
        SET_COMMENTS(state, payload) {
            state.comments = payload
        },

        START_UPDATE_COMMENT(state, id) {
            state.currentComment = Object.assign({}, state.comments.find(c => c.id == id))
        },

        CANCEL_UPDATE_COMMENT(state) {
            state.currentComment = {}
        },

        UPDATE_COMMENT(state) {
            const index = state.comments.findIndex(c => c.id == state.currentComment.id)
            if (index === -1) {
                return
            }

            state.comments.splice(index, 1, state.currentComment)
            state.currentComment = {}
        },

        CREATE_COMMENT(state, payload) {
            state.comments.push(payload)
            state.currentComment = {}
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
        getComments({commit}, postID) {
            return new Promise((resolve, reject) => {
                axios
                    .get(BASE_URL + `comments?post_id=${postID}`)
                    .then(response => {
                        commit("SET_COMMENTS", response.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        createComment({commit, state}, postID) {
            state.currentComment.post_id = postID

            return new Promise((resolve, reject) => {
                axios
                    .post(BASE_URL + "comments", state.currentComment)
                    .then(response => {
                        commit("CREATE_COMMENT", response.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        updateComment({commit, state}) {
            return new Promise((resolve, reject) => {
                axios
                    .put(BASE_URL + `comments/${state.currentComment.id}`, state.currentComment)
                    .then(response => {
                        commit("UPDATE_COMMENT")
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
