<template>
  <div class="app-container">
    <el-tabs @tab-click="handleClick" type="border-card">
      <el-tab-pane label="Permission Controls">
        <heading text="API Glance"/>
        <el-row :gutter="5">
          <el-col :span="8">
            <el-card shadow="never" style="height: 290px" :body-style="{padding: '0'}">
              <div slot="header" class="clearfix">
                <div style="margin-bottom: 5px">Controller List</div>
                <el-input v-model="searchText" size="mini" placeholder="Type class name to search"/>
              </div>
              <div style="height: 202px; overflow: auto; padding: 5px">
                <el-table :data="getFilteredControllerList()" stripe highlight-current-row @row-click="onClickTableRow">
                  <el-table-column label="#" width="50px">
                    <template slot-scope="scope">
                      <el-radio v-model="selectedController" :label="scope.row" @change="onSelectController"><i></i>
                      </el-radio>
                    </template>
                  </el-table-column>
                  <el-table-column prop="className" label="Class Name"/>
                </el-table>
              </div>
            </el-card>
          </el-col>
          <el-col :span="16">
            <el-card shadow="never" style="height: 290px">
              <el-form label-width="120px">
                <el-form-item label="Status">
                  <el-radio v-model="apiStatus" :label="ApiStatus.IDLED.status" border>Idled</el-radio>
                  <el-radio v-model="apiStatus" :label="ApiStatus.IN_USED.status" border>In use</el-radio>
                </el-form-item>
                <el-form-item label="URL">
                  <el-select v-model="selectedUrl" @change="onSelectUrl" placeholder="Select" style="width: 598px">
                    <el-option v-for="(item,index) in apiList" :label="item.url" :value="index" :key="index"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="Method">
                  <el-input v-model="method" readonly/>
                </el-form-item>
                <el-form-item label="Description">
                  <el-input v-model="description" readonly/>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px; margin-bottom: 5px">
          <el-col align="right">
            <el-button type="warning">Set it in Use</el-button>
          </el-col>
        </el-row>
        <heading text="API Analysis"/>
        <el-row style="height: 150px; background: #409EFF">
          Pie Chart for API Analysis Here.
        </el-row>
        <heading text="API Details"/>
        <el-row style="height: 450px; background: #409EFF">
          API detail table here.
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Role Controls">
        Role Controls
      </el-tab-pane>
      <el-tab-pane label="Authorization">
        Authorization
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Heading from '@/components/Heading'
import ApiStatus from '@/constants/system/api-status'
import SecurityAndPermission from '@/api/system-controls/security-and-permission'

export default {
  name: 'SecurityAndPermission',
  components: {
    Heading
  },
  mounted () {
    this.getController()
  },
  data () {
    return {
      searchText: null,
      controllerList: null,
      selectedController: null,
      apiList: null,
      ApiStatus: ApiStatus,
      apiStatus: ApiStatus.IDLED.status,
      selectedUrl: null,
      method: null,
      description: null
    }
  },
  methods: {
    getController () {
      SecurityAndPermission.getController().then(response => {
        this.controllerList = response.data
      }).catch(error => {
        console.error(error)
        this.$message.error(error)
      })
    },
    getFilteredControllerList () {
      if (this.controllerList === null) {
        return null
      }
      return this.controllerList.filter(data => !this.searchText ||
        data.className.toLowerCase().includes(this.searchText.toLowerCase()))
    },
    handleClick () {
    },
    onClickTableRow (row) {
      this.selectedController = row
      this.onSelectController()
    },
    onSelectController () {
      if (this.selectedController === null) {
        return
      }
      const params = {
        controllerClass: this.selectedController.packageName + '.' + this.selectedController.className,
        apiStatus: this.apiStatus
      }
      SecurityAndPermission.getApiByControllerClass(params).then(response => {
        this.apiList = response.data
      })
    },
    onSelectUrl () {
      const selectedApi = this.apiList[this.selectedUrl]
      this.method = selectedApi.method
      this.description = selectedApi.description
    }
  }
}
</script>

<!--suppress CssUnusedSymbol -->
<style scoped>
/* Reset the element transfer component's width */
.el-transfer >>> .el-transfer-panel {
  width: 500px;
}
</style>
