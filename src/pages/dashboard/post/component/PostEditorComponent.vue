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

const textCount = ref(0)
const keyCode = ref()

function handleCheckCharacterLength(e) {
  if (
    (e.keyCode === 86 || e.keyCode === 88 || e.keyCode === 8) &&
    keyCode.value === 17
  ) {
    setTimeout(() => {
      textCount.value = e.target.innerText.slice(0, props.maxCount).length
      model.value = `<p>${e.target.innerText.slice(0, props.maxCount)}</p>`
    })
  } else {
    keyCode.value = e.keyCode
    textCount.value = e.target.innerText.length

    if (textCount.value >= props.maxCount && e.keyCode !== 8) {
      e.preventDefault()
    }
  }
}
</script>

<template>
  <div class="editor-container" @keydown="handleCheckCharacterLength">
    <ckeditor
      class="editor-test"
      :editor="ClassicEditor"
      v-model="model"
      :config="editorConfig"
    >
    </ckeditor>
    <div class="count">{{ textCount }}/{{ maxCount }}</div>
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
