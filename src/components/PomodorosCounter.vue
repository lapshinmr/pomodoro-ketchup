<template>
  <div id="pomodoroscounter">
    <div id="progressbar" :style="progressbar">
      <div class="d-flex justify-content-left">
        <div class="ml-4">
          {{ pomodoros }}
        </div>
      </div>
    </div>
    <div id="buttons" class="d-flex justify-content-between mt-auto">
      <button class="btn btn-outline-success btn-lg rounded-circle" @click="increase">+</button>
      <button class="btn btn-outline-success btn-lg rounded-circle" @click="decrease">-</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'pomodoros-counter',
    computed: {
      progressbar() {
        return {
            "height": this.$store.state.pomodoros * 50 + 'px',
            "background-color": "$primary"
        }
      },
      pomodoros() {
        return this.$store.state.pomodoros
      }
    },
    methods: {
      increase() {
        this.$store.commit('ADD_POMODORO')
      },
      decrease() {
        this.$store.commit('REMOVE_POMODORO')
      }
    }
  }
</script>

<style scoped lang="sass">
  #pomodoroscounter
    position: fixed
    bottom: 0
    left: 0
    height: 100vh
    width: 100vw
    z-index: 1

    #buttons
      position: absolute
      bottom: 30px
      margin-left: 10%
      width: 80%

    #progressbar
      position: absolute
      bottom: 0
      width: 100vw
      transition: 0.3s
      color: white

</style>
