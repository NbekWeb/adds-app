<script setup>
import { ref } from 'vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const model = defineModel('value')

const editorConfig = ref({
  toolbar: ['bold', 'italic', 'link']
})
</script>

<template>
  <ckeditor
    class="editor-test"
    :editor="ClassicEditor"
    v-model="model"
    :config="editorConfig"
  >
  </ckeditor>
</template>

<style lang="scss">
.ck-editor__main {
  margin-bottom: 2px;
  .ck-content {
    min-height: 150px;
  }
  p {
    margin: 0;
  }
}
</style>
