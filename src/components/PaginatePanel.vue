<template>
  <div class="pag_panel">
    <button @click="prev">Назад</button>
    {{ currentPage }} / {{ lastPage }}
    <button @click="next">Вперед</button>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "PaginatePanel",
  data() {
    return {

    }
  },

  computed: {
    ...mapGetters({
      lastPage: "posts/getLastPage",
      currentPage: "posts/getCurrentPage"
    })
  },

  methods: {
    next() {
      if (this.currentPage + 1 > this.lastPage) {
        return
      }

      this.$store.commit("posts/INC_PAGE")
      this.$router.push({name: "AllPostsPage", query: {page: this.currentPage.toString()}})
    },

    prev() {
      if (this.currentPage < 2) {
        return
      }

      this.$store.commit("posts/DEC_PAGE")
      this.$router.push({name: "AllPostsPage", query: {page: this.currentPage.toString()}})
    }
  }
}
</script>

<style scoped>
.pag_panel {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 5px auto;
}

.pag_panel button {
  outline: none;
  cursor: pointer;
  background: #41B883;
  color: #FFFFFF;
  margin: 5px;
  padding: 5px;
}
</style>