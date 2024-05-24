<script setup>
import IconPlus from '@/components/icons/IconPlus.vue'
import IconEdit from '@/components/icons/IconEdit.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import PostButtonsFormComponent from '@/pages/dashboard/post/component/PostButtonsFormComponent.vue'
import useCore from '@/store/core.pinia.js'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const corePinia = useCore()
const { visibleDrawer } = storeToRefs(corePinia)

const buttons = defineModel('buttons')
const editableButton = ref()
const index = ref()

function addButton(data) {
  buttons.value.push(data)
  buttons.value = buttons.value.map((item, i) => {
    item.orderNumber = i
    return item
  })
  corePinia.visibleDrawer.delete('button/form')
}
function editButton(data) {
  buttons.value = buttons.value.map((item, i) => {
    if (i === index.value) {
      Object.assign(item, data)
    }
    item.orderNumber = i
    return item
  })
  corePinia.visibleDrawer.delete('button/form')
}
function deleteButton(index) {
  buttons.value = buttons.value.filter((item, i) => index !== i)
}
function findButton(i) {
  index.value = i
  editableButton.value = buttons.value[i]
  corePinia.visibleDrawer.add('button/form')
}
</script>

<template>
  <a-row :gutter="[10, 10]">
    <a-col
      :xs="24"
      :sm="24"
      :md="12"
      :lg="8"
      :xl="6"
      v-for="(button, index) in buttons"
      :key="index"
    >
      <a-popover>
        <template #title>
          <div class="flex justify-between">
            <h4 class="m-0">{{ $t('URL') }}</h4>
            <a-space>
              <a-button
                @click="findButton(index)"
                type="text"
                size="small"
                class="btn"
              >
                <template #icon>
                  <IconEdit />
                </template>
              </a-button>
              <a-button
                @click="deleteButton(index)"
                type="text"
                size="small"
                class="btn"
                danger
              >
                <template #icon>
                  <IconTrash />
                </template>
              </a-button>
            </a-space>
          </div>
        </template>
        <template #content>
          <div class="button-url-container">
            <a
              :href="button.url"
              target="_blank"
              rel="opener"
              class="button-url"
            >
              {{ button.url }}
            </a>
          </div>
        </template>
        <a-button class="w-full" type="primary">
          {{ button.text }}
        </a-button>
      </a-popover>
    </a-col>
    <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
      <a-button @click="visibleDrawer.add('button/form')" class="btn w-full">
        <IconPlus />
        {{ $t('ADD_NEW_LINKED_BUTTON') }} 
      </a-button>
    </a-col>
  </a-row>
  <a-modal
    centered
    width="400px"
    :title="$t('ADD_NEW_LINKED_BUTTON')"
    destroy-on-close
    :footer="null"
    :open="visibleDrawer.has('button/form')"
    @cancel="visibleDrawer.delete('button/form')"
  >
    <post-buttons-form-component
      @edit="editButton"
      @add="addButton"
      v-model:data="editableButton"
    />
  </a-modal>
</template>

<style scoped lang="scss">
.button-url-container {
  overflow: hidden;
  max-width: 400px;
}
</style>
