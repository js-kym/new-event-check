<template>
  <header>
    <h1>新着イベントSearch</h1>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {}
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
header {
  width: 100%;
  height: 40px;
  /* position: fixed; */
  background: #333333;
  z-index: 2;
  color: #ffffff;
}
h1 {
  font-size: 1.2rem;
  margin: 0;
  line-height: 40px;
}
</style>
