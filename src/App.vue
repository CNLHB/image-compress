<template>
  <div class="container mx-auto px-4 py-8 max-w-6xl">
    <header class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">图片压缩工具</h1>
      <p class="text-gray-600 max-w-2xl mx-auto">
        简单、高效的在线图片压缩工具，支持批量上传、压缩质量调整和多种格式转换，保护您的隐私，所有处理均在本地完成
      </p>
    </header>

    <main class="space-y-8">
      <!-- 上传区域 -->
      <section class="upload-section">
        <div
          class="upload-area border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors duration-300 bg-white"
          @dragover.prevent="handleDragOver"
          @dragleave.prevent="handleDragLeave"
          @drop.prevent="handleDrop"
          @click="handleUploadClick"
        >
          <input
            ref="fileInput"
            type="file"
            multiple
            accept="image/*"
            class="hidden"
            @change="handleFileSelect"
          />
          <div class="upload-icon text-5xl text-gray-400 mb-4">
            <svg class='w-12' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">拖放图片到此处或点击上传</h3>
          <p class="text-gray-500 mb-4">支持JPG、PNG、WebP等格式，单张图片最大5MB</p>
          <div v-if="uploadedImages.length > 0" class="mt-4">
            <p class="text-sm text-gray-600">已选择 {{ uploadedImages.length }} 张图片</p>
          </div>
        </div>
      </section>

      <!-- 控制区域 -->
      <section class="control-section bg-white p-6 rounded-xl shadow-sm">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 class="text-2xl font-bold text-gray-800">压缩设置</h2>
          <div class="flex gap-3">
            <button
              class="btn-primary"
              :disabled="isCompressing"
              @click="startCompression"
            >
              <span v-if="!isCompressing">开始压缩</span>
              <span v-if="isCompressing">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                压缩中...
              </span>
            </button>
            <button
              class="btn-secondary"
              :disabled="isCompressing"
              @click="clearAll"
            >
              清空列表
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="form-group">
            <label for="quality" class="block text-sm font-medium text-gray-700 mb-2">压缩质量</label>
            <div class="flex items-center gap-3">
              <input
                type="range"
                id="quality"
                min="0.1"
                max="1"
                step="0.1"
                v-model.number="compressionQuality"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                :disabled="isCompressing"
              />
              <span class="text-gray-700 font-medium min-w-[40px] text-center">{{ compressionQuality.toFixed(1) }}</span>
            </div>
          </div>

          <div class="form-group">
            <label for="format" class="block text-sm font-medium text-gray-700 mb-2">输出格式</label>
            <select
              id="format"
              v-model="outputFormat"
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              :disabled="isCompressing"
            >
              <option value="default">默认（保持原格式）</option>
              <option value="jpg">JPG</option>
              <option value="png">PNG</option>
              <option value="webp">WebP</option>
              <option value="ico">ICO</option>
            </select>
          </div>
        </div>

        <!-- 压缩进度 -->
        <div v-if="isCompressing" class="mt-6">
          <div class="flex justify-between text-sm text-gray-600 mb-1">
            <span>压缩进度: {{ currentProgress }}/{{ totalImages }}</span>
            <span>{{ Math.round((currentProgress / totalImages) * 100) }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div
              class="bg-blue-600 h-2.5 rounded-full"
              :style="{ width: `${(currentProgress / totalImages) * 100}%` }"
            ></div>
          </div>
        </div>
      </section>

      <!-- 图片预览区域 -->
      <section v-if="uploadedImages.length > 0" class="preview-section">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">图片预览</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(image, index) in uploadedImages" :key="index" class="image-preview bg-white rounded-lg shadow-md overflow-hidden">
            <div class="p-4">
              <div class="flex justify-between items-start mb-3">
                <h3 class="font-medium text-gray-800 truncate max-w-[200px]">{{ image.name }}</h3>
                <button
                  class="text-gray-400 hover:text-red-500"
                  @click="removeImage(index)"
                  :disabled="isCompressing"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>

              <div class="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p class="text-xs text-gray-500 mb-1">原始图片</p>
                  <div class="aspect-w-1 aspect-h-1 bg-gray-100 rounded-md flex items-center justify-center">
                    <img
                      :src="image.originalUrl"
                      alt="Original preview"
                      class="max-w-full max-h-40 object-contain"
                    />
                  </div>
                  <p class="text-xs text-gray-500 mt-1 text-center">{{ image.originalSize }}</p>
                </div>

                <div>
                  <p class="text-xs text-gray-500 mb-1">
                    <span v-if="!image.compressed">压缩后</span>
                    <span v-if="image.compressed && !image.error">已压缩</span>
                    <span v-if="image.error" class="text-red-500">压缩失败</span>
                  </p>
                  <div class="aspect-w-1 aspect-h-1 bg-gray-100 rounded-md flex items-center justify-center">
                    <div v-if="!image.compressed && !image.error" class="text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <img
                      v-if="image.compressed && !image.error"
                      :src="image.compressedUrl"
                      alt="Compressed preview"
                      class="max-w-full max-h-40 object-contain"
                    />
                    <div v-if="image.error" class="text-red-400">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <p class="text-xs text-gray-500 mt-1 text-center">
                    <span v-if="!image.compressed && !image.error">--</span>
                    <span v-if="image.compressed && !image.error">{{ image.compressedSize }} ({{ image.compressionRatio }})</span>
                    <span v-if="image.error">{{ image.error }}</span>
                  </p>
                </div>
              </div>

              <div v-if="image.compressed && !image.error" class="flex justify-end">
                <button
                  class="btn-primary text-sm py-1 px-3"
                  @click="downloadImage(image.compressedFile, image.name)"
                >
                  下载
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 批量下载按钮 -->
      <div v-if="hasCompressedImages && !isCompressing" class="flex justify-center mt-8">
        <button class="btn-primary px-6 py-3 text-lg"
          @click="downloadAllImages">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          批量下载所有图片
        </button>
      </div>
    </main>

    <footer class="mt-auto py-8 text-center text-gray-500 text-sm">
      <p>图片压缩工具 &copy; {{ new Date().getFullYear() }} - 所有处理均在本地浏览器中完成，保护您的隐私</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck

import { ref, reactive, computed, onMounted } from 'vue';
import { compressImage, batchCompressImages } from './js/compressor';
import {
  validateFileSize,
  formatFileSize,
  downloadFile,
  isImageFile,
  generateCompressedFileName,
  getFileExtension,
  zipAndDownloadImages
} from './js/utils';
import { showNotification } from './js/utils';

// 文件输入元素引用
const fileInput = ref<HTMLInputElement | null>(null);

// 压缩设置
const compressionQuality = ref<number>(0.8);
const outputFormat = ref<string>('default');

// 状态管理
const uploadedImages = reactive<Array<{
  name: string;
  originalFile: File;
  originalUrl: string;
  originalSize: string;
  compressed: boolean;
  compressedFile?: File;
  compressedUrl?: string;
  compressedSize?: string;
  compressionRatio?: string;
  error?: string;
}>>([]);

const isCompressing = ref<boolean>(false);
const currentProgress = ref<number>(0);
const totalImages = ref<number>(0);

// 计算属性：是否有已压缩的图片
const hasCompressedImages = computed(() => {
  return uploadedImages.some(img => img.compressed && !img.error);
});

// 处理拖放事件
const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
  const target = e.target as HTMLElement;
  if (target.classList.contains('upload-area')) {
    target.classList.add('border-blue-500', 'bg-blue-50');
  }
};

