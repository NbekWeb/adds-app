<script setup>
import { onMounted, reactive, ref } from 'vue'
import useAuth from '@/store/auth.pinia.js'

const props = defineProps({
  placeholder: String,
  digitCount: {
    type: Number,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])

const authPinia = useAuth()

const placeholders = reactive([])
const digits = reactive([])

const setPlaceholder = () => {
  if (props.placeholder && props.placeholder.length === props.digitCount) {
    for (let i = 0; i < props.digitCount; i++) {
      placeholders.push(props.placeholder.charAt(i))
      digits[i] = null
    }
  } else {
    for (let i = 0; i < props.digitCount; i++) {
      placeholders[i] = null
      digits[i] = null
    }
  }
}

const otpCont = ref(document.getElementsByClassName('digit-box'))

const handleKeyDown = function (event, index) {
  if (
    event.key !== 'Tab' &&
    event.key !== 'ArrowRight' &&
    event.key !== 'ArrowLeft'
  ) {
    event.preventDefault()
  }
  if (event.key === 'Backspace') {
    digits[index] = null

    if (index !== 0) {
      otpCont.value[index - 1].focus()
    }
    emits('update:modelValue', digits.join(''))
    return
  }

  if (new RegExp('^([0-9])$').test(event.key)) {
    digits[index] = event.key
    if (index !== props.digitCount - 1) {
      otpCont.value[index + 1].focus()
    }
  }

  emits('update:modelValue', digits.join(''))
}
onMounted(() => {
  setPlaceholder()
})
</script>

<template>
  <div>
    <a-row class="otp-container" align="center">
      <a-col v-for="(el, ind) in digits" :key="el + ind">
        <a-input
          @keydown="handleKeyDown($event, ind)"
          type="text"
          class="digit-box"
          size="large"
          v-model:value="digits[ind]"
          :autofocus="ind === 0"
          :placeholder="placeholders[ind]"
          :maxlength="1"
        />
      </a-col>
    </a-row>
    <div class="otp-footer">
      <a-button size="small" class="send-again-code" type="link"
        >Kodni qayt yuborish</a-button
      >
      <a-button
        size="small"
        class="change-phone-number"
        @click="authPinia.clearOtp()"
        type="link"
        >Raqamni qayta kiritish
      </a-button>
    </div>
  </div>
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

.otp-footer {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-top: 5px;
}
</style>
