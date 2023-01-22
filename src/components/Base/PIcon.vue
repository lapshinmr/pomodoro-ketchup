<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    :aria-labelledby="componentName"
    role="presentation"
  >
    <title :id="componentName" lang="en">
      {{ componentName }} icon
    </title>
    <g :fill="iconColor">
      <component :is="componentName" />
    </g>
  </svg>
</template>

<script>
import * as icons from '@/components/Icons';
import { capitalize } from '@/helpers/funcs/string';

export default {
  name: 'PIcon',
  components: {
    ...icons,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    width: {
      type: [Number, String],
      default: 48,
    },
    height: {
      type: [Number, String],
      default: 48,
    },
    iconColor: {
      type: String,
      default: 'currentColor',
    },
  },
  computed: {
    componentName() {
      const name = this.name.split('-').map((part) => capitalize(part)).join('');
      console.log(name);
      return `Icon${capitalize(name)}`;
    },
  },
};
</script>

<style scoped>
</style>
