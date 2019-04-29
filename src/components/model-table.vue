<template>

  <table>
    <slot name="caption"/>
    <thead>
      <tr>
        <slot name="head"></slot>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items">
        <slot v-bind="{ item }"></slot>
      </tr>
      <slot name="rows" />
    </tbody>
  </table>
</template>

<script lang="tsx">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ModelTableColumn from './vue-model-table-column'

@Component({
  components: {
    ModelTableColumn
  }
})
export default class VueModelTable extends Vue {
  @Prop(Object) readonly options!: any

  items: any[] = [];

  // render(h) {
  //   const items = this.items;
  //   const modelTableColumns = this.$slots.default;
    
  //   return (
  //     <table>
  //       <thead>
  //         <tr>
  //           {
  //             modelTableColumns.map((column) => (
  //               h('th', [
  //                 column.componentOptions.propsData['title']
  //               ])
  //             ))
  //           }
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {
  //           items.map(item => (
  //             <tr>
  //               {
  //                 modelTableColumns
  //                   // .map(x => {
  //                   //   x.componentOptions = Vue.extend(x.componentOptions)
  //                   //   return x;
  //                   // })
  //                   // .map(x => (x.componentOptions.propsData['item'] = { ...item }, x))
  //                   // .map(x => (console.log(x), x))
  //                   .map(column => h('td', [
  //                     h(column, () => ({
  //                       props: {
  //                         item,
  //                       }
  //                     }))
  //                   ]))
  //               }
  //             </tr>
  //           ))
  //         }
  //       </tbody>
  //     </table>
  //   );
  // }

  get tableOptions() {
    return {
      fetchFn: () => Promise.resolve([]),
      ...this.options || {},
    }
  }

  mounted() {
    this.fetchData();
  }

  async fetchData() {
    this.items = await this.options.fetchFn();
  }
}
</script>