import { Permission } from '#/entity';
import { PermissionType } from '#/enum';

const STAFF_PERMISSION = [];

const DASHBOARD_PERMISSION: Permission = {
  id: '9100714781927703',
  parentId: '',
  label: 'Dashboard',
  name: 'Dashboard',
  icon: 'ic-analysis',
  type: PermissionType.MENU,
  route: 'dashboard',
  order: 1,
  component: '/dashboard/index.tsx',
  // children: [
  //   {
  //     id: '8426999229400979',
  //     parentId: '9100714781927703',
  //     label: 'sys.menu.workbench',
  //     name: 'Workbench',
  //     type: PermissionType.MENU,
  //     route: 'workbench',
  //     component: '/dashboard/workbench/index.tsx',
  //   },
  // ],
};

const STATION_MANAGER_PERMISSION: Permission = {
  id: '9100714781927704',
  parentId: '',
  label: 'Station Manager',
  name: 'manager',
  icon: 'ic-user',
  type: PermissionType.MENU,
  route: 'manager',
  order: 3,
  component: '/manager/manager-list.container.tsx',
  // children: [
  //   {
  //     id: '8426999229400979',
  //     parentId: '9100714781927703',
  //     label: 'sys.menu.workbench',
  //     name: 'Workbench',
  //     type: PermissionType.MENU,
  //     route: 'workbench',
  //     component: '/dashboard/workbench/index.tsx',
  //   },
  // ],
};

const STATION_MANAGE_PERMISSION: Permission = {
  id: '9100714781927704',
  parentId: '',
  label: 'Station',
  name: 'station',
  icon: 'ic-warehouse',
  type: PermissionType.MENU,
  route: 'station',
  order: 2,
  component: '/station/station-list.container.tsx',
  // children: [
  //   {
  //     id: '8426999229400979',
  //     parentId: '9100714781927703',
  //     label: 'sys.menu.workbench',
  //     name: 'Workbench',
  //     type: PermissionType.MENU,
  //     route: 'workbench',
  //     component: '/dashboard/workbench/index.tsx',
  //   },
  // ],
};
export const ADMIN_PERMISSION = [
  DASHBOARD_PERMISSION,
  STATION_MANAGER_PERMISSION,
  STATION_MANAGE_PERMISSION,
];
