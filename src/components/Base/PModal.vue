<template>
  <transition name="fade">
    <div
      v-if="value"
      class="modal-window"
      @keydown.enter="$emit('input', false)"
    >
      <div
        class="modal-window__close-area"
        @click="$emit('input', false)"
      />
      <div class="modal-window__container container">
        <div class="row my-3">
          <div class="col-12">
            <button
              type="button"
              class="close"
              aria-label="Close"
              @click="$emit('input', false)"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <slot />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'PModal',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="sass" scoped>
.modal-window
.modal-window__container
  position: absolute
  left: 50%
  top: 50%
  transform: translate(-50%, -50%)
  width: 40vw
  font-size: 1rem
  background-color: var(--light)
  border: 1px solid var(--primary)
  box-shadow: 0 0 10px var(--dark)
  border-radius: 5px
  color: var(--super-dark)
  z-index: 10000
  input
    background-color: var(--super-light)

.modal-window__close-area
  position: fixed
  left: 0
  right: 0
  top: 0
  bottom: 0
</style>
