<template>
  <div class="app-container">
    <el-tabs @tab-click="onTabClick" type="border-card">
      <el-tab-pane label="Permission Controls">
        <transition name="el-zoom-in-top">
          <div v-show="showPermissionControls">
            <heading text="API Glance"/>
            <el-row :gutter="5">
              <el-col :span="8">
                <el-card shadow="never" style="height: 290px" :body-style="{padding: '0'}">
                  <div slot="header" class="clearfix">
                    <div style="margin-bottom: 5px">Controller List</div>
                    <el-input v-model="searchText" size="mini" placeholder="Type class name to search"/>
                  </div>
                  <div style="height: 202px; overflow: auto; padding: 5px">
                    <el-table :data="getFilteredControllerList()"
                              stripe
                              highlight-current-row
                              @row-click="onClickTableRow"
                              v-loading="controllerListLoading">
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
                  <el-form ref="setApiInUseForm"
                           :model="setApiInUseForm"
                           :rules="setApiInUseFormRules"
                           label-width="120px"
                           v-loading="apiSelectFormLoading">
                    <el-form-item label="Status">
                      <el-radio-group v-model="apiStatus" @change="onChangeApiStatus">
                        <el-radio :label="ApiStatus.IDLED.status" border>Idled {{ getIdledApiCount() }}</el-radio>
                        <el-radio :label="ApiStatus.IN_USED.status" border>In use {{ getInUseApiCount() }}</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="URL" prop="selectedApiIndex">
                      <el-select v-model="setApiInUseForm.selectedApiIndex"
                                 @change="onSelectUrl"
                                 placeholder="Select"
                                 style="width: 598px">
                        <el-option v-for="(item,index) in apiList" :label="item.url" :value="index" :key="index"/>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="Method" prop="method">
                      <el-input v-model="setApiInUseForm.method" readonly/>
                    </el-form-item>
                    <el-form-item label="Description" prop="description">
                      <el-input v-model="setApiInUseForm.description" readonly/>
                    </el-form-item>
                  </el-form>
                </el-card>
              </el-col>
            </el-row>
            <el-row style="margin-top: 10px; margin-bottom: 5px">
              <el-col align="right">
                <el-button type="warning"
                           @click="setApiInUse"
                           :disabled="apiStatus === ApiStatus.IN_USED.status">Set it in Use
                </el-button>
              </el-col>
            </el-row>
            <heading text="API Analysis"/>
            <el-row type="flex" justify="space-between" style="height: 320px" v-loading="apiAnalysisLoading">
              <el-col :span="9">
                <pie-chart :pie-chart-data="pieChartData"/>
              </el-col>
              <el-col :span="15">
                <div style="margin-bottom: 10px">Change scope to view different report.</div>
                <el-form label-width="120px" v-loading="apiSelectFormLoading">
                  <el-form-item label="Scope">
                    <el-select v-model="scope" @change="onSelectScope" placeholder="All" clearable filterable>
                      <el-option v-for="(item,index) in controllerList"
                                 :label="item.className"
                                 :value="item.packageName+'.'+item.className"
                                 :key="index"/>
                    </el-select>
                  </el-form-item>
                </el-form>
                <div style="font-size: 24px">Total of Scope</div>
                <div style="font-size: 128px">{{scopeTotal}}</div>
              </el-col>
            </el-row>
            <heading text="API Details"/>
            <el-row style="height: 450px; background: #409EFF">
              API detail table here.
            </el-row>
          </div>
        </transition>
      </el-tab-pane>
      <el-tab-pane label="Role Controls">
        <transition name="el-zoom-in-top">
          <div v-show="showRoleControls">
            Role Controls
          </div>
        </transition>
      </el-tab-pane>
      <el-tab-pane label="Authorization">
        <transition name="el-zoom-in-top">
          <div v-show="showAuthorization">
            Authorization
          </div>
        </transition>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Heading from '@/components/Heading'
import ApiStatus from '@/constants/system/api-status'
import SecurityAndPermission from '@/api/system-controls/security-and-permission'
import PieChart from './components/PieChart'

