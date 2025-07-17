// @ts-nocheck
import pngquant from './pngquant.min'
function l() {}
const c = {
    slight: "0-100",
    normal: "0-70",
    strong: "0-40",
    extreme: "0-20"
};
export const compressImagePng = async (data: any) => { 
  return new Promise(async (resolve, reject) => { 
       const e = data
      , s = e.file
      , n = new Uint8Array(await s.arrayBuffer())
      , o = e.level;
    try {
        const t = pngquant(n, {
            quality: c[o]
        }, l);
        if (!t.hasOwnProperty("data")) {
            reject({
                type: "error",
                message: t.message.indexOf('No output') > -1 ? "文件出错,无法继续压缩" : t.message
            });
            return
        }
        const r = new Blob([t.data]);
        resolve({
            type: "finished",
            blob: r
        })
    } catch (t) {
        reject({
            type: "error",
            message: t
        })
    }
  });
};
