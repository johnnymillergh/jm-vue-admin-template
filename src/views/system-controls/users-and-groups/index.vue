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
      <el-table-column prop="gender" label="Gender" width="120" align="center"/>
      <el-table-column prop="status" label="Status" width="120" align="center">
        <template slot-scope="scope">
          <el-tag :type="handleUserStatusTagType(scope.row.status)" disable-transitions>
            {{ formatUserStatus(scope.row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="gmtCreated" label="Created" width="180"/>
      <el-table-column prop="gmtModified" label="Modified" width="180"/>
      <el-table-column fixed="right" label="Operations" width="120">
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
  </div>
</template>

<script>
import Heading from '@/components/Heading'
import SecurityAndPermission from '@/api/system-controls/security-and-permission'
import UserStatus from '@/constants/system/user-status'

export default {
  name: 'UsersAndGroups',
  components: {
    Heading
  },
  data () {
    return {
      searchText: null,
      userList: null,
      userListLoading: false,
      currentPage: 1,
      pageSize: 10,
      UserStatus: UserStatus
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
}
</style>
