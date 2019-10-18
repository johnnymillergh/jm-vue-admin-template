<template>
  <div class="mixin-container">
    <md-input v-model="title" icon="search" name="title" placeholder="Enter title">
      Title
    </md-input>
    <el-button v-waves type="primary" @click="showImageCropper = true">
      Waves Button
    </el-button>
    <heading text="Heading 1"/>
    <heading text="Heading 2" :level="2"/>
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
  </div>
</template>

<script>
import MdInput from '@/components/MDinput'
import waves from '@/directives/waves/index'
import Heading from '@/components/Heading'
import ImageCropper from '@/components/ImageCropper'
import { mapGetters } from 'vuex'
import User from '@/resource-api/user'

export default {
  name: 'Mixin',
  components: {
    MdInput,
    Heading,
    ImageCropper
  },
  directives: {
    waves
  },
  computed: {
    ...mapGetters([
      'username'
    ])
  },
  data () {
    return {
      title: null,
      showImageCropper: false,
      imageCropperKey: 0,
      params: {
        username: null
      },
      fileName: null,
      UserResource: User
    }
  },
  mounted () {
    this.params.username = this.username
    this.fileName = `${this.username}-avatar`
  },
  methods: {
    cropSuccess (resData) {
      this.showImageCropper = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.image = resData.files.avatar
    },
    close () {
      this.showImageCropper = false
    }
  }
}
</script>

<style lang="scss" scoped>
.mixin-container {
  padding: 20px;
}
</style>
