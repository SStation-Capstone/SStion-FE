import { Form, Modal, Input } from 'antd';

// import { PERMISSION_LIST } from '@/_mock/assets';

import { useCreateSManager } from '@/api/services/managerService';

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

  const submitHandle = async () => {
    const values = await form.validateFields();
    console.log(values);
    createMutate(values);
    onClose();
  };

  // const flattenedPermissions = flattenTrees(formValue.permission);
  // const checkedKeys = flattenedPermissions.map((item) => item.id);
  // useEffect(() => {
  //   form.setFieldsValue({ ...formValue });
  // }, [formValue, form]);

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
          label="User Name"
          name="User Name"
          required
          rules={[{ required: true, message: 'Please input User Name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Full Name"
          name="Full Name"
          required
          rules={[{ required: true, message: 'Please input Full Name' }]}
        >
          <Input />
        </Form.Item>

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
