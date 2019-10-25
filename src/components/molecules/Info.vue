<template>
  <div class="info">
    <div class="info__title">
      <a href="xxx">
        <!-- {{ item.title }} -->
        タイトル
      </a>
    </div>
    <div class="info__text">
      <div>
        <p>
          <!-- <span>{{ setDate(item.started_at) }}</span>
          <span>{{ item.accepted + '/' + item.limit }}</span> -->
          <span>10/2(水)</span>
          <span>10/20</span>
        </p>
        <!-- <p>{{ item.address }}</p>
        <p>{{ item.place }}</p> -->
        <p>東京都練馬区</p>
        <p>ここねり</p>
      </div>
    </div>
    <div class="info__bookmark">
      <span class="icono-bookmark"></span>
    </div>
  </div>
</template>

<script>
import IconBookmark from '@/components/atoms/IconBookmark.vue'
import IconBookmarkEmpty from '@/components/atoms/IconBookmarkEmpty.vue'

export default {
  name: 'Info',
  components: {
    IconBookmark,
    IconBookmarkEmpty
  }
}
</script>

<style lang="scss" scoped>
.info {
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1fr 3fr;
  color: #1a1a1a;
  border-left: solid 6px #c82a16;
  border-bottom: solid 2px #dadada;
  background: #f5f5f5;
  margin-bottom: 5px;
  line-height: 1.5;
  padding: 0.5em;
  list-style-type: none !important;
  .info__title {
    grid-column: 1/4;
    grid-row: 1/2;
    font-size: 1rem;
    font-weight: bolder;
    a {
      color: #404040;
      display: block;
    }
  }
  .info__text {
    grid-column: 1/3;
    grid-row: 2/3;
    display: flex;
    align-items: center;
    p {
      margin: 0;
      font-size: 0.8rem;
    }
  }
  .info__bookmark {
    grid-column: 3/4;
    grid-row: 2/3;
    display: flex;
    align-items: flex-end;
  }
}
</style>
