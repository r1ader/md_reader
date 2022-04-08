<script>
import VueMarkdown from 'vue-markdown-render'
import { readTextFile } from '../util/network.js'
import { marked } from 'marked';

export default {
  data: function () {
    return {
      config: {},
      src: "",
      defaultProps: {
        children: 'children',
        label: 'label',
      }

    }
  },
  components: { VueMarkdown },
  methods: {
    async get_config() {
      const config_raw = await readTextFile('config.json')
      this.config = JSON.parse(config_raw)
    },
    async handleNodeClick(data) {
      if (!data['filename']) return
      try {
        const res = await readTextFile('article/' + data['filename'])
        this.src = res
      } catch (e) {

      }
    },
    showSider() {
      this.$refs.nav.style.left = '0'
      this.$refs.main_container.style.background = '#8c8c8c'

    },
    hideSider() {
      this.$refs.nav.style.left = '-100%'
      this.$refs.main_container.style.background = 'white'
    }
  },
  mounted() {
    this.get_config()
    marked.setOptions({
      highlight: function(code) {
        return hljs.highlightAuto(code).value;
      }
    });
  },
  computed: {
    markdownToHtml(){
      return marked(this.src);
    }
  }
}
</script>
<template>
  <div ref="main_container" class="main_container">
    <div ref="nav" class="nav">
      <el-tree :data="config.children" :props="defaultProps" @node-click="handleNodeClick"/>
    </div>
    <div v-on:click="hideSider" class="content">
      <div v-html="markdownToHtml"/>
    </div>
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}

.main_container {
  width: 100vw;
  display: flex;
  flex-direction: row;
  transition: 0.5s;
}

.nav {
  min-height: 100vh;
  height: 100%;
  background-color: white;
  padding: 10px;
  min-width: 300px;
  border-right: 1px solid #e6e6e6;
  transition: 0.5s;
}

@media (max-width: 800px) {
  .nav {
    /*display: none;*/
    left: -100%;
    position: fixed;
    max-width: 300px;
  }

  .content {
    width: 100vw;
    height: 100vh;
  }
}

.content {
  padding: 20px;
}
</style>
