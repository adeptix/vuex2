<template>
  <div class="post_edit">
    <h2>{{ isEdited ? 'Редактирование' : 'Новый пост' }}</h2>
    <input class="name_field"
           v-model="post.title"
           placeholder="Название">

    <input class="name_field"
           v-model="post.author"
           placeholder="Автор">

    <textarea
        rows="10"
        v-model="post.text"
        placeholder="Текст"></textarea>

    <div class="btn_wrapper">
      <button
          @click="savePost">{{ isEdited ? "Сохранить" : "Создать" }}
      </button>
      <button
          @click="cancelPostSave"
          v-if="isEdited">Отменить
      </button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "PostEdit",
  computed: {
    ...mapGetters({
      post: "posts/getEditedPost",
      isEdited: "posts/isEdited"
    }),
  },

  methods: {
    savePost() {
      if (this.isEdited) {
        this.$store.dispatch("posts/updatePost")
        this.$router.push({name : "AllPostsPage"})
      } else {
        this.$store.dispatch("posts/createPost")
        this.$router.push({name : "AllPostsPage"})
      }
    },

    cancelPostSave() {
      this.$store.commit("posts/CANCEL_UPDATE_POST")
      this.$router.push({name : "AllPostsPage"})
    }
  }
}
</script>

<style scoped>
.post_edit {
  display: flex;
  flex-direction: column;
  margin: 5px auto;
  width: 50%;
  background: white;
  padding: 10px;
}

.post_edit input {
  padding: 5px;
  margin: 5px;
}

.post_edit textarea {
  padding: 5px;
  margin: 5px;
}

.btn_wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.btn_wrapper button{
  background: #41B883;
  padding: 5px;
  color: white;
  margin: 5px;
}

</style>