<template>
  <div class="users-container">
    <heading text="Users"/>
    <el-row type="flex">
      <el-col :span="18">
        <el-input v-model="searchText" placeholder="Enter username to search" clearable/>
      </el-col>
      <el-col :span="6">
        <el-button-group class="button-group">
          <el-button type="primary" icon="el-icon-search" @click="onClickSearch" v-click-control>Search</el-button>
          <el-button type="primary" icon="el-icon-edit-outline" @click="onClickCreateRole" v-click-control>Create User
          </el-button>
        </el-button-group>
      </el-col>
    </el-row>
    <el-table class="table-wrapper"
              :data="userList"
              v-loading="userListLoading"
              style="width: 100%"
              height="450"
              stripe
              highlight-current-row>
      <el-table-column prop="username" label="Username" width="180"/>
      <el-table-column prop="email" label="Email" min-width="350"/>
      <el-table-column prop="gender" label="Gender" width="160" align="center"/>
      <el-table-column prop="status" label="Status" width="120" align="center">
        <template slot-scope="scope">
          <el-tag :type="handleUserStatusTagType(scope.row.status)" effect="dark" disable-transitions>
            {{ formatUserStatus(scope.row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="gmtCreated" label="Created" width="180"/>
      <el-table-column prop="gmtModified" label="Modified" width="180"/>
      <el-table-column fixed="right" label="Operations" width="120" align="center">
        <template slot-scope="scope">
          <el-button @click="onClickEditUser(scope.row)" type="text" size="small">Edit</el-button>
          <el-button @click="onClickDeleteUser(scope.row.id)" type="text" size="small">Delete</el-button>
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
               :visible.sync="userDialogVisible"
               :title="userDialogTitle"
               @dragDialog="handleDrag"
               @close="onClickDiscard"
               width="500px"
               :close-on-click-modal="false">
      <el-form ref="userForm"
               :model="userForm"
               :rules="userFormRules"
               v-loading="userDialogLoading"
               label-width="120px">
        <el-form-item prop="username" label="Username">
          <el-input v-model="userForm.username" placeholder="Not editable" readonly/>
        </el-form-item>
        <el-form-item prop="email" label="Email">
          <el-input v-model="userForm.email" placeholder="Not editable" readonly/>
        </el-form-item>
        <el-form-item prop="cellphone" label="Cellphone">
          <el-input v-model.trim="userForm.cellphone" clearable/>
        </el-form-item>
        <el-form-item prop="fullName" label="Full name">
          <el-input v-model="userForm.fullName" clearable/>
        </el-form-item>
        <el-form-item prop="birthday" label="Birthday">
          <el-date-picker v-model="userForm.birthday"
                          type="date"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd 00:00:00"
                          placeholder="Pick a day"/>
        </el-form-item>
        <el-form-item prop="gender" label="Gender">
          <el-select v-model="userForm.gender" placeholder="Select gender" clearable>
            <el-option v-for="item in Gender.getValueList()" :key="item" :label="item" :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item prop="status" label="Status">
          <el-radio-group v-model="userForm.status">
            <el-radio v-for="(item, index) in UserStatus.getArray()" :label="item.status" :key="index">
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Assigned Role">
          <el-card class="selected-role-container" shadow="never" :body-style="{ padding: '10px' }">
            <el-tag v-show="checkUsersRolesIsEmpty()" type="danger">Not assigned any role</el-tag>
            <template v-for="(item,index) in usersRoles">
              <el-tooltip :key="index" class="item" effect="dark" :content="item.roleDescription" placement="top-start">
                <el-tag class="role-item" :type="getTagType(item)" effect="dark">{{item.roleName}}</el-tag>
              </el-tooltip>
            </template>
          </el-card>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="end">
        <el-button type="primary" icon="el-icon-success" @click="onClickSubmit" v-click-control>Submit</el-button>
        <el-button icon="el-icon-error" @click="onClickDiscard">Discard</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import Heading from '@/components/Heading'
import SecurityAndPermission from '@/api/system-controls/security-and-permission'
import UserStatus from '@/constants/system/user-status'
import Gender from '@/constants/system/gender'
import elDragDialog from '@/directives/el-drag-dialog'
import StringUtil from '@/utils/string'

export default {
  name: 'Users',
  directives: { elDragDialog },
  components: {
    Heading
  },
  data () {
    const validateCellphone = (rule, value, callback) => {
      if (StringUtil.isLengthGraterThen(value, 11)) {
        return callback(new Error(`length of ${rule.field} cannot exceed 11`))
      }
      const regExp = /^\d*$/
      if (!regExp.test(value)) {
        return callback(new Error('invalid cellphone'))
      }
      return callback()
    }
    const validateFullName = (rule, value, callback) => {
      if (StringUtil.isLengthGraterThen(value, 255)) {
        return callback(new Error(`length of ${rule.field} cannot exceed 255`))
      }
      return callback()
    }
    return {
      searchText: null,
      userList: null,
      userListLoading: false,
      currentPage: 1,
      pageSize: 10,
      UserStatus: UserStatus,
      Gender: Gender,
      userDialogVisible: false,
      userDialogTitle: null,
      userDialogLoading: false,
      userForm: {
        id: null,
        username: null,
        email: null,
        cellphone: null,
        fullName: null,
        birthday: null,
        gender: null,
        status: null
      },
      usersRoles: null,
      userFormRules: {
        cellphone: [{ required: false, validator: validateCellphone, trigger: 'change' }],
        fullName: [{ required: false, validator: validateFullName, trigger: 'blur' }]
      },
      tagTypes: ['', 'success', 'info', 'warning', 'danger']
    }
  },
  methods: {
    onClickSearch () {
    },
    onClickCreateRole () {
    },
    handleSizeChange () {
      this.getUserPageList()
    },
    handleCurrentChange () {
      this.getUserPageList()
    },
    getUserPageList () {
      this.userListLoading = true
      const params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      SecurityAndPermission.getUserPageList(params).then(response => {
        this.userList = response.data.userList
      }).finally(() => {
        this.userListLoading = false
      })
    },
    handleUserStatusTagType (status) {
      if (status === this.UserStatus.ENABLED.status) {
        return 'success'
      }
      return 'danger'
    },
    formatUserStatus (status) {
      switch (status) {
        case this.UserStatus.ENABLED.status:
          return this.UserStatus.ENABLED.label
        case this.UserStatus.DISABLED.status:
          return this.UserStatus.DISABLED.label
      }
    },
    onClickEditUser (row) {
      this.userDialogVisible = true
      this.userDialogTitle = 'Edit User\'s Information'
      const params = {
        userId: row.id,
        status: row.status
      }
      this.userDialogLoading = true
      SecurityAndPermission.getUserInfo(params).then(response => {
        this.userForm.id = response.data.id
        this.userForm.username = response.data.username
        this.userForm.email = response.data.email
        this.userForm.cellphone = response.data.cellphone
        this.userForm.fullName = response.data.fullName
        this.userForm.birthday = response.data.birthday
        this.userForm.gender = response.data.gender
        this.userForm.gender = response.data.gender
        this.userForm.status = response.data.status
        this.usersRoles = response.data.usersRoles
      }).finally(() => {
        this.userDialogLoading = false
      })
    },
    checkUsersRolesIsEmpty () {
      if (this.usersRoles === null) {
        return true
      }
      return this.usersRoles.length === 0
    },
    onClickDeleteUser (userId) {
      console.log('userId', userId)
    },
    /**
     * v-el-drag-dialog onDrag callback function
     */
    handleDrag () {
      this.$refs.select.blur()
    },
    onClickSubmit () {
      SecurityAndPermission.editUserBasicInfo(this.userForm).then(response => {
        this.userDialogVisible = false
        this.clearFields()
        this.$message.success(response.message)
        this.getUserPageList()
      }).catch(error => {
        this.$message.error(error)
        console.error('Error occurred when edit user\'s basic information', error)
      })
    },
    onClickDiscard () {
      this.userDialogVisible = false
      this.clearFields()
    },
    clearFields () {
      this.$refs['userForm'].resetFields()
      this.usersRoles = null
    },
    getTagType (item) {
      return this.tagTypes[item.roleId % 5]
    }
  },
  mounted () {
    this.getUserPageList()
  }
}
</script>

<style lang="scss" scoped>
.users-container {
  padding: 20px;

  .button-group {
    margin-left: 10px;
  }

  .role-item {
    margin: 2px;
  }
}
</style>
