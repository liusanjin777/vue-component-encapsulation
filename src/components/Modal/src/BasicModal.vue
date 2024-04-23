<script setup lang="ts">
import { ref, unref, computed, getCurrentInstance } from 'vue'
import { Modal } from 'ant-design-vue'
import { deepMerge } from '@/utils/index'

const emit = defineEmits(['register', 'ok'])

const visibleRef = ref(false)

const propsRef = ref({})

const handleOk = () => {
  emit('ok')
}

const getProps = computed(() => {
  return {
    visible: unref(visibleRef),
    ...unref(propsRef)
  }
})

const setModalProps = (props: any) => {
  propsRef.value = deepMerge(unref(propsRef), props)
  if (Reflect.has(props, 'visible')) {
    visibleRef.value = props.visible
  }
}

const modalMethods = {
  setModalProps
}

const instance = getCurrentInstance()
if (instance) {
  emit('register', modalMethods, instance.uid)
}
</script>

<template>
  <Modal v-model:visible="getProps.visible" title="Basic Modal" @ok="handleOk">
    <slot></slot>
  </Modal>
</template>

<style scoped lang="less"></style>
