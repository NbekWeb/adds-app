<script setup>
import { ref } from 'vue'
const emits = defineEmits(['update:modelValue'])

const inputIndex = ref(null)
const digits = ref(['', '', '', '', '', ''])
const handlePaste = (e) => {
  const pasteData = e.clipboardData.getData('text')
  const onlyNumbers = pasteData.match(/^\d+$/)

  if (onlyNumbers) {
    digits.value = pasteData.split('')
    emits('update:modelValue', pasteData)
  } else {
  }
}
const handleChange = (e, i) => {
  if (e.data) {
    digits.value[i] = e.data.replace(/[^0-9]/g, '')
  }
}

const handleKeyup = (e) => {
  if (new RegExp('^([0-9])$').test(e.key)) {
    digits.value[inputIndex.value] = e.key
    if (e.target.nextElementSibling) e.target.nextElementSibling.focus()
  }
  if (e.key === 'Backspace') {
    if (digits.value[inputIndex.value]) digits.value[inputIndex.value] = ''
    if (e.target.previousElementSibling) e.target.previousElementSibling.focus()
  }
  emits('update:modelValue', digits.value.join(''))
}
// const handleKeydown = (e) => {
//   if (new RegExp('^([0-9])$').test(e.key)) {
//     digits.value[inputIndex.value] = e.key
//     emits('update:modelValue', digits.value.join(''))
//     if (e.target.nextElementSibling) e.target.nextElementSibling.focus()
//   }
//   if (e.key === 'Backspace') {
//     console.log(digits.value.join(''))
//     emits('update:modelValue', digits.value.join(''))
//     if (digits.value[inputIndex.value]) digits.value[inputIndex.value] = ''
//     if (e.target.previousElementSibling) e.target.previousElementSibling.focus()
//   }
// }
const handleFocus = (index) => {
  inputIndex.value = index
}
</script>

<template>
  <a-input-group>
    <a-row class="otp-container" @keyup="handleKeyup">
      <a-input
        v-for="(item, i) in digits"
        :key="i"
        @input="handleChange($event, i)"
        @paste="handlePaste"
        @focus="handleFocus(i)"
        type="text"
        class="digit-box ant-col"
        size="large"
        :value="digits[i]"
        :autofocus="i === 0"
        placeholder="#"
        :maxlength="1"
      />
    </a-row>
  </a-input-group>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
.otp-container {
  justify-content: space-between;
}
.digit-box {
  width: 3rem;
  padding-left: 17px;
  padding-right: 17px;
}
</style>
