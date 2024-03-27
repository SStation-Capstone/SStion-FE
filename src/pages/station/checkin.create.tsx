import {
  Button,
  Form,
  Input,
  Checkbox,
  Upload,
  UploadFile,
  UploadProps,
  Modal,
  message,
} from 'antd';
import { useState } from 'react';

import { CheckInPayload, useCreateCheckIn } from '@/api/services/stationService';
import { beforeUpload, fakeUpload, normFile, uploadFileToFirebase } from '@/utils/file';

export type CheckInCreateFormProps = {
  onClose: () => void;
};
export function ManageCheckInCreate({ onClose }: CheckInCreateFormProps) {
  const [form] = Form.useForm();
  const { mutateAsync: createMutate } = useCreateCheckIn();
  const [loading, setLoading] = useState<boolean>(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const submitHandle = async () => {
    setLoading(true);
    const values = await form.validateFields();
    try {
      const createData: CheckInPayload = {
        name: values.name,
        description: values.description,
        priceCod: values.priceCod,
        isCod: values.isCod,
        weight: values.weight,
        height: values.height,
        width: values.width,
        length: values.length,
        stationId: 1,
        senderId: values.senderId,
        receiverId: values.receiverId,
        packageImages: [],
      };
      if (values.avatarUrl && values.avatarUrl.length > 0) {
        const imageUrls: string[] = [];
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < values.avatarUrl.length; i++) {
          // eslint-disable-next-line no-await-in-loop
          const updateImageUrl: string = await uploadFileToFirebase(values.avatarUrl[i]);
          imageUrls.push(updateImageUrl);
        }
        createData.packageImages = imageUrls;
      }
      // createMutate(createData);
      setLoading(false);
      onClose();
    } catch (error) {
      message.error(error.message || error);
      console.log(error);
      setLoading(false);
    }
  };
  const validateNumber = (_: any, value: any, callback: (error?: Error) => void) => {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(value)) {
      callback(new Error('Please input a number'));
    } else {
      callback();
    }
  };
  const onImageChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  return (
    <Modal
      title="Create Check In"
      open
      onOk={submitHandle}
      onCancel={() => onClose()}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={submitHandle}>
          Submit
        </Button>,
      ]}
    >
      <Form
        form={form}
        // labelCol={{ span: 4 }}
        // wrapperCol={{ span: 18 }}
        layout="vertical"
      >
        <Form.Item
          label="Name"
          name="name"
          required
          rules={[{ required: true, message: 'Please input shelf name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          required
          rules={[{ required: true, message: 'Please input shelf description' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Form.Item label="is Cod" name="isCod" valuePropName="checked">
            <Checkbox />
          </Form.Item>
          <Form.Item
            label="Price Cod"
            name="priceCod"
            required
            rules={[
              { required: true, message: 'Please input priceCod' },
              { validator: validateNumber as any },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
          <Form.Item
            label="Weight"
            name="weight"
            required
            rules={[
              { required: true, message: 'Please weight width' },
              { validator: validateNumber as any },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Width"
            name="width"
            required
            rules={[
              { required: true, message: 'Please input width' },
              { validator: validateNumber as any },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Height"
            name="height"
            required
            rules={[
              { required: true, message: 'Please input height' },
              { validator: validateNumber as any },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Length"
            name="length"
            required
            rules={[
              { required: true, message: 'Please input length' },
              { validator: validateNumber as any },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <Form.Item label="package Images" name="avatarUrl" getValueFromEvent={normFile}>
          <Upload
            name="image"
            maxCount={4}
            className="UploadImage"
            listType="picture-card"
            fileList={fileList}
            beforeUpload={beforeUpload}
            customRequest={fakeUpload}
            onChange={onImageChange}
          >
            {fileList.length < 4 && '+ Upload'}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}
