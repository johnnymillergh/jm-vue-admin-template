<template>
  <div class="app-container">
    <div v-if="userInfo">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="10" :lg="7" :xl="8">
          <user-card :user-info="userInfo"/>
        </el-col>
        <el-col :xs="24" :sm="24" :md="14" :lg="17" :xl="16">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="Basic Information" name="basicInformation">
                <basic-information/>
              </el-tab-pane>
              <el-tab-pane label="Advanced" name="advance">
                <advanced/>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import BasicInformation from './components/BasicInformation'
import Advanced from './components/Advanced'

export default {
  name: 'Profile',
  components: { UserCard, BasicInformation, Advanced },
  data () {
    return {
      userInfo: {
        registrationDate: new Date()
      },
      activeTab: 'basicInformation'
    }
  },
  computed: {
    ...mapGetters([
      'fullName'
    ])
  }
}
</script>
