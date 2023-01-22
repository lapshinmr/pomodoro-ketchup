<template>
  <div
    class="btn-round"
    @click="nextSound"
  >
    <i class="fas fa-volume-up" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { NOTIFICATION_SOUNDS } from '@/helpers/const/constants';

export default {
  name: 'SoundSettings',
  data() {
    return {
      notificationSounds: NOTIFICATION_SOUNDS,
    };
  },
  computed: {
    ...mapState([
      'notificationSound',
    ]),
  },
  methods: {
    playSound(sound) {
      const audio = new Audio(sound);
      audio.play();
    },
    nextSound() {
      const nextSoundIdx = (
        this.notificationSounds.indexOf(this.notificationSound) + 1
      ) % this.notificationSounds.length;
      const sound = this.notificationSounds[nextSoundIdx];
      this.$store.commit('SET_NOTIFICATION_SOUND', sound);
      this.playSound(sound);
    },
  },
};
</script>

<style lang="sass" scoped>
</style>
