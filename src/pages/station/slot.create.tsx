import { Button, Checkbox, Form, Input, Modal, message } from 'antd';
import { useState } from 'react';

import { useCreateSlot, useUpdateSlot } from '@/api/services/stationService';

export type ZoneCreateFormProps = {
  clickOne?: any;
  onClose: () => void;
};
export function ManageSlotCreate({ clickOne, onClose }: ZoneCreateFormProps) {
  const [form] = Form.useForm();
  const { mutateAsync: createMutate } = useCreateSlot();
  const { mutateAsync: updateMutate } = useUpdateSlot();
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
        updateData.width = values.width;
        updateData.height = values.height;
        updateData.length = values.length;
        updateData.isActive = values.isActive;
        updateMutate(updateData);
        setLoading(false);
      } else {
        const createData: any = { ...values };
        createData.rackId = clickOne;
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
  return (
    <Modal
      title={clickOne?.name ? 'Edit Slot' : 'Create Slot'}
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
          rules={[{ required: true, message: 'Please input name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          required
          rules={[{ required: true, message: 'Please input description' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
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
          <Form.Item label="is Active" name="isActive" valuePropName="checked">
            <Checkbox />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}
