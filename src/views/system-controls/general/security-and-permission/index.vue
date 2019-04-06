<template>
  <div class="app-container">
    <el-tabs @tab-click="handleClick" type="border-card">
      <el-tab-pane label="Permission Controls">
        <heading text="API Glance"/>
        <el-row>
          <el-transfer
            v-model="value4"
            filterable
            :left-default-checked="[2, 3]"
            :right-default-checked="[1]"
            :titles="['New APIs', 'Consistence APIs']"
            :button-texts="['To left', 'To right']"
            :format="{ noChecked: '${total}', hasChecked: '${checked}/${total}' }"
            @change="handleChange"
            :data="data">
          </el-transfer>
        </el-row>
        <el-row style="margin-top: 10px; margin-bottom: 5px">
          <el-button type="warning">Confirm Changes</el-button>
        </el-row>
        <heading text="API Analysis"/>
        <el-row style="height: 150px; background: #409EFF">
          Pie Chart for API Analysis Here.
        </el-row>
        <heading text="API Details"/>
        <el-row style="height: 450px; background: #409EFF">
          API detail table here.
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Role Controls">
        Role Controls
      </el-tab-pane>
      <el-tab-pane label="Authorization">
        Authorization
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Heading from '@/components/Heading'

export default {
  name: 'SecurityAndPermission',
  components: {
    Heading
  },
  data () {
    const generateData = () => {
      const data = []
      for (let i = 1; i <= 150; i++) {
        data.push({
          key: i,
          label: `Option ${i}`,
          disabled: i % 4 === 0
        })
      }
      return data
    }
    return {
      data: generateData(),
      value4: ''
    }
  },
  methods: {
    handleClick () {
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
