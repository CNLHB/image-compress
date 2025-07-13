// @ts-nocheck

/**
 * 验证文件大小是否符合要求
 * @param {File} file - 要验证的文件
 * @param {number} maxSizeMB - 最大允许大小(MB)
 * @returns {boolean} 是否符合要求
 */
const validateFileSize = (file, maxSizeMB = 5) => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};

/**
 * 格式化文件大小显示
 * @param {number} bytes - 文件大小(字节)
 * @returns {string} 格式化后的大小字符串
 */
const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

/**
 * 下载单个文件
 * @param {Blob} blob - 文件blob数据
 * @param {string} fileName - 文件名
 */
const downloadFile = (blob, fileName) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * 检查文件是否为图片类型
 * @param {File} file - 要检查的文件
 * @returns {boolean} 是否为图片
 */
const isImageFile = (file) => {
  return file && file.type.startsWith("image/");
};

/**
 * 生成压缩后的文件名
 * @param {string} originalName - 原始文件名
 * @param {string} format - 目标格式
 * @returns {string} 新文件名
 */
const generateCompressedFileName = (originalName, format) => {
  if (format === "default") {
    return originalName.replace(/(\.[^.]+)$/, "-compressed$1");
  }
  const nameWithoutExt = originalName.replace(/\.[^.]+$/, "");
  return `${nameWithoutExt}-compressed.${format}`;
};

/**
 * 获取文件扩展名
 * @param {string} fileName - 文件名
 * @returns {string} 文件扩展名
 */
const getFileExtension = (fileName) => {
  return fileName.split(".").pop().toLowerCase();
};

/**
 * 使用JSZip批量压缩图片并下载为ZIP文件
 * @param {Blob[]} images - 图片Blob对象数组
 * @param {string[]} fileNames - 对应图片的文件名数组
 * @param {string} zipName - 生成的ZIP文件名
 */
const zipAndDownloadImages = async (
  images: Blob[],
  fileNames: string[],
  zipName: string = "compressed_images.zip"
): Promise<void> => {
  // 导入JSZip模块
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();

  // 将所有图片添加到ZIP文件
  images.forEach((image, index) => {
    const fileName = fileNames[index] || `image_${index}.jpg`;
    zip.file(fileName, image);
  });

  // 生成ZIP文件并下载
  zip
    .generateAsync({ type: "blob" })
    .then((content: Blob) => {
      downloadFile(content, zipName);
    })
    .catch((error: Error) => {
      console.error("ZIP文件生成失败:", error);
      alert("批量下载失败，请重试");
    });
};
/**
 * 显示通知提示
 * @param {string} message - 提示消息
 * @param {string} type - 提示类型（success/error/info）
 */
const showNotification = (message, type = "info") => {
  // 创建通知元素
  const notification = document.createElement("div");
  notification.className = `fixed top-4 right-4 px-4 py-3 rounded-md shadow-lg z-50 transition-all duration-300 transform translate-y-[-100px] opacity-0`;

  // 根据类型设置样式
  switch (type) {
    case "success":
      notification.classList.add("bg-green-500", "text-white");
      notification.innerHTML = `<i class="fas fa-check-circle mr-2"></i>${message}`;
      break;
    case "error":
      notification.classList.add("bg-red-500", "text-white");
      notification.innerHTML = `<i class="fas fa-exclamation-circle mr-2"></i>${message}`;
      break;
    default:
      notification.classList.add("bg-blue-500", "text-white");
      notification.innerHTML = `<i class="fas fa-info-circle mr-2"></i>${message}`;
  }

  // 添加到页面并显示
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.classList.remove("translate-y-[-100px]", "opacity-0");
  }, 10);

  // 3秒后自动移除
  setTimeout(() => {
    notification.classList.add("translate-y-[-100px]", "opacity-0");
    setTimeout(() => notification.remove(), 300);
  }, 3000);
};
export {
  validateFileSize,
  formatFileSize,
  downloadFile,
  isImageFile,
  generateCompressedFileName,
  getFileExtension,
  zipAndDownloadImages,
  showNotification,
};
