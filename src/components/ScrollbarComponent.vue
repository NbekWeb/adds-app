<script setup>
const props = defineProps({
  totalCountAll: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  page: {
    type: Number,
    required: true
  },
  count: {
    type: Number,
    required: true
  },
  loading: {
    type: Boolean,
    required: true
  },
  height: String
})
const emits = defineEmits(['getDate'])
const scroll = (e) => {
  const clientH = e.target.clientHeight
  const scrollTop = e.target.scrollTop
  const scrollH = e.target.scrollHeight
  const page = props.page + 1
  if (
    Math.ceil(clientH + scrollTop) >= scrollH &&
    props.totalCountAll >= props.page * props.count &&
    page < props.totalPages &&
    !props.loading
  ) {
    emits('getDate', page)
  }
}
</script>

<template>
  <div
    class="scrollbar-content py-2"
    :style="{ height: height }"
    id="scrollbar-content"
    @scroll="scroll"
  >
    <slot name="content"></slot>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';

.scrollbar-content {
  height: 100vh;
  overflow: auto;
  transition: all 0.5s;
  &::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    width: 10px;
    background: $white;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: rgb($info, 1);
    border-radius: 4px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: $primary;
  }
}
</style>
