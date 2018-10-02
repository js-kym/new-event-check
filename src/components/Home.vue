<template>
  <div class='home'>
    <h1>connpass新着イベント</h1>
    <Area v-on:area-event='setArea'/>
    <ul>
      <li v-for='(item, index) in filterList' :key='index'>
        <a :href="item.event_url">
          <h1>{{ setDate(item.started_at) }}</h1>
          <p>{{ item.title }}</p>
          <p>{{ item.address }}</p>
          <p>{{ item.place }}</p>
        </a>
      </li>
    </ul>
    <!-- <button type='button' v-on:click='updateList'>さらに読み込む</button> -->
  </div>
</template>

<script>
// import axios from 'axios';
import Vue from 'vue';
import VueJsonp from 'vue-jsonp';
Vue.use(VueJsonp);
import Area from './Area.vue';

export default {
  name: 'Home',
  components: {
    Area
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
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
      area: ''
    };
  },
  computed: {
    setDate: function() {
      return function(started_at) {
        let d = new Date(started_at);
        let month = Number(d.getMonth()) + 1;
        let date = '/' + d.getDate();
        let WeekChars = ['日', '月', '火', '水', '木', '金', '土'];
        let day = '(' + WeekChars[d.getDay()] + ')';
        let time = ' ' + d.getHours() + ':' + ('00' + d.getMinutes()).slice(-2);
        let text = month + date + day + time;
        return text;
      };
    },
    filterList: function() {
      const that = this;
      return this.list.filter(function(el) {
        return el.address !== null && el.address.indexOf(that.area) !== -1;
      }, this);
    }
  },
  methods: {
    setArea: function(val) {
      this.area = val;
    },
    startCounter: function() {
      this.start_count += 10;
    },
    getList: function() {
      let that = this;
      // 新着イベントを取得
      this.$jsonp('https://connpass.com/api/v1/event/', {
        order: 3,
        start: that.start_count
      })
        .then(response => {
          // Success.
          console.log(response);
          that.results_returned = response.results_returned;
          that.results_available = response.results_available;
          that.results_start = response.results_start;
          that.list = that.list.concat(response.events);
        })
        .catch(err => {
          // Failed.
          console.log(err);
        });
    },
    updateList: function() {
      this.startCounter();
      this.getList();
    }
  },
  created: function() {
    console.log('hello');
    this.getList();

    window.onscroll = () => {
      let scrollTop = document.documentElement.scrollTop;
      let bottom = scrollTop + document.documentElement.clientHeight;
      let app = document.getElementById('app');
      // 一番下まで行ったら読み込み直し
      if (bottom >= app.clientHeight) {
        this.updateList();
      }
    };
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.home {
  padding: 10px;
}
.home > h1 {
  font-size: 1.3rem;
  margin: 0;
  padding: 0.67rem 0;
}
ul li h1 {
  font-size: 1.3rem;
}
ul {
  padding: 0;
  text-align: left;
}
ul li {
  color: #404040;
  border-left: solid 6px #c82a16;
  border-bottom: solid 2px #dadada;
  background: whitesmoke;
  margin-bottom: 5px;
  line-height: 1.5;
  padding: 0.5em;
  list-style-type: none !important;
}
ul li a {
  color: #404040;
  display: block;
  text-decoration: none;
}
ul li h1 {
  font-weight: normal;
  margin: 0;
  font-size: 1.3rem;
  /*font-weight: bold;*/
}
ul li p {
  margin: 0;
  font-size: 0.8rem;
}
ul li p:first-of-type {
  font-size: 1rem;
  font-weight: bolder;
}
</style>
