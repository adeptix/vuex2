<template>
  <div class="post_list">
    <post-card v-for="post in posts" :key=post.id :post="post"/>
    <paginate-panel/>
  </div>
</template>

<script>
import PostCard from "@/components/PostCard";
import {mapActions, mapGetters} from "vuex";
import PaginatePanel from "@/components/PaginatePanel";

export default {
  name: "AllPostsPage",
  components: {PaginatePanel, PostCard},

  computed: {
    ...mapGetters({
      posts: "posts/getPosts"
    })
  },

  methods: {
    ...mapActions({
      loadPosts: "posts/getPosts",
    }),
  },

  watch: {
    $route(to) {
      const page = parseInt(to.query.page, 10) || 1;
      this.loadPosts(page)
    },
  },

  mounted() {
    const page = parseInt(this.$route.query.page, 10) || 1;
    this.loadPosts(page)
  }
}
</script>

<style scoped>
.post_list {
  display: flex;
  flex-direction: column;
}
</style>