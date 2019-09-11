<template>
  <div>
    <slot></slot>
    <div class="timer">
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

  .timer
    color: var(--dark)
    line-height: 100%
    font-size: 32%

  .buttons
    width: 70%
    @media (max-height: 400px)
      width: 80%
    position: absolute
    top: 100%
    left: 50%
    transform: translateX(-50%)
    margin-top: 1rem
    margin-top: 2%

    .btn
      padding: 2% 6%
      font-size: 4%
      @media (max-height: 400px)
        font-size: 5%

</style>
