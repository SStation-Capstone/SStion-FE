import { Button, Form, Input, Modal, message } from 'antd';
import { useState } from 'react';

import { useCreateRack, useUpdateRack } from '@/api/services/stationService';

export type ZoneCreateFormProps = {
  clickOne?: any;
  onClose: () => void;
};
export function ManageRackCreate({ clickOne, onClose }: ZoneCreateFormProps) {
  const [form] = Form.useForm();
  const { mutateAsync: createMutate } = useCreateRack();
  const { mutateAsync: updateMutate } = useUpdateRack();
  const [loading, setLoading] = useState<boolean>(false);

  const submitHandle = async () => {
    setLoading(true);
    const values = await form.validateFields();
    try {
      if (clickOne?.name) {
        const updateData: any = {
          ...clickOne,
          id: clickOne.id,
        };
        updateData.name = values.name;
        updateData.description = values.description;
        updateMutate(updateData);
        setLoading(false);
      } else {
        const createData: any = { ...values };
        createData.shelfId = clickOne;
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

  return (
    <Modal
      title={clickOne?.name ? 'Edit Rack' : 'Create Rack'}
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
        initialValues={clickOne?.name ? clickOne : null}
        form={form}
        // labelCol={{ span: 4 }}
        // wrapperCol={{ span: 18 }}
        layout="vertical"
      >
        <Form.Item
          label="Name"
          name="name"
          required
          rules={[{ required: true, message: 'Please input zone name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          required
          rules={[{ required: true, message: 'Please input zone description' }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}
