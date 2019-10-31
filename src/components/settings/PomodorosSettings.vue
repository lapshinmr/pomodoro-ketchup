<template>
  <div class="d-flex justify-content-center">
    <input type="text" v-model.lazy.number="pomodorosGoal">
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'pomodoros-settings',
  methods: {
    ...mapActions([
      'setPomodorosGoal'
    ])
  },
  computed: {
    pomodorosGoal: {
      get() {
        return this.$store.state.pomodorosGoal
      },
      set(pomodorosGoal) {
        if (!parseInt(pomodorosGoal)) {
          return
        }
        this.setPomodorosGoal(pomodorosGoal)
      }
    },
  }
}
</script>

<style lang="sass" scoped>
input
  width: 30%
  font-size: 6%
  padding: 0
  color: var(--dark)
  text-align: center
  background-color: transparent
  border: none
  outline: 1px solid var(--primary)

</style>
