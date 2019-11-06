<template>
  <div class="settings__element" @click="nextSound">
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
</style>
