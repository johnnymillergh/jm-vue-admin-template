<template>
  <div class="advanced-container">
    <heading text="Password Management" :level="2"/>
    <el-form ref="passwordManagementForm"
             :model="passwordManagementForm"
             :rules="passwordManagementFormRules"
             label-width="140px">
      <el-form-item prop="currentPassword" label="Current Password">
        <el-input/>
      </el-form-item>
      <el-form-item prop="newPassword" label="New Password">
        <el-input/>
      </el-form-item>
      <el-form-item prop="confirmPassword" label="Confirm Password">
        <el-input/>
      </el-form-item>
    </el-form>
    <el-button type="danger">Change Password</el-button>
  </div>
</template>

<script>
import Heading from '@/components/Heading/index'

export default {
  components: { Heading },
  data () {
    return {
      passwordManagementForm: {},
      passwordManagementFormRules: {}
    }
  }
}
</script>
