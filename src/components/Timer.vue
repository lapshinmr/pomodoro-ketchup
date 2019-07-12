<template>
  <div>
    <p class="timer">
      {{ curTimeFormatted }}
    </p>
    <div>
      <button class="btn btn-outline-success" @click="play">Play</button>
      <button class="btn btn-outline-success ml-2" @click="pause">Pause</button>
      <button class="btn btn-outline-success ml-2" @click="stop">Stop</button>
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
      stop() {
        this.$store.dispatch('stopTimer')
      }
    }
  }
</script>

<style scoped>
  p {
    margin: 40px 0 0;
    font-size: 100px;
  }

  p {
    color: #42b983;
  }
</style>
