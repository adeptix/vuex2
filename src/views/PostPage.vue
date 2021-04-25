<template>
  <div class="post_page" v-if="post">
    <div class="post_page__main">
      <post-card-header :post="post"/>
      <p>{{ post.text }}</p>
    </div>

    <comment-field/>

    <h4>Комментарии ( {{comments.length}} )</h4>
    <comment-card v-for="comment in comments" :key="comment.id" :comment="comment"/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import PostCardHeader from "@/components/PostCardHeader";
import CommentCard from "@/components/CommentCard";
import CommentField from "@/components/CommentField";

export default {
  name: "PostPage",
  components: {CommentField, CommentCard, PostCardHeader},
  computed: {
    ...mapGetters({
      getPost: "posts/getPostByID",
      getComments: "comments/getCommentsByPostID"
    }),

    post: function () {
      return this.getPost(this.$route.params.id)
    },

    comments: function () {
      return this.getComments(this.$route.params.id)
    }
  }
}
</script>

<style scoped>
.post_page {
  width: 50%;
  margin: 25px auto;
}

.post_page__main {
  margin: 5px auto 20px;
  background: #FFFFFF;
  padding: 10px;
}


</style>