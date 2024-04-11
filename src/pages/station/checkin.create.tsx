import {
  Button,
  Form,
  Input,
  Upload,
  UploadFile,
  UploadProps,
  Modal,
  message,
  Select,
  Alert,
} from 'antd';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  CheckInPayload,
  // useCreateCheckIn,
  useCreateCheckInForce,
} from '@/api/services/stationService';
import { queryClient } from '@/http/tanstack/react-query';
import { beforeUpload, fakeUpload, normFile, uploadFileToFirebase } from '@/utils/file';
import { getItem } from '@/utils/storage';

import { UserToken } from '#/entity';
import { StorageEnum } from '#/enum';

export type CheckInCreateFormProps = {
  zoneId?: any;
  slotId?: any;
  onClose: () => void;
  onCloseCheckIn: () => void;
};
export function ManageCheckInCreate({
  zoneId,
  slotId,
  onClose,
  onCloseCheckIn,
}: CheckInCreateFormProps) {
  const [form] = Form.useForm();
  const { id } = useParams();
  // const { mutateAsync: createMutate } = useCreateCheckIn();
  const { mutateAsync: createForceMutate } = useCreateCheckInForce();
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [dataForce, setDataForce] = useState<any>({});
  const [senderInfo, setSenderInfo] = useState<any>([]);
  const [receiverInfo, setReceiverInfo] = useState<any>([]);
  const getUserInfoByPhoneNumber = async (phoneNumber: string, setState: Function) => {
    try {
      const accessToken = getItem(StorageEnum.Token) as unknown as UserToken;
      const response = await fetch(
        `${import.meta.env.VITE_APP_BASE_API}/staffs/users?Search=${phoneNumber}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
          },
        },
      );
      const data = await response.json();
      const transformedData = data.contends.map(
        (item: { id: any; phoneNumber: any; fullName: any }) => ({
          value: item.id,
          label: `${item.phoneNumber} - ${item.fullName}`,
        }),
      );
      setState(transformedData);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  // eslint-disable-next-line consistent-return
  const submitHandle = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const createData: CheckInPayload = {
        name: values.name,
        description: values.description,
        priceCod: values.priceCod,
        isCod: values.priceCod > 0,
        weight: values.weight,
        height: values.height,
        width: values.width,
        length: values.length,
        stationId: id as unknown as number,
        zoneId: zoneId as unknown as number,
        shelfId: null,
        rackId: null,
        slotId: slotId ? (slotId as unknown as number) : null,
        senderId: values.senderId,
        receiverId: values.receiverId,
        packageImages: [],
      };
      if (values.avatarUrl && values.avatarUrl.length > 0) {
        const imageUrls: { imageUrl: string }[] = [];
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < values.avatarUrl.length; i++) {
          // eslint-disable-next-line no-await-in-loop
          const updateImageUrl: string = await uploadFileToFirebase(values.avatarUrl[i]);
          imageUrls.push({ imageUrl: updateImageUrl });
        }
        createData.packageImages = imageUrls;
      }
      setDataForce(createData);
      // createMutate(createData);
      const accessToken = getItem(StorageEnum.Token) as unknown as UserToken;
      const response = await fetch(`${import.meta.env.VITE_APP_BASE_API}/packages`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createData),
      });
      if (response.status === 200) {
        message.success('Create check in sucessfully');
        await queryClient.invalidateQueries(['listShelf']);
        setLoading(false);
        onClose();
        return onCloseCheckIn();
      }
      if (response.status === 404) {
        if (slotId) {
          try {
            return setVisible(true);
          } catch (error) {
            setLoading(false);
          }
        } else {
          message.error('Please check in the slots');
        }
      } else {
        message.error('Please check in the slots');
      }
      setLoading(false);
      onClose();
      onCloseCheckIn();
    } catch (error) {
      setLoading(false);
    }
  };
  const handleAccept = async () => {
    try {
      // eslint-disable-next-line unused-imports/no-unused-vars-ts, @typescript-eslint/no-unused-vars
      const { stationId, zoneId, shelfId, rackId, ...rest } = dataForce;
      createForceMutate(rest);
      setVisible(false);
      setLoading(false);
      onClose();
      onCloseCheckIn();
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
  const validateNumberThan = (_: any, value: any, callback: (error?: Error) => void) => {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(value)) {
      callback(new Error('Please input a number'));
    }
    // eslint-disable-next-line no-restricted-globals
    if (parseInt(value, 10) < 5) {
      callback(new Error('Please input a number than 5'));
    } else {
      callback();
    }
  };
  const onImageChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onChange = (_value: string) => {};

  const onSearch = (value: string, setState: Function) => {
    getUserInfoByPhoneNumber(value, setState);
  };

  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  return (
    <Modal
      title="Create Check In"
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
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Form.Item
            label="Name"
            name="name"
            required
            rules={[{ required: true, message: 'Please input shelf name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Price" name="priceCod" rules={[{ validator: validateNumber as any }]}>
            <Input />
          </Form.Item>
        </div>
        <Form.Item
          label="Description"
          name="description"
          required
          rules={[{ required: true, message: 'Please input shelf description' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
          <Form.Item
            label="Weight"
            name="weight"
            required
            rules={[
              { required: true, message: 'Please weight width' },
              { validator: validateNumberThan as any },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Width"
            name="width"
            required
            rules={[
              { required: true, message: 'Please input width' },
              { validator: validateNumberThan as any },
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
              { validator: validateNumberThan as any },
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
              { validator: validateNumberThan as any },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Form.Item
            label="Phone Sender"
            name="senderId"
            required
            rules={[{ required: true, message: 'Please input senderId' }]}
          >
            <Select
              showSearch
              placeholder="Select a senderId"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={(value) => onSearch(value, setSenderInfo)}
              filterOption={filterOption}
              options={senderInfo}
            />
          </Form.Item>
          <Form.Item
            label="Phone Receiver"
            name="receiverId"
            required
            rules={[{ required: true, message: 'Please input receiverId' }]}
          >
            <Select
              showSearch
              placeholder="Select a receiverId"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={(value) => onSearch(value, setReceiverInfo)}
              filterOption={filterOption}
              options={receiverInfo}
            />
          </Form.Item>
        </div>
        <Form.Item label="Package Images" name="avatarUrl" getValueFromEvent={normFile}>
          <Upload
            name="image"
            maxCount={4}
            className="UploadImage"
            listType="picture-card"
            fileList={fileList}
            beforeUpload={beforeUpload}
            customRequest={fakeUpload}
            onChange={onImageChange}
          >
            {fileList.length < 4 && '+ Upload'}
          </Upload>
        </Form.Item>
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
