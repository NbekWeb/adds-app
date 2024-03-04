<script setup>
import { onMounted, ref } from 'vue'
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  disabled: Boolean,
  count: {
    type: Number,
    required: true
  }
})
const inputIndex = ref(null)
const digits = ref([])

const counterInput = () => {
  for (let i = 0; i < props.count; i++) {
    digits.value.push('')
  }
}

const handlePaste = (e) => {
  const pasteData = e.clipboardData.getData('text')
  const onlyNumbers = pasteData.match(/^\d+$/)

  if (onlyNumbers) {
    digits.value = pasteData.split('')
    emits('update:modelValue', pasteData)
  } else {
  }
}

const handleKeydown = (e) => {
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
const handleFocus = (index) => {
  inputIndex.value = index
}
onMounted(() => {
  counterInput()
})
</script>

<template>
  <a-input-group>
    <a-row class="otp-container" @keydown="handleKeydown">
      <a-input
        v-for="(item, i) in digits"
        :key="i"
        :disabled="disabled"
        @paste="handlePaste"
        @focus="handleFocus(i)"
        type="text"
        class="digit-box ant-col"
        size="large"
        :value="item"
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
