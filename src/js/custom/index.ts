// @ts-nocheck
import cjpeg from './cjpeg.min.js'
const l = {
    slight: "85",
    normal: "75",
    strong: "50",
    extreme: "20"
};

export const compressImageJpeg = async (data: any) => { 
  return new Promise(async (resolve, reject) => {
    const t = data
      , s = t.file
      , o = new Uint8Array(await s.arrayBuffer())
      , r = t.level;
    try {
        const e = cjpeg(o, ["-quality", l[r]]);
        if (!e.data || e.data.length === 0) {
            reject({
                type: "error"
            });
            return
        }
        const n = new Blob([e.data]);
        resolve({
            type: "finished",
            blob: n
        })
    } catch (e) {
        reject({
            type: "error",
            e
        })
    } 
  })
};
