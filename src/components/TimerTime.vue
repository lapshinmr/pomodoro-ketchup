<template>
  <div class="timer">
    <div class="timer__slot">
      <slot></slot>
    </div>
    <div class="timer__time d-flex justify-content-center align-items-center">
        {{ CUR_TIME_FORMATTED }}
    </div>
    <div class="timer__buttons d-flex justify-content-around">
      <button class="timer__button btn btn-success" @click="runTimer">Play</button>
      <button class="timer__button btn btn-success" @click="pauseTimer">Pause</button>
      <button class="timer__button btn btn-success" @click="resetTimer">Reset</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'timer-time',
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

  .timer

    .timer__slot
      position: absolute
      bottom: 100%
      width: 100%

    .timer__time
      color: var(--dark)
      line-height: 1em
      font-size: 30%

    .timer__buttons
      position: absolute
      top: 100%
      left: 50%
      transform: translateX(-50%)
      width: 70%

      .timer__button
        padding: 2% 6%
        font-size: 4%
        
</style>
