import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { App, Badge, Drawer, Tabs, TabsProps, Tag } from 'antd';
import Color from 'color';
import { CSSProperties, ReactNode, useEffect, useState } from 'react';

import { useListNoti, useReadAllNoti } from '@/api/services/notiService';
import { useCreateCheckOutConfirm } from '@/api/services/stationService';
import CyanBlur from '@/assets/images/background/cyan-blur.png';
import RedBlur from '@/assets/images/background/red-blur.png';
import { IconButton, Iconify } from '@/components/icon';
import { queryClient } from '@/http/tanstack/react-query';
import ProTag from '@/theme/antd/components/tag';
import { useThemeToken } from '@/theme/hooks';
import { getItem } from '@/utils/storage';

import { StorageEnum } from '#/enum';

export default function NoticeButton() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const themeToken = useThemeToken();
  const [count, setCount] = useState(4);
  const [connection, setConnection] = useState<null | HubConnection>(null);
  const { mutateAsync } = useCreateCheckOutConfirm();
  const { notification } = App.useApp();
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const { data } = useListNoti({ Level: selectedLevel });
  const { data: dataFetch } = useListNoti({ Level: '' });
  const { mutateAsync: readAllMutate } = useReadAllNoti();

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_APP_SIGNALR_API}/notification-hub`, {
        accessTokenFactory: () => getItem(StorageEnum.Token)?.accessToken,
      })
      .withAutomaticReconnect()
      .build();

    setConnection(connect);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on('ReceiveNotification', (message) => {
            console.log('mess', message);
            notification.success({
              placement: 'topRight',
              message: message.content,
              description: message.title,
            });
            queryClient.invalidateQueries(['checkOut']);
            // setTimeout(
            //   () =>
            //     mutateAsync({
            //       id: JSON.parse(message.data).Id,
            //       status: 'confirm',
            //     }),
            //   3000,
            // );
            // mutateAsync({
            //   id: JSON.parse(message.data).Id,
            //   status: 'confirm',
            // });
          });
        })
        .catch((error) => console.log(error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection, mutateAsync]);
  const style: CSSProperties = {
    backdropFilter: 'blur(20px)',
    backgroundImage: `url("${CyanBlur}"), url("${RedBlur}")`,
    backgroundRepeat: 'no-repeat, no-repeat',
    backgroundColor: Color(themeToken.colorBgContainer).alpha(0.9).toString(),
    backgroundPosition: 'right top, left bottom',
    backgroundSize: '50, 50%',
  };
  const bodyStyle: CSSProperties = {
    padding: 0,
  };

  const tabChildren: ReactNode = data?.contends.map((e) => {
    return (
      <div className="mb-3 cursor-pointer text-sm" key={e.id}>
        <div className="flex">
          {e.level === 'Information' && (
            <Tag className="self-center" color="cyan">
              Info
            </Tag>
          )}
          {e.level === 'Warn' && <Tag color="orange">Warn</Tag>}
          {e.level === 'Critical' && <Tag color="red">Critical</Tag>}
          <div className="ml-2">
            <div>
              <span className="font-medium">
                {`${e.createdBy === 'Anonymous' ? 'Server' : e.createdBy}`}{' '}
              </span>
              <span className="text-xs font-light">{e.content}</span>
            </div>
            <span className="text-xs font-light opacity-60">
              at{' '}
              {new Date(e.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}{' '}
              {new Date(e.createdAt).toISOString().slice(0, 10)}
            </span>
          </div>
        </div>
      </div>
    );
  });

  const items: TabsProps['items'] = [
    {
      key: 'All',
      label: (
        <div className="flex">
          <span>All</span>
          <ProTag color="processing"> {dataFetch?.contends.length}</ProTag>
        </div>
      ),
      children: tabChildren,
    },
    {
      key: 'Critical',
      label: (
        <div className="flex">
          <span>Critical</span>
          <ProTag color="error">
            {data?.contends.filter((e) => e.level === 'Critical').length}
          </ProTag>
        </div>
      ),
      children: tabChildren,
    },
    {
      key: 'Warning',
      label: (
        <div className="flex">
          <span>Warning</span>
          <ProTag color="warning">
            {data?.contends.filter((e) => e.level === 'Warning').length}
          </ProTag>
        </div>
      ),
      children: tabChildren,
    },
    {
      key: 'Information',
      label: (
        <div className="flex">
          <span>Information</span>
          <ProTag color="green">
            {data?.contends.filter((e) => e.level === 'Information').length}
          </ProTag>
        </div>
      ),
      children: tabChildren,
    },
  ];

  return (
    <div>
      <IconButton
        onClick={() => {
          setDrawerOpen(true);
        }}
      >
        <Badge
          count={dataFetch?.countUnread}
          styles={{
            root: { color: 'inherit' },
            indicator: { color: '#fff' },
          }}
        >
          <Iconify icon="solar:bell-bing-bold-duotone" size={24} />
        </Badge>
      </IconButton>
      <Drawer
        placement="right"
        title="Notifications"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        closable={false}
        width={420}
        bodyStyle={bodyStyle}
        maskStyle={{ backgroundColor: 'transparent' }}
        style={style}
        extra={
          <IconButton
            style={{ color: themeToken.colorPrimary }}
            onClick={async () => {
              await readAllMutate();
              setDrawerOpen(false);
            }}
          >
            <Iconify icon="solar:check-read-broken" size={20} />
          </IconButton>
        }
        footer={
          <div
            style={{ color: themeToken.colorTextBase }}
            className="flex h-10 w-full items-center justify-center font-semibold"
          >
            View All
          </div>
        }
      >
        <div className="flex flex-col px-6">
          <Tabs
            defaultActiveKey="All"
            items={items}
            onChange={(key: string) => {
              if (key === 'All') {
                setSelectedLevel('');
              } else {
                setSelectedLevel(key);
              }
            }}
          />
        </div>
      </Drawer>
    </div>
  );
}

// function NoticeTab() {
//   const themeToken = useThemeToken();
//   const tabChildren: ReactNode = (
//     <div className="text-sm">
//       <div className="flex">
//         <img className="h-10 w-10 rounded-full" src={faker.image.avatar()} alt="" />
//         <div className="ml-2">
//           <div>
//             <span className="font-medium">{faker.person.fullName()}</span>
//             <span className="text-xs font-light"> sent you a frind request</span>
//           </div>
//           <span className="text-xs font-light opacity-60">about 1 hour ago</span>
//           <div className="mt-2">
//             <Space>
//               <Button type="primary">Accept</Button>
//               <Button>Refuse</Button>
//             </Space>
//           </div>
//         </div>
//       </div>

//       <div className="mt-8 flex">
//         <img className="h-10 w-10 rounded-full" src={faker.image.avatar()} alt="" />
//         <div className="ml-2">
//           <div>
//             <span className="font-medium">{faker.person.fullName()}</span>
//             <span className="text-xs font-light"> added file to </span>
//             <span className="font-medium">File Manager</span>
//           </div>
//           <span className="text-xs font-light opacity-60">5 hour ago</span>
//           <div
//             style={{ background: themeToken.colorBgContainerDisabled }}
//             className="mt-2 flex items-center rounded-lg bg-gray-200 p-4"
//           >
//             <div className="text-gray ml-2 flex flex-col">
//               <span className="font-medium">@{faker.person.fullName()}</span>
//               <span className="text-xs">{faker.lorem.lines(2)}</span>
//             </div>
//           </div>
//           <div className="mt-2">
//             <Space>
//               <Button type="primary">Reply</Button>
//             </Space>
//           </div>
//         </div>
//       </div>

//       <div className="mt-8 flex">
//         <img className="h-10 w-10 rounded-full" src={faker.image.avatar()} alt="" />
//         <div className="ml-2">
//           <div>
//             <span className="font-medium">{faker.person.fullName()}</span>
//             <span className="text-xs font-light"> mentioned you in</span>
//             <span className="font-medium">Slash Admin</span>
//           </div>
//           <span className="text-xs font-light opacity-60">1 days ago</span>
//           <div className="mt-2">
//             <Space>
//               <Button type="primary">Reply</Button>
//             </Space>
//           </div>
//         </div>
//       </div>

//       <div className="mt-8 flex">
//         <img className="h-10 w-10 rounded-full" src={faker.image.avatar()} alt="" />
//         <div className="ml-2">
//           <div>
//             <span className="font-medium">{faker.person.fullName()}</span>
//             <span className="text-xs font-light"> added file to </span>
//             <span className="font-medium">File Manager</span>
//           </div>
//           <span className="text-xs font-light opacity-60">2 days ago</span>
//           <div
//             style={{ background: themeToken.colorBgContainerDisabled }}
//             className="mt-2 flex items-center rounded-lg bg-gray-200 p-4"
//           >
//             <SvgIcon icon="ic_file_audio" size={48} />
//             <div className="text-gray ml-2 flex flex-col">
//               <span className="font-medium">Witout Me</span>
//               <span className="text-xs">1.2GB·30 min ago </span>
//             </div>
//             <Button className="ml-4">Download</Button>
//           </div>
//         </div>
//       </div>

//       <div className="mt-8 flex">
//         <img className="h-10 w-10 rounded-full" src={faker.image.avatar()} alt="" />
//         <div className="ml-2">
//           <div>
//             <span className="font-medium">{faker.person.fullName()}</span>
//             <span className="text-xs font-light"> request a payment of </span>
//             <span className="font-medium">$3000</span>
//           </div>
//           <span className="text-xs font-light opacity-60">4 days ago</span>
//           <div className="mt-2">
//             <Space>
//               <Button type="primary">Pay</Button>
//               <Button>Refuse</Button>
//             </Space>
//           </div>
//         </div>
//       </div>

//       <div className="mt-8 flex">
//         <IconButton>
//           <SvgIcon icon="ic_order" size={30} />
//         </IconButton>
//         <div className="ml-2">
//           <div>
//             <span className="font-light">Your order is placed waiting for shipping</span>
//           </div>
//           <span className="text-xs font-light opacity-60">4 days ago</span>{' '}
//         </div>
//       </div>

//       <div className="mt-8 flex">
//         <IconButton>
//           <SvgIcon icon="ic_mail" size={30} />
//         </IconButton>
//         <div className="ml-2">
//           <div>
//             <span className="font-light">You have new mail</span>
//           </div>
//           <span className="text-xs font-light opacity-60">5 days ago</span>{' '}
//         </div>
//       </div>

//       <div className="mt-8 flex">
//         <IconButton>
//           <SvgIcon icon="ic_chat" size={30} />
//         </IconButton>
//         <div className="ml-2">
//           <div>
//             <span className="font-light">You have new message 5 unread message</span>
//           </div>
//           <span className="text-xs font-light opacity-60">7 days ago</span>
//         </div>
//       </div>

//       <div className="mt-8 flex">
//         <IconButton>
//           <SvgIcon icon="ic_delivery" size={30} />
//         </IconButton>
//         <div className="ml-2">
//           <div>
//             <span className="font-light">Delivery processing your order is being shipped</span>
//           </div>
//           <span className="text-xs font-light opacity-60">8 days ago</span>{' '}
//         </div>
//       </div>
//     </div>
//   );
//   const items: TabsProps['items'] = [
//     {
//       key: '1',
//       label: (
//         <div className="flex">
//           <span>All</span>
//           <ProTag color="processing">22</ProTag>
//         </div>
//       ),
//       children: tabChildren,
//     },
//     {
//       key: '2',
//       label: (
//         <div className="flex">
//           <span>Unread</span>
//           <ProTag color="error">12</ProTag>
//         </div>
//       ),
//       children: tabChildren,
//     },
//     {
//       key: '3',
//       label: (
//         <div className="flex">
//           <span>Archived</span>
//           <ProTag color="green">10</ProTag>
//         </div>
//       ),
//       children: tabChildren,
//     },
//   ];
//   return (
//     <div className="flex flex-col px-6">
//       <Tabs defaultActiveKey="1" items={items} />
//     </div>
//   );
// }
