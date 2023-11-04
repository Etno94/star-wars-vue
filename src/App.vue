<template>
  <NavBar></NavBar>
  <router-view />
</template>

<script>
import {devEnvironment} from '../environment/environment.dev.js';
import {setLocalStorage, getLocalStorage} from './services/storage.service.js';
import {LocalStorageEnum} from './enums/localStorage.enum.js';
import NavBar from './components/navbar.component.vue';

export default {
  name: 'App',
  components: {
    NavBar,
  },
  data() {
    return {
      localStorageKeys: LocalStorageEnum,
      starwarsEntries: [],
    };
  },
  async mounted() {
    let localStarwarsEntries = getLocalStorage(this.localStorageKeys.StarWars_Root_Entries);
    if (localStarwarsEntries) {
      console.log(localStarwarsEntries);
      this.starwarsEntries = JSON.parse(localStarwarsEntries);
      console.log(this.starwarsEntries);
    } else {
      await this.getSWEntries();
      setLocalStorage(this.localStorageKeys.StarWars_Root_Entries, JSON.stringify(this.starwarsEntries));
    }
  },
  methods: {
    async getSWEntries() {
      try {
        const response = await fetch(devEnvironment.baseApiURL);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return (this.starwarsEntries = data);
      } catch (error) {
        if (error instanceof TypeError) {
          console.error('A network error occurred', error.message);
        } else {
          console.error('An error occurred', error.message);
        }
        throw error;
      }
    }
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
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  align-items: center;
  background-color: #1c1b1b;
}

#app > * {
  margin: 12px;
}
</style>
