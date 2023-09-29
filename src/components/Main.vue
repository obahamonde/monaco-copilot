<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useStorage } from '@vueuse/core'
import Split from 'split.js'

import { generateHTML } from '~/composables/helpers'
import { StorageName } from '~/types'
import MonacoEditor from './MonacoEditor.vue'
import Tabs from './Tabs.vue'

const iframe = ref<HTMLIFrameElement>()

const items = ref([
  { text: 'HTML', value: 'html' },
  { text: 'CSS', value: 'css' },
  { text: 'JS', value: 'javascript' },
])

const currentTab = useStorage(StorageName.ACTIVE_TAB, items.value[0].value)

watch(isDark, (value) => {
  iframe.value?.contentWindow?.postMessage(
    `theme-${value ? 'dark' : 'light'}`,
    '*',
  )
})

const onChange = (payload: Record<string, any>) => {
  iframe.value!.srcdoc = generateHTML(payload, isDark.value)
}

const onComplete = async (payload: string) => {
const response = await fetch("/api/copilot", {
method: "POST",
body: JSON.stringify({code: payload}),
headers: {
"Content-Type": "application/json"
}
})

const data = await response.text()
console.log(data)
}

onMounted(() => {
  Split(['#split-0', 'iframe'])
})
</script>

<template>
  <main class="border-t border-gray-200 dark:border-gray-700 w-full">
    <div class="flex flex-row h-full">
      <div id="split-0" class="w-full">
        <Tabs v-model="currentTab" :items="items" />
        <MonacoEditor :active-tab="currentTab" @change="onChange" 
					@call="onComplete"
				/>
      </div>
      <iframe
        ref="iframe"
        class="h-full w-full"
        sandbox="allow-scripts"
        frameBorder="0"
      />
    </div>
  </main>
</template>

<style>
main {
  height: calc(100vh - var(--nav-height));
	width: 100%;
}

.gutter {
  @apply dark:bg-gray-900 bg-no-repeat;
  background-position: 50%;
}

.gutter.gutter-horizontal {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==');
  cursor: col-resize;
}

*::-webkit-scrollbar {
  width: 8px;
}

*::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

*::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: var(--scrollbar-thumb);
}
</style>
