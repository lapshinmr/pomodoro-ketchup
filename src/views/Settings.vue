<template>
  <div>
    <h1>This is a settings page</h1>
    <button class="btn btn-outline-success ml-2" @click="notify">Notify</button>
  </div>
</template>

<script>
  export default {
    methods: {
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
