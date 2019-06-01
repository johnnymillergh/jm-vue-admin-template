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
            <el-table class="table-wrapper"
                      ref="apiList"
                      :data="item.apiList"
                      @selection-change="onSelectionChange"
                      style="width: 100%"
                      height="100%"
                      stripe
                      highlight-current-row>
              <el-table-column type="selection" width="55"/>
              <el-table-column prop="url" label="Name"/>
              <el-table-column prop="description" label="Description"/>
            </el-table>
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
    step2SelectedPermissions: { type: Map, require: true }
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
    step2SelectedPermissions: {
      deep: true,
      handler (val) {
        this.selectedPermissions = val
      }
    }
  },
  data () {
    return {
      selectedPermissionScopes: [],
      selectedPermissions: new Map(),
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
      this.selectedPermissions = new Map()
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
      }).then(() => {
        this.toggleSelectedPermissions()
      })
      // TODO: if only selected one role, then should check the APIs that have been authorized to it.
    },
    onClickInvoke (index) {
      if (this.$refs.apiList instanceof Array) {
        this.permissionDetailList[index].apiList.forEach(item => {
          this.$refs.apiList[index].toggleRowSelection(item)
        })
        return
      }
      this.permissionDetailList[index].apiList.forEach(item => {
        this.$refs.apiList.toggleRowSelection(item)
      })
    },
    onClickRevoke (index) {
      if (this.$refs.apiList instanceof Array) {
        this.$refs.apiList[index].clearSelection()
        return
      }
      this.$refs.apiList.clearSelection()
    },
    emitSelectedPermissions () {
      this.$emit('step2-permission-select', this.selectedPermissions)
    },
    onSelectionChange () {
      if (this.$refs.apiList instanceof Array) {
        this.$refs.apiList.forEach(item => {
          item.selection.forEach(selected => {
            this.selectedPermissions.set(selected.permissionId, selected)
          })
        })
        this.emitSelectedPermissions()
        return
      }
      this.$refs.apiList.selection.forEach(item => {
        this.selectedPermissions.set(item.permissionId, item)
      })
      this.emitSelectedPermissions()
    },
    toggleSelectedPermissions () {
      if (this.$refs.apiList instanceof Array) {
        this.$refs.apiList.forEach((item, index) => {
          this.selectedPermissions.forEach((value, key) => {
            const selected = this.permissionDetailList[index].apiList.find(element => {
              return element.permissionId === key
            })
            if (selected) {
              item.toggleRowSelection(selected)
            }
          })
        })
        return
      }
      this.selectedPermissions.forEach((value, key) => {
        const selected = this.permissionDetailList[0].apiList.find(element => {
          return element.permissionId === key
        })
        if (selected) {
          this.$refs.apiList.toggleRowSelection(selected)
        }
      })
    }
  },
  mounted () {
    this.selectedPermissionScopes = this.step2SelectedPermissionScopes
    this.selectedPermissions = this.step2SelectedPermissions
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
