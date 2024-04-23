<script setup lang="ts">
import { ref, unref, computed, getCurrentInstance, useAttrs } from 'vue'
import { Modal } from 'ant-design-vue'
import { deepMerge } from '@/utils/index'
import { basicProps } from './props'

const props = defineProps(basicProps)
const attrs = useAttrs()
const emit = defineEmits(['register', 'ok', 'cancel'])
// 接收通过js传值
const visibleRef = ref(false)
const propsRef = ref({})
// 确认
const handleOk = (e: Event) => {
  emit('ok', e)
}

// 取消
const handleCancel = (e: Event) => {
  visibleRef.value = false
  emit('cancel', e)
}
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

const getMergeProps = computed((): any => {
  return {
    ...props,
    ...(unref(propsRef) as any)
  }
})

const getBindValue = computed((): any => {
  const attr = {
    ...attrs,
    ...unref(getMergeProps),
    visible: unref(visibleRef)
  }
  return attr
})
</script>

<template>
  <Modal v-bind="getBindValue" @ok="handleOk" @cancel="handleCancel">
    <slot></slot>
  </Modal>
</template>

<style scoped lang="less"></style>
