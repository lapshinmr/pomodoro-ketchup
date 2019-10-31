<template>
  <div class="">
    <i class="far fa-clock"
      @click="isTimerTitle = !isTimerTitle"
    ></i>
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
  i
    font-size: 6vh
    cursor: pointer
    color: var(--primary)
    &:hover
      color: var(--dark)
</style>
