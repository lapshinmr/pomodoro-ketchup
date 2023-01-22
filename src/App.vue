<template>
  <div
    class="app"
    :style="COLORS"
  >
    <timer-title :title="title" />

    <github-link />

    <div class="navigation">
      <router-link
        v-if="$router.currentRoute.path !== '/'"
        to="/"
        class="btn-round"
      >
        <i class="far fa-clock" />
      </router-link>
      <router-link
        v-else
        to="/statistic"
        class="btn-round"
      >
        <p-icon name="chart" />
      </router-link>

      <!-- SETTINGS -->
      <button
        class="btn-round"
        @click="isSettingsMode = !isSettingsMode"
      >
        <p-icon
          v-if="!isSettingsMode"
          name="cog"
        />
        <p-icon
          v-else
          name="close"
        />
      </button>
      <transition name="slide">
        <div
          v-if="isSettingsMode"
          class="settings__elements d-flex ml-2"
        >
          <component
            v-for="item in components"
            :key="item"
            :is="item + '-settings'"
            class="list-item"
            :is-settings-mode="isSettingsMode"
          />
        </div>
      </transition>
    </div>

    <transition
      name="fade"
      mode="out-in"
    >
      <router-view :is-settings-mode="isSettingsMode" />
    </transition>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import TimerTitle from '@/components/TimerTitle.vue';
import GithubLink from '@/components/GithubLink.vue';
import ColorSettings from '@/components/settings/ColorSettings.vue';
import SoundSettings from '@/components/settings/SoundSettings.vue';
import ProgressSettings from '@/components/settings/ProgressSettings.vue';
import TitleSettings from '@/components/settings/TitleSettings.vue';
import NotificationSettings from '@/components/settings/NotificationSettings.vue';
import SyncSettings from '@/components/settings/SyncSettings.vue';
import { TAB_TITLE_DEFAULT } from './helpers/const/constants';

export default {
  components: {
    TimerTitle,
    GithubLink,
    ColorSettings,
    SoundSettings,
    ProgressSettings,
    TitleSettings,
    NotificationSettings,
    SyncSettings,
  },
  data() {
    return {
      isSettingsMode: false,
      components: ['color', 'sound', 'progress', 'title', 'notification', 'sync'],
    };
  },
  computed: {
    ...mapState([
      'isTimerTitle',
    ]),
    ...mapGetters([
      'CUR_TIME_FORMATTED',
      'COLORS',
    ]),
    title() {
      return this.isTimerTitle ? this.CUR_TIME_FORMATTED : TAB_TITLE_DEFAULT;
    },
  },
  created() {
    this.startTimer();
    this.startTimerExtra();
  },
  methods: {
    ...mapActions([
      'startTimer',
      'startTimerExtra',
    ]),
  },

};
</script>

<style lang="sass">
.app
  color: var(--super-dark)
  background-color: var(--super-light)
  height: 100vh

.navigation
  position: absolute
  left: 5px
  top: 5px
  display: flex
  padding: 0
  z-index: 1000
</style>
