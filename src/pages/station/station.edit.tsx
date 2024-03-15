import { Form, Input, Modal } from 'antd';

// import { PERMISSION_LIST } from '@/_mock/assets';

import { useCreateStation, useUpdateStation } from '@/api/services/stationService';

import { Station } from '#/entity';

export type StationEditFormProps = {
  clickOne?: Station;
  onClose: () => void;
  // onOk: VoidFunction;
  // onCancel: VoidFunction;
};
// const PERMISSIONS: Permission[] = PERMISSION_LIST;
export function ManageStationEdit({ clickOne, onClose }: StationEditFormProps) {
  const [form] = Form.useForm();

  // const flattenedPermissions = flattenTrees(formValue.permission);
  // const checkedKeys = flattenedPermissions.map((item) => item.id);
  // useEffect(() => {
  //   form.setFieldsValue({ ...formValue });
  // }, [formValue, form]);
  const { mutateAsync: updateMutate } = useUpdateStation();
  const { mutateAsync: createMutate } = useCreateStation();
  console.log('click one', clickOne);
  const submitHandle = async () => {
    const values = await form.validateFields();
    if (clickOne) {
      updateMutate({ ...values, id: clickOne.id });
    } else {
      createMutate(values);
    }
    onClose();
  };
  return (
    <Modal
      title={clickOne?.id ? 'Create Station' : 'Edit station'}
      open
      onOk={submitHandle}
      onCancel={() => onClose()}
    >
      <Form
        initialValues={clickOne}
        form={form}
        // labelCol={{ span: 4 }}
        // wrapperCol={{ span: 18 }}
        layout="vertical"
      >
        <Form.Item
          label="Name"
          name="name"
          required
          rules={[{ required: true, message: 'Please input station name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          required
          rules={[{ required: true, message: 'Please input station description' }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Contact Phone"
          name="contactPhone"
          required
          rules={[
            {
              message: 'Phone number must be 10 number',
              pattern: /^[0-9]+$/,
            },
            {
              required: true,
              message: 'Please input phone number',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          required
          rules={[{ required: true, message: 'Please input station address' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
