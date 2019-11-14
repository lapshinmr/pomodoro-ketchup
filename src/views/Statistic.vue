<template>
  <div class="content-container d-flex align-items-center justify-content-center">
    <div class="navigation">
      <router-link to="/" class="settings__element">
        <i class="fas fa-chevron-left"></i>
      </router-link>
    </div>

    <graph></graph>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Graph from '../components/Graph.vue';

export default {
  components: { Graph },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
  },
}
</script>

<style scoped lang="sass">
.navigation
  position: absolute
  left: 5px
  top: 5px
  padding: 0
  z-index: 1000

  .settings__element
    position: relative
    display: flex
    justify-content: center
    align-items: center
    height: 6vh
    width: 6vh
    font-size: 3.5vh
    margin-left: 3px
    border-radius: 50%
    cursor: pointer
    transition: all 0.15s
    color: var(--super-light)
    background-color: var(--primary)
    &:hover
      background-color: var(--dark)
</style>
