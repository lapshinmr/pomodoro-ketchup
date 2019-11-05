<template>
  <div class="d-flex justify-content-center align-items-center" @click="nextColorTheme">
    <i class="fas fa-palette"></i>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { COLOR_THEMES } from '@/constants'

export default {
  name: 'color-settings',
  data() {
    return {
      colorThemes: COLOR_THEMES
    }
  },
  computed: {
    ...mapState([
      'colorTheme'
    ])
  },
  methods: {
    ...mapActions([
      'setColorTheme'
    ]),
    nextColorTheme() {
      let colorThemeList = Object.keys(this.colorThemes).sort();
      let nextColorThemeIdx = (colorThemeList.indexOf(this.colorTheme) + 1) % colorThemeList.length
      this.setColorTheme(colorThemeList[nextColorThemeIdx])
    }
  }
}
</script>

<style lang="sass" scoped>
div
  height: 5vh
  width: 5vh
  margin-bottom: 0
  border-radius: 50%
  cursor: pointer
  transition: all 0.15s
  color: var(--super-light)
  background-color: var(--primary)
  &:hover
    background-color: var(--dark)
</style>
