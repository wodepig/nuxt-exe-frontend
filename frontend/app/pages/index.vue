<template>
  <div class="flex flex-col h-screen">
    <!-- 顶部导航栏 -->
    <header class="bg-white border-b border-gray-200 p-4">
      <div class="flex justify-between items-center">
        <h1 class="text-xl font-bold text-gray-800"> </h1>
        <div class="flex items-center gap-4">
          <UButton variant="ghost" size="sm" icon="i-lucide-bell"></UButton>
          <UButton variant="ghost" size="sm" icon="i-lucide-user"></UButton>
        </div>
      </div>
    </header>

    <!-- 主要内容区 -->
    <div class="flex flex-1 overflow-hidden">
      <!-- 左侧菜单栏 -->
      <div 
        class="h-full" 
        :style="{ width: sidebarWidth + 'px' }"
      >
        <SidebarMenu 
          :active-menu="activeMenu"
          @navigate="handleNavigate"
        />
      </div>

      <!-- 侧边栏拖动条 -->
      <div 
        class="w-1 bg-gray-200 cursor-col-resize hover:bg-gray-300"
        @mousedown="startSidebarResize"
      ></div>

      <!-- 右侧内容区 -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <ContentArea @log="handleLog" />

        <!-- 日志区拖动条 -->
        <div 
          class="h-1 bg-gray-200 cursor-row-resize hover:bg-gray-300"
          @mousedown="startLogPanelResize"
        ></div>

        <!-- 底部日志区 -->
        <div 
          class="border-t border-gray-200"
          :style="{ height: logPanelHeight + 'px' }"
        >
          <LogPanel 
            :logs="logs"
            @clear="clearLogs"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SidebarMenu from '../components/SidebarMenu.vue'
import ContentArea from '../components/ContentArea.vue'
import LogPanel from '../components/LogPanel.vue'

const activeMenu = ref('home')
const logs = ref<Array<{
  type: 'success' | 'error' | 'info'
  message: string
  timestamp: string
}>>([])

// 可拖动调节的尺寸
const sidebarWidth = ref(200)
const logPanelHeight = ref(150)

// 拖动状态
const isResizing = ref(false)
const resizeType = ref<'sidebar' | 'logpanel' | null>(null)

const handleNavigate = (menu: string) => {
  activeMenu.value = menu
  addLog('info', `导航到 ${menu} 页面`)
}

const handleLog = (log: { type: 'success' | 'error' | 'info', message: string }) => {
  addLog(log.type, log.message)
}

const addLog = (type: 'success' | 'error' | 'info', message: string) => {
  const timestamp = new Date().toLocaleTimeString()
  logs.value.push({ type, message, timestamp })
  
  // 限制日志数量，最多保留50条
  if (logs.value.length > 50) {
    logs.value.shift()
  }
}

const clearLogs = () => {
  logs.value = []
  addLog('info', '日志已清空')
}

// 侧边栏拖动开始
const startSidebarResize = (e: MouseEvent) => {
  isResizing.value = true
  resizeType.value = 'sidebar'
  document.addEventListener('mousemove', handleResize)
  document.addEventListener('mouseup', stopResize)
}

// 日志区拖动开始
const startLogPanelResize = (e: MouseEvent) => {
  isResizing.value = true
  resizeType.value = 'logpanel'
  document.addEventListener('mousemove', handleResize)
  document.addEventListener('mouseup', stopResize)
}

// 拖动处理
const handleResize = (e: MouseEvent) => {
  if (!isResizing.value) return

  if (resizeType.value === 'sidebar') {
    // 限制侧边栏宽度在100-400px之间
    const newWidth = Math.max(100, Math.min(400, e.clientX))
    sidebarWidth.value = newWidth
  } else if (resizeType.value === 'logpanel') {
    // 获取整个窗口的高度
    const windowHeight = window.innerHeight
    // 计算新的日志区高度
    const newHeight = Math.max(100, Math.min(400, windowHeight - e.clientY))
    logPanelHeight.value = newHeight
  }
}

// 停止拖动
const stopResize = () => {
  isResizing.value = false
  resizeType.value = null
  document.removeEventListener('mousemove', handleResize)
  document.removeEventListener('mouseup', stopResize)
}

// 初始化时添加欢迎日志
addLog('info', '应用已启动')
</script>

<style scoped>
/* 自定义样式 */
body {
  user-select: none;
}
</style>