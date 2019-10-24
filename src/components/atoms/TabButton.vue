<template>
  <button class="tab-button">
    <img src="@/assets/img/connpass_logo_4.png" />
  </button>
</template>

<script>
export default {
  name: 'TabButton',
  data() {
    return {
      siteList: [
        {
          id: 1,
          name: 'connpass',
          color: '#c82a16'
        },
        {
          id: 99,
          name: 'bookmark',
          color: '#cccccc'
        }
      ]
    }
  }
}
</script>

<style scoped>
.tab-button {
  margin: 0;
  padding: 0;
  display: inline-block;
  width: 100%;
  /* height: 25px; */
  vertical-align: middle;
  background: #fff;
  border: none;
  border-bottom: 5px solid #c82a16;
  border-radius: 0;
  font-size: 0;
}
.tab-button img {
  height: 20px;
  padding: 2px;
  border-style: none;
}
</style>
