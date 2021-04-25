<template>
  <div class="post_list">
    <post-card v-for="post in posts" :key=post.id :post="post"/>
    <paginate-panel/>
    <button @click="toCreate" class="add_btn">Добавить запись</button>
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

    toCreate(){
      this.$router.push({name: "PostCreate"})
      this.$store.commit("posts/CLEAR_CURRENT_POST")
    }
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

.add_btn {
  position: -webkit-sticky;
  position: sticky;
  display: inline-block;
  width: 100px;
  height: 50px;
  bottom: 20px;
  margin-left: 85%;
}
</style>