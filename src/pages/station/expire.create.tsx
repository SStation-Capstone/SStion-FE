import { Button, Form, Modal, message, Select, Alert } from 'antd';
import { useState } from 'react';

import { useListShelf, useListZone } from '@/api/services/stationService';
import { CircleLoading } from '@/components/loading';
import { queryClient } from '@/http/tanstack/react-query';
import { getItem } from '@/utils/storage';

import { UserToken } from '#/entity';
import { StorageEnum } from '#/enum';

export type ExpireCreateFormProps = {
  zoneId: any;
  packageId: any;
  slotId: any;
  onClose: () => void;
};
export function ManageExpireCreate({ zoneId, packageId, slotId, onClose }: ExpireCreateFormProps) {
  const [form] = Form.useForm();
  const { data, isLoading } = useListZone(zoneId);
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState(false);
  const [zone, setZone] = useState<any>(false);
  const [shelf, setShelf] = useState<any>(false);
  const [rack, setRack] = useState<any>(false);
  const { data: dataShelf, isLoading: isLoadingShelf } = useListShelf(zone || 0);
  if (isLoading) return <CircleLoading />;
  const transformedData = (data: any) => {
    const value = data?.map((item: { id: any; name: any }) => ({
      value: item.id,
      label: `${item.name}`,
    }));
    return value;
  };
  // eslint-disable-next-line consistent-return
  const submitHandle = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const createData: any = {
        currentRackId: slotId,
        newRackId: values.newRackId,
      };
      // createMutate(createData);
      const accessToken = getItem(StorageEnum.Token) as unknown as UserToken;
      const response = await fetch(
        `${import.meta.env.VITE_APP_BASE_API}/packages/${packageId}/change-location`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(createData),
        },
      );
      if (response.status === 200) {
        message.success('Change location sucessfully!');
        await queryClient.invalidateQueries(['listShelf']);
        await queryClient.invalidateQueries(['listZoneStaff']);
        setLoading(false);
        return onClose();
      }
      // if (response.status === 404) {
      //   try {
      //     return setVisible(true);
      //   } catch (error) {
      //     setLoading(false);
      //   }
      // } else {
      //   message.error('Change location fail!');
      // }
      message.error('Change location fail!');
      setLoading(false);
      onClose();
    } catch (error) {
      setLoading(false);
    }
  };
  const handleAccept = async () => {
    try {
      const values = await form.validateFields();
      const createData: any = {
        currentSlotId: slotId,
        newSlotId: values.newRackId,
      };
      const accessToken = getItem(StorageEnum.Token) as unknown as UserToken;
      await fetch(`${import.meta.env.VITE_APP_BASE_API}/packages/${packageId}/change-location`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createData),
      });
      await queryClient.invalidateQueries(['listShelf']);
      message.success('Change location sucessfully!');
      setVisible(false);
      setLoading(false);
      onClose();
    } catch (error) {
      message.error(error.message || error);
      console.log(error);
      setLoading(false);
    }
  };
  const onChange = (value: string) => {
    setZone(value);
  };
  const onChangeShelf = (value: string) => {
    setShelf(value);
  };
  const onChangeRack = (value: string) => {
    setRack(value);
  };
  const onSearch = (_value: string) => {};
  const onSearchShelf = (_value: string) => {};
  const onSearchRack = (_value: string) => {};

  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  return (
    <Modal
      title="Change Location"
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
      <Form form={form} layout="vertical">
        <Form.Item
          label="New Slot by zone"
          name="zoneId"
          required
          rules={[{ required: true, message: 'Please input New Slot by zone' }]}
        >
          <Select
            showSearch
            placeholder="Select a zone"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={transformedData(data?.contends)}
          />
        </Form.Item>
        {dataShelf && (
          <Form.Item
            label="New Slot by shelf"
            name="shelfId"
            required
            rules={[{ required: true, message: 'Please input New Slot by shelf' }]}
          >
            <Select
              showSearch
              placeholder="Select a shelf"
              optionFilterProp="children"
              onChange={onChangeShelf}
              onSearch={onSearchShelf}
              filterOption={filterOption}
              options={transformedData(dataShelf?.contends)}
            />
          </Form.Item>
        )}
        {shelf && (
          <Form.Item
            label="New rack"
            name="newRackId"
            required
            rules={[{ required: true, message: 'Please input New Slot by rack' }]}
          >
            <Select
              showSearch
              placeholder="Select a rack"
              optionFilterProp="children"
              onChange={onChangeRack}
              onSearch={onSearchRack}
              filterOption={filterOption}
              options={transformedData(dataShelf?.contends.find((e) => e.id === shelf).rackSorts)}
            />
          </Form.Item>
        )}
        {/* {rack && (
          <Form.Item
            label="New Slot"
            name="newSlotId"
            required
            rules={[{ required: true, message: 'Please input New Slot' }]}
          >
            <Select
              showSearch
              placeholder="Select a slot"
              optionFilterProp="children"
              filterOption={filterOption}
              options={transformedData(
                dataShelf?.contends.find((e) => e.id === shelf).rackSorts.find((e) => e.id === rack)
                  .slotSorts,
              )}
            />
          </Form.Item>
        )} */}
      </Form>
      {visible && (
        <Alert
          message="The slot is almost full"
          showIcon
          description="Do you want to force?"
          type="info"
          action={
            <div className="absolute bottom-4 right-4 flex gap-2">
              <Button size="small" type="primary" onClick={handleAccept}>
                Accept
              </Button>
              <Button size="small" danger ghost onClick={onClose}>
                Decline
              </Button>
            </div>
          }
          closable
        />
      )}
    </Modal>
  );
}
