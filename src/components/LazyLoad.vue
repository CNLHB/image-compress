
<!-- lazy-load.vue -->
<template>
    <div>
        <component
            :is="renderComponent"
            v-bind="componentParams"
            v-on="componentEvents"
        ></component>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, getCurrentInstance } from 'vue'
import type { Component } from 'vue'

// 定义 Props 接口
interface Props {
    lazyComponent: () => Component
    type: 'observer' | 'idle' | 'lazy'
    componentParams?: Record<string, unknown>
    componentEvents?: Record<string, unknown>
}

// 定义 Props
const props = withDefaults(defineProps<Props>(), {
    componentParams: () => ({}),
    componentEvents: () => ({})
})

// 定义 Emits
const emit = defineEmits<{
    loaded: []
}>()

// 响应式数据
const observer = ref<IntersectionObserver | null>(null)
const renderComponent = ref<(() => Component) | any>(null)
const isLoading = ref(false)
const loadError = ref<Error | null>(null)

// 获取当前组件实例
const instance = getCurrentInstance()
type ComponentModule = {
  default: Component
}
// 提取组件的辅助函数
const extractComponent = (componentModule: ComponentModule | Component): Component => {
    // 如果是模块对象且有 default 属性
    if (componentModule && typeof componentModule === 'object' && 'default' in componentModule) {
        return (componentModule as ComponentModule).default!
    }
    // 否则直接返回组件
    return componentModule as Component
}

// 加载组件
const loadComponent = async () => {
    if (renderComponent.value) return // 防止重复加载
    
    try {
        isLoading.value = true
        loadError.value = null
        
        console.log('开始加载组件...')
        
        // 等待组件加载完成
        const componentModule = await props.lazyComponent()
        
        // 提取实际的组件
        renderComponent.value = extractComponent(componentModule)
        
        console.log('组件加载成功:', renderComponent.value)
        emit('loaded')
        
    } catch (error) {
        console.error('组件加载失败:', error)
        loadError.value = error as Error
    } finally {
        isLoading.value = false
    }
}


// 初始化
const init = () => {
    if (props.type === 'observer') {
        // 存在 `window.IntersectionObserver`
        if (window.IntersectionObserver) {
            observer.value = new IntersectionObserver(entries => {
                entries.forEach(item => {
                    // `intersectionRatio` 为目标元素的可见比例，大于 `0` 代表可见
                    // 在这里也有实现策略问题 例如加载后不解除 `observe` 而在不可见时销毁等
                    if (item.intersectionRatio > 0) {
                        loadComponent()
                        // 加载完成后将其解除 `observe`
                        observer.value?.unobserve(item.target)
                    }
                })
            })
            
            // 观察当前元素的父元素或当前元素
            const targetElement = instance?.proxy?.$el?.parentElement || instance?.proxy?.$el
            if (targetElement) {
                observer.value.observe(targetElement)
            }
        } else {
            // 直接加载
            loadComponent()
        }
    } else if (props.type === 'idle') {
        // 存在 `requestIdleCallback`
        if ('requestIdleCallback' in window) {
            (window as any).requestIdleCallback(loadComponent, { timeout: 3 })
        } else {
            // 直接加载
            loadComponent()
        }
    } else if (props.type === 'lazy') {
        // 存在 `Promise`
        if (window.Promise) {
            Promise.resolve().then(loadComponent)
        } else {
            // 降级使用 `setTimeout`
            setTimeout(loadComponent)
        }
    } else {
        throw new Error(`type: "observer" | "idle" | "lazy"`)
    }
}

// 生命周期钩子
onMounted(() => {
    init()
})

onUnmounted(() => {
    if (observer.value) {
        observer.value.disconnect()
    }
})
</script>
