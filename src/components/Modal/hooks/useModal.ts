
import { ref, unref, getCurrentInstance, reactive, toRaw, watchEffect, nextTick } from "vue";
import { isFunction } from "@/utils/is";

declare type Nullable<T> = T | null;

// 数据传输，根据uuid来决定是哪个数据
const dataTransfer = reactive<any>({})

export const useModal = () => {
  const uid = ref()
  const modal = ref<Nullable<any>>(null)

  // 接受弹框组件发射register事件，记录参数
  const register = (modalMethods: any, uuid: string) => {
    modal.value = unref(modalMethods)

    uid.value = uuid
  }
  // 打开弹框事件
  const openModal = (visible = true, data?: any) => {
    // dataTransfer将需要传值的数据利用组件的uid保存起来
    dataTransfer[unref(uid)] = toRaw(data)
    // 改变弹框的props
    getInstanceMethods().setModalProps({
      visible
    })
  }
  // 关闭弹框
  const closeModal = () => {
    getInstanceMethods().setModalProps({
      visible: false
    })
  }
  // 获取组件实例方法
  const getInstanceMethods = () => {
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

  const getInstanceMethods = () => {
    if (!unref(modal)) {
      throw new Error('组件未实例化！')
    }
    return unref(modal)
  }
  // 接收基础弹框组件的发射事件，并再次发射给使用弹框的组件
  // useModal里的register接收的是这个事件
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
    getInstanceMethods().setModalProps({
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