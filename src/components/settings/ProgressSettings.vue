<template>
  <div class="settings__element d-flex justify-content-center align-items-center" @click="isReversedProgressBar = !isReversedProgressBar">
    <i class="fas fa-redo-alt"
      :class="{'fa-flip-horizontal': isReversedProgressBar}"></i>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState([
      'isReversedProgressBar'
    ]),
    isReversedProgressBar: {
      get() {
        return this.$store.state.isReversedProgressBar
      },
      set(isTimerTitle) {
        console.log('+')
        this.switchProgressBarFlag()
      }
    }
  },
  methods: {
    ...mapActions([
      'switchProgressBarFlag',
    ])
  }
}
</script>

<style lang="sass" scoped>
</style>
