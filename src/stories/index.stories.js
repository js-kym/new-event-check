/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import MyButton from '../components/MyButton.vue'
import IconBookmark from '../components/atoms/IconBookmark.vue'
import IconBookmarkEmpty from '../components/atoms/IconBookmarkEmpty.vue'
import TabButton from '../components/atoms/TabButton.vue'
import Info from '../components/molecules/Info.vue'
import Tab from '../components/molecules/Tab.vue'

storiesOf('IconBookmark', module).add('IconBookmark', () => ({
  components: { IconBookmark },
  template: '<icon-bookmark></icon-bookmark>'
}))

storiesOf('IconBookmarkEmpty', module).add('IconBookmarkEmpty', () => ({
  components: { IconBookmarkEmpty },
  template: '<icon-bookmark-empty></icon-bookmark-empty>'
}))

storiesOf('Info', module).add('Info', () => ({
  components: { Info },
  template: '<info></info>'
}))

storiesOf('TabButton', module).add('with text', () => ({
  components: { TabButton },
  template: '<tab-button></tab-button>'
}))

storiesOf('Tab', module).add('Tab', () => ({
  components: { Tab },
  template: '<tab></tab>'
}))

storiesOf('Button', module)
  .add('with text', () => ({
    components: { MyButton },
    template: '<my-button @click="action">Hello Button</my-button>',
    methods: { action: action('clicked') }
  }))
  .add('with JSX', () => ({
    components: { MyButton },
    render() {
      return <my-button onClick={this.action}>With JSX</my-button>
    },
    methods: { action: linkTo('Button', 'with some emoji') }
  }))
  .add('with some emoji', () => ({
    components: { MyButton },
    template: '<my-button @click="action">😀 😎 👍 💯</my-button>',
    methods: { action: action('clicked') }
  }))
