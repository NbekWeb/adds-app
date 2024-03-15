<script setup>
import { onMounted, ref } from 'vue'
const model = defineModel()
const props = defineProps({
  disabled: Boolean,
  value: String,
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
    model.value = pasteData
  } else {
  }
}

const handleInput = (e) => {
  if (new RegExp('^([0-9])$').test(e.data)) {
    digits.value[inputIndex.value] = e.data
    if (e.target.nextElementSibling) e.target.nextElementSibling.focus()
  } else {
    digits.value[inputIndex.value] = ''
  }
  model.value = digits.value.join('')
}
const handleKeydown = (e) => {
  if (e.key === 'Backspace' && !e.target.value) {
    if (e.target.previousElementSibling) e.target.previousElementSibling.focus()
  }
  model.value = digits.value.join('')
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
    <a-row class="otp-container" @keydown="handleKeydown" @input="handleInput">
      <a-input
        v-for="(item, i) in digits"
        :key="i"
        :disabled="disabled"
        @paste="handlePaste"
        @focus="handleFocus(i)"
        type="text"
        class="digit-box ant-col"
        size="large"
        v-model:value="digits[i]"
        :autofocus="i === 0"
        placeholder="#"
        :maxlength="1"
      />
    </a-row>
  </a-input-group>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';
@import '@/assets/styles/responsive';
.otp-container {
  justify-content: space-between;
}
.digit-box {
  width: 2.5rem;
  padding-left: 13px;
  padding-right: 13px;

  @include responsive-sm {
    width: 3rem;
    padding-left: 17px;
    padding-right: 17px;
  }
}
</style>
