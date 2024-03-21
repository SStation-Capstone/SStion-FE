import { message as Message, Upload, message } from 'antd';
import { RcFile } from 'antd/es/upload';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

import { storage } from '@/firbase';

import type { UploadFile, UploadProps } from 'antd';

export const beforeUpload = (file: File) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    Message.error('You can only upload JPG/PNG files!');
    return Upload.LIST_IGNORE;
  }
  return true; // Allow upload
};

export const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export const fakeUpload: UploadProps['customRequest'] = async (options) => {
  const { onSuccess } = options;
  onSuccess?.('Ok');
};
// export const customUpload: UploadProps['customRequest'] = async ({
//   onError,
//   onSuccess,
//   file,
//   filename,
// }) => {
//   const metadata = {
//     contentType: 'image/jpeg',
//   };
//   const storageRef = ref(storage, `images/${Date.now()}-${filename}`);
//   const uploadTask = uploadBytesResumable(storageRef, file as RcFile, metadata);
//   uploadTask.on(
//     'state_changed',
//     (snapshot) => {},
//     (error) => {
//       // Handle unsuccessful uploads
//       onError?.(error);
//     },
//     () => {
//       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//         onSuccess?.(downloadURL);
//       });
//     },
//   );
// };

export const uploadFileToFirebase = async (file: UploadFile) => {
  const metadata = {
    contentType: 'image/jpeg',
  };
  const storageRef = ref(storage, `images/${Date.now()}-${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file.originFileObj as RcFile, metadata);

  uploadTask.on(
    'state_changed',
    (snapshot) => {},
    (error) => {
      message.error(error.message);
    },
    // () => {
    //   getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {});
    // },
  );
  await uploadTask;
  const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
  // 👆 getDownloadURL returns a promise too, so... yay more await

  return downloadURL; // 👈 return the URL to the caller
};
