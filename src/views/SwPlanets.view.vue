<template>
    <BSTable
        v-bind:tableHeaderValues="tableHeaderValues"
        v-bind:tableRowValues="tableRowValues"
    >
    </BSTable>
</template>

<script>
import {setLocalStorage, getLocalStorage} from '../services/storage.service';
import {LocalStorageEnum} from '../enums/localStorage.enum';

import BSTable from '../components/table.component.vue';

export default {
  name: 'SwPlanets',
  components: {
    BSTable
  },
  data() {
    return {
      localStorageKeys: LocalStorageEnum,
      swPlanetsApiURL: "https://swapi.dev/api/planets/",
      starwarsPlanets: [],
      tableHeaderValues: ['head 1','head 2','head 3'],
      tableRowValues: [['cell 1','cell 2','cell 3'], ['cell 1','cell 2','cell 3'], ['cell 1','cell 2','cell 3']], 
    };
  },
  async mounted() {
    console.log('sw planets');
    this.getSwPlanetsApiURL();

    let localStarwarsPlanets = getLocalStorage(this.localStorageKeys.StarWars_Planets_Entries);
    if (localStarwarsPlanets) {
      this.starwarsPlanets = JSON.parse(localStarwarsPlanets);
    } else {
      await this.getSwPlanets();
      setLocalStorage(this.localStorageKeys.StarWars_Planets_Entries, JSON.stringify(this.starwarsPlanets));
    }
    // [this.tableHeaderValues, this.tableRowValues] = this.formatSwPlanetsData();
  },
  methods: {
    getSwPlanetsApiURL() {
        let localStarwarsPlanetsApiURL = getLocalStorage(this.localStorageKeys.StarWars_Planet_ApiURL);
        if (localStarwarsPlanetsApiURL) this.swPlanetsApiURL = JSON.parse(localStarwarsPlanetsApiURL);
    },
    async getSwPlanets() {
      try {
        const response = await fetch(this.swPlanetsApiURL);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        return (this.starwarsPlanets = data);
      } catch (error) {
        if (error instanceof TypeError) {
          console.error('A network error occurred', error.message);
        } else {
          console.error('An error occurred', error.message);
        }
        throw error;
      }
    },
    formatSwPlanetsData(swPlanetsFetchedData) {
        console.log(swPlanetsFetchedData);
        let headers = [];
        let rows = [];
        return [headers, rows];
    }
  }
}
</script>

<style>
</style>