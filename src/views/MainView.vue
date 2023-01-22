<template>
  <div class="timer">
    <!-- POMODOROS PROGRESS BAR -->
    <transition name="fade">
      <pomodoros-bar v-if="goalIndicatorFormat !== 3" />
    </transition>
    <!-- TIMER WITH PROGRESS BAR -->
    <the-timer-circle-bar>
      <the-pomodoros-counter :is-settings-mode="isSettingsMode" />
      <the-timer-time :is-settings-mode="isSettingsMode" />
      <the-timer-controls />
    </the-timer-circle-bar>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TheTimerCircleBar from '@/components/TheTimerCircleBar.vue';
import PomodorosBar from '@/components/PomodorosBar.vue';
import ThePomodorosCounter from '@/components/ThePomodorosCounter.vue';
import TheTimerTime from '@/components/TheTimerTime.vue';
import TheTimerControls from '@/components/TheTimerControls.vue';

export default {
  name: 'MainView',
  components: {
    TheTimerControls,
    ThePomodorosCounter,
    TheTimerTime,
    TheTimerCircleBar,
    PomodorosBar,
  },
  props: {
    isSettingsMode: {
      type: Boolean,
    },
  },
  computed: {
    ...mapState([
      'goalIndicatorFormat',
    ]),
  },
};
</script>

<style lang="sass">
.timer
  position: relative
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  height: 100%

.settings
  position: absolute
  left: 5px
  top: 5px
  padding: 0
  z-index: 1000
</style>
