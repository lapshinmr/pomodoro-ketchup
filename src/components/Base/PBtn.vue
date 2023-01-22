<template>
  <button
    class="p-btn"
    :class="{
      'p-btn--icon': icon,
      'p-btn--small': small,
    }"
    :style="{
      '--button-size': size,
    }"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'PBtn',
  props: {
    icon: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    size() {
      if (this.small) {
        return '32px';
      }
      return '56px';
    },
  },
};
</script>

<style lang="sass" scoped>
.p-btn
  display: inline-flex
  justify-content: center
  align-items: center
  height: var(--button-size)
  color: $primary
  background-color: transparent
  cursor: pointer
  transition: all 0.15s ease
  border: 2px solid transparent
  &:hover
    border-color: $primary
  &:active
    border-color: $dark
    color: $dark
  &--icon
    width: var(--button-size)
    border-radius: 50%
</style>
