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
  component: '/admin/manager/manager-list.container.tsx',
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
  component: '/admin/station/station-list.container.tsx',
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

const STATION_MANAGER_CONFIG_PERMISSION: Permission = {
  id: '9100714781927705',
  parentId: '',
  label: 'Config',
  name: 'config',
  icon: 'ic-configuration',
  type: PermissionType.CATALOGUE,
  route: 'config',
  order: 4,
  component: '/station/station-list.container.tsx',
  children: [
    {
      id: '8426999229400979',
      parentId: '9100714781927705',
      label: 'Station',
      name: 'station',
      type: PermissionType.MENU,
      route: 'station',
      component: '/station/station-list.container.tsx',
      icon: 'zondicons:station',
    },
    // {
    //   id: '8426999229400979',
    //   parentId: '9100714781927705',
    //   label: 'Price',
    //   name: 'price',
    //   type: PermissionType.MENU,
    //   route: 'price',
    //   component: '/station/station-list.container.tsx',
    //   icon: 'material-symbols:price-change-rounded',
    // },
    // {
    //   id: '8426999229400978',
    //   parentId: '9100714781927705',
    //   label: 'Zone',
    //   name: 'zone',
    //   type: PermissionType.MENU,
    //   route: 'zone/:id',
    //   component: '/station/zone-list.container.tsx',
    //   icon: 'ri:time-zone-fill',
    // },
  ],
};

const STATION_MANAGER_PACKAGEMANAGEMENT_PERMISSION: Permission = {
  id: '9100714781927706',
  parentId: '',
  label: 'Package Management',
  name: 'packagemanagement',
  icon: 'ic-package',
  type: PermissionType.CATALOGUE,
  route: 'package',
  order: 2,
  component: '/station/station-list.container.tsx',
  children: [
    {
      id: '8426999229400979',
      parentId: '9100714781927706',
      label: 'Check In',
      name: 'checkin',
      type: PermissionType.MENU,
      route: 'checkin',
      component: '/station/station-list.container.tsx',
      icon: 'ic-checkin',
    },
    // {
    //   id: '8426999229400979',
    //   parentId: '9100714781927706',
    //   label: 'Check Out',
    //   name: 'checkout',
    //   type: PermissionType.MENU,
    //   route: 'checkout/:id',
    //   component: '/station/station-list.container.tsx',
    //   icon: 'ic-checkout',
    // },
  ],
};

const STATION_MANAGER_STAFF_MANAGE_PERMISSION: Permission = {
  id: '9100714781927712',
  parentId: '',
  label: 'Staff',
  name: 'staff',
  icon: 'ic-user',
  type: PermissionType.MENU,
  route: 'staff',
  order: 3,
  component: '/staff/staff-list.station.tsx',
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
const STATION_MANAGER_PRICING_MANAGE_PERMISSION: Permission = {
  id: '9100714781927712',
  parentId: '',
  label: 'Pricing',
  name: 'pricing',
  icon: 'solar:tag-price-bold',
  type: PermissionType.MENU,
  route: 'pricing',
  order: 3,
  component: '/pricing/pricing-list.default.tsx',
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
  STATION_MANAGER_PRICING_MANAGE_PERMISSION,
];
export const STATION_MANAGER_LIST_PERMISSION = [
  STATION_MANAGER_CONFIG_PERMISSION,
  DASHBOARD_PERMISSION,
  STATION_MANAGER_PACKAGEMANAGEMENT_PERMISSION,
];

export const STAFF_LIST_PERRMISSION = [
  STATION_MANAGER_PACKAGEMANAGEMENT_PERMISSION,
  DASHBOARD_PERMISSION,
  STATION_MANAGER_STAFF_MANAGE_PERMISSION,
];
