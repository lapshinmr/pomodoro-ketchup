<template>
  <div>
    <div class="timer">
      {{ CUR_TIME_FORMATTED }}
    </div>
    <div class="text-center">
      <button class="btn btn-outline-success" @click="runTimer">Play</button>
      <button class="btn btn-outline-success ml-2" @click="pauseTimer">Pause</button>
      <button class="btn btn-outline-success ml-2" @click="resetTimer">Reset</button>
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
    margin: 40px 0 0
    font-size: 100px
    color: var(--dark)

</style>
