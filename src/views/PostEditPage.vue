<template>
  <div class="post_edit_page">
    <post-edit/>
    <button
        @click="deletePostAction"
        class="delete_btn">Удалить</button>
  </div>
</template>

<script>
import PostEdit from "@/components/PostEdit";
import {mapActions} from "vuex";

export default {
  name: "PostEditPage",
  components: {PostEdit},

  created() {
    this.$store.commit("posts/START_UPDATE_POST", this.$route.params.id)
  },

  methods : {
    ...mapActions({
      deletePost: "posts/deletePost"
    }),

    deletePostAction(){
      this.deletePost(this.$route.params.id)
      this.$router.push({name: "AllPostsPage"})
    }
  }
}
</script>

<style scoped>
.post_edit_page {
  display: flex;
  flex-direction: column;
}

.delete_btn {
  outline: none;
  cursor: pointer;
  background: indianred;
  color: #FFFFFF;
  width: 50%;
  margin: 5px auto;
}
</style>