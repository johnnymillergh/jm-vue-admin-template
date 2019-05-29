<template>
  <div class="step2-container">
    <el-form :inline="true">
      <el-form-item label="Permission Scope">
        <el-select class="permission-scope-select"
                   v-model="selectedPermissionScope"
                   placeholder="Select"
                   multiple
                   collapse-tags
                   filterable>
          <el-option v-for="(item,index) in permissionScopeList"
                     :label="item.className"
                     :value="item.packageName+'.'+item.className"
                     :key="index"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onClickLoad" v-click-control>Load</el-button>
      </el-form-item>
    </el-form>
    <el-row class="permission-detail-container">
      <template v-for="(item,index) in permissionDetailList">
        <el-col class="permission-detail-item" :key="index">
          <el-card shadow="never">
            <div slot="header">
              <el-row>
                <el-col :span="12" class="permission-title">
                  {{item.controllerName}}
                </el-col>
                <el-col :span="12" align="right">
                  <el-button type="danger">Revoke</el-button>
                </el-col>
              </el-row>
            </div>
            <div>{{item.apiList}}</div>
          </el-card>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script>
import SecurityAndPermission from '@/api/system-controls/security-and-permission'
import PermissionType from '@/constants/system/permission-type'

export default {
  name: 'Step2',
  props: {},
  data () {
    return {
      selectedPermissionScope: [],
      permissionScopeList: [],
      permissionDetailList: [],
      permissionType: PermissionType.BUTTON.type
    }
  },
  methods: {
    getPermissionScope () {
      SecurityAndPermission.getController().then(response => {
        this.permissionScopeList = response.data.controllerList
      }).catch(error => {
        this.$message.error(error.message)
        console.error(error)
      })
    },
    onClickLoad () {
      if (this.selectedPermissionScope.length === 0) {
        return
      }
      const params = {
        controllerFullClassName: this.selectedPermissionScope,
        permissionType: this.permissionType
      }
      SecurityAndPermission.getPermissions(params).then(response => {
        this.permissionDetailList = response.data.controllerList
      })
    }
  },
  mounted () {
    this.getPermissionScope()
  }
}
</script>

<style lang="scss" scoped>
.step2-container {
  .permission-scope-select {
    width: 320px;
  }

  .permission-detail-container {
    height: 450px;
    overflow: auto;

    .permission-detail-item {
      padding: 5px;

      .permission-title {
        font-size: 36px;
      }

      .permission-subtitle {
        font-size: 24px;
      }
    }
  }
}
</style>
