<script setup>
import { ref } from 'vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const props = defineProps({
  maxCount: {
    type: Number,
    required: true
  }
})
const model = defineModel('value')

const editorConfig = ref({
  toolbar: ['bold', 'italic', 'link']
})
</script>

<template>
  <div class="editor-container">
    <ckeditor
      class="editor-test"
      :editor="ClassicEditor"
      v-model="model"
      :config="editorConfig"
    >
    </ckeditor>
  </div>
</template>

<style lang="scss">
.editor-container {
  position: relative;
  .count {
    position: absolute;
    right: 10px;
    bottom: 0;
  }
}
.ck-editor__main {
  margin-bottom: 2px;

  .ck-content {
    min-height: 150px;
    padding-bottom: 10px !important;
  }

  p {
    margin: 0;
  }
}
.ck-powered-by {
  display: none;
}
</style>
