<template>
    <BSTable
        v-bind:tableHeaderValues="tableHeaderValues"
        v-bind:tableRowValues="tableRowValues"
    >
    </BSTable>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {setLocalStorage, getLocalStorage} from '../services/storage.service';
import {LocalStorageEnum} from '../enums/localStorage.enum';
import {Paged} from '../models/paged.model';
import {Planet} from '../models/planet.model';
import {Table} from '../models/table.model';

import BSTable from '../components/table.component.vue';

export default defineComponent({
  name: 'SwPlanets',
  components: {
    BSTable
  },
  data() {
    return {
      localStorageKeys: LocalStorageEnum,
      swPlanetsApiURL: "https://swapi.dev/api/planets/",
      starwarsPlanets: {} as Paged<Planet>,
      tableHeaderValues: [] as string[],
      tableRowValues: [] as string[][], 
    };
  },
  async mounted() {
    // Mock data
    this.tableHeaderValues = ['head 1','head 2','head 3'];
    this.tableRowValues = [['cell 1','cell 2','cell 3'], ['cell 1','cell 2','cell 3'], ['cell 1','cell 2','cell 3']];
    // -Mock Data

    this.getSwPlanetsApiURL();

    let localStarwarsPlanets = getLocalStorage(this.localStorageKeys.StarWars_Planets_Entries);
    if (localStarwarsPlanets) {
      this.starwarsPlanets = JSON.parse(localStarwarsPlanets);
    } else {
      await this.getSwPlanets();
      setLocalStorage(this.localStorageKeys.StarWars_Planets_Entries, JSON.stringify(this.starwarsPlanets));
    }
    const formatedData: Table | null = this.formatSwPlanetsData(this.starwarsPlanets.results);
    this.tableHeaderValues = formatedData?.headers || [];
    this.tableRowValues = formatedData?.rows || [];
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

        const data: Paged<Planet> = await response.json();

        return (this.starwarsPlanets = data);
      } catch (error) {
        if (error instanceof TypeError) {
          console.error('A network error occurred', error.message);
        } else {
          console.error('An error occurred', error);
        }
        throw error;
      }
    },
    formatSwPlanetsData(swPlanetsFetchedData: Planet[]): Table | null {
        console.log(swPlanetsFetchedData);
        if (!swPlanetsFetchedData.length) return null;

        let tableData: Table = {
            headers: [],
            rows: [],
        }
        for (let key in swPlanetsFetchedData[0]) {
            if (key != 'created' && key != 'edited') tableData.headers.push(key);
        }
        for(let row of swPlanetsFetchedData) {
            let newRow = [];
            for (let key of tableData.headers.filter(k => k != 'created' && k != 'edited')) {
                const cellValue = row[key as keyof Planet];
                newRow.push(Array.isArray(cellValue) ? `${cellValue.length} ${key}` : cellValue as string);
            }
            tableData.rows.push(newRow);
        }
        return tableData;
    }
  }
})

</script>

<style>
</style>