<template>

</template>

<script>
  export default {
    name: 'timer-title',
    props: ['time'],
    watch: {
      time: {
        immediate: true,
        handler() {
          document.title = this.time;
        }
      }
    }
  }
</script>
