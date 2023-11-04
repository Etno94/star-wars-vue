<template>
    <BSTable></BSTable>
</template>

<script>
export default {
  name: 'SwPlanets',
  components: {
    BSTable
  },
  mounted() {
    fetch('https://swapi.dev/api/')
      .then((res) => res.json())
      .then((data) => (this.users = data))
      .catch((err) => console.log(err.message));
  }
}
</script>

<style>
</style>