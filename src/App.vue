<template>
  <div id="app">
    <Header />
    <tab :list="tabList" @click-event="changeActiveTab" />
    <info-list :list="filterList" />
    <div v-if="loadingFlg" class="loader"></div>
    <div
      class="btn-read"
      v-if="!loadingFlg && filterList.length > 0"
      @click="updateList"
    >
      さらに読み込む
    </div>
  </div>
</template>

<script>
import 'normalize.css'
import '@/assets/css/icono.min.css'
import Header from '@/components/Header.vue'
import Tab from '@/components/molecules/Tab'
import InfoList from '@/components/organisms/InfoList.vue'

export default {
  name: 'app',
  components: {
    Header,
    Tab,
    InfoList
  },
  data() {
    return {
      // イベントリスト
      list: [],
      // 含まれる検索結果の件数
      results_returned: 0,
      // 検索結果の総数
      results_available: 0,
      // 検索開始位置
      results_start: 1,
      // 読み込みカウンター
      start_count: 1,
      // 場所
      area: '',
      bookmarkList: [],
      // データ読み込みフラグ
      loadingFlg: false,
      // 一番下まで行った時のフラグ
      bottomFlg: false,
      // タブリスト
      tabList: [
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
  computed: {
    setDate: function() {
      return function(started_at) {
        let d = new Date(started_at)
        let month = Number(d.getMonth()) + 1
        let date = '/' + d.getDate()
        let WeekChars = ['日', '月', '火', '水', '木', '金', '土']
        let day = '(' + WeekChars[d.getDay()] + ')'
        let time = ' ' + d.getHours() + ':' + ('00' + d.getMinutes()).slice(-2)
        let text = month + date + day + time
        return text
      }
    },
    filterList: function() {
      return this.list
        .filter(function(el) {
          return el.address !== null && el.address.indexOf(this.area) !== -1
        }, this)
        .map(function(item) {
          item.started_at = this.setDate(item.started_at)
          return item
        }, this)
    }
  },
  methods: {
    toggleBookmark: function(id) {
      if (this.bookmarkList && this.bookmarkList.indexOf(id) !== -1) {
        // リストにあるので削除
        this.bookmarkList.splice(this.bookmarkList.indexOf(id), 1)
      } else {
        this.bookmarkList.push(id)
      }
      localStorage.setItem('bookmarkList', JSON.stringify(this.bookmarkList))
    },
    setArea: function(val) {
      this.area = val
    },
    startCounter: function() {
      this.start_count += 10
    },
    getList: function() {
      if (!this.loadingFlg) {
        this.loadingFlg = true
        let that = this
        // isActive=trueのサイトを検索
        let isActiveSiteObj = this.tabList.find(item => {
          return item.isActive
        })
        // ブックマーク以外ならリストを取得
        if (isActiveSiteObj.id !== 99) {
          // 新着イベントを取得
          this.$jsonp('https://connpass.com/api/v1/event/', {
            order: 3,
            start: that.start_count
          })
            .then(response => {
              // Success.
              that.results_returned = response.results_returned
              that.results_available = response.results_available
              that.results_start = response.results_start
              that.list = that.list.concat(response.events)
              that.loadingFlg = false
              that.bottomFlg = false
              console.log('that.list:', that.list)
            })
            .catch(err => {
              // Failed.
              console.log('err', err)
              that.loadingFlg = false
              that.bottomFlg = false
            })
        } else {
          that.list = []
          that.loadingFlg = false
          that.bottomFlg = false
        }
      }
    },
    updateList: function() {
      this.bottomFlg = true
      this.startCounter()
      this.getList()
    },
    changeActiveTab: function(id) {
      this.tabList.forEach(item => {
        item.isActive = id === item.id
      })
      this.getList()
    }
  },
  created: function() {
    this.start_count = 1
    const list = JSON.parse(localStorage.getItem('bookmarkList'))
    this.bookmarkList = list ? list : []
    this.getList()

    // window.onscroll = () => {
    //   let scrollTop = document.documentElement.scrollTop;
    //   let bottom = scrollTop + document.documentElement.clientHeight;
    //   let app = document.getElementById('app');
    //   // 一番下に行ったら読み込み直し
    //   if (bottom >= app.clientHeight && !this.bottomFlg) {
    //     this.bottomFlg = true;
    //     this.updateList();
    //   }
    // };
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
/* ローディング */
.loader,
.loader:after {
  border-radius: 50%;
  width: 15px;
  height: 15px;
}
.loader {
  margin: 10px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 3px solid rgba(200, 42, 42, 0.2);
  border-right: 3px solid rgba(200, 42, 42, 0.2);
  border-bottom: 3px solid rgba(200, 42, 42, 0.2);
  border-left: 3px solid #c82a2a;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.btn-read {
  margin: 10px;
  padding: 10px;
  background-color: #c82a2a;
  border-radius: 10px;
  color: #ffffff;
  cursor: pointer;
}
</style>
