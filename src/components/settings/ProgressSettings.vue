<template>
  <div
    class="btn-round"
    @click="$store.commit('SWITCH_PROGRESS_BAR_FLAG')"
  >
    <i
      class="fas fa-redo-alt"
      :class="{'fa-flip-horizontal': isReversedProgressBar}"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState([
      'isReversedProgressBar',
    ]),
  },
};
</script>

<style lang="sass" scoped>
</style>
