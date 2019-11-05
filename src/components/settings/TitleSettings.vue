<template>
  <div class="d-flex justify-content-center align-items-center" @click="isTimerTitle = !isTimerTitle">
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
