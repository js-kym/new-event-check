<template>
  <div class='home'>
    <h1>connpass新着イベント</h1>
    <ul>
      <li v-for='(item, index) in list' :key='index'>
        <a :href="item.event_url">
          <h1>{{ setDate(item.started_at) }}</h1>
          <p>{{ item.title }}</p>
          <p>{{ item.address }}</p>
          <p>{{ item.place }}</p>
        </a>
      </li>
    </ul>
    <button type='button' v-on:click='updateList'>さらに読み込む</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
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
    }
  },
  methods: {
    startCounter: function() {
      this.start_count += 10;
    },
    getList: function() {
      console.log('getList');
      console.log('start_count:', this.start_count);
      let that = this;
      // 新着イベントを取得
      axios
        .get('https://connpass.com/api/v1/event/', {
          params: {
            order: 3,
            start: that.start_count,
            keyword: that.area
          }
        })
        .then(function(response) {
          console.log(response);
          that.results_returned = response.data.results_returned;
          that.results_available = response.data.results_available;
          that.results_start = response.data.results_start;
          that.list = that.list.concat(response.data.events);
          console.log('response.data.events:', response.data.events);
          console.log('that.list:', that.list);
        })
        .catch(function(error) {
          console.log(error);
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
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.home {
  margin: 10px;
}
h1 {
  font-size: 1.3rem;
}
ul {
  padding: 0;
  text-align: left;
}
ul li {
  color: #404040;
  border-left: solid 6px #1fa67a;
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
