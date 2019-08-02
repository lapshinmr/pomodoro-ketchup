<template>

</template>

<script>
  export default {
    name: 'timer-title',
    props: ['title'],
    watch: {
      title: {
        immediate: true,
        handler() {
          document.title = this.title;
        }
      }
    }
  }
</script>