export default {
  name: 'SecurityAndPermission',
  components: {
    Heading,
    PieChart
  },
  mounted () {
    this.getController()
    this.getApiAnalysis()
  },
  data () {
    return {
      showPermissionControls: true,
      showRoleControls: false,
      showAuthorization: false,
      controllerListLoading: false,
      apiAnalysisLoading: false,
      apiSelectFormLoading: false,
      pieChartData: null,
      scope: null,
      scopeTotal: null,
      searchText: null,
      controllerList: null,
      selectedController: null,
      apiList: null,
      ApiStatus: ApiStatus,
      apiStatus: ApiStatus.IDLED.status,
      idledApiCount: null,
      inUseApiCount: null,
      setApiInUseForm: {
        selectedApiIndex: null,
        method: null,
        description: null
      },
      setApiInUseFormRules: {
        selectedApiIndex: [{ required: true, trigger: 'change', message: 'Select a URL' }],
        method: [{ required: true, trigger: 'change', message: 'HTTP method is not provided' }],
        description: [{ required: true, trigger: 'change', message: 'Description is required' }]
      }
    }
  },
  methods: {
    onTabClick (tab) {
      switch (tab.index) {
        case '0':
          this.showPermissionControls = true
          this.showRoleControls = this.showAuthorization = false
          break
        case '1':
          this.showRoleControls = true
          this.showPermissionControls = this.showAuthorization = false
          break
        case '2':
          this.showAuthorization = true
          this.showRoleControls = this.showPermissionControls = false
          break
      }
    },
    getController () {
      this.controllerListLoading = true
      SecurityAndPermission.getController().then(response => {
        this.controllerList = response.data.controllerList
      }).catch(error => {
        console.error(error)
        this.$message.error(error)
      }).finally(() => {
        this.controllerListLoading = false
      })
    },
    getApiAnalysis () {
      this.apiAnalysisLoading = true
      const params = {
        classFullName: this.scope
      }
      SecurityAndPermission.getApiAnalysis(params).then(response => {
        this.pieChartData = []
        this.pieChartData.push({ name: this.ApiStatus.IDLED.name, value: response.data.idledApiCount })
        this.pieChartData.push({ name: this.ApiStatus.IN_USED.name, value: response.data.inUseApiCount })
        this.scopeTotal = response.data.totalApiCount
      }).catch(error => {
        console.error(error)
        this.$message.error(error)
      }).finally(() => {
        this.apiAnalysisLoading = false
      })
    },
    getFilteredControllerList () {
      if (this.controllerList === null) {
        return null
      }
      return this.controllerList.filter(data => !this.searchText ||
        data.className.toLowerCase().includes(this.searchText.toLowerCase()))
    },
    onClickTableRow (row) {
      this.selectedController = row
      this.onSelectController()
    },
    onSelectController () {
      if (this.selectedController === null) {
        return
      }
      this.clearSelectedUrl()
      const params = {
        controllerClass: this.selectedController.packageName + '.' + this.selectedController.className,
        apiStatus: this.apiStatus
      }
      this.apiSelectFormLoading = true
      SecurityAndPermission.getApiByControllerClass(params).then(response => {
        this.apiList = response.data.apiList
        this.idledApiCount = response.data.idledApiCount
        this.inUseApiCount = response.data.inUseApiCount
      }).catch(error => {
        console.error(error)
        this.$message.error(error)
      }).finally(() => {
        this.apiSelectFormLoading = false
      })
    },
    getIdledApiCount () {
      return this.idledApiCount !== null ? '(' + this.idledApiCount + ')' : null
    },
    getInUseApiCount () {
      return this.inUseApiCount !== null ? '(' + this.inUseApiCount + ')' : null
    },
    onChangeApiStatus () {
      this.clearSelectedUrl()
      this.onSelectController()
    },
    onSelectUrl () {
      const selectedApi = this.apiList[this.setApiInUseForm.selectedApiIndex]
      this.setApiInUseForm.method = selectedApi.method
      this.setApiInUseForm.description = selectedApi.description
    },
    clearSelectedUrl () {
      this.idledApiCount = this.inUseApiCount = this.setApiInUseForm.selectedApiIndex = this.setApiInUseForm.method = this.setApiInUseForm.description = null
    },
    onSelectScope () {
      this.getApiAnalysis()
    },
    async setApiInUse () {
      let setApiInUseFormValidity
      try {
        setApiInUseFormValidity = await this.$refs['setApiInUseForm'].validate()
      } catch (error) {
        setApiInUseFormValidity = error
      }
      if (!setApiInUseFormValidity) {
        return
      }
      const params = this.apiList[this.setApiInUseForm.selectedApiIndex]
      SecurityAndPermission.setApiInUse(params).then(response => {
        this.$message.success(response.message)
        this.setApiInUseForm = {
          selectedApiIndex: null,
          method: null,
          description: null
        }
      }).catch(error => {
        this.$message.error(error)
      }).finally(() => {
        this.refreshPage()
      })
    },
    refreshPage () {
      this.getApiAnalysis()
      // this.getController()
      this.onSelectController()
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
