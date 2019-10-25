<template>
  <div>
    <div v-for="(color, colorName, index) in colorThemes"
    >
      <input
        type="radio"
        name="theme"
        :id="'color' + index"
        :value="colorName"
        v-model="colorTheme"
      >
      <label
        :for="'color' + index"
        :style="label(colorName)"
      >
      </label>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { COLOR_THEMES } from '@/constants'

export default {
  name: 'color-settings',
  data() {
    return {
      colorThemes: COLOR_THEMES
    }
  },
  computed: {
    colorTheme: {
      get() {
        return this.$store.state.colorTheme
      },
      set(colorTheme) {
        this.setColorTheme(colorTheme)
      }
    },
  },
  methods: {
    ...mapActions([
      'setColorTheme'
    ]),
    label: function(colorName) {
      console.log("10 10 10 " + this.colorThemes[colorName].dark)
      return {
        '--color-background': this.colorTheme === colorName ? this.colorThemes[colorName].dark : this.colorThemes[colorName].primary,
        '--color-hover': this.colorTheme === colorName ? this.colorThemes[colorName].superDark : this.colorThemes[colorName].dark
      }
    }
  }
}
</script>

<style lang="sass" scoped>
input
  display: none

label
  height: 5vh
  width: 5vh
  margin-bottom: 0
  border-radius: 50%
  cursor: pointer
  transition: all 0.15s
  background-color: var(--color-background)

input:checked + label
  background-color: var(--color-background)!important
  box-shadow: 0 0 10px var(--color-hover)

label, input:checked + label
  &:hover
    background-color: var(--color-hover)!important
</style>
