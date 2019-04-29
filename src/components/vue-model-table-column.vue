<template>
  <td>
    <slot v-bind="slotProps">{{ value }}</slot>
  </td>
</template>

<script lang="ts">
import { get } from 'lodash'
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class VueModelTableColumn extends Vue {
  @Prop(String) readonly accessor!: string
  @Prop(Object) readonly item!: any

  get value() {
    return get(this.item, this.accessor);
  }

  get slotProps() {
    return ({
      accessor: this.accessor,
      item: this.item,
      value: this.value,
    })
  }
}
</script>