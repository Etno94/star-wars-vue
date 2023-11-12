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
      this.localSaveSwEntries(this.starwarsEntries);
    } 
    else {
      await this.getSWEntries();
      setLocalStorage(this.localStorageKeys.StarWars_Root_Entries, JSON.stringify(this.starwarsEntries));
    }
  },
  methods: {
    // A possible side effect here is that 'devEnvironment.baseApiURL' is not properly configured.
    // Because of that scenario, to handle any errors the try catch is implemented along with
    // checking the response status
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
    // Here we try to take advantage of localStorage in order to prevent
    // consuming the API without need. But a possible side effect could
    // be the unchecked use of the function by passing an argument that
    // is not a string array.
    // We can ensure avoid any errors by checking the typeof of each
    // element value.
    localSaveSwEntries(swEntries: string[]) {
      for (let key in swEntries) {
        if (typeof swEntries[key] != 'string') return;
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

<style lang="scss">
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
  width: 100%;
  min-height: 100vh;
  padding: 12px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
  align-items: center;
  background-color: var(--main-bg-color);

  > * {
    margin-bottom: 12px;
  }
}
</style>
