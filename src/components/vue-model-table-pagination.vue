<template>
  <nav v-if="tableContext" class="model-table-pagination">
    <ul class="pagination">
      <li
        class="page-item"
        :class="{ disabled: tableContext.loading || !tableContext.canMoveBack }"
      ><a
        class="page-link"
        href="#"
        @click.prevent="tableContext.move(-1)"
      >Previous</a></li>

      <slot/>

      <li
        class="page-item"
        :class="{ disabled: tableContext.loading || !tableContext.canMoveForward }"
      ><a
        class="page-link"
        href="#"
        @click.prevent="tableContext.move(1)"
      >Next</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'vue-model-table-pagination',
  props: {
    tableContext: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
