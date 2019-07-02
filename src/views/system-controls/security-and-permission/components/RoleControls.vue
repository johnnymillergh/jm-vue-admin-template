<template>
  <div class="role-controls-container">
    <heading text="Role List"/>
    <el-row type="flex">
      <el-col :span="18">
        <el-input v-model="searchText" placeholder="Enter role name to search" clearable/>
      </el-col>
      <el-col :span="6">
        <el-button-group class="button-group">
          <el-button type="primary" icon="el-icon-search" @click="onClickSearch">Search</el-button>
          <el-button type="primary" icon="el-icon-edit-outline" @click="onClickCreateRole">Create Role</el-button>
        </el-button-group>
      </el-col>
    </el-row>
    <el-table class="table-wrapper"
              :data="roleList"
              v-loading="roleListLoading"
              style="width: 100%"
              height="450"
              stripe
              highlight-current-row>
      <el-table-column prop="name" label="Name" width="180"/>
      <el-table-column prop="description" label="Description"/>
      <el-table-column prop="gmtCreated" label="Created" width="180"/>
      <el-table-column prop="gmtModified" label="Modified" width="180"/>
      <el-table-column label="Operations" width="120" align="center">
        <template slot-scope="scope">
          <el-button @click="onClickEditRole(scope.row)" type="text" size="small">Edit</el-button>
          <el-button @click="onClickDeleteRole(scope.row.id)" type="text" size="small">Delete</el-button>
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
               @close="onClickCancel"
               width="500px"
               :close-on-click-modal="false">
      <el-form ref="roleForm" :model="roleForm" :rules="createRoleFormRules" label-width="120px">
        <el-form-item prop="name" label="Name">
          <el-input v-model="roleForm.name" placeholder="Enter name" clearable/>
        </el-form-item>
        <el-form-item prop="description" label="Description">
          <el-input v-model="roleForm.description" type="textarea" :rows="3" placeholder="Enter description"/>
        </el-form-item>
        <el-form-item v-show="roleForm.id!==null" label="Created">
          <el-input v-model="gmtCreated" readonly/>
        </el-form-item>
        <el-form-item v-show="roleForm.id!==null" label="Modified">
          <el-input v-model="gmtModified" readonly/>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="end">
        <el-button type="primary" icon="el-icon-success" @click="onClickSave" v-click-control>Save</el-button>
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
      const params = {
        id: this.roleForm.id,
        name: value
      }
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
      edited: false,
      roleForm: {
        id: null,
        name: null,
        description: null
      },
      gmtCreated: null,
      gmtModified: null,
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
        this.roleList = response.data.roleList
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
    onClickCreateRole () {
      this.createDialogVisible = true
    },
    onClickEditRole (row) {
      this.createDialogVisible = true
      this.roleForm.id = row.id
      this.roleForm.name = row.name
      this.roleForm.description = row.description
      this.gmtCreated = row.gmtCreated
      this.gmtModified = row.gmtModified
    },
    onClickDeleteRole (id) {
      this.$message.info(`This feature is under construction and coming soon. Delete role ${id}`)
    },
    // v-el-drag-dialog onDrag callback function
    handleDrag () {
      this.$refs.select.blur()
    },
    async onClickSave () {
      let createRoleFormValidity = false
      try {
        createRoleFormValidity = await this.$refs['roleForm'].validate()
      } catch (error) {
        createRoleFormValidity = error
      }
      if (!createRoleFormValidity) {
        return
      }
      if (this.roleForm.id !== null) {
        SecurityAndPermission.editRole(this.roleForm).then(response => {
          this.$message.success(response.message)
          this.$refs['roleForm'].resetFields()
          this.roleForm.id = null
          this.onClickCancel()
          this.getRoleList()
        }).catch(error => {
          this.$message.error(error)
          console.error('Error occurred when creating role', error)
        })
        return
      }
      SecurityAndPermission.createRole(this.roleForm).then(response => {
        this.$message.success(response.message)
        this.$refs['roleForm'].resetFields()
        this.onClickCancel()
        this.getRoleList()
      }).catch(error => {
        this.$message.error(error)
        console.error('Error occurred when creating role', error)
      })
    },
    onClickCancel () {
      this.createDialogVisible = false
      if (this.roleForm.id !== null) {
        this.roleForm = { id: null, name: null, description: null }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.role-controls-container {
  .button-group {
    margin-left: 10px;
  }
}
</style>
