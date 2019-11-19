<template>
  <div class="btn-round" @click="isTimerTitle = !isTimerTitle">
    <i class="fas fa-heading"></i>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'title-settings',
  computed: {
    ...mapState([
      'isTimerTitle'
    ]),
    isTimerTitle: {
      get() {
        return this.$store.state.isTimerTitle
      },
      set(isTimerTitle) {
        this.switchTimerTitleFlag()
      }
    }
  },
  methods: {
    ...mapActions([
      'switchTimerTitleFlag',
    ]),
  }
}
</script>

<style lang="sass" scoped>
</style>
