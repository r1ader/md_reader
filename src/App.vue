<script>
import Main from './components/Main.vue'
import { readTextFile } from "./util/network";

export default {
  data: function () {
    return {
      config: {},
    }
  },
  components: {
    Main
  },
  methods: {
    async get_config() {
      const config_raw = await readTextFile('config.json')
      this.config = JSON.parse(config_raw)
    }
  },

  mounted() {
    this.get_config()
  }
}

</script>

<template>
  <div class="header">
    {{ config.label }}

    <img class="learning" src="https://zjustarstar.github.io/dailybreadResearch.github.io/assets/logo.da1a2b98.png">
  </div>

  <div class="sideButton" v-on:click="this.$refs.main.showSider()">
    <div class="triangle"/>
  </div>
  <Main ref="main" msg="Hello Vue 3 + Vite"/>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');

body {
  padding: 0;
  margin: 0;
  overflow-x: hidden;
}

.sideButton {
  position: fixed;
  left: 0;
  top: 50vh;
  padding: 40px 0 40px 10px;
  border-radius: 0 10px 10px 0;
  background: rgba(4, 87, 131, 0.24);
  font-size: 30px;
  color: white;
}

.learning {
  height: 50px;
  position: absolute;
  right: 20px;

}

.header {
  font-family: 'Varela Round', sans-serif;
  font-weight: bolder;
  width: 100vw;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: white;
  background: linear-gradient(120deg, #155799, #159957);
}

@media (min-width: 800px) {
  .sideButton {
    display: none;
  }
}

@media (max-width: 800px) {
  .header {
    justify-content: start;
    padding-left: 10px;
  }
}

.triangle {
  /*position: absolute;*/
  display: inline-block;
  width: 0;
  height: 0;
  background-color: white;
  border: 10px solid;
  border-color: rgba(4, 87, 131, 0.24) rgba(4, 87, 131, 0.24) rgba(4, 87, 131, 0.24) white;
}

</style>
