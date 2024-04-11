import { Popconfirm, Progress, Tooltip } from 'antd';
import { useState } from 'react';

import {
  useDeleteShelf,
  useDeleteRack,
  useDeleteSlot,
  useListShelf,
} from '@/api/services/stationService';
import { IconButton, Iconify } from '@/components/icon';
import { CircleLoading } from '@/components/loading';

import { PackagesInfo } from './packages.info';
import { ManageRackCreate } from './rack.create';
// eslint-disable-next-line import/named
import { ManageSlotCreate } from './slot.create';

export type StationEditFormProps = {
  id: String;
};
export default function ManageShelfManagerList({ id }: StationEditFormProps) {
  const { mutateAsync: deleteMutate } = useDeleteShelf();
  const { mutateAsync: deleteRack } = useDeleteRack();
  const { mutateAsync: deleteSlot } = useDeleteSlot();
  const { data, isLoading } = useListShelf(id);
  const [clickOne, setClickOne] = useState();
  const [clickTwo, setClickTwo] = useState();
  const [clickThree, setClickThree] = useState();
  const [showFormRack, setShowFormRack] = useState(false);
  const [showFormSlot, setShowFormSlot] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  if (isLoading) return <CircleLoading />;
  const onOpenFormHandler = (record?: any) => {
    setClickOne(record);
    setShowInfo(true);
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
  const closeFormRack = async () => {
    setShowFormRack(false);
  };
  const closeFormSlot = async () => {
    setShowFormSlot(false);
  };

  return (
    data && (
      <>
        {data.contends.map((item: any, index: any) => (
          <div
            className="relative mb-8 flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
            key={index}
          >
            <div className="shadow-blue-gray-500/40 relative mx-4 -mt-3 flex h-10 w-24 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-blue-500 bg-clip-border text-white shadow-lg">
              <span className="text-blue-gray-900 block font-sans text-base font-semibold leading-snug tracking-normal antialiased">
                Shelf {index + 1}
              </span>
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
                                  description - {slot.description} cm
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
                              </div>
                              <div className="flex">
                                <span
                                  className="mr-2 bg-blue-100 p-2 font-semibold text-black"
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
                                    className="bg-blue-100 p-2 font-semibold text-black"
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
                                background: `${slot.isActive ? '#fff' : '#ccc'}`,
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
        ))}
        {showInfo && (
          <PackagesInfo zoneId={id} clickOne={clickOne} onClose={closeAndRefetchHandler} />
        )}
        {showFormRack && <ManageRackCreate clickOne={clickTwo} onClose={closeFormRack} />}
        {showFormSlot && <ManageSlotCreate clickOne={clickThree} onClose={closeFormSlot} />}
      </>
    )
  );
}
