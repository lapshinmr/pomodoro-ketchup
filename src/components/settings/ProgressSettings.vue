<template>
  <div class="d-flex justify-content-center align-items-center" @click="isReversedProgressBar = !isReversedProgressBar">
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
div
  height: 5vh
  width: 5vh
  margin-bottom: 0
  border-radius: 50%
  cursor: pointer
  transition: all 0.15s
  margin-left: 5px
  color: var(--super-light)
  background-color: var(--primary)
  &:hover
    background-color: var(--dark)
</style>
