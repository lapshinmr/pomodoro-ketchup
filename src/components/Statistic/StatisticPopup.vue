<template>
  <p-modal
    :value="value"
    class="graph__modal"
    @input="$emit('input', $event)"
  >
    <div class="mb-2">
      <small class="form-text text-muted mb-1">
        Pomodoros
      </small>
      <input
        v-model.number="totalEdited"
        type="number"
        class="form-control"
      >
    </div>
    <div class="mb-2">
      <small class="form-text text-muted mb-1">
        Note
      </small>
      <input
        v-model="noteEdited"
        type="text"
        class="form-control"
      >
    </div>
    <div class="d-flex">
      <button
        type="button"
        name="button"
        class="btn btn-success btn-sm"
        @click="$emit('remove')"
      >
        Remove
      </button>
      <button
        type="button"
        name="button"
        class="btn btn-success btn-sm ml-2"
        @click="$emit('add')"
      >
        Add bar
      </button>
      <button
        type="button"
        name="button"
        class="btn btn-success btn-sm ml-auto"
        @click="onSave"
      >
        Save
      </button>
    </div>
  </p-modal>
</template>

<script>
import PModal from '@/components/Base/PModal.vue';

export default {
  name: 'StatisticPopup',
  components: {
    PModal,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    note: {
      type: String,
      default: '',
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      noteEdited: '',
      totalEdited: 0,
    };
  },
  watch: {
    value() {
      this.noteEdited = this.note;
      this.totalEdited = this.total;
    },
  },
  methods: {
    onSave() {
      this.$emit('save', { total: this.totalEdited, note: this.noteEdited });
    },
  },
};
</script>

<style scoped>

</style>
