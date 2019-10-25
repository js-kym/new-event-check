<template>
  <ul>
    <li v-for="(item, index) in list" :key="'list' + index">
      <info :info="item" />
    </li>
  </ul>
</template>

<script>
import Info from '@/components/molecules/Info.vue'

export default {
  name: 'InfoList',
  components: {
    Info
  },
  props: {
    list: {
      type: Array,
      default: function() {
        return []
      },
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  padding: 0;
  text-align: left;
  margin: 10px;
}
ul li {
  list-style-type: none !important;
}
</style>
