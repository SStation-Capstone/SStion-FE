import { Popconfirm, Progress, Tabs, Tooltip } from 'antd';
import { useState } from 'react';

import {
  useDeleteShelf,
  useDeleteRack,
  useDeleteSlot,
  useCreateRack,
  useListShelfStaff,
} from '@/api/services/stationService';
import { IconButton, Iconify } from '@/components/icon';
import { CircleLoading } from '@/components/loading';

import { PackagesInfo } from './packages.info';
import { ManageRackCreate } from './rack.create';
// eslint-disable-next-line import/named
import { ManageSlotCreate } from './slot.create';
// import { ManageCheckInCreate } from './checkin.create';

export type StationEditFormProps = {
  id: String;
};
export default function ManageShelfManagerList({ id }: StationEditFormProps) {
  const { mutateAsync: deleteMutate } = useDeleteShelf();
  const { mutateAsync: createMutate } = useCreateRack();
  const { mutateAsync: deleteRack } = useDeleteRack();
  const { mutateAsync: deleteSlot } = useDeleteSlot();
  const { data, isLoading } = useListShelfStaff(id);
  const [dataSlot, setDataSlot] = useState<any>();
  const [clickOne, setClickOne] = useState();
  const [clickTwo, setClickTwo] = useState();
  const [clickThree, setClickThree] = useState();
  const [showFormCheckIn, setShowFormCheckIn] = useState(false);
  const [showFormRack, setShowFormRack] = useState(false);
  const [showFormSlot, setShowFormSlot] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  if (isLoading) return <CircleLoading />;
  const onOpenFormHandler = (record?: any) => {
    setClickOne(record);
    setShowInfo(true);
  };
  const onOpenFormCheckInHandler = (record?: any) => {
    setDataSlot(record);
    setShowFormCheckIn(true);
  };
  const onOpenFormRack = (record?: any) => {
    setClickTwo(record);
    setShowFormRack(true);
  };
  const onOpenFormSlot = (record?: any) => {
    setClickThree(record);
    setShowFormSlot(true);
  };
  const closeAndRefetchHandler = async () => {
    setShowInfo(false);
  };
  const closeFormCheckIn = async () => {
    setShowFormCheckIn(false);
  };
  const closeFormRack = async () => {
    setShowFormRack(false);
  };
  const closeFormSlot = async () => {
    setShowFormSlot(false);
  };
  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    data && (
      <>
        <Tabs
          onChange={onChange}
          type="card"
          items={data?.contends.map((item: any, i) => {
            return {
              label: item.name,
              key: item.id,
              children: (
                <div className="relative mb-8 mt-4 flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                  <div className="flex">
                    <div className="shadow-blue-gray-500/40 relative mx-2 -mt-3 flex h-10 w-auto items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-blue-500 bg-clip-border pl-2 text-white shadow-lg">
                      <Tooltip
                        placement="left"
                        color="#fefefe"
                        key={item.id}
                        title={
                          <div>
                            <div className="mb-2 grid">
                              <span className="font-semibold text-black">name - {item.name}</span>
                              {/* <span className="font-semibold text-black">
                                volume - {item.volume}
                              </span> */}
                              <span className="font-semibold text-black">
                                volumeUsed - {item.volumeUsed}
                              </span>
                            </div>
                          </div>
                        }
                      >
                        <span className="text-blue-gray-900 block font-sans text-base font-semibold leading-snug tracking-normal antialiased">
                          Shelf index: {item.index}
                        </span>
                      </Tooltip>
                      <Popconfirm
                        title="Delete the shelf"
                        okText="Yes"
                        cancelText="No"
                        placement="left"
                        onConfirm={() => {
                          deleteMutate(item.id.toString());
                        }}
                      >
                        <IconButton>
                          <Iconify icon="mingcute:delete-2-fill" size={18} className="text-error" />
                        </IconButton>
                      </Popconfirm>
                    </div>
                    <div className="shadow-blue-gray-500/40 relative -mt-3 flex h-10 w-36 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-200 to-blue-200 bg-clip-border pl-2 text-white shadow-lg">
                      <Progress
                        percent={100 - item.capacity}
                        size="small"
                        // showInfo={false}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 p-6 ">
                    <div
                      className="relative flex flex-col rounded-xl bg-gray-200 bg-clip-border text-gray-700 shadow-md"
                      onClick={() => createMutate(item.id)}
                    >
                      <div className="flex cursor-pointer flex-wrap justify-center gap-2 p-3">
                        <h5 className="text-blue-gray-900 block font-sans text-base font-semibold leading-snug tracking-normal antialiased">
                          + Create rack
                        </h5>
                      </div>
                    </div>
                    {item.rackSorts.length > 0 &&
                      item.rackSorts.map((rack: any, rackIndex) => (
                        <div className="flex h-full w-full gap-3" key={rack.id}>
                          <div className="flex cursor-pointer" onClick={() => onOpenFormRack(rack)}>
                            <Iconify icon="solar:pen-bold-duotone" size={18} />
                          </div>
                          {rackIndex === 0 && (
                            <Popconfirm
                              title="Delete the rack"
                              okText="Yes"
                              cancelText="No"
                              placement="left"
                              onConfirm={() => {
                                deleteRack(rack.id.toString());
                              }}
                            >
                              <div className="flex cursor-pointer">
                                <Iconify
                                  icon="mingcute:delete-2-fill"
                                  size={18}
                                  className="text-error"
                                />
                              </div>
                            </Popconfirm>
                          )}
                          <Tooltip
                            placement="top"
                            color="#fefefe"
                            key={rack.id}
                            title={
                              <div>
                                <div className="mb-2 grid">
                                  <span className="font-semibold text-black">
                                    name - {rack.name}
                                  </span>
                                  <span className="font-semibold text-black">
                                    description - {rack.description}
                                  </span>
                                  <span className="font-semibold text-black">
                                    number Of Packages - {rack.numberOfPackages}
                                  </span>
                                  <span className="font-semibold text-black">
                                    index - {rack.index}
                                  </span>
                                  <span className="font-semibold text-black">
                                    volume Used - {rack.volumeUsed}
                                  </span>
                                </div>
                                <div className="flex justify-center">
                                  {/* <span
                                    className="mr-2 bg-blue-300 p-1.5 font-semibold text-black transition-all duration-200 hover:bg-blue-200"
                                    style={{ borderRadius: '5px', cursor: 'pointer' }}
                                    onClick={() => onOpenFormCheckInHandler(rack)}
                                  >
                                    Check In
                                  </span> */}
                                  {/* <span
                                    className="mr-2 bg-green-300 p-1.5 font-semibold text-black transition-all duration-200 hover:bg-green-200"
                                    style={{ borderRadius: '5px', cursor: 'pointer' }}
                                    onClick={() => onOpenFormSlot(slot)}
                                  >
                                    Update
                                  </span> */}
                                  {/* <Popconfirm
                                    title="Delete the slot"
                                    okText="Yes"
                                    cancelText="No"
                                    placement="right"
                                    onConfirm={() => {
                                      deleteSlot(slot.id.toString());
                                    }}
                                  >
                                    <span
                                      className="bg-red-300 p-1.5 font-semibold text-black transition-all duration-200 hover:bg-red-200"
                                      style={{ borderRadius: '5px', cursor: 'pointer' }}
                                    >
                                      Delete
                                    </span>
                                  </Popconfirm> */}
                                </div>
                              </div>
                            }
                          >
                            <div
                              onClick={() => onOpenFormHandler(rack)}
                              style={{
                                cursor: 'pointer',
                                width: '100%',
                                paddingLeft: `${rackIndex === 0 ? '0px' : '30px'}`,
                                paddingRight: '10px',
                              }}
                            >
                              <Progress
                                className="ant-progress-custom progress-custom-rack"
                                percent={rack.volumeUsed}
                                size="small"
                                format={(percent) => `${rack.name} - ${percent}%`}
                                // style={{
                                //   background: `${slot.isActive ? '#fff' : '#ffccc7'}`,
                                //   borderRadius: '10px',
                                // }}
                              />
                            </div>
                          </Tooltip>

                          {/* {rack.slotSorts.length > 0 &&
                            rack.slotSorts.map((slot: any) => (
                              <Tooltip
                                placement="top"
                                color="#fefefe"
                                key={slot.id}
                                title={
                                  <div>
                                    <div className="mb-2 grid">
                                      <span className="font-semibold text-black">
                                        name - {slot.name}
                                      </span>
                                      <span className="font-semibold text-black">
                                        description - {slot.description}
                                      </span>
                                      <span className="font-semibold text-black">
                                        width - {slot.width} cm
                                      </span>
                                      <span className="font-semibold text-black">
                                        length - {slot.length} cm
                                      </span>
                                      <span className="font-semibold text-black">
                                        height - {slot.height} cm
                                      </span>
                                      <span className="font-semibold text-black">
                                        weight - {slot.weight} gram
                                      </span>
                                      <span className="font-semibold text-black">
                                        numberOfPackages - {slot.numberOfPackages}
                                      </span>
                                      <span className="font-semibold text-black">
                                        index - {slot.index}
                                      </span>
                                      <span className="font-semibold text-black">
                                        volume - {slot.volume}
                                      </span>
                                      <span className="font-semibold text-black">
                                        volumeUsed - {slot.volumeUsed}
                                      </span>
                                    </div>
                                    <div className="flex justify-center">
                                      {slot.isActive && (
                                        <span
                                          className="mr-2 bg-blue-300 p-1.5 font-semibold text-black transition-all duration-200 hover:bg-blue-200"
                                          style={{ borderRadius: '5px', cursor: 'pointer' }}
                                          onClick={() => onOpenFormCheckInHandler(slot)}
                                        >
                                          Check In
                                        </span>
                                      )}
                                      <span
                                        className="mr-2 bg-green-300 p-1.5 font-semibold text-black transition-all duration-200 hover:bg-green-200"
                                        style={{ borderRadius: '5px', cursor: 'pointer' }}
                                        onClick={() => onOpenFormSlot(slot)}
                                      >
                                        Update
                                      </span>
                                      <Popconfirm
                                        title="Delete the slot"
                                        okText="Yes"
                                        cancelText="No"
                                        placement="right"
                                        onConfirm={() => {
                                          deleteSlot(slot.id.toString());
                                        }}
                                      >
                                        <span
                                          className="bg-red-300 p-1.5 font-semibold text-black transition-all duration-200 hover:bg-red-200"
                                          style={{ borderRadius: '5px', cursor: 'pointer' }}
                                        >
                                          Delete
                                        </span>
                                      </Popconfirm>
                                    </div>
                                  </div>
                                }
                              >
                                <div
                                  onClick={() => onOpenFormHandler(slot)}
                                  style={{ cursor: 'pointer' }}
                                >
                                  <Progress
                                    className="ant-progress-custom"
                                    percent={100 - slot.capacity}
                                    size="small"
                                    // showInfo={false}
                                    style={{
                                      background: `${slot.isActive ? '#fff' : '#ffccc7'}`,
                                      borderRadius: '10px',
                                    }}
                                  />
                                </div>
                              </Tooltip>
                            ))} */}
                          {/* <div
                            className="text-blue-gray-900 block flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl bg-blue-100 pb-2 font-sans text-2xl font-semibold"
                            onClick={() => onOpenFormSlot(rack.id)}
                          >
                            +
                          </div> */}
                        </div>
                      ))}
                  </div>
                </div>
              ),
            };
          })}
        />
        {/* {data.contends.map((item: any, index: any) => (
          <div
            className="relative mb-8 flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
            key={index}
          >
            <div className="flex">
              <div className="shadow-blue-gray-500/40 relative mx-2 -mt-3 flex h-10 w-auto items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-blue-500 bg-clip-border pl-2 text-white shadow-lg">
                <Tooltip
                  placement="left"
                  color="#fefefe"
                  key={item.id}
                  title={
                    <div>
                      <div className="mb-2 grid">
                        <span className="font-semibold text-black">name - {item.name}</span>
                        <span className="font-semibold text-black">volume - {item.volume}</span>
                        <span className="font-semibold text-black">
                          volumeUsed - {item.volumeUsed}
                        </span>
                      </div>
                    </div>
                  }
                >
                  <span className="text-blue-gray-900 block font-sans text-base font-semibold leading-snug tracking-normal antialiased">
                    Shelf index: {item.index}
                  </span>
                </Tooltip>

                <Popconfirm
                  title="Delete the shelf"
                  okText="Yes"
                  cancelText="No"
                  placement="left"
                  onConfirm={() => {
                    deleteMutate(item.id.toString());
                  }}
                >
                  <IconButton>
                    <Iconify icon="mingcute:delete-2-fill" size={18} className="text-error" />
                  </IconButton>
                </Popconfirm>
              </div>
              <div className="shadow-blue-gray-500/40 relative -mt-3 flex h-10 w-36 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-200 to-blue-200 bg-clip-border pl-2 text-white shadow-lg">
                <Progress
                  percent={100 - item.capacity}
                  size="small"
                  // showInfo={false}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 p-6 ">
              {item.rackSorts.length > 0 &&
                item.rackSorts.map((rack: any) => (
                  <div className="flex h-full w-full gap-3" key={rack.id}>
                    <div className="flex cursor-pointer" onClick={() => onOpenFormRack(rack)}>
                      <Iconify icon="solar:pen-bold-duotone" size={18} />
                    </div>
                    <Popconfirm
                      title="Delete the rack"
                      okText="Yes"
                      cancelText="No"
                      placement="left"
                      onConfirm={() => {
                        deleteRack(rack.id.toString());
                      }}
                    >
                      <div className="flex cursor-pointer">
                        <Iconify icon="mingcute:delete-2-fill" size={18} className="text-error" />
                      </div>
                    </Popconfirm>
                    {rack.slotSorts.length > 0 &&
                      rack.slotSorts.map((slot: any) => (
                        <Tooltip
                          placement="top"
                          color="#fefefe"
                          key={slot.id}
                          title={
                            <div>
                              <div className="mb-2 grid">
                                <span className="font-semibold text-black">name - {slot.name}</span>
                                <span className="font-semibold text-black">
                                  description - {slot.description}
                                </span>
                              </div>
                              <div className="flex justify-center">
                                <span
                                  className="mr-2 bg-green-300 p-1.5 font-semibold text-black transition-all duration-200 hover:bg-green-200"
                                  style={{ borderRadius: '5px', cursor: 'pointer' }}
                                  onClick={() => onOpenFormSlot(slot)}
                                >
                                  Update
                                </span>
                                <Popconfirm
                                  title="Delete the slot"
                                  okText="Yes"
                                  cancelText="No"
                                  placement="right"
                                  onConfirm={() => {
                                    deleteSlot(slot.id.toString());
                                  }}
                                >
                                  <span
                                    className="bg-red-300 p-1.5 font-semibold text-black transition-all duration-200 hover:bg-red-200"
                                    style={{ borderRadius: '5px', cursor: 'pointer' }}
                                  >
                                    Delete
                                  </span>
                                </Popconfirm>
                              </div>
                            </div>
                          }
                        >
                          <div
                            onClick={() => onOpenFormHandler(slot)}
                            style={{ cursor: 'pointer' }}
                          >
                            <Progress
                              className="ant-progress-custom"
                              percent={100 - slot.capacity}
                              size="small"
                              // showInfo={false}
                              style={{
                                background: `${slot.isActive ? '#fff' : '#ffccc7'}`,
                                borderRadius: '10px',
                              }}
                            />
                          </div>
                        </Tooltip>
                      ))}
                    <div
                      className="text-blue-gray-900 block flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl bg-blue-100 pb-2 font-sans text-2xl font-semibold"
                      onClick={() => onOpenFormSlot(rack.id)}
                    >
                      +
                    </div>
                  </div>
                ))}
              <div
                className="relative flex flex-col rounded-xl bg-gray-100 bg-clip-border text-gray-700 shadow-md"
                onClick={() => onOpenFormRack(item.id)}
              >
                <div className="flex cursor-pointer flex-wrap justify-center gap-2 p-3">
                  <h5 className="text-blue-gray-900 block font-sans text-base font-semibold leading-snug tracking-normal antialiased">
                    + create rack
                  </h5>
                </div>
              </div>
            </div>
          </div>
        ))} */}
        {showInfo && (
          <PackagesInfo zoneId={id} clickOne={clickOne} onClose={closeAndRefetchHandler} />
        )}
        {/* {showFormCheckIn && (
          <ManageCheckInCreate
            stationId={stationId}
            zoneId={id}
            slotId={dataSlot.id}
            onClose={closeFormCheckIn}
            onCloseCheckIn={closeAndRefetchHandler}
          />
        )} */}
        {showFormRack && <ManageRackCreate clickOne={clickTwo} onClose={closeFormRack} />}
        {showFormSlot && <ManageSlotCreate clickOne={clickThree} onClose={closeFormSlot} />}
      </>
    )
  );
}
