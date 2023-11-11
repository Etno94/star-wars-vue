<template>
  <NavBar></NavBar>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from './components/navbar.component.vue';
import { devEnvironment } from '../environment/environment.dev';
import { setLocalStorage, getLocalStorage } from './services/storage.service';
import { LocalStorageEnum } from './enums/localStorage.enum';
import {SwRootEntries} from './enums/swRootEntries.enum';

export default defineComponent(
  {
  name: 'App',
  components: {
    NavBar
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
          console.error('An error occurred', error);
        }
        throw error;
      }
    },
    localSaveSwEntries(swEntries: string[]) {
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
});
</script>

<style>
@import "https://fonts.googleapis.com/css?family=Roboto:700";

:root {
  --main-bg-color: #1c1b1b;

  --accent-color: rgb(233, 231, 84);
  --primary-color: rgba(255, 255, 255, 0.781);
}

* {
  text-decoration: none;
}

body {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  line-height: 1;
  list-style: none;
  border-spacing: 0;
  text-decoration: none;
  font-family: Roboto, sans-serif;
  color: var(--primary-color);
}
#app {
  height: auto; /*100vh;*/
  width: 100vw;
  min-height: 100vh;
  padding: 12px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
  align-items: center;
  background-color: var(--main-bg-color);
}
#app>* {
  margin-bottom: 12px;
}
</style>
