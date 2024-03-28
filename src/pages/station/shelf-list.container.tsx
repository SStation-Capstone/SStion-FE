import { Popconfirm } from 'antd';

import { useDeleteShelf, useListShelf } from '@/api/services/stationService';
import { IconButton, Iconify } from '@/components/icon';
import { CircleLoading } from '@/components/loading';

export type StationEditFormProps = {
  id: String;
};
export default function ManageShelfManagerList({ id }: StationEditFormProps) {
  const { mutateAsync: deleteMutate } = useDeleteShelf();
  const { data, isLoading } = useListShelf(id);
  if (isLoading) return <CircleLoading />;
  return (
    data && (
      <>
        {data.map((item, index) => (
          <div
            className="relative mb-8 flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
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
                  <div className="flex h-full w-full gap-3" key={rack.id}>
                    {rack.slots.length > 0 &&
                      rack.slots.map((slot) => (
                        <div className="block h-12 w-12 rounded-xl bg-blue-400" key={slot.id} />
                      ))}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </>
    )
  );
}
