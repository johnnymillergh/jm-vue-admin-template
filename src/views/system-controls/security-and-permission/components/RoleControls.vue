<template>
  <div class="role-controls-container">
    <heading text="Role List"/>
    <el-row type="flex">
      <el-col :span="18">
        <el-input class="search-input" placeholder="Enter role name to search"
                  v-model="searchText"
                  clearable/>
      </el-col>
      <el-col :span="6">
        <el-button-group>
          <el-button type="primary" icon="el-icon-search" @click="onClickSearch">Search</el-button>
          <el-button type="primary" icon="el-icon-edit-outline" @click="onClickEditRole">Create Role</el-button>
        </el-button-group>
      </el-col>
    </el-row>
    <el-table class="table-wrapper"
              :data="roleList"
              v-loading="roleListLoading"
              style="width: 100%"
              height="450"
              highlight-current-row
              stripe>
      <el-table-column prop="name" label="Name" width="180"/>
      <el-table-column prop="description" label="Description"/>
      <el-table-column prop="gmtCreated" label="Created" width="180"/>
      <el-table-column prop="gmtModified" label="Modified" width="180"/>
      <el-table-column fixed="right" label="Operations" width="120">
        <template>
          <el-button @click="onClickEditRole" type="text" size="small">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page.sync="currentPage"
                   :page-size.sync="pageSize"
                   :page-sizes="[10, 30, 50, 100]"
                   layout="prev, next, jumper, sizes"
                   background/>
    <el-dialog v-el-drag-dialog
               :visible.sync="createDialogVisible"
               title="Create a Role"
               @dragDialog="handleDrag"
               :close-on-click-modal="false" width="500px">
      <el-form ref="createRoleForm"
               :model="createRoleForm"
               :rules="createRoleFormRules"
               class="create-role-form"
               label-width="120px">
        <el-form-item prop="name" label="Name">
          <el-input v-model="createRoleForm.name" placeholder="Enter name" clearable/>
        </el-form-item>
        <el-form-item prop="description" label="Description">
          <el-input v-model="createRoleForm.description" type="textarea" :rows="3" placeholder="Enter description">
          </el-input>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="end">
        <el-button type="primary" icon="el-icon-success" @click="onClickSave">Save</el-button>
        <el-button icon="el-icon-error" @click="onClickCancel">Cancel</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import Heading from '@/components/Heading'
import SecurityAndPermission from '@/api/system-controls/security-and-permission'
// Base on Element UI
import elDragDialog from '@/directives/el-drag-dialog'
import StringUtil from '@/utils/string'

export default {
  name: 'RoleControls',
  directives: { elDragDialog },
  components: {
    Heading
  },
  data () {
    const validateName = (rule, value, callback) => {
      if (StringUtil.isEmpty(value)) {
        return callback(new Error('Name is required'))
      }
      if (value.length > 50) {
        return callback(new Error('length cannot exceed 50'))
      }
      const params = { roleName: value }
      SecurityAndPermission.checkRoleName(params).then(() => {
        return callback()
      }).catch(error => {
        return callback(new Error(error))
      })
    }
    return {
      roleListLoading: false,
      currentPage: 1,
      pageSize: 10,
      searchText: null,
      roleList: null,
      createDialogVisible: false,
      createRoleForm: {
        name: null,
        description: null
      },
      createRoleFormRules: {
        name: [{ required: true, trigger: 'blur', validator: validateName }],
        description: [{ required: true, trigger: 'blur', message: 'Description is required' }]
      }
    }
  },
  mounted () {
    this.getRoleList()
  },
  methods: {
    handleSizeChange () {
      this.getRoleList()
    },
    handleCurrentChange () {
      this.getRoleList()
    },
    getRoleList () {
      this.roleListLoading = true
      const params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      SecurityAndPermission.getRoleList(params).then(response => {
        this.roleList = response.data
      }).catch(error => {
        this.$message.error(error)
        console.error('!!!!!', error)
      }).finally(() => {
        this.roleListLoading = false
      })
    },
    onClickSearch () {
      if (StringUtil.isEmpty(this.searchText)) {
        this.getRoleList()
        return
      }
      const params = {
        roleName: this.searchText
      }
      SecurityAndPermission.searchRole(params).then(response => {
        this.roleList = [response.data]
      }).catch(error => {
        this.$message.error(error)
      })
    },
    onClickEditRole () {
      this.createDialogVisible = true
    },
    // v-el-drag-dialog onDrag callback function
    handleDrag () {
      this.$refs.select.blur()
    },
    async onClickSave () {
      let createRoleFormValidity = false
      try {
        createRoleFormValidity = await this.$refs['createRoleForm'].validate()
      } catch (error) {
        createRoleFormValidity = error
      }
      if (!createRoleFormValidity) {
        return
      }
      SecurityAndPermission.createRole(this.createRoleForm).then(response => {
        this.$message.success(response.message)
        this.$refs['createRoleForm'].resetFields()
        this.onClickCancel()
        this.getRoleList()
      }).catch(error => {
        this.$message.error(error)
        console.log('Error occurred when creating role', error)
      })
    },
    onClickCancel () {
      this.createDialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.role-controls-container {
  .search-input {
    padding-right: 10px;
  }
}
</style>
