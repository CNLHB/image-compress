<!-- App.vue -->
<template>
    <div>
        <section>1</section>
        <section>
            <div>2</div>
            <lazy-load
                :lazy-component="Example"
                type="observer"
                :component-params="{ content: 'Example A' ,msg: 'observer'}"
                :component-events="{
                    'test-event': testEvent,
                }"
            ></lazy-load>
        </section>
        <section>
            <div>3</div>
            <lazy-load
                :lazy-component="Example"
                type="idle"
                :component-params="{ content: 'Example B',msg: 'observer' }"
                :component-events="{
                    'test-event': testEvent,
                }"
            ></lazy-load>
        </section>
        <section>
            <div>4</div>
            <lazy-load
                :lazy-component="Example"
                type="lazy"
                :component-params="{ content: 'Example C',msg: 'observer' }"
                :component-events="{
                    'test-event': testEvent,
                }"
            ></lazy-load>
        </section>
        <section>
            <div>5</div>
            <lazy-load
                :lazy-component="Example"
                type="observer"
                :component-params="{ content: 'Example D',msg: 'observer' }"
                :component-events="{
                    'test-event': testEvent,
                }"
            ></lazy-load>
        </section>
    </div>
</template>

<script setup lang="ts">
import LazyLoad from "./components/LazyLoad.vue"

// 定义懒加载组件
const Example = () => import("./components/HelloWorld.vue")

// 事件处理函数
const testEvent = (content: string) => {
    console.log(content)
}
</script>

<style>

body {
    padding: 0;
    margin: 0;
}

section {
    margin: 20px 0;
    color: #fff;
    height: 500px;
    background: pink;
}
</style>
