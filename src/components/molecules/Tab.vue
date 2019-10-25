<template>
  <div class="tab">
    <tab-button
      v-for="item in list"
      :key="item.name"
      :name="item.name"
      :color="item.color"
      :is-active="item.isActive"
      @click.native="clickEvent(item.id)"
    >
    </tab-button>
  </div>
</template>

<script>
import TabButton from '@/components/atoms/TabButton'

export default {
  name: 'Tab',
  components: {
    TabButton
  },
  props: {
    list: {
      type: Array,
      default: function() {
        return []
      },
      required: true
    }
  },
  methods: {
    clickEvent: function(id) {
      this.$emit('click-event', id)
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
