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
    initialItems: {
      type: Array,
      default: () => [],
    },
    loadFn: {
      type: Function,
    },
    limit: {
      type: Number,
      default: 10,
    },
    offset: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      items: this.initialItems,
    };
  },
  mounted() {
    this.$_loadData();
  },
  methods: {
    async $_loadData() {
      if (this.loadFn) {
        this.items = await this.loadFn({
          limit: this.limit,
          offset: this.offset,
        });
      }
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
