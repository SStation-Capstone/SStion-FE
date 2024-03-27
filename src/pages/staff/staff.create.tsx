import { Button, Form, Input, Modal, Upload, UploadFile, UploadProps, message } from 'antd';
import { useState } from 'react';

import { StaffPayload, useCreateStaff } from '@/api/services/stationService';
import { beforeUpload, fakeUpload, normFile, uploadFileToFirebase } from '@/utils/file';

import { Staff } from '#/entity';

export type StaffCreateFormProps = {
  clickOne?: Staff;
  onClose: () => void;
};
export function StaffCreate({ clickOne, onClose }: StaffCreateFormProps) {
  const [form] = Form.useForm();
  const { mutateAsync: createMutate } = useCreateStaff();
  // const { mutateAsync: updateMutate } = useUpdateStaff();
  const [loading, setLoading] = useState<boolean>(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const submitHandle = async () => {
    setLoading(true);
    const values = await form.validateFields();
    try {
      if (clickOne) {
        const updateData: StaffPayload = {
          ...clickOne,
        };
        if (values.avatarUrl) {
          const updateImageUrl: string = await uploadFileToFirebase(values?.avatarUrl[0]);
          updateData.avatarUrl = updateImageUrl;
        }
        updateData.fullName = values.fullName;
        updateData.phoneNumber = values.phoneNumber;
        // updateMutate(updateData);
        setLoading(false);
      } else {
        const imageUrl: string = await uploadFileToFirebase(values?.avatarUrl[0]);
        const createData: StaffPayload = { ...values, avatarUrl: imageUrl };
        createMutate(createData);
        setLoading(false);
      }
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
      title={clickOne?.id ? 'Edit Staff' : 'Create Staff'}
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
        initialValues={clickOne}
        form={form}
        // labelCol={{ span: 4 }}
        // wrapperCol={{ span: 18 }}
        layout="vertical"
      >
        <Form.Item
          label="Full Name"
          name="fullName"
          required
          rules={[{ required: true, message: 'Please input fullName' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          required
          rules={[
            { required: true, message: 'Please input phoneNumber' },
            { validator: validateNumber as any },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="package Images" name="avatarUrl" getValueFromEvent={normFile}>
          <Upload
            name="image"
            maxCount={1}
            className="UploadImage"
            listType="picture-card"
            fileList={fileList}
            beforeUpload={beforeUpload}
            customRequest={fakeUpload}
            onChange={onImageChange}
          >
            {fileList.length < 1 && '+ Upload'}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}
