<template>
  <div id="app">
    <Header/>
    <Home/>
  </div>
</template>

<script>
import 'normalize.css';
import './assets/css/icono.min.css';
import Header from './components/Header.vue';
import Home from './components/Home.vue';

export default {
  name: 'app',
  components: {
    Header,
    Home
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
