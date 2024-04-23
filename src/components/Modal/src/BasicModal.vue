<script setup lang="ts">
import { ref, unref, computed, getCurrentInstance } from 'vue'
import { Modal } from 'ant-design-vue'
import { deepMerge } from '@/utils/index'

const emit = defineEmits(['register', 'ok'])
// 接收通过js传值
const visibleRef = ref(false)
const propsRef = ref({})
// 确认
const handleOk = () => {
  emit('ok')
}

const getProps = computed(() => {
  return {
    visible: unref(visibleRef),
    ...unref(propsRef)
  }
})
// 接收hooks传值
const setModalProps = (props: any) => {
  // 深度合并
  propsRef.value = deepMerge(unref(propsRef), props)
  // 赋值弹框控制显隐属性-visible
  if (Reflect.has(props, 'visible')) {
    visibleRef.value = props.visible
  }
}

const modalMethods = {
  setModalProps
}

const instance = getCurrentInstance()
if (instance) {
  // 发射注册事件，将方法、组件的uid暴露出去
  emit('register', modalMethods, instance.uid)
}
</script>

<template>
  <Modal v-model:open="getProps.visible" title="Basic Modal" @ok="handleOk">
    <slot></slot>
  </Modal>
</template>

<style scoped lang="less"></style>
