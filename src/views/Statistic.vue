<template>
  <div class="statistic-container d-flex justify-content-center align-items-center">
    <graph></graph>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Graph from '../components/Graph.vue';

export default {
  components: { Graph }
}
</script>

<style scoped lang="sass">
.statistic-container
  position: relative
  width: 100%
  height: 100%
</style>
