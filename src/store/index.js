import Vue from 'vue'
import Vuex from 'vuex'
import comments from "@/store/comments";
import posts from "@/store/posts";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {posts, comments}
})
