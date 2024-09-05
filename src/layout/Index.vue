<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" @click="onMenuClick" theme="dark" mode="inline">
        <a-menu-item v-for="item in routes" :key="item.path">
          <pie-chart-outlined />
          <span>{{ item.meta.name }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" />
      <a-layout-content style="margin: 0 16px">
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <RouterView />
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { PieChartOutlined } from '@ant-design/icons-vue'
import { RouterView, useRouter } from 'vue-router'
import { ref } from 'vue'
import { routes } from '@/router/modules/index'

const collapsed = ref<boolean>(false)

const selectedKeys = ref<string[]>([routes[0].path])

const router = useRouter()
const onMenuClick = ({ key }: { key: string }) => {
  selectedKeys.value = [key]
  router.push(`/${key}`)
}
</script>
<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>
