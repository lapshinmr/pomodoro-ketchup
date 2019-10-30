<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10 col-md-8 offset-sm-1 offset-md-2">
        <div class="mb-3">
          <small class="form-text">
            Notification title
          </small>
          <input type="text"
                 class="form-control"
                 v-model.lazy.text="notificationTitle"
          >
        </div>
        <div class="mb-3">
          <small class="form-text">
            Notification message
          </small>
          <input type="text"
                 class="form-control"
                 v-model.lazy.text="notificationBody"
          >
        </div>
        <div class="mb-3">
          <div v-if="notificationPermission === 'denied'">
            <p class="mb-0">
              Notification blocked
            </p>
            <small class="mt-0 form-text text-muted">
              To allow notification use browser settings.
            </small>
          </div>
          <button v-if="notificationPermission !== 'granted' && notificationPermission !== 'denied'"
                  class="btn btn-success btn-block rounded-0"
                  @click="notify"
          >
            Turn on notification
          </button>
        </div>
        <div class="settings-button d-flex mb-3">
          <div class="flex-fill">
            <input type="checkbox"
                   id="title-timer-check"
                   v-model="isTimerTitle"
            >
            <label for="title-timer-check">
              Title timer
            </label>
          </div>
          <div class="setttings-button flex-fill ml-3">
            <input type="checkbox"
                   id="progress-bar-check"
                   v-model="isReversedProgressBar"
            >
            <label for="progress-bar-check">
              Reverse timer bar
            </label>
          </div>
        </div>
        <div class="settings-button mb-3">
          <div v-for="(text, index) in ['30 of 60', '50%', '30 of 60 (50%)']"
               class="flex-fill"
               :class="{'ml-3': index !== 0}"
          >
            <input
               type="radio"
               name="goalIndicatorFormat"
               :id="'indicator' + index"
               :value="index"
               v-model.number="goalIndicatorFormat"
            >
            <label :for="'indicator' + index">
              {{ text }}
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { secondsToTime } from '../store'

const isNumber = function (value) {
  return /^\d+$/.test(value)
}

const stringToTimeSeconds = function (value) {
  value = value.replace(':', '')
  if (!isNumber(value)) {
    return false
  }
  let length = value.length
  if (length < 1 || length > 4) {
    return false
  }
  let digitLimits = [9, 9, 5, 9]
  let digitCheck = value.split('').every(function (value, index) {
    return value <= digitLimits[4 - length + index]
  })
  if (!digitCheck) {
    return false
  }
  let seconds = value.slice(-2)
  let minutes = value.slice(0, length - 2)
  return Number(minutes) * 60 + Number(seconds)
}

export default {
  data () {
    return {
      notificationPermission: Notification.permission,

    }
  },
  computed: {
    isTimerTitle: {
      get() {
        return this.$store.state.isTimerTitle
      },
      set(isTimerTitle) {
        this.switchTimerTitleFlag()
      }
    },
    isReversedProgressBar: {
      get() {
        return this.$store.state.isReversedProgressBar
      },
      set(isTimerTitle) {
        this.switchProgressBarFlag()
      }
    },
    goalIndicatorFormat: {
      get() {
        return this.$store.state.goalIndicatorFormat
      },
      set(goalIndicatorFormat) {
        this.setGoalIndicatorFormat(goalIndicatorFormat)
      }
    },
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
      'setInitTime',
      'setPomodorosGoal',
      'setLeftTime',
      'switchTimerTitleFlag',
      'switchProgressBarFlag',
      'setGoalIndicatorFormat',
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
  },
  filters: {
    capitalize (value) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>

<style scoped lang="sass">
.mb-3
  margin-bottom: 0.75rem!important
.ml-3
  margin-left: 0.5rem!important

@media (min-width: 321px)
  .mb-3
    margin-bottom: 1rem!important
  .ml-3
    margin-left: 1rem!important

.container
  padding-top: 70px

  @media (min-width: 321px)
    padding-top: 100px

.settings-button
  height: 40px
  display: flex
  justify-content: center
  align-items: center

  div
    height: 100%

  input
    display: none

  label
    height: 100%
    width: 100%
    display: flex
    justify-content: center
    align-items: center
    margin-bottom: 0
    cursor: pointer
    background-color: var(--light)
    color: var(--super-dark)
    transition: all 0.15s

  input:checked + label
    background-color: var(--dark)
    color: var(--super-light)

  label, input:checked + label
    &:hover
      background-color: var(--super-dark)
      color: var(--super-light)

.slider
  height: 40px

  input
    -webkit-appearance: none
    appearance: none
    width: 100%
    margin: 15px 0
    height: 10px
    border-radius: 5px
    background: var(--primary)
    outline: none
    opacity: 0.7
    -webkit-transition: .2s
    transition: opacity .2s

  input:hover
    opacity: 1

  input::-webkit-slider-thumb
    -webkit-appearance: none
    appearance: none
    width: 25px
    height: 25px
    border-radius: 50%
    background: var(--dark)
    cursor: pointer

  input::-moz-range-thumb
    width: 25px
    height: 25px
    border-radius: 50%
    background: var(--dark)
    cursor: pointer

  span
    width: 70px
    height: 40px
    font-size: 1.5rem
    line-height: 40px
    text-align: right
</style>
