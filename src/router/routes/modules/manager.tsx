import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Iconify } from '@/components/icon';
import { CircleLoading } from '@/components/loading';

import { AppRouteObject } from '#/router';

const manager: AppRouteObject = {
  order: 3,
  path: 'manager',
  element: (
    <Suspense fallback={<CircleLoading />}>
      <Outlet />
    </Suspense>
  ),
  meta: {
    label: 'manager',
    icon: <Iconify icon="solar:widget-5-bold-duotone" className="ant-menu-item-icon" size="24" />,
    key: '/manager',
  },
};

export default manager;
