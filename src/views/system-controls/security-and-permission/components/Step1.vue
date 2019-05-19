<template>
  <div class="step1-container">
    <el-form>
      <el-form-item label="Permission Scope">
        <el-select class="permission-scope-select" v-model="selectedPermissionScope" placeholder="Select" multiple>
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"/>
        </el-select>
      </el-form-item>
    </el-form>
    <el-row class="permission-detail-container">
      <template v-for="(item,index) in permissionDetailList">
        <el-col class="permission-detail-item" :key="index">
          <el-card shadow="never">
            <div slot="header">
              <div class="permission-header">{{item.controllerName}}</div>
            </div>
            {{item.description}}
          </el-card>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Step1',
  data () {
    return {
      selectedPermissionScope: [],
      options: [{
        value: 'Option1',
        label: 'Option1'
      }, {
        value: 'Option2',
        label: 'Option2'
      }, {
        value: 'Option3',
        label: 'Option3'
      }, {
        value: 'Option4',
        label: 'Option4'
      }, {
        value: 'Option5',
        label: 'Option5'
      }],
      permissionDetailList: [{
        controllerName: 'Controller1',
        description: 'Description1 Description1 Description1 Description1 Description1'
      }, {
        controllerName: 'Controller2',
        description: 'Description2 Description2 Description2 Description2 Description2'
      }, {
        controllerName: 'Controller3',
        description: 'Description3 Description3 Description3 Description3 Description3'
      }, {
        controllerName: 'Controller4',
        description: 'Description4 Description4 Description4'
      }, {
        controllerName: 'Controller5',
        description: 'Description5 Description5'
      }, {
        controllerName: 'Controller6',
        description: 'Description6 Description6'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.step1-container {
  .permission-scope-select {
    width: 320px;
  }

  .permission-detail-container {
    height: 300px;
    overflow: auto;

    .permission-detail-item {
      padding: 5px;

      .permission-header {
        margin-bottom: 5px;
        font-weight: bold
      }
    }
  }
}
</style>
