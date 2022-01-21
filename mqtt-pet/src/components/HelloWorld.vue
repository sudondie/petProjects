<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref,computed } from 'vue'
import {useStore} from "vuex"
import router from "../router"

const store = useStore()
const title = computed(()=> {
  return store.state.title
})
</script>

<template>
  <h1 class="text-5xl font-bold">Hello world!</h1>
  <div class="logos flex items-center justify-center">
    <img src="../images/vitejs.svg" class="mr-2.5" alt="vite" width="100" height="100">
    <p class="text-6xl mr-2.5">+</p>
    <img src="../images/vue.svg"  alt="vue" class="mt-3 mr-2.5" width="100" height="120">
    <p class="text-6xl mr-2.5">+</p>
    <img src="../images/tailwind.svg" alt="tailwind" width="150" height="150">
  </div>
  <h2 class="text-3xl font-bold">Vite + Vue 3 (Vuex,Router) + TailwindCSS template</h2>
  <h2 class="text-1xl font-bold">
    {{title}}
  </h2>
  <p class="italic text-1xl font-bold">If this message is italic,then tailwind works perfect</p>
  <div class="buttons mt-5 flex sm:flex-col justify-center items-center">
    <button class="rounded-xl border sm:mb-4 sm:w-1/6 shrink-0 pl-7 pr-7 pt-2 pb-2 bg-red-600 text-white mr-8"><a target="_blank" href="https://vitejs.dev/">Vite</a></button>
    <button class="rounded-xl border sm:mb-4 sm:w-1/6 pl-7 pr-7 pt-2 pb-2 bg-orange-600 text-white mr-8"><a target="_blank" href="https://v3.vuejs.org/">Vue 3</a></button>
    <button class="rounded-xl border sm:mb-4 sm:w-1/6 pl-7 pr-7 pt-2 pb-2 bg-yellow-400 text-white mr-8"><a target="_blank" href="https://next.vuex.vuejs.org/">Vuex 4</a></button>
    <button class="rounded-xl border sm:mb-4 sm:w-1/6 pl-7 pr-7 pt-2 pb-2 bg-green-600 text-white mr-8"><a target="_blank" href="https://next.router.vuejs.org/guide/">Vue router 4</a></button>
    <button class="rounded-xl border sm:mb-4 sm:w-1/6 pl-7 pr-7 pt-2 pb-2 pb-3 pb-3 bg-blue-600 text-white mr-8"><a target="_blank" href="https://tailwindcss.com/docs/installation">TailwindCSS</a></button>
    <button class="rounded-xl border sm:mb-4 sm:w-1/6 pl-7 pr-7 pt-2 pb-2 bg-blue-800 text-white mr-8"><a target="_blank" href="https://github.com/vitejs/awesome-vite#plugins">Plugins</a></button>
    <button class="rounded-xl border sm:mb-4 sm:w-1/6 sm:mr-8 pl-7 pr-7 pt-2 pb-2 bg-purple-700 text-white"><a target="_blank" href="https://vitejs.dev/">TailwindCSS</a></button>
  </div>


</template>

<style scoped>

</style>
