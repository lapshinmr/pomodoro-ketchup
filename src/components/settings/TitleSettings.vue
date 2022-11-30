<template>
  <div
    class="btn-round"
    @click="isTimerTitle = !isTimerTitle"
  >
    <i class="fas fa-heading" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

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
        this.switchTimerTitleFlag();
      },
    },
  },
  methods: {
    ...mapActions([
      'switchTimerTitleFlag',
    ]),
  },
};
</script>

<style lang="sass" scoped>
</style>
