<template>
  <div class="btn-round">
    <div
      class="element__open-area"
      @click="isOpened = !isOpened"
    >
      <i class="fas fa-sync" />
    </div>
    <div
      v-if="isOpened"
      class="element__close-area"
      @click="isOpened = false"
    />
    <transition name="fade">
      <div
        v-if="isOpened"
        class="element__input-area container"
      >
        <div class="row py-2">
          <div class="col-12">
            <div class="form-group">
              <small class="form-text text-muted mb-1">
                Use your key to sync the data
              </small>
              <input
                v-model.lazy="syncId"
                type="text"
                class="form-control"
              >
            </div>
            <div class="form-group">
              <button
                class="btn btn-success btn-sm"
                @click="generateKey"
              >
                Generate Key
              </button>
              <button
                class="btn btn-success btn-sm ml-2"
                @click="post"
              >
                Push
              </button>
              <button
                class="btn btn-success btn-sm ml-2"
                @click="sync"
              >
                Sync
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      isOpened: false,
    };
  },
  computed: {
    syncId: {
      get() {
        return this.$store.state.syncId;
      },
      set(value) {
        this.setSyncId(value);
      },
    },
  },
  methods: {
    ...mapActions([
      'setSyncId',
    ]),
    generateKey() {
      axios.get('/.json?shallow=true')
        .then((response) => {
          const generateRandomKey = (max, length = 1) => {
            let key = '';
            Array(length).forEach(() => {
              key += Math.ceil(Math.random() * max).toString();
            });
            return +key;
          };
          const key = generateRandomKey(9, 4);
          if (!(key in response.data)) {
            this.syncId = key;
          }
        });
    },
    sync() {
      axios.get(`/${this.syncId}/data.json`)
        .then((response) => {
          const { data } = response;
          localStorage.setItem('data', JSON.stringify(data));
          Object.assign(this.$store.state, data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    post() {
      const data = localStorage.getItem('data');
      axios.put(`/${this.syncId}/data.json`, data)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="sass" scoped>
.element__input-area
  position: absolute
  left: 3.5vh
  top: 7vh
  width: 40vw
  background-color: var(--light)
  border: 1px solid var(--primary)
  box-shadow: 0 0 10px var(--dark)
  border-radius: 5px
  color: var(--super-dark)
  small
    font-size: 70%
  input
    background-color: var(--super-light)

.element__open-area
  width: 100%
  height: 100%
  display: flex
  justify-content: center
  align-items: center

.element__close-area
  position: fixed
  left: 0
  right: 0
  top: 0
  bottom: 0

.active
  background-color: var(--primary)!important

.fade-enter
  opacity: 0

.fade-enter-active
  transition: opacity 0.3s

.fade-leave

.fade-leave-active
  transition: opacity 0.3s
  opacity: 0

</style>
