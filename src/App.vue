<template>
  <div id="app">
    <VueTable />
  </div>
</template>

<script>
import VueTable from './components/vue-table.vue'

export default {
  name: 'app',
  components: {
    VueTable
  }
}
</script>

<style>
#app {
  max-width: 990px;
  margin: 24px auto;
}
</style>
