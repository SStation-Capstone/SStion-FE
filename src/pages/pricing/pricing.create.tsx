import { Button, Form, Input, Modal, message } from 'antd';
import { useState } from 'react';

import { PricingPayload, useCreatePricing, useUpdatePricing } from '@/api/services/stationService';

import { Pricing } from '#/entity';

export type StaffCreateFormProps = {
  clickOne?: Pricing;
  onClose: () => void;
};
export function PricingCreate({ clickOne, onClose }: StaffCreateFormProps) {
  const [form] = Form.useForm();
  const { mutateAsync: createMutate } = useCreatePricing();
  const { mutateAsync: updateMutate } = useUpdatePricing();
  const [loading, setLoading] = useState<boolean>(false);
  const submitHandle = async () => {
    setLoading(true);
    const values = await form.validateFields();
    try {
      if (clickOne) {
        const updateData: PricingPayload = {
          ...clickOne,
          id: clickOne.id,
        };
        updateData.fromDate = values.fromDate;
        updateData.toDate = values.toDate;
        updateData.price = values.price;
        updateMutate(updateData);
        setLoading(false);
      } else {
        const createData: PricingPayload = {
          ...values,
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
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <Form.Item
            label="fromDate"
            name="fromDate"
            required
            rules={[
              { required: true, message: 'Please input fromDate' },
              { validator: validateNumber as any },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="toDate"
            name="toDate"
            required
            rules={[
              { required: true, message: 'Please input toDate' },
              { validator: validateNumber as any },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="price"
            name="price"
            required
            rules={[
              { required: true, message: 'Please input price' },
              { validator: validateNumber as any },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}
