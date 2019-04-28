<template>
  <div>
    <header class="header" role="banner"/>
    <div class="setup-header">
      <h1>Join {{ appName }}</h1>
      <p class="lead">{{ $store.state.app.description }}</p>
    </div>
    <el-steps :active="1" class="steps">
      <el-step title="Step 1" description="Some description"/>
      <el-step title="Step 2" description="Some description"/>
      <el-step title="Step 3" description="Some description"/>
    </el-steps>
    <div class="register-container">
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <h2 class="create-account">Create your personal account</h2>
          <el-form ref="registerForm"
                   :model="registerForm"
                   :rules="registerFormRules"
                   label-position="top"
                   label-width="120px">
            <el-form-item label="Username" prop="username">
              <el-input v-model="registerForm.username" class="fixed-width-input"/>
            </el-form-item>
            <el-form-item label="Email address" prop="email">
              <el-input v-model="registerForm.email" class="fixed-width-input"/>
            </el-form-item>
            <el-form-item label="Password" prop="password">
              <el-input v-model="registerForm.password" class="fixed-width-input"/>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" style="border: 1px solid #dcdfe6;">
            <div slot="header" class="clearfix">
              <h2>You’ll love {{ appName }}</h2>
            </div>
            <p>{{ placeholderText }}</p>
          </el-card>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="16" style="margin-bottom: 10px">
          <h2 class="create-account" style="margin-bottom: 20px">Verify</h2>
          <el-card shadow="never" style="width: 466px; border: 1px solid #dcdfe6;">
            <p>[Validation code here.] {{ placeholderText }}</p>
          </el-card>
        </el-col>
      </el-row>
      <el-row class="term-privacy">
        <p>By clicking “Create an account” below, you agree to our
          <a href="/terms" target="_blank">terms of service</a> and
          <a href="/privacy" target="_blank">privacy statement</a>.
          We’ll occasionally send you account related emails.</p>
      </el-row>
      <el-row>
        <el-button type="success" @click="createAccount" :loading="createAccountLoading">Create an account</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import Join from '@/api/auth/join'
import StringUtil from '@/utils/string'
import UniversalStatus from '@/constants/system/universal-status'

export default {
  name: 'Join',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (StringUtil.isEmpty(value)) {
        return callback(new Error(`${rule.field} is not empty`))
      }
      if (!StringUtil.isLengthBetween(value, 4, 50)) {
        return callback(new Error('length of username must be between 1 and 50'))
      }
      const param = { username: value }
      Join.checkUsernameUniqueness(param).then(() => {
        callback()
      }).catch(error => {
        callback(new Error(error))
      })
    }
    const validateEmail = (rule, value, callback) => {
      if (StringUtil.isEmpty(value)) {
        return callback(new Error(`${rule.field} is not empty`))
      }
      if (!StringUtil.isEmail(value)) {
        return callback(new Error(`invalid ${rule.field}`))
      }
      const param = { email: value }
      Join.checkEmailUniqueness(param).then(() => {
        callback()
      }).catch(error => {
        callback(new Error(error))
      })
    }
    const validatePassword = (rule, value, callback) => {
      if (StringUtil.isEmpty(value)) {
        return callback(new Error(`${rule.field} is not empty`))
      }
      if (!StringUtil.isLengthBetween(value, 8, 30)) {
        return callback(new Error('length of password must be between 1 and 50'))
      }
      callback()
    }
    return {
      appName: this.$store.state.app.appName.toLocaleUpperCase(),
      placeholderText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
        'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ' +
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      registerForm: {
        username: 'test',
        password: '12345678',
        email: 'test@gmail.com'
      },
      registerFormRules: {
        username: [{ required: true, validator: validateUsername, trigger: 'blur' }],
        email: [{ required: true, validator: validateEmail, trigger: 'blur' }],
        password: [{ required: true, validator: validatePassword, trigger: ['change', 'blur'] }]
      },
      createAccountLoading: false
    }
  },
  methods: {
    async createAccount () {
      this.createAccountLoading = true
      let registerFormValidity
      try {
        registerFormValidity = await this.$refs['registerForm'].validate()
      } catch (error) {
        registerFormValidity = error
      }
      if (!registerFormValidity) {
        this.createAccountLoading = false
        return
      }
      const response = await Join.resister(this.registerForm)
      if (response.status !== UniversalStatus.SUCCESS.code) {
        this.createAccountLoading = false
        return
      }
      this.$confirm(response.message, 'Congratulations', {
        confirmButtonText: 'Sign in immediately',
        showCancelButton: false,
        closeOnClickModal: false
      }).then(() => {
        this.$router.push('/')
      })
      this.createAccountLoading = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #73777f;
$dark_gray: #889aa4;
$light_gray: #eee;
$light_gray2: #b0b0b0;
.header {
  background-color: #24292e;
  color: hsla(0, 0%, 100%, .7);
  padding-bottom: 12px;
  padding-top: 12px;
  z-index: 32;
  height: 72px;
}

.setup-header {
  margin-left: auto;
  margin-right: auto;
  padding-top: 32px;
  padding-left: 16px;
  padding-right: 16px;
  max-width: 1012px;
}

.steps {
  margin-left: auto;
  margin-right: auto;
  padding: 0 16px;
  max-width: 1012px;
}

.register-container {
  margin-left: auto;
  margin-right: auto;
  padding: 32px 16px;
  max-width: 1012px;
}

.lead {
  color: #586069;
  font-size: 20px;
  font-weight: 300;
  margin-top: 0;
  margin-bottom: 30px;
}

.create-account {
  font-size: 24px !important;
  font-weight: 300 !important;
}

.fixed-width-input {
  width: 466px;
}

.setup-info-module {
  border: 1px solid #ccc;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .075);
  margin-bottom: 30px;
  width: 294px;
}

.term-privacy {
  border-bottom: 1px solid #eee;
  border-top: 1px solid #eee;
  margin: 15px 0;
}

h1 {
  font-size: 45px;
  font-weight: 400;
  letter-spacing: -1px;
  line-height: 1.1;
  margin-bottom: 0;
  margin-top: 0;
}

h2 {
  font-size: 24px;
  font-weight: 400;
  letter-spacing: -1px;
  line-height: 1.1;
  margin-bottom: 0;
  margin-top: 0;
}
</style>
