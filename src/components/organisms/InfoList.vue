<template>
  <div class="info-list">
    <ul v-if="list.length > 0">
      <li v-for="(item, index) in list" :key="'list' + index">
        <info :info="item" />
      </li>
    </ul>
    <div v-else>
      リストはありません。
    </div>
  </div>
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
.info-list {
  margin: 10px;
  ul {
    padding: 0;
    text-align: left;
  }
  ul li {
    list-style-type: none !important;
  }
}
</style>
