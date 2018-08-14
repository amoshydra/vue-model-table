<template>
  <div id="app">
    <VueTable
      :fields="fields"
      :loadFn="loadData"

      :limit="50"
    />
  </div>
</template>

<script>
import VueTable from './components/vue-table.vue'
import server from '../test/mock-server';

export default {
  name: 'app',
  components: {
    VueTable
  },
  data() {
    return {
      fields: [
        { key: 'id', label: 'Id' },
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'age', label: 'Age' },
      ],
      items: [],
    };
  },
  mounted() {
    server.get({ perPage: 10, page: 0 })
      .then((items) => { this.items = items; })
  },
  methods: {
    loadData({ limit, offset }) {
      console.log(`loading data ${limit} ${offset}`)
      return server.get({ perPage: limit, page: offset })
    },
  }
};
</script>

<style>
#app {
  max-width: 990px;
  margin: 24px auto;
}
</style>
