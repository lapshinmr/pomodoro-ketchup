<template>
  <div class="row">
    <div class="col-md-12 mt-4">
      <graph></graph>
    </div>
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
</style>
