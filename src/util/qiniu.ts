import * as qiniu from 'qiniu';
import { unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getFileKey = (file) => {
  const uuid = () => {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
  };
  const splitted = file.originalname.split('.');
  const extension = splitted[splitted.length - 1];

  return {
    fileName: uuid() + '.' + extension,
    key: 'blog/' + uuid() + '.' + extension,
  };
};

const saveFile = (file) => {
  const { fileName, key } = getFileKey(file);
  const filePath = join(__dirname, `./${fileName}`);
  writeFileSync(filePath, file.buffer);
  return { fileName, key };
};

const deleteFile = (name) => {
  const path = join(__dirname, `./${name}`);
  unlinkSync(path);
};

export const saveToQiNIu = async (file) => {
  const { fileName, key } = saveFile(file);
  await sleep(3000);

  const mac = new qiniu.auth.digest.Mac(process.env.ACCESS_KEY, process.env.SECRET_KEY)
  const options = {scope: process.env.BUCKET}
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken = putPolicy.uploadToken(mac);
  const config: any = new qiniu.conf.Config();
  config.zone = qiniu.zone.Zone_z2;
  const localFile = join(__dirname, `./${fileName}`);
  const putExtra = new qiniu.form_up.PutExtra();
  const formUploader = new qiniu.form_up.FormUploader(config);
  return new Promise((resolve, reject) => {
    formUploader.putFile(
      uploadToken,
      key,
      localFile,
      putExtra,
      function (respErr, respBody, respInfo) {
        if (respErr) {
          deleteFile(fileName);
          reject(respErr);
        }
        if (respInfo.statusCode == 200) {
          deleteFile(fileName);
          resolve(respBody);
        }
      },
    );
  });
};
