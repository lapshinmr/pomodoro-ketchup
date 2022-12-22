<template>
  <div
    class="popup noselect"
    :style="location"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'PPopup',
  props: {
    coordinates: {
      type: Object,
      default() {
        return {
          x: 0,
          y: 0,
        };
      },
    },
  },
  computed: {
    location() {
      return {
        left: `${this.coordinates.x + 10}px`,
        top: `${this.coordinates.y + 10}px`,
      };
    },
  },
};
</script>

<style lang="sass" scoped>
.popup
  position: fixed
  color: var(--super-light)
  background-color: var(--super-dark)
  font-size: 2.5%
  opacity: 0.8
  border-radius: 0.25em
  padding: 0.5em
</style>
