<template>
  <div class="w-full bg-gray-50 border-r border-gray-200 h-full p-4">
    <div class="mb-6">
      <h2 class="text-xl font-bold text-gray-800">工具菜单</h2>
    </div>
    <ul class="space-y-2">
      <li>
        <UButton 
          @click="navigateTo('home')"
          variant="ghost" 
          class="w-full justify-start"
          :class="{ 'bg-primary/10 text-primary': activeMenu === 'home' }"
        >
          <template #prefix>
            <i class="i-lucide-home mr-2"></i>
          </template>
          首页
        </UButton>
      </li>
      <li>
        <UButton 
          @click="navigateTo('api')"
          variant="ghost" 
          class="w-full justify-start"
          :class="{ 'bg-primary/10 text-primary': activeMenu === 'api' }"
        >
          <template #prefix>
            <i class="i-lucide-code mr-2"></i>
          </template>
          API 测试
        </UButton>
      </li>
      <li>
        <UButton 
          @click="navigateTo('settings')"
          variant="ghost" 
          class="w-full justify-start"
          :class="{ 'bg-primary/10 text-primary': activeMenu === 'settings' }"
        >
          <template #prefix>
            <i class="i-lucide-settings mr-2"></i>
          </template>
          设置
        </UButton>
      </li>
      <li>
        <UButton 
          @click="navigateTo('about')"
          variant="ghost" 
          class="w-full justify-start"
          :class="{ 'bg-primary/10 text-primary': activeMenu === 'about' }"
        >
          <template #prefix>
            <i class="i-lucide-info mr-2"></i>
          </template>
          关于
        </UButton>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  activeMenu: string
}>()

const emit = defineEmits<{
  (e: 'navigate', menu: string): void
}>()

const navigateTo = (menu: string) => {
  emit('navigate', menu)
}
</script>