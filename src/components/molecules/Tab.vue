<template>
  <div class="tab">
    <tab-button
      v-for="item in siteList"
      :key="item.name"
      :name="item.name"
      :color="item.color"
      :is-active="item.isActive"
      @click.native="changeActive(item.id)"
    >
    </tab-button>
  </div>
</template>

<script>
import TabButton from '@/components/atoms/TabButton'
// @click="changeActive(item.id)"
export default {
  name: 'Tab',
  components: {
    TabButton
  },
  data() {
    return {
      siteList: [
        {
          id: 1,
          name: 'connpass',
          color: '#c82a16',
          isActive: true
        },
        {
          id: 99,
          name: 'bookmark',
          color: '#cccccc',
          isActive: false
        }
      ]
    }
  },
  methods: {
    changeActive: function(id) {
      console.log('changeActive:', id)
      this.siteList.forEach(item => {
        item.isActive = id === item.id
      })
    }
  }
}
</script>

<style scoped>
.tab {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  font-size: 0;
  text-align: center;
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  z-index: 100;
}
</style>
