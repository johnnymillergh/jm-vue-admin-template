<template>
  <div class="components-container">
    <aside>
      Markdown is based on
      <a href="https://github.com/nhnent/tui.editor" target="_blank">tui.editor</a>, simply wrapped with Vue.
    </aside>
    <div class="editor-container">
      <el-tag class="tag-title">
        Basic:
      </el-tag>
      <markdown-editor ref="markdownEditor" v-model="content1" height="300px"/>
    </div>
    <el-button type="primary" icon="el-icon-document" @click="getHtml">
      Get HTML
    </el-button>
    <div v-html="html"></div>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'

const content = `
**I love Vue.js**

* Vue.js
* Element UI
* Webpack

`
export default {
  name: 'MarkdownDemo',
  components: { MarkdownEditor },
  data () {
    return {
      content1: content,
      content2: content,
      content3: content,
      content4: content,
      html: '',
      languageTypeList: {
        'en': 'en_US',
        'zh': 'zh_CN',
        'es': 'es_ES'
      }
    }
  },
  computed: {
    language () {
      return this.languageTypeList[this.$store.getters.language]
    }
  },
  methods: {
    getHtml () {
      this.html = this.$refs.markdownEditor.getHtml()
      console.log(this.html)
    }
  }
}
</script>

<style scoped>
.editor-container {
  margin-bottom: 30px;
}

.tag-title {
  margin-bottom: 5px;
}
</style>
