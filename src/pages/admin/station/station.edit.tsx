import { Button, Form, Input, Modal, Select, Upload, UploadFile, UploadProps, message } from 'antd';
import L from 'leaflet';
import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import { OpenStreetMapProvider } from 'react-leaflet-geosearch';
import { v4 as uuidv4 } from 'uuid';
// import { PERMISSION_LIST } from '@/_mock/assets';
// import SearchControl from "./searchControl";
// eslint-disable-next-line import/order
import 'leaflet/dist/leaflet.css';
import { beforeUpload, fakeUpload, normFile, uploadFileToFirebase } from '@/utils/file';

import useLocation from '../../../theme/hooks/useLocation';

import './map.css';

// eslint-disable-next-line import/order
import vietnamLocations from '@/api/data/data.json';
// eslint-disable-next-line import/order
import {
  StationPayload,
  useCreateStation,
  useUpdateStation,
} from '@/api/services/admin/stationService';

import { District, Location, Ward } from './type';

import { Station } from '#/entity';

const OSM_API_URL = 'https://nominatim.openstreetmap.org/search';
const osm = {
  maptiler: {
    url: 'https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=rI9ODoaXGg1gJcIgQzh5',
    attribution: 'MapTiler',
  },
};

const makerIcon = new L.Icon({
  iconUrl: 'https://img.icons8.com/?size=256&id=13800&format=png',
  iconSize: [40, 40],
});

