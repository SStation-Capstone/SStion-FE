import { Popconfirm } from 'antd';
import { useState } from 'react';

import { useDeleteShelf, useListShelf } from '@/api/services/stationService';
import { IconButton, Iconify } from '@/components/icon';
import { CircleLoading } from '@/components/loading';

import { ManageShelfCreate } from './shelf.create';

import { Shelf } from '#/entity';

export type StationEditFormProps = {
  id: String;
};
export default function ManageShelfManagerList({ id }: StationEditFormProps) {
  const [clickOne, setClickOne] = useState<Shelf>();
  const [showInfo, setShowInfo] = useState(false);
  const { mutateAsync: deleteMutate } = useDeleteShelf();
  const { data, isLoading } = useListShelf(id);
  if (isLoading) return <CircleLoading />;
  const onOpenFormHandler = (record?: Shelf) => {
    if (record) {
      setClickOne(record);
    } else {
      setClickOne(undefined);
    }
    setShowInfo(true);
  };

  const closeAndRefetchHandler = async () => {
    setShowInfo(false);
  };
  return (
    data && (
      <>
        {data.map((item, index) => (
          <div
            className="relative mb-8 flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
            key={index}
          >
            <div className="shadow-blue-gray-500/40 relative mx-4 -mt-3 flex h-10 w-24 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-border text-white shadow-lg">
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
              {item.racks.length > 0 &&
                item.racks.map((rack) => (
                  <div
                    className="text-blue-gray-900 block h-12 w-12 rounded-xl bg-blue-400 font-sans text-xl font-semibold leading-snug tracking-normal antialiased"
                    key={rack.id}
                  />
                ))}
              <div className="text-blue-gray-900 block flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl bg-blue-100 pb-2 font-sans text-2xl font-semibold">
                +
              </div>
            </div>
          </div>
        ))}
        <div
          className="relative mb-8 flex w-80 flex-col rounded-xl bg-gray-100 bg-clip-border text-gray-700 shadow-md"
          onClick={() => onOpenFormHandler()}
        >
          <div className="flex cursor-pointer flex-wrap justify-center gap-2 p-4">
            <h5 className="text-blue-gray-900 block font-sans text-base font-semibold leading-snug tracking-normal antialiased">
              + create shelf
            </h5>
          </div>
        </div>
        {showInfo && (
          <ManageShelfCreate id={id} clickOne={clickOne} onClose={closeAndRefetchHandler} />
        )}
      </>
    )
  );
}
