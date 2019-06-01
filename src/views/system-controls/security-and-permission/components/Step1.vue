<template>
  <div class="step1-container">
    <el-row type="flex" justify="center">
      <h1 class="heading-text">Choose Role</h1>
    </el-row>
    <el-row type="flex" justify="center">
      <el-select class="role-select"
                 v-model="selectedRoles"
                 v-lazy-select="lazyLoad"
                 value-key="id"
                 placeholder="Select"
                 multiple
                 collapse-tags
                 filterable>
        <el-option v-for="(item,index) in roleList" :key="index" :label="item.name" :value="item"/>
      </el-select>
    </el-row>
    <el-row type="flex" justify="center">
      <el-card class="selected-role-container" shadow="hover">
        <template v-for="(item,index) in selectedRoles">
          <el-tooltip :key="index" class="item" effect="dark" :content="item.description" placement="top-start">
            <el-tag class="selected-role-item"
                    :type="getTagType(item)"
                    @close="onCloseTag(index)"
                    @click="onClickTag(item)"
                    closable>
              {{item.name}}
            </el-tag>
          </el-tooltip>
        </template>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import LazySelect from '@/directives/lazy-select'
import SecurityAndPermission from '@/api/system-controls/security-and-permission'

export default {
  name: 'Step1',
  directives: { LazySelect },
  props: {
    step1SelectedRoles: { type: Array, require: true }
  },
  watch: {
    selectedRoles: {
      deep: true,
      handler (val) {
        this.$emit('step1-role-select', val)
      }
    },
    step1SelectedRoles: {
      deep: true,
      handler (val) {
        this.selectedRoles = val
      }
    }
  },
  data () {
    return {
      roleList: [],
      selectedRoles: [],
      tagTypes: ['', 'success', 'info', 'warning', 'danger'],
      currentPage: 1,
      pageSize: 10,
      limitReached: false
    }
  },
  methods: {
    getRoleList () {
      const params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      SecurityAndPermission.getRoles(params).then(response => {
        this.roleList = [...this.roleList, ...response.data]
      }).catch(error => {
        this.$message.error(error)
        console.error('Error occurred.', error)
      })
    },
    lazyLoad () {
      if (this.limitReached) {
        return
      }
      const params = {
        currentPage: ++this.currentPage,
        pageSize: this.pageSize
      }
      SecurityAndPermission.getRoles(params).then(response => {
        if (response.data.length > 0) {
          this.roleList = [...this.roleList, ...response.data]
        } else {
          this.limitReached = true
        }
      }).catch(error => {
        this.$message.error(error)
        console.error('Error occurred.', error)
      })
    },
    getTagType (selectedRole) {
      return this.tagTypes[selectedRole.id % 5]
    },
    onClickTag (selectedRole) {
      // TODO: need to add click event to open a dialog showing the permissions which has been authorized to the role
      console.error('need to add click event to open a dialog showing the permissions which has been authorized to the role',
        selectedRole)
    },
    onCloseTag (index) {
      this.selectedRoles.splice(index, 1)
    }
  },
  mounted () {
    this.selectedRoles = this.step1SelectedRoles
    this.getRoleList()
  }
}
</script>

<style lang="scss" scoped>
.step1-container {
  .heading-text {
    margin: 10px auto;
    font-size: 48px;
    font-weight: lighter;
  }

  .role-select {
    width: 300px;
  }

  .selected-role-container {
    margin-top: 40px;
    width: 600px;
    height: 330px;
  }

  .selected-role-item {
    margin: 2px;
  }
}
</style>
