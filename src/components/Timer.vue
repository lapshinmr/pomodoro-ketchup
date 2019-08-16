<template>
  <div>
    <div class="timer">
      {{ CUR_TIME_FORMATTED }}
    </div>
    <div class="d-flex buttons mt-1">
      <button class="btn btn-outline-success" @click="runTimer">Play</button>
      <button class="btn btn-outline-success ml-1 ml-xm-2" @click="pauseTimer">Pause</button>
      <button class="btn btn-outline-success ml-1 ml-xm-2" @click="resetTimer">Reset</button>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

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
    position: relative
    color: var(--dark)

    font-size: 5.5rem
    line-height: 100%

    @media (min-width: 360px)
      font-size: 6rem

    @media (min-width: 411px)
      font-size: 7rem

    @media (min-width: 576px)
      font-size: 8rem

    @media (min-width: 768px)
      font-size: 8rem

    @media (min-width: 992px)
      font-size: 9rem

    @media (min-width: 1200px)
      font-size: 9rem

  .buttons
    position: absolute
    top: 100%
    left: 50%
    transform: translateX(-50%)

    .btn
      padding: .25rem .5rem
      font-size: .875rem

      @media (min-width: 360px)
        padding: .375rem .75rem
        font-size: 1rem

      @media (min-width: 411px)
        padding: .375rem .75rem
        font-size: 1rem

      @media (min-width: 576px)
        padding: .5rem 1rem
        font-size: 1.25rem

      @media (min-width: 768px)
        padding: .5rem 1rem
        font-size: 1.25rem

      @media (min-width: 992px)
        padding: .5rem 1rem
        font-size: 1.25rem

      @media (min-width: 1200px)
        padding: .5rem 1rem
        font-size: 1.25rem

</style>
