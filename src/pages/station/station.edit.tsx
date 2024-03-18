import { Form, Input, Modal, Select, Upload } from 'antd';
import { useState } from 'react';

// import { PERMISSION_LIST } from '@/_mock/assets';

import { useCreateStation, useUpdateStation } from '@/api/services/stationService';
import UploadButton from '@/components/upload-button';

import vietnamLocations from '../../api/data/data.json';

import { District, Location, Ward } from './type';

import { Station } from '#/entity';

export type StationEditFormProps = {
  clickOne?: Station;
  onClose: () => void;
  // onOk: VoidFunction;
  // onCancel: VoidFunction;
};
// const PERMISSIONS: Permission[] = PERMISSION_LIST;
export function ManageStationEdit({ clickOne, onClose }: StationEditFormProps) {
  const [form] = Form.useForm();

  // const flattenedPermissions = flattenTrees(formValue.permission);
  // const checkedKeys = flattenedPermissions.map((item) => item.id);
  // useEffect(() => {
  //   form.setFieldsValue({ ...formValue });
  // }, [formValue, form]);
  const { mutateAsync: updateMutate } = useUpdateStation();
  const { mutateAsync: createMutate } = useCreateStation();

  const [searchCity, setSearchCity] = useState<Location[] | null>(vietnamLocations);
  const [selectedCity, setSelectedCity] = useState<Location | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [selectedWard, setSelectedWard] = useState<Ward | null>(null);
  // const [vietnamLocations, setVietnamLocations] = useState(locations);
  const submitHandle = async () => {
    const values = await form.validateFields();
    console.log(values);
    if (clickOne) {
      updateMutate({ ...values, id: clickOne.id });
    } else {
      createMutate(values);
    }
    onClose();
  };
  const handleCityChange = (value: string) => {
    setSelectedCity(vietnamLocations.find((city: Location) => city.Name === value) || null);
    setSelectedDistrict(null);
    setSelectedWard(null);
  };

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(
      selectedCity?.Districts?.find((district) => district.Name === value) || null,
    );
    setSelectedWard(null);
  };

  const handleWardChange = (value: string) => {
    setSelectedWard(selectedDistrict?.Wards?.find((ward) => ward.Name === value) || null);
  };
  console.log('selectedDistrict', selectedDistrict?.Name);

  return (
    <Modal
      title={clickOne?.id ? 'Create Station' : 'Edit station'}
      open
      onOk={submitHandle}
      onCancel={() => onClose()}
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
          rules={[{ required: true, message: 'Please input station name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          required
          rules={[{ required: true, message: 'Please input station description' }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Contact Phone"
          name="contactPhone"
          required
          rules={[
            {
              message: 'Phone number must be 10 number',
              pattern: /^\d{10,12}$/,
            },
            {
              required: true,
              message: 'Please input phone number',
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* <Form.Item
          label="Address"
          name="address"
          required
          rules={[{ required: true, message: 'Please input station address' }]}
        >
          <Input />
        </Form.Item> */}
        <Form.Item
          label="Station Image"
          name={['stationImages', 'imageUrl']}
          // getValueFromEvent={normFile}
          style={{ width: '100%' }}
        >
          <Upload
            accept="image/*"
            maxCount={1}
            className="UploadImage"
            listType="picture-card"
            // onChange={handleChange}
            // defaultFileList={defaultFileList}
            // beforeUpload={(file) => {
            //   beforeUpload(file);
            // }}
            // showUploadList={true}
            // customRequest={fakeUpload}
            // onRemove={onRemove}
            // fileList={fileList}
          >
            <UploadButton />
          </Upload>
        </Form.Item>
        <Form.Item
          label="City"
          required
          name={['adress', 'city']}
          rules={[{ required: true, message: 'Please input station address' }]}
        >
          <Select
            showSearch
            // optionFilterProp="name"
            allowClear
            placeholder="Select City"
            value={selectedCity?.Name} // Access value property using optional chaining
            onChange={handleCityChange}
            onClear={() => {
              setSelectedDistrict(null);
              setSelectedWard(null);
              setSelectedCity(null);
              setSearchCity(vietnamLocations);
              form.setFieldValue(['adress', 'district'], undefined);
              form.setFieldValue(['adress', 'ward'], undefined);
              form.setFieldValue(['adress', 'detail'], undefined);
            }}
            onSearch={(value) => {
              const findCity = vietnamLocations.filter((city: Location) =>
                city.Name.toLowerCase().includes(value.toLowerCase()),
              );
              setSearchCity(findCity);
            }}
            options={searchCity?.map((d) => ({
              value: d.Name,
              label: d.Name,
            }))}
          />
        </Form.Item>
        {selectedCity && ( // Render district select only if city is selected
          <Form.Item label="District" name={['adress', 'district']}>
            <Select
              allowClear
              placeholder="Select district"
              value={selectedDistrict?.Name || undefined} // Optional chaining for selectedDistrict
              onChange={handleDistrictChange}
              disabled={!selectedCity} // Disable district select if no city is chosen
              onClear={() => {
                setSelectedWard(null);
                form.setFieldValue(['adress', 'ward'], undefined);
                form.setFieldValue(['adress', 'detail'], undefined);
              }}
            >
              {selectedCity.Districts?.map((district: District) => (
                <Select.Option key={district.Id} value={district.Name}>
                  {district.Name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}

        {selectedDistrict && ( // Render ward select only if district is selected
          <Form.Item label="Ward" name={['adress', 'ward']}>
            <Select
              optionFilterProp="name"
              allowClear
              placeholder="Select ward"
              value={selectedWard?.Name} // Optional chaining for selectedWard
              onChange={handleWardChange}
              disabled={!selectedDistrict} // Disable ward select if no district is chosen
              onClear={() => {
                setSelectedWard(null);
                form.setFieldValue(['adress', 'ward'], undefined);
                form.setFieldValue(['adress', 'detail'], undefined);
              }}
            >
              {selectedDistrict.Wards?.map((ward: Ward) => (
                <Select.Option key={ward.Id} value={ward.Name}>
                  {ward.Name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}
        {selectedCity &&
          selectedDistrict &&
          selectedWard && ( // Render ward select only if district is selected
            <Form.Item
              label="Detail"
              name={['adress', 'detail']}
              required
              rules={[
                {
                  required: true,
                  message: 'Please input detail adress (Street name, Building, House no)',
                },
              ]}
            >
              <Input placeholder="Street name, Building, House no" />
            </Form.Item>
          )}
      </Form>
    </Modal>
  );
}
