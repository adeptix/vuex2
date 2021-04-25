<template>
  <div class="post_card__header">
    <h3>{{ post.title }}</h3>
    <button class="edit_wrapper" @click.stop="toEditPage">
      <svg class="edit_btn" xmlns="http://www.w3.org/2000/svg"
           tabindex="0"
           viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"
           width="22px" height="22px">
         <g>
           <g>
             <polygon points="51.2,353.28 0,512 158.72,460.8"/>
           </g>
         </g>
        <g>
           <g>

             <rect x="89.73" y="169.097" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -95.8575 260.3719)"
                   width="353.277"
                   height="153.599"/>
           </g>
         </g>
        <g>
           <g>
             <path d="M504.32,79.36L432.64,7.68c-10.24-10.24-25.6-10.24-35.84,0l-23.04,23.04l107.52,107.52l23.04-23.04
              C514.56,104.96,514.56,89.6,504.32,79.36z"/>
           </g>
         </g>
       </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: "PostCardHeader",
  props: ['post'],

  methods: {
    toEditPage() {
      this.$router.push({name: "PostEditPage", params: {id: this.post.id}})
    },
  }
}
</script>

<style scoped>
.post_card__header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.edit_btn {
  margin: 5px;
  outline: none;
}

.edit_wrapper {
  outline: none;
  border:none;
  margin: 0;
  background: none;
  cursor: pointer;
}

.edit_btn:hover {
  fill: #41B883
}

</style>