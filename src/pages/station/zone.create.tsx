import { Button, Form, Input, Modal, message } from 'antd';
import { useState } from 'react';

import { ZonePayload, useCreateZone, useUpdateZone } from '@/api/services/stationService';

import { Zone } from '#/entity';

export type ZoneCreateFormProps = {
  stationId?: any;
  clickOne?: Zone;
  onClose: () => void;
};
export function ManageZoneCreate({ stationId, clickOne, onClose }: ZoneCreateFormProps) {
  const [form] = Form.useForm();
  const { mutateAsync: createMutate } = useCreateZone(stationId);
  const { mutateAsync: updateMutate } = useUpdateZone(stationId);
  const [loading, setLoading] = useState<boolean>(false);

  const submitHandle = async () => {
    setLoading(true);
    const values = await form.validateFields();
    try {
      if (clickOne) {
        const updateData: ZonePayload = {
          ...clickOne,
          id: clickOne.id,
        };
        updateData.name = values.name;
        updateData.description = values.description;
        updateMutate(updateData);
        setLoading(false);
      } else {
        const createData: ZonePayload = { ...values };
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
      title={clickOne?.id ? 'Edit Zone' : 'Create Zone'}
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
