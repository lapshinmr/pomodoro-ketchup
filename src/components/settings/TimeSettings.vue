<template>
  <div class="d-flex justify-content-center mt-2">
    <input type="text" v-model.lazy.string="initTime">
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { secondsToTime } from '../../store'


const stringToTimeSeconds = function (value) {
  value = value.replace(':', '')
  if (!parseInt(value)) {
    return false
  }
  let length = value.length
  if (length < 1 || length > 4) {
    return false
  }
  let digitLimits = [9, 9, 5, 9]
  let digitsCheck = value.split('').every(function (value, index) {
    return value <= digitLimits[4 - length + index]
  })
  if (!digitsCheck) {
    return false
  } else {
    let seconds = value.slice(-2)
    let minutes = value.slice(0, length - 2)
    return Number(minutes) * 60 + Number(seconds)
  }
}


export default {
  name: 'time-settings',
  methods: {
    ...mapActions([
      'setInitTime',
      'setLeftTime'
    ])
  },
  computed: {
    initTime: {
      get() {
        return secondsToTime(this.$store.state.timeInit)
      },
      set(initTimeString) {
        let initTimeSeconds = stringToTimeSeconds(initTimeString);
        if (!initTimeSeconds) { // if bad user input
          this.$forceUpdate()
        } else {
          if (this.$store.state.timeInit === this.$store.state.timeLeft) {
            this.setLeftTime(initTimeSeconds)
          }
          this.setInitTime(initTimeSeconds)
        }
      }
    },
  }
}
</script>

<style lang="sass" scoped>

input
  width: 100%
  padding: 0
  color: var(--dark)
  text-align: center
  background-color: transparent
  border: none
  outline: 1px solid var(--primary)
</style>
