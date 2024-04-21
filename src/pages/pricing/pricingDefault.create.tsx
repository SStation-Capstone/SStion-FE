import { Button, Col, Form, Input, Modal, Row, message } from 'antd';
import { useState } from 'react';

import {
  PricingPayload,
  useCreatePricingDefault,
  useUpdatePricingDefault,
} from '@/api/services/stationService';

import { Pricing } from '#/entity';

export type StaffCreateFormProps = {
  clickOne?: Pricing;
  onClose: () => void;
};
export function PricingDefaultCreate({ clickOne, onClose }: StaffCreateFormProps) {
  const [form] = Form.useForm();
  const { mutateAsync: createMutate } = useCreatePricingDefault();
  const { mutateAsync: updateMutate } = useUpdatePricingDefault();
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
        updateData.startTime = values.startTime;
        updateData.endTime = values.endTime;
        updateData.pricePerUnit = values.pricePerUnit;
        updateData.unitDuration = values.unitDuration;
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
      title={clickOne?.id ? 'Edit default pricing' : 'Create default pricing'}
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
          <Col span={11}>
            <Form.Item
              label="Start Time"
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
          <Col span={11}>
            <Form.Item
              label="End Time"
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
        </Row>
        <Row justify="space-between">
          <Col span={11}>
            <Form.Item
              label="Price Per Unit"
              name="pricePerUnit"
              required
              rules={[
                { required: true, message: 'Please input price per unit' },
                { validator: validateNumber as any },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="Unit Duration"
              name="unitDuration"
              required
              rules={[
                { required: true, message: 'Please input unit duration' },
                { validator: validateNumber as any },
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
