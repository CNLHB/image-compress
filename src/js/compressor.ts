// @ts-nocheck
import imageCompression from "browser-image-compression";
import  init, { compress_image } from './pkg/wasm_image_compress.js';
import { compressImageJpeg } from "./custom/index.js";
import { compressImagePng } from "./custom/pngCompress";
import { compressImageWebm } from "./custom/webmCompress.js";
let compressMap = {
  png: compressImagePng,
  jpg: compressImageJpeg,
  jpeg: compressImageJpeg,
  webp: compressImageWebm
}
async  function handleImageUpload(file, quality) {
  
  const type = file.type.split("/")[1]
  if(!compressMap[type]){
    new Error('无法处理这种图片格式')
  }
  const result = await compressMap[type]({
    file,
    level: quality,
  })
  if(result.type === 'finished'){
    return result.blob
  }
  return result.message
  // await init();
  // return new Promise(async (resolve, reject) => { 
  // const reader = new FileReader();
  // reader.onload = async (e) => {
  //   const data = new Uint8Array(e.target.result);
  //   const compressed = await compress_image(data,new Uint8Array(quality), file.type.split("/")[1]); // 质量参数 0-100
  //   const blob = new Blob([compressed], { type: file.type });
  //   // 显示或上传压缩后的图片
  //   resolve(blob);
  // };
  // reader.readAsArrayBuffer(file);
  // });
}
/**
 * 压缩单张图片
 * @param {File} file - 原始图片文件
 * @param {number} quality - 压缩质量，0-1之间
 * @param {string} format - 输出格式，可选值：'default', 'jpg', 'png', 'webp', 'ico'
 * @returns {Promise<File>} 压缩后的图片文件
 */
const compressImage = async (file, quality, format) => {
  // 默认压缩选项
  const options = {
    maxSizeMB: 5, // 最大文件大小(MB)
    maxWidthOrHeight: 1920, // 最大宽度或高度
    initialQuality: quality || 0.8, // 初始质量
    fileType: format !== "default" ? format : undefined, // 输出格式
    alwaysKeepResolution: false, // 是否保持分辨率
  };

  try {
    // 使用browser-image-compression库进行压缩
    const compressedFile = await handleImageUpload(file, quality);
    console.log('compressedFile', compressedFile);
    
    return compressedFile;
  } catch (error) {
    console.error("图片压缩失败:", error);
    throw new Error(`压缩失败: ${error.message}`);
  }
};

/**
 * 批量压缩图片
 * @param {File[]} files - 原始图片文件数组
 * @param {number} quality - 压缩质量，0-1之间
 * @param {string} format - 输出格式
 * @param {Function} onProgress - 进度回调函数，接收当前进度和总进度
 * @returns {Promise<File[]>} 压缩后的图片文件数组
 */
const batchCompressImages = async (files, quality, format, onProgress) => {
  const compressedFiles = [];
  const total = files.length;

  for (let i = 0; i < total; i++) {
    try {
      const compressedFile = await compressImage(files[i], quality, format);
      compressedFiles.push(compressedFile);
      // 调用进度回调
      onProgress?.(i + 1, total);
    } catch (error) {
      console.error(`第${i + 1}张图片压缩失败:`, error);
      // 可以选择抛出错误或继续处理下一张图片
      throw new Error(`第${i + 1}张图片压缩失败: ${error.message}`);
    }
  }

  return compressedFiles;
};

export { compressImage, batchCompressImages };
