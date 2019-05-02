<template>
  <div class="components-container">
    <el-button type="primary" @click="dialogTableVisible = true">
      open a Drag Dialog
    </el-button>
    <el-dialog v-el-drag-dialog :visible.sync="dialogTableVisible" title="Shipping address" @dragDialog="handleDrag">
      <el-select ref="select" v-model="value" placeholder="Select">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select>
      <el-table :data="gridData">
        <el-table-column property="date" label="Date" width="150"/>
        <el-table-column property="name" label="Name" width="200"/>
        <el-table-column property="address" label="Address"/>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
// Base on Element UI
import elDragDialog from '@/directives/el-drag-dialog'

export default {
  name: 'DragDialogDemo',
  directives: { elDragDialog },
  data () {
    return {
      dialogTableVisible: false,
      options: [
        { value: 'Option 1', label: 'Double Mushroom & Swiss Burger' },
        { value: 'Option 2', label: 'Double Bacon Smokehouse Burger' },
        { value: 'Option 3', label: 'Mushroom & Swiss Buttermilk Crispy Chicken' },
        { value: 'Option 4', label: 'Mushroom & Swiss Artisan Grilled Chicken' }
      ],
      value: '',
      gridData: [{
        date: '2016-05-02',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District'
      }, {
        date: '2016-05-04',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District'
      }, {
        date: '2016-05-01',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District'
      }, {
        date: '2016-05-03',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District'
      }]
    }
  },
  methods: {
    // v-el-drag-dialog onDrag callback function
    handleDrag () {
      this.$refs.select.blur()
    }
  }
}
</script>
