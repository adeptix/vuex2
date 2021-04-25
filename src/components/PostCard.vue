<template>
  <div class="post_card">
    <div class="post_card__header">
      <h3>{{post.title}}</h3>
      <button>edit</button>
    </div>
    <h3><i>{{post.author}}</i></h3>
    <div>{{post.text}}</div>
  </div>
</template>

<script>
export default {
  name: "PostCard",
  props: ["post"]
}
</script>

<style scoped>
.post_card {
  display: flex;
  flex-direction: row;
  padding: 5px;
  margin: 10px 5px;
}

.post_card__header {
  display: flex;
  flex-direction: column;
}
</style>