<template>
  <div>
    <p>
      {{ pomodoros }}
    </p>
    <div>
      <button class="btn btn-outline-success" @click="increase">+</button>
      <button class="btn btn-outline-success ml-2" @click="decrease">-</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'pomodoros-counter',
    computed: {
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

<style scoped>

</style>
