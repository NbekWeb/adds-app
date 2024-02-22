<script setup>
import theme from "@/utils/ant/theme.js";
import useCore from "@/store/core.pinia.js";
import {watch} from "vue";
import {useRouter} from "vue-router";
import {storeToRefs} from "pinia";
import {message} from "ant-design-vue";

const corePinia = useCore();
const {redirectUrl,toastContent} = storeToRefs(corePinia);
const router = useRouter();
watch(redirectUrl, ()=>{
  if(redirectUrl.value && redirectUrl.value !== ''){
    router.push(`${redirectUrl.value}`);
    corePinia.redirect(null);
  }
});

watch(toastContent,()=>{
  if (toastContent.value) {
    const toastMessage = toastContent.value || null;
    const type = toastContent.value.type || 'success'
    if (type === "error") {
      return message.error(toastMessage.message);
    }
    if (type === "success") {
      message.success(toastMessage.message);
    }
    if (type === "info") {
      message.info(toastMessage.message);
    }
    if (type === "warning") {
      message.warning(toastMessage.message);
    }
  }
});
</script>

<template>
  <a-config-provider
      :theme="theme"
  >
    <router-view/>
  </a-config-provider>
</template>

<style scoped>

</style>
