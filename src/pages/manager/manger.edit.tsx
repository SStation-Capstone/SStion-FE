import { Form, Modal, Input, Upload } from 'antd';

// import { PERMISSION_LIST } from '@/_mock/assets';

import { useState } from 'react';

import { useCreateSManager, useUpdateManager } from '@/api/services/managerService';
import { useListStation } from '@/api/services/stationService';
import UploadButton from '@/components/upload-button';

import { Manager } from '#/entity';

export type ManagerEditFormProps = {
  clickOne?: Manager;
  onClose: () => void;
  // onOk: VoidFunction;
  // onCancel: VoidFunction;
};
// const PERMISSIONS: Permission[] = PERMISSION_LIST;
export function ManagerEdit({ clickOne, onClose }: ManagerEditFormProps) {
  const [form] = Form.useForm();

  const { mutateAsync: createMutate } = useCreateSManager();
  const { mutateAsync: updateMutate } = useUpdateManager();
  const { data: listStation } = useListStation();
  // const submitHandle = async () => {
  //   const values = await form.validateFields();
  //   console.log(values);
  //   createMutate(values);
  //   onClose();
  // };
  const submitHandle = async () => {
    const values = await form.validateFields();
    if (clickOne?.id) {
      updateMutate(values);
    } else {
      createMutate(values);
    }
    onClose();
  };

  // const flattenedPermissions = flattenTrees(formValue.permission);
  // const checkedKeys = flattenedPermissions.map((item) => item.id);
  // useEffect(() => {
  //   form.setFieldsValue({ ...formValue });
  // }, [formValue, form]);
  const [treeValue, setTreeValue] = useState<string>();
  const onChange = (newValue: string) => {
    setTreeValue(newValue);
  };

  return (
    <Modal
      title={clickOne ? 'Edit Manager' : 'Create Manager'}
      open
      onOk={submitHandle}
      onCancel={() => onClose()}
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
          name="Email"
          required
          rules={[{ required: true, message: 'Please input email' }]}
          initialValue={clickOne?.email}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="PhoneNumber"
          required
          rules={[{ required: true, message: 'Please input Phone Number' }]}
          initialValue={clickOne?.phoneNumber}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Full Name"
          name="FullName"
          required
          rules={[{ required: true, message: 'Please input Full Name ' }]}
          initialValue={clickOne?.fullName}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="Password"
          required
          rules={[{ required: true, message: 'Please input Password ' }]}
          initialValue={clickOne?.password}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Station Image"
          name={['stationImages', 'imageUrl']}
          // getValueFromEvent={normFile}
          style={{ width: '100%' }}
          initialValue={clickOne?.avatarUrl}
        >
          <Upload
            accept="image/*"
            maxCount={1}
            className="UploadImage"
            listType="picture-card"
            // onChange={handleChange}
            // defaultFileList={defaultFileList}
            // beforeUpload={(file) => {
            //   beforeUpload(file);
            // }}
            // showUploadList={true}
            // customRequest={fakeUpload}
            // onRemove={onRemove}
            // fileList={fileList}
          >
            <UploadButton />
          </Upload>
        </Form.Item>
        {/* <Form.Item
          label="Station"
          required
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
