<template><div /></template>

<script>
export default {
  name: 'TimerTitle',
  props: ['title'],
  watch: {
    title: {
      immediate: true,
      handler() {
        document.title = this.title;
      },
    },
  },
};
</script>
