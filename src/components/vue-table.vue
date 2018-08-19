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
        >
          <component
            v-if="field.component"
            :is="field.component || 'td'"
            :item="field.component && item[field.key]"
            @emit="$_bypassEvent"
          />
          <template v-else>{{ item[field.key] }}</template>
        </td>
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
    perPage: {
      type: Number,
      default: 10,
    },
    offset: {
      type: Number,
      default: 0,
    },

    // Additional tweak function
    loadFn: {
      type: Function,
      default: () => [],
    },
    responseTransformFn: {
      type: Function,
      default: result => result,
    },
  },
  data() {
    return {
      items: [],
      pageOffset: this.offset,
    };
  },
  mounted() {
    this.$_loadData();
  },
  methods: {
    // Public functions
    async move(factor = 1) {
      this.pageOffset = this.pageOffset + (this.perPage * factor);
      return this.$_loadData();
    },

    // Private functions
    async $_loadData() {
      this.items = await this.loadFn({
        perPage: this.perPage,
        offset: this.pageOffset,
      })
        .then(this.responseTransformFn)
        ;
    },
    $_bypassEvent(eventPayload) {
       this.$emit(...eventPayload);
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
