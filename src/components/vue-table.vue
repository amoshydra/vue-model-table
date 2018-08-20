<template>
  <table class="table">
    <slot name="caption"/>
    <thead :class="classes.head">
      <tr>
        <th
          v-for="field in fields"
          :key="field.key"
          @click="$emit('clickHead', field.key)"
        >
          {{ field.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in items"
        :key="item.id || index"
        :class="classes.row"
      >
        <td
          v-for="field in fields"
          :key="field.key"
          :class="classes.data"
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
      <slot name="row"/>
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

    // Styling customisation
    classes: {
      type: Object,
      default: () => ({}),
    },

    // Additional tweak function
    loadCountFn: {
      type: Function,
      default: () => 0,
    },
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

      loading: true,
      totalItems: 0,
    };
  },
  computed: {
    canMoveBack() {
      return this.pageOffset >= this.perPage;
    },
    canMoveForward() {
      return this.pageOffset < (this.totalItems - this.perPage);
    },
  },
  mounted() {
    this.$_loadCount();
    this.$_loadData({
      perPage: this.perPage,
      offset: this.pageOffset,
    });
  },
  methods: {
    // Public functions
    async move(configuration) {
      const factor =
        ((configuration || {}).factor != null)
          ? (configuration || {}).factor
          : ((configuration != null)
            ? configuration
            : 1
          );
      const moveOption = {
        perPage: this.perPage,
        offset: configuration.offset != null
          ? configuration.offset
          : this.pageOffset + (this.perPage * factor)
          ,
      };

      const results = await this.$_loadData(moveOption);
      this.pageOffset = moveOption.offset;
      return results;
    },

    // Private functions
    async $_loadData({ perPage, offset }) {
      this.loading = true;

      try {
        this.items = await this.loadFn({ perPage, offset })
          .then(response => this.responseTransformFn(response, { perPage, offset }))
          ;
      } finally {
        this.loading = false;
      }
    },
    async $_loadCount() {
      this.totalItems = await this.loadCountFn();
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
