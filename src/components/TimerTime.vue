<template>
  <div class="timer">
    <div class="timer__slot">
      <slot></slot>
    </div>
    <div class="timer__time d-flex justify-content-center align-items-center">
      <span v-if="!isSettingsMode" class="timer__string">{{ CUR_TIME_FORMATTED }}</span>
      <timer-settings v-else ></timer-settings>
    </div>
    <div class="timer__buttons">
        <button
          v-if="isPause"
          class="timer__button btn btn-success"
          @click="startTimer(playFromButton=true)"
          key="play"
        >
          <i class="fas fa-play"></i>
        </button>
        <button
          v-if="!isPause"
          class="timer__button btn btn-success"
          @click="pauseTimer"
          key="pause"
        >
          <i class="fas fa-pause"></i>
        </button>
        <button
          class="timer__button btn btn-success ml-2"
          @click="resetTimer"
          key="stop"
        >
          <i class="fas fa-stop"></i>
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
      'isPause',
      'timeLeft',
      'timeInit'
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
    display: flex
    justify-content: center
    position: absolute
    top: 100%
    left: 50%
    transform: translateX(-50%)
    width: 70%

    .timer__button
      font-size: 4%
      border-radius: 50%
      display: flex
      align-items: center
      justify-content: center
      padding: 1rem

.slide-buttons-move
  transition: transform .3s
</style>
