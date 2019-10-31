<template>
  <div>
    <div v-for="(soundName, index) in notificationSounds">
      <input
        type="radio"
        name="sound"
        :id="'sound' + index"
        :value="soundName"
        v-model="notificationSound"
        @click="playSound(soundName)"
      >
      <label
        :for="'sound' + index"
        class="d-flex align-items-center justify-content-center"
      >
        <i class="fas fa-volume-up"></i>
      </label>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { NOTIFICATION_SOUNDS, COLOR_THEMES } from '@/constants'

export default {
  name: 'sound-settings',
  data() {
    return {
      colorThemes: COLOR_THEMES,
      notificationSounds: NOTIFICATION_SOUNDS
    }
  },
  computed: {
    notificationSound: {
      get() {
        return this.$store.state.notificationSound
      },
      set(notificationSound) {
        this.setNotificationSound(notificationSound)
      },
    }
  },
  methods: {
    ...mapActions([
      'setNotificationSound'
    ]),
    label: function(colorName) {
    },
    playSound (sound) {
      let audio = new Audio(require('@/assets/' + sound))
      audio.play()
    }
  }
}
</script>

<style lang="sass" scoped>
input
  display: none

label
  height: 5vh
  width: 5vh
  margin-bottom: 0
  border-radius: 50%
  color: var(--super-light)
  cursor: pointer
  transition: all 0.15s
  margin-left: 5px
  background-color: var(--primary)
  padding: 0.8rem

input:checked + label
  box-shadow: 0 0 10px var(--dark)

label, input:checked + label
  &:hover
    background-color: var(--dark)
    color: var(--super-light)
</style>
