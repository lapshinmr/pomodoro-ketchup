<template>
  <transition name="fade">
    <p-tooltip
      v-if="isShown"
      :coordinates="{ x, y }"
    >
      <div>
        {{ item.note }}
      </div>
      <div>
        {{ item.value }} pomodoro{{ item.value > 1 ? 's' : '' }}
      </div>
    </p-tooltip>
  </transition>
</template>

<script>
import { mapState } from 'vuex';

import PTooltip from '@/components/Base/PTooltip.vue';

export default {
  name: 'StatisticTooltip',
  components: {
    PTooltip,
  },
  props: {
    isShown: {
      type: Boolean,
      default: false,
    },
    x: {
      type: Number,
      default: 0,
    },
    y: {
      type: Number,
      default: 0,
    },
    item: {
      type: Object,
      default() {
        return {
          note: '',
          value: '',
        };
      },
    },
  },
  computed: {
    ...mapState([
      'statistic',
    ]),
  },
};
</script>

<style scoped>

</style>
