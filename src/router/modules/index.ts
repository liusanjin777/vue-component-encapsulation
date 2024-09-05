

export const routes = [
  {
    path: 'modal',
    name: 'Modal',
    component: async () => await import('@/views/Modal/Index.vue'),
    meta: {
      name: '弹框'
    }
  },
  {
    path: 'table',
    name: 'Table',
    component: async () => await import('@/views/Table/Index.vue'),
    meta: {
      name: '表格'
    }
  }
]