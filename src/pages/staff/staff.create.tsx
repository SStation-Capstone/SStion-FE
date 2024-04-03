import { Button, Form, Input, Modal, Upload, UploadFile, UploadProps, message } from 'antd';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  PostStaffPayload,
  PutStaffPayload,
  useCreateStaff,
  useUpdateStaff,
} from '@/api/services/stationService';
import { beforeUpload, fakeUpload, normFile, uploadFileToFirebase } from '@/utils/file';

import { Staff } from '#/entity';

export type StaffCreateFormProps = {
  clickOne?: Staff;
  onClose: () => void;
};
export function StaffCreate({ clickOne, onClose }: StaffCreateFormProps) {
  const [form] = Form.useForm();
  const { id } = useParams();
  const { mutateAsync: createMutate } = useCreateStaff(id);
  const { mutateAsync: updateMutate } = useUpdateStaff(id);
  const [loading, setLoading] = useState<boolean>(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const submitHandle = async () => {
    setLoading(true);
    const values = await form.validateFields();
    try {
      if (clickOne) {
        const updateData: PutStaffPayload = {
          id: clickOne.id.toString(),
          email: values.email,
          fullName: values.fullName,
          avatarUrl: clickOne.avatarUrl,
        };
        if (values.avatarUrl) {
          const updateImageUrl: string = await uploadFileToFirebase(values?.avatarUrl[0]);
          updateData.avatarUrl = updateImageUrl;
        }
        updateData.fullName = values.fullName;
        updateData.email = values.email;
        updateMutate(updateData);
        setLoading(false);
      } else {
        const createData: PostStaffPayload = {
          userName: values.userName,
          password: values.password,
          fullName: values.fullName,
        };
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
        {clickOne?.id ? (
          <Form.Item
            label="Email"
            name="email"
            required
            rules={[{ required: true, message: 'Please input email' }]}
          >
            <Input />
          </Form.Item>
        ) : (
          <Form.Item
            label="UserName"
            name="userName"
            required
            rules={[{ required: true, message: 'Please input userName' }]}
          >
            <Input />
          </Form.Item>
        )}
        <Form.Item
          label="Full Name"
          name="fullName"
          required
          rules={[{ required: true, message: 'Please input fullName' }]}
        >
          <Input />
        </Form.Item>
        {clickOne?.id ? (
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
        ) : (
          <Form.Item
            label="Password"
            name="password"
            required
            rules={[{ required: true, message: 'Please input password' }]}
          >
            <Input.Password />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
}
