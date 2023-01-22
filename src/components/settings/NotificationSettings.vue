<template>
  <div
    class="btn-round"
    :class="{active: isOpened}"
  >
    <div
      v-if="isGranted"
      class="element__open-area"
      @click="isOpened = !isOpened"
    >
      <i class="fas fa-bell" />
    </div>
    <div v-else-if="isDenied">
      <i class="fas fa-lock" />
    </div>
    <div
      v-else
      @click="notify"
    >
      <i class="fas fa-bell-slash" />
    </div>
    <div
      v-if="isOpened"
      class="element__close-area"
      @click="isOpened = false"
    />
    <transition name="fade">
      <div
        v-if="isOpened"
        class="element__input-area container"
      >
        <div class="row py-2">
          <div class="col-12">
            <div class="mb-2">
              <small class="form-text text-muted mb-1">
                Notification title
              </small>
              <input
                v-model.lazy="notificationTitle"
                type="text"
                class="form-control"
              >
            </div>
            <div class="">
              <small class="form-text text-muted mb-1">
                Notification message
              </small>
              <input
                v-model.lazy="notificationBody"
                type="text"
                class="form-control"
              >
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'TitleSettings',
  data() {
    return {
      isGranted: false,
      isDenied: false,
      isOpened: false,
    };
  },
  computed: {
    notificationTitle: {
      get() {
        return this.$store.state.notificationTitle;
      },
      set(notificationTitle) {
        this.$store.commit('SET_NOTIFICATION_TITLE', notificationTitle);
      },
    },
    notificationBody: {
      get() {
        return this.$store.state.notificationBody;
      },
      set(notificationBody) {
        this.$store.commit('SET_NOTIFICATION_BODY', notificationBody);
      },
    },
  },
  created() {
    this.isGranted = Notification.permission === 'granted';
    this.isDenied = Notification.permission === 'denied';
  },
  methods: {
    notify() {
      if (Notification.permission === 'default') {
        Notification.requestPermission(() => {
          this.isGranted = Notification.permission === 'granted';
          this.isDenied = Notification.permission === 'denied';
        });
      }
    },
  },
};
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
  background-color: var(--primary)!important

.fade-enter
  opacity: 0

.fade-enter-active
  transition: opacity 0.3s

.fade-leave

.fade-leave-active
  transition: opacity 0.3s
  opacity: 0

</style>
