<template>
  <div class="users-container">
    <heading text="Users"/>
    <el-row type="flex">
      <el-col :span="18">
        <el-input v-model="searchText" placeholder="Enter username to search" clearable/>
      </el-col>
      <el-col :span="6">
        <el-button-group class="button-group">
          <el-button type="primary" icon="el-icon-search" @click="onClickSearch">Search</el-button>
          <el-button type="primary" icon="el-icon-edit-outline" @click="onClickCreateRole">Create User</el-button>
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
      <el-table-column prop="name" label="Name" width="180"/>
      <el-table-column prop="description" label="Description"/>
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
      pageSize: 10
    }
  },
  methods: {
    onClickSearch () {
    },
    onClickCreateRole () {
    },
    handleSizeChange () {
    },
    handleCurrentChange () {
    }
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
