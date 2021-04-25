<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'App',
  methods: {
    ...mapActions({
      loadPosts: "posts/getPosts",
      loadComments: "comments/getComments"
    })
  },

  mounted() {
    this.loadPosts()
    this.loadComments()
  }
}
</script>

<style>
 html{
   padding: 0;
 }

 body{
   margin: 0;
   background: #E2E1E0;
 }
</style>