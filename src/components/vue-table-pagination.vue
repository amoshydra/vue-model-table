<template>
  <nav v-if="vueTable" class="table-pagination">
    <ul class="pagination">
      <li
        class="page-item"
        :class="{ disabled: vueTable.loading || !vueTable.canMoveBack }"
      ><a
        class="page-link"
        href="#"
        @click.prevent="vueTable.move(-1)"
      >Previous</a></li>

      <slot/>

      <li
        class="page-item"
        :class="{ disabled: vueTable.loading || !vueTable.canMoveForward }"
      ><a
        class="page-link"
        href="#"
        @click.prevent="vueTable.move(1)"
      >Next</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    vueTable: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style scoped>
.table-pagination {
  display: inline-block;
}
.table-pagination__nav {
  display: inline-block;
}
.table-pagination__button {
  display: inline-block;
}
</style>
