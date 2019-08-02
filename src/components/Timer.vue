<template>
  <div>
    <div class="timer">
      {{ curTimeFormatted }}
    </div>
    <div class="text-center">
      <button class="btn btn-outline-success" @click="play">Play</button>
      <button class="btn btn-outline-success ml-2" @click="pause">Pause</button>
      <button class="btn btn-outline-success ml-2" @click="reset">Reset</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Timer',
    data() {
      return {
      }
    },
    computed: {
      curTimeFormatted() {
        return this.$store.getters.getTimeFormatted
      }
    },
    methods: {
      play() {
        this.$store.dispatch('runTimer')
      },
      pause() {
        this.$store.dispatch('pauseTimer')
      },
      reset() {
        this.$store.dispatch('resetTimer')
      }
    }
  }
</script>

<style scoped lang="sass">

  .timer
    margin: 40px 0 0
    font-size: 100px
    color: $dark

</style>