const handleDragLeave = (e: DragEvent) => {
  e.preventDefault();
  const target = e.target as HTMLElement;
  if (target.classList.contains('upload-area')) {
    target.classList.remove('border-blue-500', 'bg-blue-50');
  }
};

// 处理文件拖放
const handleDrop = async (e: DragEvent) => {
  e.preventDefault();
  const target = e.target as HTMLElement;
  if (target.classList.contains('upload-area')) {
    target.classList.remove('border-blue-500', 'bg-blue-50');
  }

  if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
    await processFiles(Array.from(e.dataTransfer.files));
  }
};

// 触发文件选择对话框
const handleUploadClick = () => {
  fileInput.value?.click();
};

// 处理文件选择
const handleFileSelect = async (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    await processFiles(Array.from(input.files));
    // 重置input值，以便可以重新选择相同的文件
    input.value = '';
  }
};

// 处理上传的文件
const processFiles = async (files: File[]) => {
  for (const file of files) {
    // 验证文件类型
    if (!isImageFile(file)) {
      showNotification(`文件 ${file.name} 不是有效的图片文件，无法上传`, 'error');
      continue;
    }

    // 验证文件大小
    if (!validateFileSize(file, 5)) {
      showNotification(`文件 ${file.name} 大小超过5MB限制，无法上传`, 'error');
      continue;
    }

    // 创建图片预览
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedImages.push({
        name: file.name,
        originalFile: file,
        originalUrl: e.target?.result as string,
        originalSize: formatFileSize(file.size),
        compressed: false
      });
    };
    reader.readAsDataURL(file);
  }
};

