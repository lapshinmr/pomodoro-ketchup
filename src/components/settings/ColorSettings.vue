<template>
  <div class="btn-round" @click="nextColorTheme">
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
</style>
