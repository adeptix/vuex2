<template>
  <div class="post_card" tabindex="0" @click="toPostPage">
    <post-card-header :post="post"/>
    <h4><i>{{ post.author }}</i></h4>
    <p class="text">{{ post.text }}</p>
  </div>
</template>

<script>
import PostCardHeader from "@/components/PostCardHeader";
export default {
  name: "PostCard",
  components: {PostCardHeader},
  props: ["post"],

  methods: {
    toPostPage() {
      this.$router.push({name: "PostPage", params: {id : this.post.id}})
    }
  }
}
</script>

<style scoped>
.post_card {
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 10px auto;
  width: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(.25, .8, .25, 1);
  background: #FFF;
  cursor: pointer;
  outline: none;
}

.post_card:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.post_card h4 {
  margin-block-start: 0
}

.text {
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 3.6em;
  line-height: 1.8em;
}
</style>