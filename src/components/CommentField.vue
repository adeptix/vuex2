<template>
  <div class="comment_field">
    <div class="input_wrapper">
      <input class="spaces name_field"
             v-model="comment.user"
             placeholder="Имя">

      <textarea class="spaces"
                rows="5"
                v-model="comment.text"
                placeholder="Ваш комментарий"></textarea>
    </div>
    <div class="btn_wrapper">
      <button
          @click="saveComment"
          class="spaces">{{ isEdited ? "Сохранить" : "Отправить" }}
      </button>
      <button
          class="spaces"
          @click="cancelCommentSave"
          v-if="isEdited">Отменить
      </button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "CommentField",

  data() {
    return {
    }
  },

  computed: {
    ...mapGetters({
      comment: "comments/getEditedComment",
      isEdited: "comments/isEdited"
    }),
  },

  methods: {
    saveComment() {
      if (this.isEdited) {
        this.$store.dispatch("comments/updateComment")
      }else{
        this.$store.dispatch("comments/createComment", this.$route.params.id)
      }
    },

    cancelCommentSave() {
      this.$store.commit("comments/CANCEL_UPDATE_COMMENT")
    }
  }
}
</script>

<style scoped>
.comment_field {
  display: flex;
  flex-direction: row;
  margin: 50px auto 20px;
}

.name_field {
  width: 35%;
}

.spaces {
  margin: 5px;
}

.input_wrapper {
  flex: 4;
  display: flex;
  flex-direction: column;
  margin-right: 50px;
}

.btn_wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.btn_wrapper button {
  color: white;
  background: #41B883;
  outline: none;
  cursor: pointer;
}

.btn_wrapper button:hover {
  background: #308662;
}

</style>