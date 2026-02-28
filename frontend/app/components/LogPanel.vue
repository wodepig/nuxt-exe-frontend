<template>
  <div class="h-48 border-t border-gray-200 p-4">
    <div class="flex justify-between items-center mb-2">
      <h3 class="text-sm font-medium text-gray-700">操作日志</h3>
      <UButton 
        @click="clearLogs" 
        variant="ghost" 
        size="sm"
      >
        清空
      </UButton>
    </div>
    <div ref="logContainer" class="bg-gray-50 rounded-md p-2 h-32 overflow-y-auto font-mono text-sm">
      <div v-if="logs.length === 0" class="text-gray-400 text-center py-4">
        暂无日志
      </div>
      <div 
        v-for="(log, index) in logs" 
        :key="index"
        class="mb-1"
        :class="{
          'text-green-600': log.type === 'success',
          'text-red-600': log.type === 'error',
          'text-blue-600': log.type === 'info'
        }"
      >
        <span class="text-gray-500">{{ log.timestamp }}</span>
        <span class="ml-2">{{ log.message }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  logs: Array<{
    type: 'success' | 'error' | 'info'
    message: string
    timestamp: string
  }>
}>()

const emit = defineEmits<{
  (e: 'clear'): void
}>()

const logContainer = ref<HTMLElement | null>(null)

// 监听日志变化，自动滚动到底部
watch(
  () => props.logs.length,
  () => {
    nextTick(() => {
      if (logContainer.value) {
        logContainer.value.scrollTop = logContainer.value.scrollHeight
      }
    })
  }
)

const clearLogs = () => {
  emit('clear')
}
</script>