<template>
  <div>
    <div class="slot">
      <slot></slot>
    </div>
    <div class="timer d-flex justify-content-center align-items-center">
        {{ CUR_TIME_FORMATTED }}
    </div>
    <div class="d-flex justify-content-around buttons">
      <button class="btn btn-success" @click="runTimer">Play</button>
      <button class="btn btn-success" @click="pauseTimer">Pause</button>
      <button class="btn btn-success" @click="resetTimer">Reset</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Timer',
  computed: {
    ...mapGetters([
      'CUR_TIME_FORMATTED'
    ])
  },
  methods: {
    ...mapActions([
      'runTimer',
      'pauseTimer',
      'resetTimer'
    ])
  }
}
</script>

<style scoped lang="sass">

  .slot
    position: absolute
    bottom: 100%
    width: 100%

  .timer
    color: var(--dark)
    line-height: 1em
    font-size: 30%

  .buttons
    position: absolute
    top: 100%
    left: 50%
    transform: translateX(-50%)
    width: 70%

    .btn
      padding: 2% 6%
      font-size: 4%

</style>
