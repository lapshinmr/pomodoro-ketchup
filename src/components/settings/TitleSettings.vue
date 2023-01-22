<template>
  <div
    class="btn-round"
    @click="isTimerTitle = !isTimerTitle"
  >
    <i class="fas fa-heading" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'TitleSettings',
  computed: {
    ...mapState([
      'isTimerTitle',
    ]),
    isTimerTitle: {
      get() {
        return this.$store.state.isTimerTitle;
      },
      set() {
        this.$store.commit('SWITCH_TIMER_TITLE_FLAG');
      },
    },
  },
};
</script>

<style lang="sass" scoped>
</style>
