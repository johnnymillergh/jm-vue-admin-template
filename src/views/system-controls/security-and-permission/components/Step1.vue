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
        <el-option v-for="(item,index) in roleList" :key="index" :label="item.roleName" :value="item"/>
      </el-select>
    </el-row>
    <el-row type="flex" justify="center">
      <el-card class="selected-role-container" shadow="hover">
        <template v-for="(item,index) in selectedRoles">
          <el-tag class="selected-role-item"
                  :type="getTagType(item)"
                  @close="onCloseTag(index)"
                  :key="index"
                  closable>
            {{item.roleName}}
          </el-tag>
        </template>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import LazySelect from '@/directives/lazy-select'

export default {
  name: 'Step1',
  directives: { LazySelect },
  data () {
    return {
      roleList: [{
        id: 1,
        roleName: 'Option1'
      }, {
        id: 2,
        roleName: 'Option2'
      }, {
        id: 3,
        roleName: 'Option3'
      }, {
        id: 4,
        roleName: 'Option4'
      }, {
        id: 5,
        roleName: 'Option5'
      }],
      selectedRoles: [],
      tagTypes: ['', 'success', 'info', 'warning', 'danger']
    }
  },
  methods: {
    lazyLoad () {
      console.log('lazy-select')
    },
    getTagType (selectedRole) {
      return this.tagTypes[selectedRole.id % 5]
    },
    onCloseTag (index) {
      this.selectedRoles.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.step1-container {
  .heading-text {
    /*display: block;*/
    /*width: 300px;*/
    margin: 10px auto;
    font-size: 48px;
    font-weight: lighter;
  }

  .role-select {
    width: 300px;
  }

  .selected-role-container {
    margin: 10px;
    width: 600px;
    height: 230px;
  }

  .selected-role-item {
    margin: 2px;
  }
}
</style>
