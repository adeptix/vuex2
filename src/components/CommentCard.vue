<template>
  <div class="comment_card">
    <h3>{{comment.user}}</h3>
    <p>{{comment.text}}</p>
    <div class="comment__footer">
      <button class="edit_b" @click="startEdit">Редактировать</button> |
      <button class="delete_b" @click="deleteComment">Удалить</button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "CommentCard",
  props: ["comment"],

  computed: {
    ...mapGetters({
      isEdited: "comments/isEdited"
    })
  },

  methods: {
    startEdit(){
      if (this.isEdited){
        return
      }

      this.$store.commit("comments/START_UPDATE_COMMENT", this.comment.id)
    },

    deleteComment(){
      if (this.isEdited){
        return
      }

      this.$store.dispatch("comments/deleteComment", this.comment.id)
    }
  }
}
</script>

<style scoped>
.comment_card {
  margin: 5px auto;
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  padding: 5px 15px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}

.comment__footer {
  display: flex;
  flex-direction: row;
  align-items: baseline;
}

.comment__footer button {
  margin: 5px;
  font-size: 13px;
  color: #999999;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
}

.comment_card h3 {
  margin-block-end: 5px;
}

.edit_b:hover {
  color: #41B883;
}

.delete_b:hover {
  color: red;
}

</style>