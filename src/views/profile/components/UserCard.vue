<template>
  <el-card class="user-card-container" :body-style="{ padding: '0' }" :style="cssVariables">
    <div :class="'vibrant-background'+ vibrantBackgroundKeyframes"></div>
    <div class="user-profile">
      <el-image v-if="reloadAvatar" class="user-profile-avatar" :src="this.avatarUrl" @load="onLoadUserAvatar"/>
      <div class="user-full-name text-center">{{ fullName }}</div>
      <div class="username text-center">@{{ username }}</div>
      <el-row type="flex" justify="center">
        <el-button class="upload-button" @click="onClickUpload">Upload<i class="el-icon-camera-solid el-icon-right"
                                                                         style="margin-left: 10px"/></el-button>
      </el-row>
      <el-row type="flex" justify="center">
        <el-input class="user-status-text" v-model="userStatusText"/>
      </el-row>
      <div class="registration-date-text text-center">Registration date</div>
      <div class="registration-date-result text-center">{{ formattedRegistrationDate }}</div>
    </div>
    <image-cropper v-show="showImageCropper"
                   :file-name="fileName"
                   :key="imageCropperKey"
                   :width="512"
                   :height="512"
                   :url="UserResource.uploadAvatar"
                   lang-type="en"
                   @close="close"
                   :params="params"
                   @crop-upload-success="cropSuccess"/>
  </el-card>
</template>

<script>
import * as Vibrant from 'node-vibrant'
import { mapGetters } from 'vuex'
import User from '@/resource-api/user'
import StringUtil from '@/utils/string'
import DatetimeUtil from '@/utils/datetime'
import ImageCropper from '@/components/ImageCropper'

export default {
  name: 'UserCard',
  components: {
    ImageCropper
  },
  props: {
    userInfo: {
      type: Object,
      default: () => {
        return {
          registrationDate: null
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'username',
      'fullName'
    ]),
    /**
     * Define several CSS variables binding with Vue responsive data
     * @return {{'--vibrant-secondary-color': null, '--vibrant-initial-color': string}}
     */
    cssVariables () {
      return {
        '--vibrant-initial-color': this.vibrantInitialColor,
        '--vibrant-secondary-color': this.vibrantSecondaryColor
      }
    },
    avatarUrl () {
      if (StringUtil.isBlank(this.username)) {
        return '@/assets/avatar/man.png'
      }
      return this.UserResource.getAvatar + this.username
    },
    formattedRegistrationDate () {
      return DatetimeUtil.formatDate(this.userInfo.registrationDate, 'MM/dd/yyyy')
    }
  },
  mounted () {
    this.params.username = this.username
    this.fileName = `${this.username}-avatar`
  },
  data () {
    return {
      UserResource: User,
      vibrantInitialColor: '#DDDDDD',
      vibrantSecondaryColor: '#DDDDDD',
      vibrantBackgroundKeyframes: '',
      userStatusText: '💪 Coding & Building',
      imageCropperKey: 0,
      params: {
        username: null
      },
      fileName: null,
      showImageCropper: false,
      reloadAvatar: true
    }
  },
  methods: {
    async onLoadUserAvatar () {
      this.vibrantBackgroundKeyframes = ''
      const palette = await Vibrant.from(this.avatarUrl).quality(1).clearFilters().getPalette()
      setTimeout(() => {
        // this.vibrantInitialColor = this.vibrantSecondaryColor
        this.vibrantSecondaryColor = palette.LightVibrant.getHex()
        this.vibrantBackgroundKeyframes = ' play-vibrant-background-gradient'
      }, 1200)
    },
    onClickUpload () {
      this.showImageCropper = true
    },
    cropSuccess (resData) {
      console.log(resData)
      this.showImageCropper = false
      this.imageCropperKey = this.imageCropperKey + 1
      this.reloadUserAvatar()
    },
    close () {
      this.showImageCropper = false
    },
    reloadUserAvatar () {
      this.reloadAvatar = false
      setTimeout(() => {
        this.reloadAvatar = true
      }, 300)
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes vibrant-background-gradient {
  0% {
    background-color: var(--vibrant-initial-color);
  }
  100% {
    background-color: var(--vibrant-secondary-color);
  }
}

.user-card-container {
  margin-bottom: 20px;
}

.vibrant-background {
  height: 200px;
  background-color: var(--vibrant-initial-color);;
}

.play-vibrant-background-gradient {
  animation: vibrant-background-gradient 1.8s ease;
  animation-fill-mode: forwards;
}

.user-profile {
  padding-bottom: 20px;

  .user-profile-avatar {
    margin: 0 auto;
    display: table;
    position: relative;
    top: -128px;
    width: 256px;
    height: 256px;
    border-radius: 128px
  }

  .user-profile-avatar:hover {
    transform: rotate(666turn);
    transition-delay: 1s;
    transition-property: all;
    transition-duration: 59s;
    transition-timing-function: cubic-bezier(.34, 0, .84, 1);
  }

  .user-full-name {
    margin-top: -100px;
    font-weight: bold;
    font-size: 26px;
    line-height: 30px;
    color: #24292e;
  }

  .username {
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: #666666;
  }

  .upload-button {
    margin-top: 20px;
    width: 200px;
  }

  .user-status-text {
    margin-top: 20px;
    width: 200px;
    border: none;
  }

  .registration-date-text {
    margin-top: 20px;
    font-size: 14px;
    color: #666666;
  }
}
</style>
