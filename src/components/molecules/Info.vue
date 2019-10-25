<template>
  <div class="info">
    <div class="info__title">
      <a :href="info.event_url" target="_blank">
        {{ info.title }}
      </a>
    </div>
    <div class="info__text">
      <div>
        <p>
          <span>{{ info.started_at }}</span>
          <span>
            {{ info.accepted + (info.limit !== null ? '/' + info.limit : '') }}
          </span>
          <span>人</span>
        </p>
        <p>{{ info.address }}</p>
        <p>{{ info.place }}</p>
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
  },
  props: {
    info: {
      type: Object,
      default: function() {
        return {}
      },
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: auto 3fr;
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
    margin-bottom: 5px;
    line-height: 1.3rem;
    a {
      color: #404040;
      display: inline-block;
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
      span:first-child {
        margin-right: 10px;
      }
      span:last-child {
        font-size: 0.6rem;
      }
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
