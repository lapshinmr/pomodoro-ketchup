<template>
  <transition name="fade">
    <div class="popup" @keydown.enter="togglePopup">
      <div
          class="popup__close-area"
          @click="togglePopup">
      </div>
      <div class="popup__container container">
        <div class="row my-3">
          <div class="col-12">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'popup',
  props: ['togglePopup', 'isOpened'],
  data() {
    return {
    }
  }
}
</script>

<style lang="sass" scoped>
.popup
  position: absolute
  left: 3.5vh
  top: 7vh
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

.popup__close-area
  position: fixed
  left: 0
  right: 0
  top: 0
  bottom: 0
</style>
