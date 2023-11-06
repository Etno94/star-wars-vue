<template>
  <NavBar></NavBar>
  <router-view />
</template>

<script>
import { devEnvironment } from '../environment/environment.dev.js';

import { setLocalStorage, getLocalStorage } from './services/storage.service.js';

import { LocalStorageEnum } from './enums/localStorage.enum.js';
import {SwRootEntries} from './enums/swRootEntries.enum.js';

import NavBar from './components/navbar.component.vue';

export default {
  name: 'App',
  components: {
    NavBar,
  },
  data() {
    return {
      localStorageKeys: LocalStorageEnum,
      swRootEntryKeys: SwRootEntries,
      starwarsEntries: [],
    };
  },
  async mounted() {
    let localStarwarsEntries = getLocalStorage(this.localStorageKeys.StarWars_Root_Entries);

    if (localStarwarsEntries) {
      this.starwarsEntries = JSON.parse(localStarwarsEntries);
    } 
    else {
      await this.getSWEntries();
      setLocalStorage(this.localStorageKeys.StarWars_Root_Entries, JSON.stringify(this.starwarsEntries));
    }

    this.localSaveSwEntries(this.starwarsEntries);
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
      } 
      catch (error) {
        if (error instanceof TypeError) {
          console.error('A network error occurred', error.message);
        } 
        else {
          console.error('An error occurred', error.message);
        }
        throw error;
      }
    },
    localSaveSwEntries(swEntries) {
      for (let key in swEntries) {
        switch (key) {
          case this.swRootEntryKeys.films:
            if (!getLocalStorage(this.localStorageKeys.StarWars_Films_ApiURL)) 
              setLocalStorage(this.localStorageKeys.StarWars_Films_ApiURL, JSON.stringify(swEntries[key]));
            break;
          case this.swRootEntryKeys.people:
            if (!getLocalStorage(this.localStorageKeys.StarWars_People_ApiURL)) 
              setLocalStorage(this.localStorageKeys.StarWars_People_ApiURL, JSON.stringify(swEntries[key]));
            break;
          case this.swRootEntryKeys.planets:
            if (!getLocalStorage(this.localStorageKeys.StarWars_Planet_ApiURL)) 
              setLocalStorage(this.localStorageKeys.StarWars_Planet_ApiURL, JSON.stringify(swEntries[key]));
            break;
          case this.swRootEntryKeys.species:
            if (!getLocalStorage(this.localStorageKeys.StarWars_Species_ApiURL)) 
              setLocalStorage(this.localStorageKeys.StarWars_Species_ApiURL, JSON.stringify(swEntries[key]));
            break;
          case this.swRootEntryKeys.starships:
            if (!getLocalStorage(this.localStorageKeys.StarWars_Starships_ApiURL)) 
              setLocalStorage(this.localStorageKeys.StarWars_Starships_ApiURL, JSON.stringify(swEntries[key]));
            break;
          case this.swRootEntryKeys.vehicles:
            if (!getLocalStorage(this.localStorageKeys.StarWars_Vehicles_ApiURL)) 
              setLocalStorage(this.localStorageKeys.StarWars_Vehicles_ApiURL, JSON.stringify(swEntries[key]));
            break;
        }
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
  padding: 12px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
  align-items: center;
  background-color: #1c1b1b;
}

#app>* {
  margin-bottom: 12px;
}
</style>
