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
                   aria-describedby="pomodoroDuration"
                   placeholder="25"
                   v-model.lazy.number="initTime"
            >
            <small class="form-text text-muted">
              Set pomodoro duration in minutes here.
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
        <div id="themes" class="form-group container">
          <div class="row">
            <div v-for="(color, colorName, index) in colorThemes"
                 class="col-sm p-1">
              <input
                type="radio"
                name="theme"
                :id="'color' + index"
                :value="colorName"
                :checked="colorName === colorTheme"
                v-model="colorTheme"
              >
              <label
                :for="'color' + index"
                :style="{'background-color': color.primary, 'box-shadow': colorName === colorTheme ? checkedColorThemeStyle : 'none'}"
              >
              </label>
            </div>
          </div>
          <div class="row">
            <small class="form-text text-muted">
              Choose color theme.
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex';
  import { COLOR_THEMES } from "../constants";

  export default {
    data() {
        return {
          initTime: 0,
          curTime: 0,
          pomodorosGoal: 0,
          goalIndicatorFormat: null,
          isTimerTitle: false,
          isReversedProgressBar: false,
          notificationTitle: '',
          notificationBody: '',
          notificationPermission: '',
          colorTheme: '',
          colorThemes: COLOR_THEMES
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
      }),
      checkedColorThemeStyle() {
        return '0 0 0.2rem 0.2rem ' + this.colorThemes[this.colorTheme].dark
      }
    },
    created() {
      this.notificationPermission = Notification.permission;
      this.initTime = this.storeInitTime;
      this.curTime = this.storeCurTime;
      this.pomodorosGoal = this.storePomodorosGoal;
      this.goalIndicatorFormat = this.storeGoalIndicatorFormat;
      this.isTimerTitle = this.storeIsTimerTitle;
      this.isReversedProgressBar = this.storeIsReversedProgressBar;
      this.notificationTitle = this.storeNotificationTitle;
      this.notificationBody = this.storeNotificationBody;
      this.colorTheme = this.storeColorTheme;
    },
    watch: {
      initTime: function() {
        if (this.initTime === this.curTime) {
          this.setTime(this.initTime);
        }
        this.setInitTime(this.initTime);
      },
      pomodorosGoal: function() {
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
        'setColorTheme'
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
      width: 100%

    input:checked + label
      transition: all 0.15s

</style>
