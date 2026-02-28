<template>
  <div class="flex-1 p-6 overflow-y-auto">
    <UPageHeader
      title="欢迎使用桌面端工具"
      description="这是一个基于 Nuxt 4 和 Nuxt UI 构建的桌面应用"
    />

    <UPageSection title="功能介绍">
      <UCard>
        <div class="space-y-4">
          <div class="flex items-start gap-4">
            <div class="bg-primary/10 p-3 rounded-full text-2xl">
              📊
            </div>
            <div>
              <h3 class="font-medium text-lg">仪表盘</h3>
              <p class="text-gray-600">查看应用的关键指标和状态</p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div class="bg-primary/10 p-3 rounded-full text-2xl">
              🔧
            </div>
            <div>
              <h3 class="font-medium text-lg">API 测试</h3>
              <p class="text-gray-600">测试和调试 API 请求</p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div class="bg-primary/10 p-3 rounded-full text-2xl">
              ⚙️
            </div>
            <div>
              <h3 class="font-medium text-lg">设置</h3>
              <p class="text-gray-600">配置应用的各项参数</p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div class="bg-primary/10 p-3 rounded-full text-2xl">
              ℹ️
            </div>
            <div>
              <h3 class="font-medium text-lg">关于</h3>
              <p class="text-gray-600">查看应用的版本信息和说明</p>
            </div>
          </div>
        </div>
      </UCard>
    </UPageSection>

    <UPageSection title="快速操作">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UCard class="p-4 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between">
            <h3 class="font-medium">开始使用</h3>
            <UButton @click="handleQuickAction('start')" size="sm" color="primary">
              开始
            </UButton>
          </div>
          <p class="text-gray-600 mt-2">点击开始使用应用的核心功能</p>
        </UCard>

        <UCard class="p-4 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between">
            <h3 class="font-medium">查看文档</h3>
            <UButton @click="handleQuickAction('docs')" size="sm" color="secondary">
              查看
            </UButton>
          </div>
          <p class="text-gray-600 mt-2">阅读应用的使用文档和指南</p>
        </UCard>
      </div>
    </UPageSection>

    <UPageSection title="系统信息">
      <UCard>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="p-4 border rounded-lg">
            <p class="text-sm text-gray-500">应用版本</p>
            <p class="font-medium">1.0.0</p>
          </div>
          <div class="p-4 border rounded-lg">
            <p class="text-sm text-gray-500">系统</p>
            <p class="font-medium">{{ systemInfo.os }}</p>
          </div>
          <div class="p-4 border rounded-lg">
            <p class="text-sm text-gray-500">最后更新</p>
            <p class="font-medium">{{ systemInfo.lastUpdated }}</p>
          </div>
        </div>
      </UCard>
    </UPageSection>
  </div>
</template>

<script setup lang="ts">
const toast = useToast()

const emit = defineEmits<{
  (e: 'log', log: { type: 'success' | 'error' | 'info', message: string }): void
}>()

// 系统信息
const systemInfo = {
  os: 'Windows 10',
  lastUpdated: '2026-02-28'
}

// 快速操作处理
const handleQuickAction = (action: string) => {
  emit('log', { type: 'info', message: `执行快速操作: ${action}` })
  toast.add({
    title: '操作执行',
    description: `已执行 ${action} 操作`,
    color: 'info',
    icon: 'i-lucide-check-circle'
  })
}
</script>