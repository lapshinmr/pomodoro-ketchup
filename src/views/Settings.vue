<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10 offset-sm-1">
        <div class="form-group">
          <label for="pomodoro">
            Pomodoro
          </label>
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
        <div class="form-group">
          <label for="goal">
            Goal
          </label>
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
        <div class="form-group form-check">
          <input type="checkbox"
                 id="notification"
                 class="form-check-input"
                 v-model="isNotification"
                 @click="notify"
          >
          <label class="form-check-label"
                 for="notification">
            Browser notifications.
          </label>
        </div>
        <div class="form-group form-check">
          <input type="checkbox"
                 id="title"
                 class="form-check-input"
                 v-model="timerTitle"
                 @click="switchTimerTitle"
          >
          <label class="form-check-label"
                 for="title">
            Title timer indication.
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
          isNotification: false,
          timerTitle: false,
          goalIndicatorFormat: null
        }
    },
    created() {
      this.pomodoro = this.getInitTimeSeconds() / 60;
      this.goal = this.getPomodorosGoal();
      this.isNotification = Notification.permission !== 'granted';
      this.timerTitle = this.getTimerTitle();
      this.goalIndicatorFormat = this.getGoalIndicatorFormat();
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
        console.log(this.goalIndicatorFormat);
        this.setGoalIndicatorFormat(this.goalIndicatorFormat);
      }
    },
    methods: {
      ...mapActions([
        'setInitTime',
        'setTime',
        'setPomodorosGoal',
        'switchTimerTitle',
        'setGoalIndicatorFormat'
      ]),
      ...mapGetters([
        'getInitTimeSeconds',
        'getTimeSeconds',
        'getPomodorosGoal',
        'getTimerTitle',
        'getGoalIndicatorFormat'
      ]),
      permission() {
        document.addEventListener('DOMContentLoaded', function () {
          if (!Notification) {
            alert('Desktop notifications not available in your browser. Try Chromium.');
            return;
          }

          if (Notification.permission !== 'granted')
            Notification.requestPermission();
        });
      },
      notify() {
        if (Notification.permission !== 'granted')
          Notification.requestPermission();
        else {
          let notification = new Notification('Notification title', {
            //icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
            body: '+1'
          });
        }
      }
    }
  }
</script>
