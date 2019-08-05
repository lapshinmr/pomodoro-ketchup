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
                   v-model.lazy.number="pomodoro"
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
                   v-model.lazy.number="goal"
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
                 v-model="timerTitle"
                 @click="switchTimerTitle"
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
                 v-model="reversedProgressBar"
                 @click="switchProgressBar"
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
        <div class="form-group">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    data() {
        return {
          pomodoro: 0,
          goal: 0,
          notificationTitle: '',
          notificationBody: '',
          notificationPermission: '',
          timerTitle: false,
          reversedProgressBar: false,
          goalIndicatorFormat: null,
        }
    },
    created() {
      this.pomodoro = this.getInitTimeSeconds() / 60;
      this.goal = this.getPomodorosGoal();
      this.notificationPermission = Notification.permission;
      this.timerTitle = this.getTimerTitle();
      this.goalIndicatorFormat = this.getGoalIndicatorFormat();
      this.reversedProgressBar = this.getProgressBar();
      this.notificationTitle = this.getNotificationTitle();
      this.notificationBody = this.getNotificationBody();
    },
    watch: {
      pomodoro: function() {
        let pomodoro = this.pomodoro * 60;
        if (this.getInitTimeSeconds() === this.getTimeSeconds()) {
          this.setTime(pomodoro);
        }
        this.setInitTime(pomodoro);
      },
      goal: function() {
        let goal = this.goal;
        this.setPomodorosGoal(goal);
      },
      goalIndicatorFormat: function() {
        this.setGoalIndicatorFormat(this.goalIndicatorFormat);
      },
      notificationTitle: function() {
        this.setNotificationTitle(this.notificationTitle);
      },
      notificationBody: function() {
        this.setNotificationBody(this.notificationBody);
      }
    },
    methods: {
      ...mapActions([
        'setInitTime',
        'setTime',
        'setPomodorosGoal',
        'switchTimerTitle',
        'setGoalIndicatorFormat',
        'switchProgressBar',
        'setNotificationTitle',
        'setNotificationBody',
      ]),
      ...mapGetters([
        'getInitTimeSeconds',
        'getTimeSeconds',
        'getPomodorosGoal',
        'getTimerTitle',
        'getGoalIndicatorFormat',
        'getProgressBar',
        'getNotificationTitle',
        'getNotificationBody',
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
