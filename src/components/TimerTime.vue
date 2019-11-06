<template>
  <div class="timer">
    <div class="timer__slot">
      <slot></slot>
    </div>
    <div class="timer__time d-flex justify-content-center align-items-center">
      <span v-if="!isSettingsMode" class="timer__string">{{ CUR_TIME_FORMATTED }}</span>
      <timer-settings v-else ></timer-settings>
    </div>
    <div class="timer__buttons d-flex justify-content-center">
      <button
        v-if="isPause"
        class="timer__button btn btn-success"
        @click="startTimer(playFromButton=true)"
      >
        Play
      </button>
      <button
        v-if="!isPause"
        class="timer__button btn btn-success"
        @click="pauseTimer"
      >
        Pause
      </button>
      <button
        class="timer__button btn btn-success ml-2"
        @click="resetTimer"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import TimerSettings from '@/components/settings/TimeSettings.vue'

export default {
  name: 'timer-time',
  props: [ 'isSettingsMode' ],
  components: { TimerSettings },
  created() {
    console.log(this.isSettingsMode)
  },
  computed: {
    ...mapState([
      'isPause'
    ]),
    ...mapGetters([
      'CUR_TIME_FORMATTED'
    ])
  },
  methods: {
    ...mapActions([
      'startTimer',
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
    width: 100%

  .timer__string
    width: 100%

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
