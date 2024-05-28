<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <n-form-item label="数量">
      <n-input-number v-model:value="count" />
    </n-form-item>
    <n-button type="primary" @click="download">保存到本地</n-button>
  </n-config-provider>
</template>
<script setup lang="ts">
import {
  NConfigProvider,
  NButton,
  zhCN,
  dateZhCN,
  NInputNumber,
  NFormItem,
} from "naive-ui"
import { save } from "@tauri-apps/api/dialog"
import { writeBinaryFile } from "@tauri-apps/api/fs"

import { createDocument } from "./document"
import { listQuiz } from "./quiz"
import { ref } from "vue"

const count = ref(30)

async function download() {
  const quiz = listQuiz({ count: count.value, groups: 3 })
  const file = await createDocument(quiz)
  const path = await save({ defaultPath: "口算练习题.docx" })
  if (!path) return
  writeBinaryFile(path, file)
}
</script>
