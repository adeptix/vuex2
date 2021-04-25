<template>
  <div class="post_list">
    <post-card post=""/>
  </div>
</template>

<script>
import PostPage from "@/views/PostPage";
import PostCard from "@/components/PostCard";
export default {
  name: "AllPostsPage",
  components: {PostCard, PostPage}
}
</script>

<style scoped>
.post_list {
  display: flex;
  flex-direction: row;
}
</style>