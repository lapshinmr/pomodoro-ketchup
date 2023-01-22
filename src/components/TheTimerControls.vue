<template>
  <div class="timer-controls">
    <p-btn
      v-if="isPause"
      icon
      class=""
      @click="startTimer(true)"
    >
      <p-icon name="play" />
    </p-btn>
    <p-btn
      v-if="!isPause"
      icon
      class=""
      @click="pauseTimer"
    >
      <p-icon name="pause" />
    </p-btn>
    <p-btn
      icon
      class="ml-2"
      @click="onStopTimer"
    >
      <p-icon name="stop" />
    </p-btn>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'TheTimerControls',
  computed: {
    ...mapState([
      'isPause',
    ]),
  },
  methods: {
    ...mapActions([
      'startTimer',
      'pauseTimer',
      'resetTimer',
      'resetTimerExtra',
    ]),
    onStopTimer() {
      this.resetTimer();
      this.resetTimerExtra();
    },
  },
};
</script>

<style scoped>

</style>
