<template>
  <div class="authorization-container">
    <el-steps class="steps" :active="activeStep" finish-status="success" align-center>
      <el-step title="Step 1" description="Choose Role"/>
      <el-step title="Step 2" description="Choose Permission"/>
      <el-step title="Step 3" description="Processing"/>
      <el-step title="Step 4" description="Done"/>
    </el-steps>
    <el-card class="step-detail" shadow="never">
      <transition mode="out-in">
        <component :is="componentName" :component-name="componentName"
                   :step1-selected-roles="selectedRoles" @step1-role-select="onRoleSelect"/>
      </transition>
    </el-card>
    <el-row type="flex" justify="center">
      <el-button-group>
        <el-button class="previous-next-button"
                   @click="onClickPrevious"
                   :disabled="previousButtonDisabled()"
                   icon="el-icon-arrow-left">
          Previous
        </el-button>
        <el-button class="previous-next-button"
                   @click="onClickNext"
                   :disabled="nextButtonDisabled()"
                   style="width: 120px">
          Next<i class="el-icon-arrow-right" style="margin-left: 5px"></i>
        </el-button>
      </el-button-group>
    </el-row>
  </div>
</template>

<script>
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'

export default {
  name: 'Authorization',
  components: {
    Step1,
    Step2,
    Step3,
    Step4
  },
  data () {
    return {
      activeStep: 0,
      componentName: 'Step1',
      selectedRoles: []
    }
  },
  methods: {
    onClickPrevious () {
      if (this.activeStep-- <= 0) {
        this.activeStep = 0
      }
      this.showStep()
    },
    previousButtonDisabled () {
      return this.activeStep === 0
    },
    onClickNext () {
      if (this.activeStep++ >= 3) {
        this.activeStep = 3
      }
      this.showStep()
    },
    nextButtonDisabled () {
      return this.activeStep === 3
    },
    showStep () {
      switch (this.activeStep) {
        case 0:
          this.componentName = 'Step1'
          return
        case 1:
          if (this.selectedRoles.length === 0) {
            this.activeStep--
            this.$message.warning('To choose role is undone')
            return
          }
          this.componentName = 'Step2'
          return
        case 2:
          this.componentName = 'Step3'
          return
        case 3:
          this.componentName = 'Step4'
          return
      }
    },
    onRoleSelect (selectedRoles) {
      this.selectedRoles = selectedRoles
    }
  }
}
</script>

<style lang="scss" scoped>
.v-enter, .v-leave-to {
  opacity: 0;
  transform: translateX(150px);
}

.v-enter-active, .v-leave-active {
  transition: all 0.65s ease;
}

.authorization-container {
  .steps {
    padding-bottom: 10px;
  }

  .step-detail {
    height: 400px;
    margin-bottom: 10px;
  }

  .previous-next-button {
    width: 120px
  }
}
</style>
