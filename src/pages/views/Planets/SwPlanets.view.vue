<template>
  <div class="controls">
    <!--View mode control-->
    <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
      <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" v-model="selectedMode" value="table" checked>
      <label class="btn btn-outline-primary" for="btnradio1">Table</label>

      <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" v-model="selectedMode" value="card">
      <label class="btn btn-outline-primary" for="btnradio2">Card</label>
    </div>
    <!--/View mode control-->
  </div>

  <template v-if="selectedMode === 'table'">
    <BsTable v-bind:tableHeaderValues="tableHeaderValues" v-bind:tableRowValues="tableRowValues">
    </BsTable>
  </template>
  <template v-if="selectedMode === 'card'">
    <CardPlanet v-for="(planet, kplanet) in starwarsPlanets" :key="kplanet" :planetData="planet" class="m-3"></CardPlanet>
  </template>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue';
import { setLocalStorage, getLocalStorage } from '@/services/storage.service';

import { LocalStorageEnum } from '@/enums/localStorage.enum';

// Models & Dtos
import { Paged } from '@/models/paged.model';
import { Planet } from '@/models/planet.model';
import { Table } from '@/models/table.model';

// Components
import BsTable from '@/components/table.component.vue';
import CardPlanet from './card-view/CardPlanet.component.vue';

export default defineComponent({
  name: 'SwPlanets',
  components: {
    BsTable,
    CardPlanet
  },
  data() {
    return {
      // Service data
      localStorageKeys: LocalStorageEnum,
      swPlanetsApiURL: "https://swapi.dev/api/planets/",
      // Tabla data
      starwarsPagedPlanets: {} as Paged<Planet>,
      tableHeaderValues: [] as string[],
      tableRowValues: [] as Planet[],
      propsToExclude: ['created', 'edited', 'url'], // We can set this props because we know ahead of time the dto result
      // Card data
      starwarsPlanets: [] as Planet[],
      // View mode
      selectedMode: ref('table')
    };
  },
  async mounted() {

    this.getSwPlanetsApiURL();

    let localStarwarsPlanets = getLocalStorage(this.localStorageKeys.StarWars_Planets_Entries);
    if (localStarwarsPlanets) {
      this.starwarsPagedPlanets = JSON.parse(localStarwarsPlanets);
    } else {
      await this.getSwPlanets();
      setLocalStorage(this.localStorageKeys.StarWars_Planets_Entries, JSON.stringify(this.starwarsPagedPlanets));
    }
    this.starwarsPlanets = this.starwarsPagedPlanets.results;
    const formatedData: Table<Planet> | null = this.formatSwPlanetsData(this.starwarsPagedPlanets.results);
    this.tableHeaderValues = formatedData?.headers || [];
    this.tableRowValues = formatedData?.rows || [];
  },
  methods: {
    // Here we deal with a default value for swPlanetsApiURL in case there is
    // no APIURL saved in our localStorage
    getSwPlanetsApiURL() {
      let localStarwarsPlanetsApiURL = getLocalStorage(this.localStorageKeys.StarWars_Planet_ApiURL);
      if (localStarwarsPlanetsApiURL) this.swPlanetsApiURL = JSON.parse(localStarwarsPlanetsApiURL);
    },
    // Here we consume the planets APiURL to get the data
    // as well as we do with the root entries in our App.vue
    async getSwPlanets() {
      try {
        const response = await fetch(this.swPlanetsApiURL);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data: Paged<Planet> = await response.json();

        return (this.starwarsPagedPlanets = data);
      } catch (error) {
        if (error instanceof TypeError) {
          console.error('A network error occurred', error.message);
        } else {
          console.error('An error occurred', error);
        }
        throw error;
      }
    },
    // With this function, my goal was to pass a standardized
    // dto to the generic table.component.vue
    formatSwPlanetsData(swPlanetsFetchedData: Planet[]): Table<Planet> | null {
      if (!swPlanetsFetchedData.length) return null;

      let tableData: Table<Planet> = {
        headers: [],
        rows: [],
      }
      for (let key in swPlanetsFetchedData[0]) {
        if (!this.propsToExclude.includes(key)) tableData.headers.push(key);
      }
      swPlanetsFetchedData.forEach((item: Planet) => {
        const filteredRow: Planet = {
          climate: '',
          diameter: 0,
          films: [],
          gravity: 0,
          name: '',
          orbital_period: 0,
          population: 0,
          residents: [],
          rotation_period: 0,
          surface_water: 0,
          terrain: '',
          url: '',
        };

        // First we fill the Planet object checking for types and props to be excluded
        for (let key of tableData.headers) {
          if (!this.propsToExclude.includes(key)) {
            if (typeof filteredRow[key as keyof Planet] === 'number') {
              filteredRow[key as keyof Planet] = parseFloat(String(item[key]));
            } else {
              filteredRow[key as keyof Planet] = item[key];
            }
          }
        }
        // Then we guarantee the order of the props as the headers indicate
        const orderedRow = this.sortProperties(filteredRow, tableData.headers);
        tableData.rows.push(orderedRow);
      });
      return tableData;
    },
    sortProperties(obj: any, keysOrder: string[]) {
      const ordered: any = {};
      keysOrder.forEach((key) => {
        // eslint won't let me get away without this one
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          ordered[key] = obj[key];
        }
      });
      return ordered;
    }
  }
})

</script>

<style lang="scss">
div.controls {
  flex: 1 1 100%;
}
</style>