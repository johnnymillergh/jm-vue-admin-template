<template>
  <div class="basic-information-container">
    <el-form ref="basicInformationForm"
             :model="basicInformationForm"
             :rules="basicInformationFormRules"
             label-width="85px">
      <heading text="Personal Information" :level="2"/>
      <el-form-item prop="fullName" label="Full Name">
        <el-input class="personal-information-item" placeholder="Please input"/>
      </el-form-item>
      <el-form-item prop="birthday" label="Birthday">
        <el-input class="personal-information-item" placeholder="Please input"/>
      </el-form-item>
      <el-form-item prop="gender" label="Gender">
        <el-select v-model="basicInformationForm.gender" placeholder="Select gender" clearable>
          <el-option v-for="item in Gender.getValueList()" :key="item" :label="item" :value="item"/>
        </el-select>
      </el-form-item>
      <heading text="Contact Information" :level="2"/>
      <el-form-item prop="email" label="Email">
        <el-input class="personal-information-item" placeholder="Please input"/>
      </el-form-item>
      <el-form-item prop="cellphone" label="Cellphone">
        <el-input class="personal-information-item" placeholder="Please input"/>
      </el-form-item>
      <heading text="Education" :level="2"/>
      <el-form-item prop="university" label="University">
        <el-input class="personal-information-item" placeholder="Please input"/>
      </el-form-item>
      <el-form-item prop="degree" label="Degree">
        <el-input class="personal-information-item" placeholder="Please input"/>
      </el-form-item>
      <el-form-item prop="time" label="Time">
        <el-input class="personal-information-item" placeholder="Please input"/>
      </el-form-item>
    </el-form>
    <el-button type="primary">Commit Changes</el-button>
  </div>
</template>

<script>
import Heading from '@/components/Heading/index'
import Gender from '@/constants/system/gender'

const avatarPrefix = '?imageView2/1/w/80/h/80'
const carouselPrefix = '?imageView2/2/h/440'

export default {
  components: { Heading },
  data () {
    return {
      carouselImages: [
        'https://wpimg.wallstcn.com/9679ffb0-9e0b-4451-9916-e21992218054.jpg',
        'https://wpimg.wallstcn.com/bcce3734-0837-4b9f-9261-351ef384f75a.jpg',
        'https://wpimg.wallstcn.com/d1d7b033-d75e-4cd6-ae39-fcd5f1c0a7c5.jpg',
        'https://wpimg.wallstcn.com/50530061-851b-4ca5-9dc5-2fead928a939.jpg'
      ],
      avatarPrefix,
      carouselPrefix,
      Gender: Gender,
      basicInformationForm: {
        fullName: null
      },
      basicInformationFormRules: {}
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-information-container {
  .personal-information-item {
    margin-bottom: 15px;
  }

  .user-block {

    .username,
    .description {
      display: block;
      margin-left: 50px;
      padding: 2px 0;
    }

    .username {
      font-size: 16px;
      color: #000;
    }

    :after {
      clear: both;
    }

    .img-circle {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      float: left;
    }

    span {
      font-weight: 500;
      font-size: 12px;
    }
  }

  .post {
    font-size: 14px;
    border-bottom: 1px solid #d2d6de;
    margin-bottom: 15px;
    padding-bottom: 15px;
    color: #666;

    .image {
      width: 100%;
      height: 100%;

    }

    .user-images {
      padding-top: 20px;
    }
  }

  .list-inline {
    padding-left: 0;
    margin-left: -5px;
    list-style: none;

    li {
      display: inline-block;
      padding-right: 5px;
      padding-left: 5px;
      font-size: 13px;
    }

    .link-black {

      &:hover,
      &:focus {
        color: #999;
      }
    }
  }

}

.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}
</style>
