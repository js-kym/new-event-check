<template>
  <button class="tab-button" :class="{ active: isActive }">
    <div v-if="name !== 'bookmark'">
      <img :src="require('@/assets/img/' + name + '.png')" />
    </div>
    <div v-else>
      <span class="icono-bookmark"></span>
    </div>
  </button>
</template>

<script>
import '@/assets/css/icono.min.css'

export default {
  name: 'TabButton',
  props: {
    name: {
      type: String,
      default: 'bookmark',
      required: true
    },
    color: {
      type: String,
      default: '#cccccc',
      required: true
    },
    isActive: {
      type: Boolean,
      default: false,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-button {
  margin: 0;
  padding: 0;
  cursor: pointer;
  outline: none;
  display: inline-block;
  width: 100%;
  /* height: 25px; */
  vertical-align: middle;
  background: #cccccc;
  border: none;
  border-bottom: 5px solid #cccccc;
  border-radius: 0;
  font-size: 0;
  img {
    height: 20px;
    padding: 2px;
    border-style: none;
    opacity: 0.5;
  }
  span {
    transform: scale(0.7, 0.7);
    margin-top: 5px;
    color: #fff;
    margin: 0;
  }
  &.active {
    background: #fff;
    border-bottom: 5px solid #c82a16;
    img {
      opacity: 1;
    }
    span {
      transform: scale(0.7, 0.7);
      margin-top: 5px;
      margin: 0;
      color: #c82a16;
    }
  }
}
</style>
