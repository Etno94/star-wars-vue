<template>
  <MyComponent></MyComponent>
</template>

<script>

import MyComponent from './components/MyComponent.component.vue'

export default {
  name: 'App',
  components: {
    MyComponent
  }
}
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
  line-height: 1;
  list-style: none;
  border-spacing: 0;
}
#app {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  align-items: center;
  background-color: #1c1b1b;
}
</style>