// 移除图片
const removeImage = (index: number) => {
  uploadedImages.splice(index, 1);
};

// 清空所有图片
const clearAll = () => {
  if (confirm('确定要清空所有图片吗？')) {
    uploadedImages.length = 0;
  }
};

// 开始压缩图片
const startCompression = async () => {
  if (uploadedImages.length === 0) return;

  isCompressing.value = true;
  currentProgress.value = 0;
  totalImages.value = uploadedImages.length;

  try {
    // 提取原始文件
    const filesToCompress = uploadedImages.map(img => img.originalFile);

    // 批量压缩图片
    const compressedFiles = await batchCompressImages(
      filesToCompress,
      compressionQuality.value,
      outputFormat.value,
      (current, total) => {
        currentProgress.value = current;
      }
    );

    // 更新压缩结果
    compressedFiles.forEach((compressedFile, index) => {
      const originalImage = uploadedImages[index];
      const originalSize = originalImage.originalFile.size;
      const compressedSize = compressedFile.size;
      const ratio = ((1 - compressedSize / originalSize) * 100).toFixed(1);

      // 创建压缩后图片的预览URL
      const reader = new FileReader();
      reader.onload = (e) => {
        originalImage.compressedUrl = e.target?.result as string;
      };
      reader.readAsDataURL(compressedFile);

      // 更新图片信息
      originalImage.compressed = true;
      originalImage.compressedFile = compressedFile;
      originalImage.compressedSize = formatFileSize(compressedSize);
      originalImage.compressionRatio = `${ratio}% 压缩`;
      originalImage.error = undefined;
    });
  } catch (error) {
    console.error('压缩过程出错:', error);
    // 在实际应用中，这里可以更精确地定位出错的图片
    if (error instanceof Error) {
      alert(`压缩失败: \${error.message}`);
    }
  } finally {
    isCompressing.value = false;
  }
};

// 下载单个图片
const downloadImage = (file: File, originalName: string) => {
  if (!file) return;

  const fileName = generateCompressedFileName(originalName, outputFormat.value);
  downloadFile(file, fileName);
};

// 批量下载所有图片
const downloadAllImages = () => {
  // 批量下载所有图片
  const images = uploadedImages.map(img => img.compressedFile);
  const fileNames = uploadedImages.map(img => img.name);
  zipAndDownloadImages(images, fileNames, 'compressed_images.zip');
};

onMounted(() => {
  // 组件挂载后的初始化代码
  console.log('图片压缩工具初始化完成');
});
</script>
