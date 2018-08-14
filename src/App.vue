<template>
  <div id="app">
    <VueTable
      :fields="fields"
      :items="items"
    />
  </div>
</template>

<script>
import VueTable from './components/vue-table.vue'

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
      items: [
        {
          id: 1,
          name: 'Amos Wong',
          email: 'amos@mail.com',
          age: 25,
        },
        {
          id: 2,
          name: 'Adam Lao',
          email: 'adam.lao@email.com',
          age: 21,
        },
        {
          id: 3,
          name: 'Stephen Matthew',
          email: 'sm94@mail.com',
          age: 24,
        },
        {
          id: 4,
          name: 'Roger Wiliam',
          email: 'roger.william@mail.com',
          age: 54,
        },
      ],
    };
  },
};
</script>

<style>
#app {
  max-width: 990px;
  margin: 24px auto;
}
</style>
