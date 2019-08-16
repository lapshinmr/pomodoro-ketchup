<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10 col-md-8 offset-sm-1 offset-md-2">
        <div class="mb-3 d-flex">
          <div class="flex-fill">
            <small class="form-text">
              Pomodoro duration
            </small>
            <input type="text"
                   id="pomodoro"
                   class="form-control"
                   placeholder="25:00"
                   v-model.lazy.string="initTime"
            >
          </div>
          <div class="flex-fill ml-3">
            <small class="form-text">
              Pomodoros goal
            </small>
            <input type="text"
                   id="goal"
                   class="form-control"
                   placeholder="70"
                   v-model.lazy.number="pomodorosGoal"
            >
          </div>
        </div>
        <div class="mb-3">
          <small class="form-text">
            Notification title
          </small>
          <input type="text"
                 id="title"
                 class="form-control"
                 placeholder="Time is over."
                 v-model.lazy.text="notificationTitle"
          >
        </div>
        <div class="mb-3">
          <small class="form-text">
            Notification message
          </small>
          <input type="text"
                 id="message"
                 class="form-control"
                 placeholder="Well done!"
                 v-model.lazy.text="notificationBody"
          >
        </div>
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div v-if="notificationPermission === 'granted'">
            <p class="mb-0 text-success">
              Notifications allowed
            </p>
            <small class="mt-0 form-text text-muted">
              To block notification use browser settings.
            </small>
          </div>
          <div v-if="notificationPermission === 'denied'">
            <p class="mb-0 text-danger">
              Notification blocked
            </p>
            <small class="mt-0 form-text text-muted">
              To allow notification use browser settings.
            </small>
          </div>
          <button v-if="notificationPermission !== 'granted' && notificationPermission !== 'denied'"
                  id="notification"
                  class="btn btn-outline-success"
                  @click="notify"
          >
            Turn on notification
          </button>
          <div class="slider flex-grow-1 d-flex align-content-center justify-content-between ml-3">
            <input
              class="flex-fill"
              type="range"
              min="0"
              max="100"
              v-model.number="notificationVolume"
            >
            <span class="slider-value">
              {{ notificationVolume }}
            </span>
          </div>
        </div>
        <div id="sounds" class="mb-3">
          <div v-for="(soundName, index) in storeNotificationSounds"
               class="flex-fill"
               :class="{'ml-3': index !== 0}"
          >
            <input
              type="radio"
              name="sound"
              :id="'sound' + index"
              :value="soundName"
              v-model="notificationSound"
              @click="playSound(soundName)"
            >
            <label :for="'sound' + index" :style="buttonStyle(soundName === notificationSound)">
              sound {{ index + 1 }}
            </label>
          </div>
        </div>
        <div class="d-flex mb-3">
          <div id="title-timer" class="flex-fill">
            <input type="checkbox"
                   id="title-timer-check"
                   class="form-check-input"
                   v-model="isTimerTitle"
                   @click="switchTimerTitleFlag"
            >
            <label for="title-timer-check" :style="buttonStyle(isTimerTitle)">
              tab timer
            </label>
          </div>
          <div id="progress-bar" class="flex-fill ml-3">
            <input type="checkbox"
                   id="progress-bar-check"
                   class=""
                   v-model="isReversedProgressBar"
                   @click="switchProgressBarFlag"
            >
            <label for="progress-bar-check" :style="buttonStyle(isReversedProgressBar)">
              revers progress
            </label>
          </div>
        </div>
        <div id="indicators" class="mb-3">
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
            <label
              :for="'indicator' + index"

              :style="buttonStyle(index === goalIndicatorFormat)"
            >
              {{ text }}
            </label>
          </div>
        </div>
        <div id="themes" class="mb-3">
          <div v-for="(color, colorName, index) in storeColorThemes"
               class="flex-fill"
               :class="{'ml-3': index !== 0}"
          >
            <input
              type="radio"
              name="theme"
              :id="'color' + index"
              :value="colorName"
              v-model="colorTheme"
            >
            <label :for="'color' + index" :style="buttonStyle(colorName === colorTheme)"
            >{{ colorName }}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
  import { secondsToTime } from "../store";


  const isNumber = function(value) {
    return /^\d+$/.test(value)
  };

  const stringToTimeSeconds = function(value) {
    value = value.replace(':', '');
    if (!isNumber(value)) {
      return false
    }
    let length = value.length;
    if (length < 1 || length > 4) {
      return false
    }
    let digitLimits = [9, 9, 5, 9];
    let digitCheck = value.split('').every(function (value, index) {
      return value < digitLimits[4 - length + index]
    });
    if (!digitCheck) {
      return false
    }
    let seconds = value.slice(-2);
    let minutes = value.slice(0, length - 2);
    return Number(minutes) * 60 + Number(seconds);
  };

  export default {
    data() {
      return {
        initTime: '',
        pomodorosGoal: 0,
        goalIndicatorFormat: null,
        isTimerTitle: false,
        isReversedProgressBar: false,
        notificationTitle: '',
        notificationBody: '',
        notificationSound: '',
        notificationPermission: '',
        colorTheme: '',
        notificationVolume: 100
      }
    },
    computed: {
      ...mapState({
        'storeInitTime': 'initTime',
        'storeCurTime': 'curTime',
        'storePomodorosGoal': 'pomodorosGoal',
        'storeGoalIndicatorFormat': 'goalIndicatorFormat',
        'storeIsTimerTitle': 'isTimerTitle',
        'storeIsReversedProgressBar': 'isReversedProgressBar',
        'storeNotificationTitle': 'notificationTitle',
        'storeNotificationBody': 'notificationBody',
        'storeColorTheme': 'colorTheme',
        'storeColorThemes': 'colorThemes',
        'storeNotificationSounds': 'notificationSounds',
        'storeNotificationSound': 'notificationSound',
        'storeNotificationVolume': 'notificationVolume',
      }),
      ...mapGetters([
        'CUR_TIME_FORMATTED'
      ]),
    },
    created() {
      this.notificationPermission = Notification.permission;
      this.initTime = secondsToTime(this.storeInitTime);
      this.curTime = this.storeCurTime;
      this.pomodorosGoal = this.storePomodorosGoal;
      this.goalIndicatorFormat = this.storeGoalIndicatorFormat;
      this.isTimerTitle = this.storeIsTimerTitle;
      this.isReversedProgressBar = this.storeIsReversedProgressBar;
      this.notificationTitle = this.storeNotificationTitle;
      this.notificationBody = this.storeNotificationBody;
      this.colorTheme = this.storeColorTheme;
      this.notificationSound = this.storeNotificationSound;
      this.notificationVolume = this.storeNotificationVolume;
    },
    watch: {
      initTime: function () {
        let initTimeSeconds = stringToTimeSeconds(this.initTime);
        if (!initTimeSeconds) {
          this.initTime = secondsToTime(this.storeInitTime);
          return
        }
        this.initTime = secondsToTime(initTimeSeconds);
        if (this.storeInitTime === this.storeCurTime) {
          this.setTime(initTimeSeconds);
        }
        this.setInitTime(initTimeSeconds);
      },
      pomodorosGoal: function () {
        if (!isNumber(this.pomodorosGoal)) {
          this.pomodorosGoal = this.storePomodorosGoal;
          return
        }
        this.setPomodorosGoal(this.pomodorosGoal);
      },
      goalIndicatorFormat: function () {
        this.setGoalIndicatorFormat(this.goalIndicatorFormat);
      },
      notificationTitle: function () {
        this.setNotificationTitle(this.notificationTitle);
      },
      notificationBody: function () {
        this.setNotificationBody(this.notificationBody);
      },
      colorTheme: function () {
        this.setColorTheme(this.colorTheme)
      },
      notificationSound: function() {
        this.setNotificationSound(this.notificationSound)
      },
      notificationVolume: function() {
        this.setNotificationVolume(this.notificationVolume);
      }
    },
    methods: {
      ...mapMutations([
        'SET_THEME'
      ]),
      ...mapActions([
        'setInitTime',
        'setTime',
        'setPomodorosGoal',
        'switchTimerTitleFlag',
        'switchProgressBarFlag',
        'setGoalIndicatorFormat',
        'setNotificationTitle',
        'setNotificationBody',
        'setColorTheme',
        'setNotificationSound',
        'setNotificationVolume',
      ]),
      buttonStyle(condition) {
        let colorThemeObj = this.storeColorThemes[this.colorTheme];
        return {
          'background-color': condition ? colorThemeObj.dark : colorThemeObj.light,
          //'box-shadow': condition ? '0 0 0.5rem 0.2rem ' + colorThemeObj.dark : 'none',
          'color': condition ? colorThemeObj.superLight : colorThemeObj.superDark,
        }
      },
      notify() {
        if (!Notification) {
          alert('Desktop notifications not available in your browser. Try Chromium.');
          return;
        }
        if (Notification.permission !== 'granted') {
          Notification.requestPermission((permission) => {
            this.notificationPermission = Notification.permission;
          });
        }
        this.notificationPermission = Notification.permission;
      },
      playSound(sound) {
        let audio = new Audio(require('@/assets/' + sound));
        audio.volume = this.notificationVolume / 100;
        audio.play();
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

  #themes, #sounds, #indicators, #progress-bar, #title-timer
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
      text-transform: capitalize
      cursor: pointer

    input:checked + label
      transition: all 0.15s


  .slider
    height: 40px

    input
      -webkit-appearance: none
      appearance: none
      width: 100%
      margin: 15px 0
      height: 10px
      border-radius: 5px
      background: var(--light)
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
