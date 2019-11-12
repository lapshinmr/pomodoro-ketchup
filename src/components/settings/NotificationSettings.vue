<template>
  <div class="settings__element" :class="{active: isOpened}">
    <div class="element__open-area" @click="isOpened = !isOpened">
      <i class="fas fa-bell"></i>
    </div>
    <div
        v-if="isOpened"
        class="element__close-area"
        @click="isOpened = false">
    </div>
    <transition name="fade">
      <div v-if="isOpened" class="element__input-area container">
        <div class="row py-2">
          <div class="col-12">
            <div class="mb-2">
              <small class="form-text text-muted mb-1">
                Notification title
              </small>
              <input type="text"
                     class="form-control"
                     v-model.lazy.text="notificationTitle"
              >
            </div>
            <div class="">
              <small class="form-text text-muted mb-1">
                Notification message
              </small>
              <input type="text"
                     class="form-control"
                     v-model.lazy.text="notificationBody"
              >
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'title-settings',
  data() {
    return {
      permission: Notification.permission,
      isOpened: false
    }
  },
  computed: {
    notificationTitle: {
      get() {
        return this.$store.state.notificationTitle
      },
      set(notificationTitle) {
        this.setNotificationTitle(notificationTitle)
      }
    },
    notificationBody: {
      get() {
        return this.$store.state.notificationBody
      },
      set(notificationBody) {
        this.setNotificationBody(notificationBody)
      }
    }
  },
  methods: {
    ...mapActions([
      'setNotificationTitle',
      'setNotificationBody',
    ]),
    notify () {
      if (!Notification) {
        alert('Desktop notifications not available in your browser. Try Chromium.')
        return
      }
      if (Notification.permission !== 'granted') {
        Notification.requestPermission((permission) => {
          this.notificationPermission = Notification.permission
        })
      }
      this.notificationPermission = Notification.permission
    }
  }
}
</script>

<style lang="sass" scoped>
.element__input-area
  position: absolute
  left: 3.5vh
  top: 7vh
  width: 40vw
  background-color: var(--light)
  border: 1px solid var(--primary)
  box-shadow: 0 0 10px var(--dark)
  border-radius: 5px
  color: var(--super-dark)
  small
    font-size: 70%
  input
    background-color: var(--super-light)

.element__open-area
  width: 100%
  height: 100%
  display: flex
  justify-content: center
  align-items: center

.element__close-area
  position: fixed
  left: 0
  right: 0
  top: 0
  bottom: 0

.active
  background-color: var(--dark)!important


.fade-enter
  opacity: 0

.fade-enter-active
  transition: opacity 0.3s

.fade-leave

.fade-leave-active
  transition: opacity 0.3s
  opacity: 0

</style>
