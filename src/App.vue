<template>
  <div id="app" class="container-fluid">
    <div class="row">
      <div id="nav" class="col-sm-12">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/settings">Settings</router-link>
      </div>
      <div class="col-sm-12">
        <router-view />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    created() {
      this.$store.dispatch('setTime')
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
