<template>
  <div class="statistic-container d-flex justify-content-center align-items-center">
    <graph />
  </div>
</template>

<script>
import Graph from '@/components/TheGraph.vue';

export default {
  name: 'StatisticView',
  components: { Graph },
};
</script>

<style scoped lang="sass">
.statistic-container
  position: relative
  width: 100%
  height: 100%
</style>
