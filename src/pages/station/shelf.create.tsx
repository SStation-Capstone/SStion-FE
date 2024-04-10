import { Button, Form, Input, Modal, message } from 'antd';
import { useState } from 'react';

import { ShelfPayload, useCreateShelf } from '@/api/services/stationService';

import { Zone } from '#/entity';

export type ZoneCreateFormProps = {
  clickOne?: Zone;
  onClose: () => void;
};
export function ManageShelfCreate({ clickOne, onClose }: ZoneCreateFormProps) {
  const [form] = Form.useForm();
  const { mutateAsync: createMutate } = useCreateShelf();
  const [loading, setLoading] = useState<boolean>(false);

  const submitHandle = async () => {
    setLoading(true);
    const values = await form.validateFields();
    try {
      const createData: ShelfPayload = {
        name: values.name,
        description: values.description,
        // index: values.index,
        // width: values.width,
        // height: values.height,
        // length: values.length,
        zoneId: clickOne?.id,
        numberOfRacks: values.numberOfRacks,
        numberOfSlotsPerRack: values.numberOfSlotsPerRack,
        slot: { width: values.widthSlot, height: values.heightSlot, length: values.lengthSlot },
      };
      // createData.zoneId = clickOne.id;
      createMutate(createData);
      setLoading(false);
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
      title="Create shelf"
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
          rules={[{ required: true, message: 'Please input shelf name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          required
          rules={[{ required: true, message: 'Please input shelf description' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {/* <Form.Item
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
          </Form.Item> */}
          <Form.Item
            label="Width Slot"
            name="widthSlot"
            required
            rules={[
              { required: true, message: 'Please input widthSlot' },
              { validator: validateNumber as any },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Height Slot"
            name="heightSlot"
            required
            rules={[
              { required: true, message: 'Please input heightSlot' },
              { validator: validateNumber as any },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Length Slot"
            name="lengthSlot"
            required
            rules={[
              { required: true, message: 'Please input lengthSlot' },
              { validator: validateNumber as any },
            ]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item
            label="Index"
            name="index"
            required
            rules={[
              { required: true, message: 'Please input index' },
              { validator: validateNumber as any },
            ]}
          >
            <Input />
          </Form.Item> */}
          <Form.Item
            label="Number Racks"
            name="numberOfRacks"
            required
            rules={[
              { required: true, message: 'Please input numberOfRacks' },
              { validator: validateNumber as any },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="number Slots Rack"
            name="numberOfSlotsPerRack"
            required
            rules={[
              { required: true, message: 'Please input numberOfSlotsPerRack' },
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
