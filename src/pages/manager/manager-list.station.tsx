import { Form, Modal, Select } from 'antd';

// import { PERMISSION_LIST } from '@/_mock/assets';

import { useCreateSManager } from '@/api/services/managerService';
import { useListStation } from '@/api/services/stationService';

import { Station } from '#/entity';

export type ManagerListStationFormProps = {
  clickOne?: Station;
  onClose: () => void;
  // onOk: VoidFunction;
  // onCancel: VoidFunction;
};
// const PERMISSIONS: Permission[] = PERMISSION_LIST;
export function ManagerListStation({ clickOne, onClose }: ManagerListStationFormProps) {
  const [form] = Form.useForm();

  const { mutateAsync: createMutate } = useCreateSManager();
  const { data: listStation } = useListStation();
  const submitHandle = async () => {
    const values = await form.validateFields();
    console.log(values);
    createMutate(values);
    onClose();
  };

  // const flattenedPermissions  = flattenTrees(formValue.permission);
  // const checkedKeys = flattenedPermissions.map((item) => item.id);
  // useEffect(() => {
  //   form.setFieldsValue({ ...formValue });
  // }, [formValue, form]);

  return (
    <Modal
      title={clickOne ? 'Add to Station' : 'Add to Station'}
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
