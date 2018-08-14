<template>
  <table class="vue-table">
    <thead>
      <tr>
        <th
          v-for="field in fields"
          :key="field.key"
        >
          {{ field.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in items"
        :key="item.id || index"
      >
        <td
          v-for="field in fields"
          :key="field.key"
        >{{ item[field.key] }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'vue-table',
  props: {
    fields: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vue-table {
  width: 100%;
}
</style>
