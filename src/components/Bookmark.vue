<template>
  <div class="home">
    <div id="tab">
      <div class="menu">
        <router-link to="/">
          <div>
            <img src="../assets/img/connpass.png" />
          </div>
        </router-link>
      </div>
      <div class="menu active"><span class="icono-bookmark"></span></div>
    </div>
    <div id="main">
      <!-- <Area v-on:area-event='setArea'/> -->
      <div v-if="filterList && filterList.length > 0">
        <ul>
          <li v-for="(item, index) in filterList" :key="index">
            <a :href="item.event_url">
              <div id="infoHeader">
                <div id="title">{{ item.title }}</div>
              </div>
            </a>
            <div id="infoMain">
              <div id="info">
                <p>
                  <span>{{ setDate(item.started_at) }}</span>
                  <span>{{ item.accepted + '/' + item.limit }}</span>
                </p>
                <p>{{ item.address }}</p>
                <p>{{ item.place }}</p>
              </div>
              <div id="bookmark" @click="toggleBookmark(item.event_id)">
                <span
                  v-if="bookmarkList.indexOf(item.event_id) !== -1"
                  class="icono-bookmark"
                ></span>
                <span v-else class="icono-bookmarkEmpty"></span>
              </div>
            </div>
          </li>
        </ul>
        <div v-if="loadingFlg" class="loader"></div>
        <div
          class="btn-read"
          v-if="!loadingFlg && bookmarkList.length >= start_count + 10"
          @click="updateList"
        >
          さらに読み込む
        </div>
      </div>
      <div v-else>
        <div class="noBookmark">ブックマークはありません。</div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';
import Area from './Area.vue'

export default {
  name: 'Home',
  components: {
    Area
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
      bottomFlg: false
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
      const that = this
      return this.list.filter(function(el) {
        return el.address !== null && el.address.indexOf(that.area) !== -1
      }, this)
    },
    getBookmarkList: function() {
      return JSON.parse(localStorage.getItem('bookmarkList'))
    }
  },
  methods: {
    toggleBookmark: function(id) {
      if (this.bookmarkList && this.bookmarkList.indexOf(id) !== -1) {
        // リストにあるので削除
        this.bookmarkList.splice(this.bookmarkList.indexOf(id), 1)
        // 表示からも削除
        let removeIndex = 0
        this.list.forEach(function(item, index) {
          if (item.event_id === id) {
            removeIndex = index
          }
        })
        this.list.splice(removeIndex, 1)
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
      console.log('getList')
      console.log('this.loadingFlg:', this.loadingFlg)
      if (!this.loadingFlg) {
        this.loadingFlg = true
        let that = this
        // ローカルストレージからブックマークイベントを取得
        let tmpList = JSON.parse(localStorage.getItem('bookmarkList'))
        if (tmpList && tmpList.length > 0) {
          // 10件ずつ分割
          console.log('this.start_count:', this.start_count)
          let tmpListSplit = tmpList.slice(
            this.start_count - 1,
            this.start_count + 9
          )
          console.log('tmpListSplit:', tmpListSplit)
          let bookmarkList = tmpListSplit.join(',')
          console.log('bookmarkList:', bookmarkList)
          // ブックマークイベントを取得
          this.$jsonp('https://connpass.com/api/v1/event/', {
            event_id: bookmarkList
          })
            .then(response => {
              console.log('success')
              console.log('that.list:', that.list)
              console.log('response.events:', response.events)
              // Success.
              that.results_returned = response.results_returned
              that.results_available = response.results_available
              that.results_start = response.results_start
              that.list = that.list.concat(response.events)
              that.loadingFlg = false
              that.bottomFlg = false
            })
            .catch(err => {
              console.log('fail:', err)
              // Failed.
              that.loadingFlg = false
              that.bottomFlg = false
            })
        }
      }
    },
    updateList: function() {
      console.log('updateList')
      this.bottomFlg = true
      this.startCounter()
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

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
#tab {
  width: 100%;
  height: 30px;
  background: #cccccc;
  text-align: center;
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  z-index: 100;
}
#tab .menu {
  display: inline-block;
  width: 50%;
  height: 25px;
  vertical-align: middle;
  border-bottom: 5px solid #cccccc;
}
#tab .menu a {
  position: relative;
  width: 100%;
  height: 100%;
}
#tab .menu.active {
  background: #fff;
  border-bottom: 5px solid #c82a16;
}
#tab .menu span.icono-bookmark {
  transform: scale(0.7, 0.7);
  margin-top: 5px;
  color: #fff;
}
#tab .menu.active span.icono-bookmark {
  color: #c82a16;
}
#tab .menu img {
  height: 20px;
  padding: 2px;
}
#main {
  padding: 10px;
}
ul {
  padding: 0;
  text-align: left;
  margin: 0;
}
ul li {
  color: #1a1a1a;
  border-left: solid 6px #c82a16;
  border-bottom: solid 2px #dadada;
  background: #f5f5f5;
  margin-bottom: 5px;
  line-height: 1.5;
  padding: 0.5em;
  list-style-type: none !important;
}
ul li a {
  color: #404040;
  display: block;
}
ul li #infoHeader {
  font-size: 1rem;
  font-weight: bolder;
}
/* ul li #infoHeader div {
  display: inline-block;
  vertical-align: middle;
}
ul li #infoHeader div#bookmark {
  text-align: right;
  vertical-align: top;
  width: 15%;
}
ul li #infoHeader div#title {
  line-height: 1.2rem;
  width: 85%;
} */
ul li #infoMain div {
  display: inline-block;
  vertical-align: middle;
}
ul li #infoMain div#info {
  width: 90%;
}
ul li #infoMain div#bookmark {
  width: 10%;
  text-align: center;
  vertical-align: bottom;
}
ul li p {
  margin: 0;
  font-size: 0.8rem;
}
.icono-bookmarkEmpty {
  margin: 0;
  color: #c82a16;
}
.icono-bookmark {
  margin: 0;
  color: #c82a16;
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
.noBookmark {
  margin: 10px;
}
.btn-read {
  margin: 10px 0;
  padding: 10px;
  background-color: #c82a2a;
  border-radius: 10px;
  color: #ffffff;
  cursor: pointer;
}
</style>
