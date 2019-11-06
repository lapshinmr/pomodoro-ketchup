<template>
  <div class="settings__element" @click="isTimerTitle = !isTimerTitle">
    <i class="far fa-clock"></i>
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
