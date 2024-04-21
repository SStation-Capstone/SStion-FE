import { Form, Modal, Input, Upload, UploadFile, UploadProps, message, Button } from 'antd';

// import { PERMISSION_LIST } from '@/_mock/assets';

import { isArray } from 'lodash';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  MangerPayload,
  useCreateSManager,
  useUpdateManager,
} from '@/api/services/admin/managerService';
import { beforeUpload, fakeUpload, normFile, uploadFileToFirebase } from '@/utils/file';

import { Manager } from '#/entity';

export type ManagerEditFormProps = {
  clickOne?: Manager;
  onClose: () => void;
  // onOk: VoidFunction;
  // onCancel: VoidFunction;
};
// const PERMISSIONS: Permission[] = PERMISSION_LIST;
export function UserEdit({ clickOne, onClose }: ManagerEditFormProps) {
  const [form] = Form.useForm();

  const { mutateAsync: createMutate } = useCreateSManager();
  const { mutateAsync: updateMutate } = useUpdateManager();
  const [loading, setLoading] = useState<boolean>(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  // const submitHandle = async () => {
  //   const values = await form.validateFields();
  //   console.log(values);
  //   createMutate(values);
  //   onClose();
  // };
  // const submitHandle = async () => {
  //   const values = await form.validateFields();
  //   if (clickOne?.id) {
  //     updateMutate(values);
  //   } else {
  //     createMutate(values);
  //   }
  //   onClose();
  // };
  useEffect(() => {
    if (clickOne?.avatarUrl)
      setFileList([
        {
          uid: uuidv4(),
          name: 'image',
          url: clickOne?.avatarUrl,
        },
      ]);
    return () => {
      setFileList([]);
    };
  }, [clickOne, form]);

  const submitHandle = async () => {
    const values = await form.validateFields();
    setLoading(true);
    try {
      if (clickOne) {
        const updateData: MangerPayload = {
          ...clickOne,
          id: clickOne.id,
        };
        if (isArray(values.avatarUrl) && values.avatarUrl.length > 0) {
          const updateImageUrl: string = await uploadFileToFirebase(values?.avatarUrl[0]);
          const imageUrl = updateImageUrl;
          updateData.avatarUrl = imageUrl;
        }
        updateData.userName = values.userNamec;
        updateData.email = values.email;
        updateData.fullName = values.fullName;
        updateData.password = values.password;
        updateMutate(updateData);
        setLoading(false);
      } else {
        const imageUrl: string = await uploadFileToFirebase(values?.avatarUrl[0]);
        const createData: MangerPayload = {
          ...values,
          avatarUrl: imageUrl,
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
      title={clickOne ? 'Edit Manager' : 'Create Manager'}
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
        wrapperCol={{ span: 18 }}
        layout="vertical"
      >
        <Form.Item
          // label="ID"
          name="id"
          required
          // rules={[{ required: true, message: 'Please input Id' }]}
          // initialValue={clickOne?.id}
        >
          {/* <Input /> */}
        </Form.Item>
        <Form.Item
          label="User Name"
          name="userName"
          required
          rules={[{ required: true, message: 'Please input User Name' }]}
          initialValue={clickOne?.userName}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          required
          rules={[{ required: true, message: 'Please input email' }]}
          initialValue={clickOne?.email}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          required
          rules={[
            {
              message: 'Phone number must be 10 number to 12 number',
              pattern: /^\d{10,12}$/,
            },
            {
              required: true,
              message: 'Please input phone number',
            },
          ]}
          initialValue={clickOne?.phoneNumber}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Full Name"
          name="fullName"
          required
          rules={[{ required: true, message: 'Please input Full Name ' }]}
          initialValue={clickOne?.fullName}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          required
          rules={[{ required: true, message: 'Please input Password ' }]}
          initialValue={clickOne?.password}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label="AvatarUrl" name="avatarUrl" getValueFromEvent={normFile}>
          <Upload
            name="image"
            // maxCount={1}
            className="UploadImage"
            listType="picture-card"
            fileList={fileList} // Hide default upload list
            beforeUpload={beforeUpload}
            customRequest={fakeUpload}
            onChange={onImageChange}
          >
            {fileList.length < 1 && '+ Upload'}
          </Upload>
        </Form.Item>
        {/* <Form.Item
          // label="Station"
          // required
          name={['Station']}
          rules={[{ required: true, message: 'Please input station' }]}
        >
          <Select
            showSearch
            placeholder="Select Station"
            // optionFilterProp="label"
            // onChange={onChange}
            // onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.name ?? '').toLowerCase().includes(input.toLowerCase())
            }
            fieldNames={{ value: 'id', label: 'name' }}
            options={listStation?.contends}
          />
        </Form.Item> */}
        {/* <Form.Item<Role> label="Order" name="order">
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item<Role> label="Status" name="status" required>
          <Radio.Group optionType="button" buttonStyle="solid">
            <Radio value={BasicStatus.ENABLE}> Enable </Radio>
            <Radio value={BasicStatus.DISABLE}> Disable </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item<Role> label="Desc" name="desc">
          <Input.TextArea />
        </Form.Item> */}
      </Form>
    </Modal>
  );
}
