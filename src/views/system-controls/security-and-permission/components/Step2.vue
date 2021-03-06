<template>
  <div class="step2-container">
    <el-form :inline="true">
      <el-form-item label="Permission Scope">
        <el-select class="permission-scope-select"
                   v-model="selectedPermissionScopes"
                   placeholder="Select"
                   multiple
                   collapse-tags
                   filterable
                   clearable>
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
                  <el-button type="primary" @click="onClickInvoke(index)">Invoke</el-button>
                  <el-button type="danger" @click="onClickRevoke(index)">Revoke</el-button>
                </el-col>
              </el-row>
            </div>
            <el-checkbox-group v-model="selectedPermissionIdList">
              <el-table class="table-wrapper"
                        ref="apiList"
                        :data="item.apiList"
                        style="width: 100%"
                        height="100%"
                        stripe
                        highlight-current-row>
                <el-table-column prop="url" label="URL">
                  <template slot-scope="scope">
                    <el-checkbox :label="scope.row.permissionId">{{scope.row.url}}</el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column prop="description" label="Description"/>
              </el-table>
            </el-checkbox-group>
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
  props: {
    step2SelectedPermissionScopes: { type: Array, require: true },
    step2SelectedPermissionIdList: { type: Array, require: true }
  },
  watch: {
    selectedPermissionScopes: {
      deep: true,
      handler (val) {
        this.$emit('step2-permission-scopes-select', val)
      }
    },
    step2SelectedPermissionScopes: {
      deep: true,
      handler (val) {
        this.selectedPermissionScopes = val
        if (this.selectedPermissionScopes.length === 0) {
          this.onClearPermissionScopes()
        }
        this.onClickLoad()
      }
    },
    selectedPermissionIdList: {
      deep: true,
      handler (val) {
        this.$emit('step2-permission-select', val)
      }
    },
    step2SelectedPermissionIdList: {
      deep: true,
      handler (val) {
        this.selectedPermissionIdList = val
      }
    }
  },
  data () {
    return {
      selectedPermissionScopes: [],
      selectedPermissionIdList: [],
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
    onClearPermissionScopes () {
      this.selectedPermissionIdList = []
      this.permissionDetailList = []
    },
    onClickLoad () {
      if (this.selectedPermissionScopes.length === 0) {
        return
      }
      const params = {
        controllerFullClassName: this.selectedPermissionScopes,
        permissionType: this.permissionType
      }
      SecurityAndPermission.getPermissions(params).then(response => {
        this.permissionDetailList = response.data.controllerList
      })
      // TODO: if only selected one role, then should check the APIs that have been authorized to it.
    },
    onClickInvoke (index) {
      this.permissionDetailList[index].apiList.forEach(item => {
        const permissionId = this.selectedPermissionIdList.find(permissionId => {
          return permissionId === item.permissionId
        })
        if (!permissionId) {
          this.selectedPermissionIdList.push(item.permissionId)
        }
      })
    },
    onClickRevoke (index) {
      this.permissionDetailList[index].apiList.forEach(item => {
        const permissionId = this.selectedPermissionIdList.find(permissionId => {
          return permissionId === item.permissionId
        })
        if (permissionId) {
          const index = this.selectedPermissionIdList.indexOf(permissionId)
          this.selectedPermissionIdList.splice(index, 1)
        }
      })
    }
  },
  mounted () {
    this.selectedPermissionScopes = this.step2SelectedPermissionScopes
    this.selectedPermissionIdList = this.step2SelectedPermissionIdList
    this.getPermissionScope()
    this.onClickLoad()
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
