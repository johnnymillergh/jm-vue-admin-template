<template>
  <div class="step3-container">
    <el-row type="flex" justify="center">
      <el-progress type="circle" :percentage="percentage" status="text">{{percentage}}%</el-progress>
    </el-row>
    <el-row type="flex" justify="center">
      <p class="status-message">{{messages[index]}}</p>
    </el-row>
    <transition name="el-zoom-in-center">
      <el-row v-show="showOperationResult" type="flex" justify="center">
        <p class="operation-result">{{operationResult}}</p>
      </el-row>
    </transition>
  </div>
</template>

<script>
import SecurityAndPermission from '@/api/system-controls/security-and-permission'

export default {
  name: 'Step3',
  props: {
    step1SelectedRoles: { type: Array, require: true },
    step2SelectedPermissionIdList: { type: Array, require: true }
  },
  data () {
    return {
      percentage: 0,
      messages: [
        'Hold on a second, we\'re preparing necessary data',
        'Sending request to backend server',
        'Processing...',
        'Operation result'
      ],
      index: 0,
      showOperationResult: false,
      operationResult: null
    }
  },
  methods: {
    async startProcessing () {
      this.percentage += Math.ceil(Math.random() * 40)
      const roleIdList = this.step1SelectedRoles.map(item => {
        return item.id
      })
      await this.delay(20)
      const params = {
        roleIdList: roleIdList,
        permissionIdList: this.step2SelectedPermissionIdList
      }
      await this.delay(20)
      SecurityAndPermission.submitAuthorization(params).then(response => {
        this.index = 3
        this.percentage = 100
        this.operationResult = response.message
        this.showOperationResult = true
      }).catch(error => {
        this.index = 3
        this.percentage = 4
        this.operationResult = error
        this.showOperationResult = true
        this.$message.error(error)
        console.error('Error occurred when submitting authorization.', error)
      })
    },
    delay (percentageIncrement) {
      return new Promise(resolve => {
        setTimeout(() => {
          this.index++
          this.percentage += Math.ceil(Math.random() * percentageIncrement)
          resolve()
        }, 1500)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.v-enter-active {
  transition: all 1.25s ease;
}

.step3-container {
  .status-message {
    padding-top: 24px;
    font-size: 24px;
  }

  .operation-result {
    padding-top: 10px;
    font-size: 32px;
    font-weight: bold;
  }
}
</style>
