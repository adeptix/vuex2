<template>
  <div class="post_list">
    <post-card v-for="post in posts" :key=post.id :post="post"/>
  </div>
</template>

<script>
import PostCard from "@/components/PostCard";
import {mapGetters} from "vuex";

export default {
  name: "AllPostsPage",
  components: {PostCard},

  computed: {
    ...mapGetters({
      posts: "posts/getPosts"
    })
  },
}
</script>

<style scoped>
.post_list {
  display: flex;
  flex-direction: column;
}
</style>