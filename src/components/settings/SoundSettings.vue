<template>
  <div class="d-flex justify-content-center align-items-center" @click="nextSound">
    <i class="fas fa-volume-up"></i>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { NOTIFICATION_SOUNDS } from '@/constants'

export default {
  name: 'sound-settings',
  data() {
    return {
      notificationSounds: NOTIFICATION_SOUNDS
    }
  },
  computed: {
    ...mapState([
      'notificationSound'
    ])
  },
  methods: {
    ...mapActions([
      'setNotificationSound'
    ]),
    playSound (sound) {
      let audio = new Audio(require('@/assets/' + sound))
      audio.play()
    },
    nextSound () {
      let nextSoundIdx = (this.notificationSounds.indexOf(this.notificationSound) + 1) % this.notificationSounds.length
      let sound = this.notificationSounds[nextSoundIdx];
      this.setNotificationSound(sound)
      this.playSound(sound)
    }
  }
}
</script>

<style lang="sass" scoped>
div
  height: 5vh
  width: 5vh
  margin-bottom: 0
  border-radius: 50%
  cursor: pointer
  transition: all 0.15s
  margin-left: 5px
  color: var(--super-light)
  background-color: var(--primary)
  &:hover
    background-color: var(--dark)
</style>