export type StationEditFormProps = {
  clickOne?: Station;
  managerId?: any;
  onClose: () => void;
  // onOk: VoidFunction;
  // onCancel: VoidFunction;
};
// const PERMISSIONS: Permission[] = PERMISSION_LIST;
export function ManageStationEdit({ clickOne, managerId, onClose }: StationEditFormProps) {
  const [form] = Form.useForm();
  // const flattenedPermissions = flattenTrees(formValue.permission);
  // const checkedKeys = flattenedPermissions.map((item) => item.id);
  // useEffect(() => {
  //   form.setFieldsValue({ ...formValue });
  // }, [formValue, form]);
  const { mutateAsync: updateMutate } = useUpdateStation();
  const { mutateAsync: createMutate } = useCreateStation();

  const [searchCity, setSearchCity] = useState<Location[] | null>(vietnamLocations as Location[]);
  const [selectedCity, setSelectedCity] = useState<Location | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [selectedWard, setSelectedWard] = useState<Ward | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState('');
  const [listAddress, setListAddress] = useState([]);
  const [check, setCheck] = useState([]);
  const prov = OpenStreetMapProvider();
  // const [center, setCenter] = useState([13, 13]);
  const location = useLocation();
  const mapRef = useRef();
  // const dispatch = useDispatch();
  // const allVisitPlaces = car.visitDays.map((day) => day.visitPlaces).flat();

  const ZOOM_LEVEL = 9;
  useEffect(() => {
    if (clickOne?.stationImages)
      setFileList([
        {
          uid: uuidv4(),
          name: 'image',
          url: clickOne?.stationImages[0]?.imageUrl,
        },
      ]);
    if (clickOne?.address) {
      form.setFieldValue(['address', 'city'], clickOne.address.split(',')[3].trim());
      const tempSelelectCity = vietnamLocations.find(
        (city: Location) => city.Name === clickOne.address.split(',')[3].trim(),
      );
      setSelectedCity(
        vietnamLocations.find(
          (city: Location) => city.Name === clickOne.address.split(',')[3].trim(),
        ),
      );
      form.setFieldValue(['address', 'district'], clickOne.address.split(',')[2].trim());
      setSelectedDistrict(
        tempSelelectCity?.Districts.find(
          (district: District) => district.Name === clickOne.address.split(',')[2].trim(),
        ),
      );
      const tempSelectDistrict = tempSelelectCity?.Districts.find(
        (district: District) => district.Name === clickOne.address.split(',')[2].trim(),
      );
      form.setFieldValue(['address', 'ward'], clickOne.address.split(',')[1].trim());
      setSelectedWard(
        tempSelectDistrict?.Wards.find(
          (ward: District) => ward.Name === clickOne.address.split(',')[1].trim(),
        ),
      );

      form.setFieldValue(['address', 'detail'], clickOne.address.split(',')[0].trim());
    }
    return () => {
      setFileList([]);
    };
  }, [clickOne, form]);
  useEffect(
    () => {
      if (location.loaded && check) {
        mapRef.current.flyTo([check?.latitude || 50, check?.longitude || 50], ZOOM_LEVEL, {
          animation: true,
        });
      }
    },
    // eslint-disable-next-line
    [check],
  );

  const showMyLocation = () => {
    console.log(location);

    if (location.loaded) {
      if ((check?.latitude, check?.longitude)) {
        mapRef.current.flyTo([check?.latitude, check?.longitude], ZOOM_LEVEL, {
          animation: true,
        });
      } else if (!location.error) {
        mapRef.current.flyTo([location.coordinates.lat, location.coordinates.lng], ZOOM_LEVEL, {
          animation: true,
        });
      }
    }
  };

  useEffect(
    () => {
      showMyLocation();
    },
    // eslint-disable-next-line
    [location],
  );
  // const [vietnamLocations, setVietnamLocations] = useState(locations);
  const submitHandle = async () => {
    const values = await form.validateFields();
    setLoading(true);
    try {
      if (clickOne) {
        const updateData: StationPayload = {
          ...clickOne,
          id: clickOne.id,
          address: `${values?.address.detail}, ${values?.address.ward}, ${values?.address.district}, ${values.address.city}`,
        };
        if (values.stationImages.imageUrl) {
          const updateImageUrl: string = await uploadFileToFirebase(
            values?.stationImages?.imageUrl[0],
          );
          updateData.stationImages = [{ imageUrl: updateImageUrl }];
        }
        updateData.name = values.name;
        updateData.description = values.description;
        updateData.contactPhone = values.contactPhone;
        updateMutate(updateData);
        setLoading(false);
      } else {
        const imageUrl: string = await uploadFileToFirebase(values?.stationImages?.imageUrl[0]);
        const createData: StationPayload = {
          ...values,
          ...(managerId && { managerId }),
          stationImages: [{ imageUrl }],
          address: `${values?.address.detail}, ${values?.address.ward}, ${values?.address.district}, ${values.address.city}`,
        };
        createMutate(createData);
      }
      onClose();
    } catch (error) {
      message.error(error.message || error);
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
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

  const onImageChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const handleSearch = async (keyword) => {
    const params = {
      q: keyword,
      format: 'json',
      addressdetails: 1,
    };

    const paramsString = new URLSearchParams(params).toString();
    console.log(paramsString);
    const options = {
      method: 'GET',
      redirect: 'follow',
    };

    const url = `${OSM_API_URL}?${paramsString}`;
    fetch(url, options)
      .then((res) => res.text())
      .then((result) => {
        console.log(JSON.parse(result));
        setListAddress(JSON.parse(result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onSelectAddress = (obj) => {
    const address = {
      address: obj.display_name,
      longitude: obj.lon,
      latitude: obj.lat,
    };
    setCheck(address);
    // onChangeStreet(obj.display_name);
    // onChangeLongitude(parseInt(obj.lon));
    // onChangeLatitude(parseInt(obj.lat));
    // setSearchText("");
    setListAddress([]);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchText);
    }, 600);

    return () => clearTimeout(timer);
  }, [searchText]);
  return (
    <Modal
      title={clickOne?.id ? 'Edit Station' : 'Create station'}
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
          getValueFromEvent={normFile}
          // style={{ width: '100%' }}
        >
          <Upload
            name="image"
            listType="picture-card"
            className="image-uploader"
            fileList={fileList} // Hide default upload list
            beforeUpload={beforeUpload}
            customRequest={fakeUpload}
            onChange={onImageChange}
          >
            {fileList.length < 1 && '+ Upload'}
          </Upload>
        </Form.Item>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <Form.Item
            label="City"
            required
            name={['address', 'city']}
            rules={[{ required: true, message: 'Please input station address' }]}
            initialValue={selectedCity ?? null}
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
          {
            // Render district select only if city is selected
            <Form.Item label="District" name={['address', 'district']}>
              <Select
                allowClear
                placeholder="Select district"
                value={selectedDistrict?.Name || undefined} // Optional chaining for selectedDistrict
                onChange={handleDistrictChange}
                disabled={!selectedCity} // Disable district select if no city is chosen
                onClear={() => {
                  setSelectedWard(null);
                  form.setFieldValue(['address', 'ward'], undefined);
                }}
              >
                {selectedCity?.Districts?.map((district: District) => (
                  <Select.Option key={district.Id} value={district.Name}>
                    {district.Name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          }

          {
            // Render ward select only if district is selected
            <Form.Item label="Ward" name={['address', 'ward']}>
              <Select
                optionFilterProp="name"
                allowClear
                placeholder="Select ward"
                value={selectedWard?.Name} // Optional chaining for selectedWard
                onChange={handleWardChange}
                disabled={!selectedDistrict} // Disable ward select if no district is chosen
                onClear={() => {
                  setSelectedWard(null);
                  form.setFieldValue(['address', 'ward'], undefined);
                }}
              >
                {selectedDistrict?.Wards?.map((ward: Ward) => (
                  <Select.Option key={ward.Id} value={ward.Name}>
                    {ward.Name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          }
        </div>
        {
          // Render ward select only if district is selected
          <Form.Item
            label="Detail"
            name={['address', 'detail']}
            required
            // rules={[
            //   {
            //     required: true,
            //     message: 'Please input detail address (Street name, Building, House no)',
            //   },
            // ]}
          >
            <Input
              placeholder="Street name, Building, House no"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <div className="Autocomplete">
              {listAddress.map((item) => (
                <div
                  className="LocationItem"
                  key={item?.osm_id}
                  onClick={() => onSelectAddress(item)}
                >
                  <div className="LocationAddress">{item?.display_name}</div>
                </div>
              ))}
            </div>
          </Form.Item>
        }
        {/* <div className="here-autocomplete">
          <input
            placeholder="Nhập tên đường / tòa nhà"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div> */}
        <div className="container-map">
          <MapContainer center={[50, 50]} zoom={ZOOM_LEVEL} scrollWheelZoom ref={mapRef}>
            <TileLayer attribution={osm.maptiler.attribution} url={osm.maptiler.url} />
            {location.loaded && check?.longitude !== 0 && (
              <Marker icon={makerIcon} position={[check?.latitude || 50, check?.longitude || 50]}>
                <Popup>ward</Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      </Form>
    </Modal>
  );
}
