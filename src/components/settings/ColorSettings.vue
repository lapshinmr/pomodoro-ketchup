<template>
  <div
    class="btn-round"
    @click="nextColorTheme"
  >
    <i class="fas fa-palette" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { COLOR_THEMES } from '@/helpers/const/constants';

export default {
  name: 'ColorSettings',
  data() {
    return {
      colorThemes: COLOR_THEMES,
    };
  },
  computed: {
    ...mapState([
      'colorTheme',
    ]),
  },
  methods: {
    ...mapActions([
      'setColorTheme',
    ]),
    nextColorTheme() {
      const colorThemeList = Object.keys(this.colorThemes).sort();
      const nextColorThemeIdx = (colorThemeList.indexOf(this.colorTheme) + 1) % colorThemeList.length;
      this.setColorTheme(colorThemeList[nextColorThemeIdx]);
    },
  },
};
</script>

<style lang="sass" scoped>
</style>
