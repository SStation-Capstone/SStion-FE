import { Button, Col, Form, Input, Modal, Row, message } from 'antd';
import { useState } from 'react';

import {
  PricingPayload,
  useCreatePricingDefault,
  useUpdatePricingDefault,
} from '@/api/services/stationService';

export type StaffCreateFormProps = {
  clickOne?: PricingPayload;
  onClose: () => void;
};
export function PricingDefaultCreate({ clickOne, onClose }: StaffCreateFormProps) {
  const [form] = Form.useForm();
  const { mutateAsync: createMutate } = useCreatePricingDefault();
  const { mutateAsync: updateMutate } = useUpdatePricingDefault();
  const [loading, setLoading] = useState<boolean>(false);
  const submitHandle = async () => {
    const values = await form.validateFields();
    console.log('values prcing', values);
    setLoading(true);
    try {
      if (clickOne) {
        const updateData: PricingPayload = {
          ...clickOne,
          id: clickOne.id,
          price: clickOne.price,
        };
        updateData.startTime = values.startTime;
        updateData.endTime = values.endTime;
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
      console.log('erorr prcing', error);
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
  const validateNumberThan = (_: any, value: any, callback: (error?: Error) => void) => {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(value)) {
      callback(new Error('Please input a number'));
    }
    // eslint-disable-next-line no-restricted-globals
    if (parseInt(value, 10) < 500) {
      callback(new Error('Please input a number than 500'));
    } else {
      callback();
    }
  };
  return (
    <Modal
      title={clickOne?.id ? 'Edit default service fee' : 'Create default service fee'}
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
        <Row justify="space-between">
          <Col span={7}>
            <Form.Item
              label="From (day)"
              name="startTime"
              required
              rules={[
                { required: true, message: 'Please input start time' },
                { validator: validateNumber as any },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              label="To (day)"
              name="endTime"
              required
              rules={[
                { required: true, message: 'Please input end time' },
                { validator: validateNumber as any },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              label="Price (đ)"
              name="price"
              required
              rules={[
                { required: true, message: 'Please input price' },
                { validator: validateNumberThan as any },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
