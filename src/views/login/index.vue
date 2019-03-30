<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left">
      <h3 class="app-title">{{ appName }}</h3>
      <h4 class="app-description">{{ appDescription }}</h4>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
        <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" placeholder="Username"/>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input
          :type="inputType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="Password"
          @keyup.enter.native="handleLogin"/>
        <span class="password-eye" @click="showPassword">
          <svg-icon :icon-class="inputType === 'password' ? 'eye' : 'eye-open'"/>
        </span>
      </el-form-item>
      <el-row :gutter="24" type="flex" justify="center">
        <el-col>
          <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleRegister">
            Sign up
          </el-button>
        </el-col>
        <el-col>
          <el-button :loading="loading" style="width:100%;" @click.native.prevent="handleLogin">
            Sign in
          </el-button>
        </el-col>
      </el-row>
      <div v-if="developmentEnvironment" class="hint">
        <span>Username: {{ hintUsername }}</span>
        <span>Password: {{ hintPassword }}</span>
      </div>
    </el-form>
    <login-footer class="login-footer"/>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import LoginFooter from './components/LoginFooter'

export default {
  name: 'Login',
  components: {
    LoginFooter
  },
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('Incorrect username'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('Password must at least contain 5 characters'))
      } else {
        callback()
      }
    }
    return {
      appName: this.$store.state.app.appName.replace(/-/g, ' ').toLocaleUpperCase(),
      appDescription: this.$store.state.app.description,
      loginForm: {
        username: '',
        password: ''
      },
      hintUsername: null,
      hintPassword: null,
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      inputType: 'password',
      redirect: undefined,
      developmentEnvironment: false
    }
  },
  watch: {
    /**
     * Watch global route (URL). If URL changes, then generate a redirect route which will be routed to when user signed in.
     */
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted () {
    this.developmentEnvironment = process.env.NODE_ENV && (process.env.NODE_ENV === 'development')
    if (this.developmentEnvironment) {
      this.hintUsername = 'admin'
      this.hintPassword = 'admin'
    }
  },
  methods: {
    showPassword () {
      if (this.inputType === 'password') {
        this.inputType = ''
      } else {
        this.inputType = 'password'
      }
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleRegister () {
      this.$router.push('/join')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;

      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$light_gray2: #b0b0b0;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;

  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 550px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 24px auto;
  }

  .hint {
    font-size: 14px;
    color: #fff;
    margin-top: 10px;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .app-title {
    font-size: 36px;
    color: $light_gray;
    margin: 0 auto 40px auto;
    text-align: center;
    font-weight: bold;
  }

  .app-description {
    font-size: 18px;
    color: $light_gray2;
    margin: 0 auto 40px auto;
    text-align: start;
    font-weight: normal;
  }

  .password-eye {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .login-footer {
    position: fixed;
    bottom: 15px;
    left: 0;
    right: 0;
    width: 210px;
    margin: 0 auto;
  }
}
</style>
