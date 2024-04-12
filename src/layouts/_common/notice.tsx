import { Badge, Drawer, Tabs, TabsProps, Tag } from 'antd';
import Color from 'color';
import { CSSProperties, ReactNode, useState } from 'react';

import { useListNoti, useReadAllNoti } from '@/api/services/notiService';
import CyanBlur from '@/assets/images/background/cyan-blur.png';
import RedBlur from '@/assets/images/background/red-blur.png';
import { IconButton, Iconify } from '@/components/icon';
import { CircleLoading } from '@/components/loading';
import ProTag from '@/theme/antd/components/tag';
import { useThemeToken } from '@/theme/hooks';

export default function NoticeButton() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const themeToken = useThemeToken();

  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const { data } = useListNoti({ Level: selectedLevel });
  const { data: dataFetch, isLoading } = useListNoti({ Level: '' });
  const { mutateAsync: readAllMutate } = useReadAllNoti();
  if (isLoading) return <CircleLoading />;

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
              <span className="font-medium">{e.createdBy} </span>
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
