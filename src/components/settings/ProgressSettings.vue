<template>
  <div
    class="btn-round"
    @click="switchProgressBarFlag"
  >
    <i
      class="fas fa-redo-alt"
      :class="{'fa-flip-horizontal': isReversedProgressBar}"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState([
      'isReversedProgressBar',
    ]),
  },
  methods: {
    ...mapActions([
      'switchProgressBarFlag',
    ]),
  },
};
</script>

<style lang="sass" scoped>
</style>
