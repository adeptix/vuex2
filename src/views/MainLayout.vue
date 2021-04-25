<template>
  <div class="main_layout">
    <router-link tag="div"
                 :to="{name: 'AllPostsPage'}">
      <header class="main_header">
        <h1>Posts Axios</h1>
      </header>
    </router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "MainLayout"
}
</script>

<style scoped>

.main_header {
  background: #FFF;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  cursor: pointer;
}

.main_header h1 {
  padding: 20px 5px 20px 5%;
  margin: 0;
}

.main_header h1::first-letter {
  color: #41B883;
}
</style>