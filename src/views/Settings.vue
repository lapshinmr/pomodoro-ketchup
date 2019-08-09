<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10 offset-sm-1">
        <div class="form-group row">
          <label for="pomodoro" class="col-sm-3 col-form-label">
            Pomodoro
          </label>
          <div class="col-sm-9">
            <input type="text"
                   id="pomodoro"
                   class="form-control"
                   placeholder="25:00"
                   v-model.lazy.string="initTime"
            >
            <small class="form-text text-muted">
              Set pomodoro duration here.
            </small>
          </div>
        </div>
        <div class="form-group row">
          <label for="goal" class="col-sm-3 col-form-label">
            Goal
          </label>
          <div class="col-sm-9">
            <input type="text"
                   id="goal"
                   class="form-control"
                   placeholder="70"
                   v-model.lazy.number="pomodorosGoal"
            >
            <small class="form-text text-muted">
              Set your goal of pomodoros (e.g. daily or weekly).
            </small>
          </div>
        </div>
        <div class="form-group row">
          <label for="title" class="col-sm-3 col-form-label">
            Title
          </label>
          <div class="col-sm-9">
            <input type="text"
                   id="title"
                   class="form-control"
                   placeholder="Time is over."
                   v-model.lazy.text="notificationTitle"
            >
            <small class="form-text text-muted">
              Write your own notification's title.
            </small>
          </div>
        </div>
        <div class="form-group row">
          <label for="message" class="col-sm-3 col-form-label">
            Message
          </label>
          <div class="col-sm-9">
            <input type="text"
                   id="message"
                   class="form-control"
                   placeholder="Well done!"
                   v-model.lazy.text="notificationBody"
            >
            <small class="form-text text-muted">
              Write your own notification's message.
            </small>
          </div>
        </div>
        <div class="form-group form-check">
          <input type="checkbox"
                 id="title-timer"
                 class="form-check-input"
                 v-model="isTimerTitle"
                 @click="switchTimerTitleFlag"
          >
          <label class="form-check-label"
                 for="title-timer">
            Title timer indication.
          </label>
        </div>
        <div class="form-group form-check">
          <input type="checkbox"
                 id="progress-bar"
                 class="form-check-input"
                 v-model="isReversedProgressBar"
                 @click="switchProgressBarFlag"
          >
          <label class="form-check-label"
                 for="progress-bar">
            Reversed progress bar.
          </label>
        </div>
        <div class="form-group">
          <div class="form-check form-check-inline">
            <input class="form-check-input"
                   type="radio"
                   name="goalIndicatorFormat"
                   id="indicator1"
                   value="0"
                   v-model.number="goalIndicatorFormat"
            >
            <label class="form-check-label" for="indicator1">
              30 of 60
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input"
                   type="radio"
                   name="goalIndicatorFormat"
                   id="indicator2"
                   value="1"
                   v-model.number="goalIndicatorFormat"
            >
            <label class="form-check-label" for="indicator2">
              50%
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input"
                   type="radio"
                   name="goalIndicatorFormat"
                   id="indicator3"
                   value="2"
                   v-model.number="goalIndicatorFormat"
            >
            <label class="form-check-label" for="indicator3">
              30 of 60 (50%)
            </label>
          </div>
          <small class="form-text text-muted">
            Choose goal indication format.
          </small>
        </div>
        <div id="themes" class="form-group container">
          <div class="row">
            <div v-for="(color, colorName, index) in storeColorThemes"
                 class="col-sm p-1 d-flex align-items-center">
              <input
                type="radio"
                name="theme"
                :id="'color' + index"
                :value="colorName"
                v-model="colorTheme"
              >
              <label
                class="mb-0"
                :for="'color' + index"
                :style="{'background-color': color.primary, 'box-shadow': colorName === colorTheme ? checkedColorThemeStyle : 'none'}"
              >
              </label>
              <span class="ml-2">
                {{ colorName }}
              </span>
            </div>
          </div>
          <div class="row">
            <small class="form-text text-muted">
              Choose color theme.
            </small>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label">
            Notifications
          </label>
          <div class="col-sm-9">
            <input
              v-if="notificationPermission === 'granted'"
              type="text"
              readonly
              class="form-control-plaintext text-success"
              value="allowed"
            >
            <input
              v-if="notificationPermission === 'denied'"
              type="text"
              readonly
              class="form-control-plaintext text-danger"
              value="blocked"
            >
            <button v-if="notificationPermission !== 'granted' && notificationPermission !== 'denied'"
                    id="notification"
                    class="btn btn-outline-success"
                    @click="notify"
            >
              Turn on browser notifications
            </button>
            <small class="form-text text-muted" v-if="notificationPermission === 'granted'">
              To block notifications use your browser's settings.
            </small>
            <small class="form-text text-muted" v-if="notificationPermission === 'denied'">
              To allow notifications use your browser's settings.
            </small>
          </div>
        </div>
        <div id="sounds" class="form-group container">
          <div class="row">
            <div v-for="(soundName, index) in storeNotificationSounds"
                 class="col-sm p-1 d-flex align-items-center">
              <input
                type="radio"
                name="sound"
                :id="'sound' + index"
                :value="soundName"
                v-model="notificationSound"
                @click="playSound(soundName)"
              >
              <label
                class="mb-0 ml-2"
                :for="'sound' + index"
              >
                sound {{ index + 1 }}
              </label>
            </div>
          </div>
          <div class="row">
            <small class="form-text text-muted">
              Choose notification sound.
            </small>
          </div>
        </div>
        <div class="form-group slidecontainer">
          <input type="range"
                 min="1"
                 max="100"
                 v-model.lazy.number="notificationVolume"
                 class="slider"
          >
          <small class="form-text text-muted">
            Set notification sound volume.
          </small>
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
      checkedColorThemeStyle() {
        return '0 0 0.2rem 0.2rem ' + this.storeColorThemes[this.colorTheme].dark
      }
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
      this.notificationSound = this.storeNotificationSound;
      this.colorTheme = this.storeColorTheme;
      this.notificationVolume = this.storeNotificationVolume;
    },
    watch: {
      initTime: function() {
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
      pomodorosGoal: function() {
        if (!isNumber(this.pomodorosGoal)) {
          this.pomodorosGoal = this.storePomodorosGoal;
          return
        }
        this.setPomodorosGoal(this.pomodorosGoal);
      },
      goalIndicatorFormat: function() {
        this.setGoalIndicatorFormat(this.goalIndicatorFormat);
      },
      notificationTitle: function() {
        this.setNotificationTitle(this.notificationTitle);
      },
      notificationBody: function() {
        this.setNotificationBody(this.notificationBody);
      },
      colorTheme: function() {
        this.setColorTheme(this.colorTheme)
      },
      notificationSound: function() {
        this.setNotificationSound(this.notificationSound)
      },
      notificationVolume: function() {
        this.setNotificationVolume(this.notificationVolume)
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
        var audio = new Audio(require('@/assets/' + sound));
        audio.volume = this.notificationVolume / 100;
        audio.play();
      }
    }
  }
</script>


<style scoped lang="sass">

  #themes
    input
      display: none

    label
      height: 30px
      width: 30px
      border-radius: 50%

    input:checked + label
      transition: all 0.15s

  .slidecontainer
    width: 100%

  .slider
    -webkit-appearance: none
    appearance: none
    width: 100%
    height: 10px
    border-radius: 5px
    background: var(--light)
    outline: none
    opacity: 0.7
    -webkit-transition: .2s
    transition: opacity .2s

  .slider:hover
    opacity: 1

  .slider::-webkit-slider-thumb
    -webkit-appearance: none
    appearance: none
    width: 25px
    height: 25px
    border-radius: 50%
    background: var(--dark)
    cursor: pointer

  .slider::-moz-range-thumb
    width: 25px
    height: 25px
    border-radius: 50%
    background: var(--dark)
    cursor: pointer

</style>
