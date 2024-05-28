import { Form, Modal, Select } from 'antd';

import { useChangeManager } from '@/api/services/admin/managerService';
import { useListManager } from '@/api/services/managerService';

import { Station } from '#/entity';

export type ManagerListStationFormProps = {
  clickOne?: Station;
  onClose: () => void;
};
export function ManagerListStation({ clickOne, onClose }: ManagerListStationFormProps) {
  const [form] = Form.useForm();

  const { mutateAsync: createMutate } = useChangeManager();
  const { data: listManager } = useListManager();
  const submitHandle = async () => {
    const values = await form.validateFields();
    const createData: any = {
      id: clickOne.id.toString(),
      manager: values.manager,
    };
    createMutate(createData);
    onClose();
  };

  return (
    <Modal title="Change manager" open onOk={submitHandle} onCancel={() => onClose()}>
      <Form
        initialValues={clickOne}
        form={form}
        // labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        layout="vertical"
      >
        <Form.Item
          label="Manager"
          required
          name="manager"
          rules={[{ required: true, message: 'Please select manager' }]}
        >
          <Select
            showSearch
            placeholder="Select Manager"
            // optionFilterProp="label"
            // onChange={onChange}
            // onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.fullName ?? '').toLowerCase().includes(input.toLowerCase())
            }
            fieldNames={{ value: 'id', label: 'fullName' }}
            options={listManager?.contends}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
