<template>
  <div>
    <slot></slot>
    <div class="timer">
        {{ CUR_TIME_FORMATTED }}
    </div>
    <div class="d-flex buttons">
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

  .buttons
    position: absolute
    top: 100%
    left: 50%
    transform: translateX(-50%)
    margin-top: 1rem
    @media (max-height: 400px), (max-width: 400px)
      margin-top: 0.5rem

    .btn
      padding: .75vh 1.75vh
      font-size: 2.25vh
      &:not(:first-child)
        margin-left: 0.5vh

      @media (max-height: 400px), (max-width: 400px)
        padding: 0.2rem 0.4rem
        font-size: 12px
        &:not(:first-child)
          margin-left: 0.25rem

</style>
