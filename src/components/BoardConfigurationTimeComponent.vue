<script setup>
import { formatTime } from '../composables/index.js'
import { ref } from 'vue'
const props = defineProps({
  timeType: {
    type: String,
    required: true
  },
  configuration: {
    type: Object,
    required: true
  }
})
const times = ref({
  liveTime: 'POST_LIVE_TIME',
  topTime: 'POST_TOP_TIME',
  pinTime: 'POST_PIN_TIME'
})
const icons = ref({
  liveTime: '🕐',
  topTime: '🔝',
  pinTime: '📌'
})
</script>

<template>
  <div class="flex align-center">
    <a-popover>
      <template #content> {{ $t(times[timeType]) }} </template>

      <span class="mr-1">{{ icons[timeType] }}</span>
      <template v-if="formatTime(configuration[timeType], 'day')">
        <span class="mr-1">
          {{ formatTime(configuration[timeType], 'day') }}
          {{ $t('DAY').toLowerCase()
          }}<template
            v-if="
              formatTime(configuration[timeType], 'hour') ||
              formatTime(configuration[timeType], 'minute')
            "
            >,
          </template>
        </span>
      </template>

      <template v-if="formatTime(configuration[timeType], 'hour')">
        <span class="mr-1">
          {{ formatTime(configuration[timeType], 'hour') }}
          {{ $t('HOUR').toLowerCase()
          }}<template v-if="formatTime(configuration[timeType], 'minute')"
            >,
          </template>
        </span>
      </template>
      <template v-if="formatTime(configuration[timeType], 'minute')">
        <span class="">
          {{ formatTime(configuration[timeType], 'minute') }}
          {{ $t('MINUTE').toLowerCase() }}
        </span>
      </template>
    </a-popover>
  </div>
</template>

<style scoped lang="scss">
.configuration-time {
  cursor: pointer;
}
</style>
