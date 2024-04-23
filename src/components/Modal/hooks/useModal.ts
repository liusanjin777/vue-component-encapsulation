
import { ref, unref, getCurrentInstance, reactive, toRaw, watchEffect, nextTick } from "vue";
import { isFunction } from "@/utils/is";

declare type Nullable<T> = T | null;

// 数据传输，根据uuid来决定是哪个数据
const dataTransfer = reactive<any>({})

export const useModal = () => {
  const uid = ref()
  const modal = ref<Nullable<any>>(null)
  const register = (modalMethods: any, uuid: string) => {
    modal.value = unref(modalMethods)

    uid.value = uuid
  }

  const openModal = (visible = true, data?: any) => {
    dataTransfer[unref(uid)] = toRaw(data)
    getInstance().setModalProps({
      visible
    })
  }

  const closeModal = () => {
    getInstance().setModalProps({
      visible: false
    })
  }

  const getInstance = () => {
    if (!unref(modal)) {
      throw new Error('组件未实例化！')
    }
    return unref(modal)
  }

  const methods = {
    openModal,
    closeModal
  }
  return {
    register, openModal, methods
  }
}

export const useModalInner = (callBack?: any) => {

  const uid = ref()
  const instance = getCurrentInstance()
  const modal = ref<Nullable<any>>(null)

  const getInstance = () => {
    if (!unref(modal)) {
      throw new Error('组件未实例化！')
    }
    return unref(modal)
  }

  const register = (modalInstance: any, uuid: string) => {
    modal.value = modalInstance
    uid.value = uuid
    instance?.emit('register', modalInstance, uuid)
  }

  // 立即运行，响应式地追踪uid，并在uid更改时重新执行
  watchEffect(() => {
    const data = dataTransfer[unref(uid)];
    if (!data) return;
    if (!callBack || !isFunction(callBack)) return;
    nextTick(() => {
      callBack(data);
    });
  });

  // 关闭弹框
  const closeModal = () => {
    getInstance().setModalProps({
      visible: false
    })
  }

  const methods = {
    closeModal
  }

  return {
    register,
    methods
  }
}