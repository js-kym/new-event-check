<template>
  <div class="tab">
    <tab-button></tab-button>
    <tab-button></tab-button>
    <tab-button></tab-button>
  </div>
</template>

<script>
import TabButton from '@/components/atoms/TabButton'

export default {
  name: 'Tab',
  components: {
    TabButton
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
}
</style>
