import { Permission } from '#/entity';
import { PermissionType } from '#/enum';

// const STAFF_PERMISSION = [];

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

const ADMIN_DASHBOARD_PERMISSION: Permission = {
  id: '9100714781927703',
  parentId: '',
  label: 'Dashboard',
  name: 'Dashboard',
  icon: 'ic-analysis',
  type: PermissionType.MENU,
  route: 'dashboard',
  order: 1,
  component: '/admin/dashboard/index.tsx',
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

const ADMIN_TRANSACTIONS_PERMISSION: Permission = {
  id: '9100714781927714',
  parentId: '',
  label: 'Transactions',
  name: 'transactions',
  icon: 'ic-transaction',
  type: PermissionType.MENU,
  route: 'transactions',
  order: 6,
  component: '/admin/transactions/transactions-list.container.tsx',
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

const ADMIN_USER_PERMISSION: Permission = {
  id: '9100714781927723',
  parentId: '',
  label: 'Users',
  name: 'users',
  icon: 'ic-user',
  type: PermissionType.MENU,
  route: 'users',
  order: 5,
  component: '/admin/user/user-list.container.tsx',
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
  label: 'Manager',
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
  label: 'Station',
  name: 'station',
  icon: 'zondicons:station',
  type: PermissionType.MENU,
  route: 'station',
  order: 4,
  component: '/station/station-list.container.tsx',
  // children: [
  //   {
  //     id: '8426999229400979',
  //     parentId: '9100714781927705',
  //     label: 'Station',
  //     name: 'station',
  //     type: PermissionType.MENU,
  //     route: 'station',
  //     component: '/station/station-list.container.tsx',
  //     icon: 'zondicons:station',
  //   },
  // ],
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
  component: '/staff/staff-list.container.tsx',
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
  label: 'Service Fees',
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

const STAFF_PACKAGEMANAGEMENT_PERMISSION: Permission = {
  id: '9100714781927707',
  parentId: '',
  label: 'Package Management',
  name: 'packagemanagement',
  icon: 'ic-package',
  type: PermissionType.CATALOGUE,
  route: 'package',
  order: 2,
  children: [
    {
      id: '8426999229400979',
      parentId: '9100714781927707',
      label: 'Check In',
      name: 'checkin',
      type: PermissionType.MENU,
      route: 'checkin',
      component: '/staff/zone-list.container.tsx',
      icon: 'ic-checkin',
    },
    {
      id: '8426999229400979',
      parentId: '9100714781927707',
      label: 'List packages',
      name: 'packages',
      type: PermissionType.MENU,
      route: 'packages',
      component: '/staff/packages-list.container.tsx',
      icon: 'ic-package',
    },
  ],
};

const PACKAGE_STATION_MANAGE_PERMISSION: Permission = {
  id: '9100714781927733',
  parentId: '',
  label: 'Package Manager',
  name: 'packageManager',
  icon: 'material-symbols:package',
  type: PermissionType.MENU,
  route: 'packageManager',
  order: 4,
  component: '/package/package-list.manager.tsx',
};
const PACKAGE_HISTORY_STATION_MANAGE_PERMISSION: Permission = {
  id: '9100714781927733',
  parentId: '',
  label: 'Package History',
  name: 'packageHistory',
  icon: 'lucide:package-search',
  type: PermissionType.MENU,
  route: 'packageHistory',
  order: 6,
  component: '/package/packageHistory-list.manager.tsx',
};
const PAYMENT_STATION_MANAGE_PERMISSION: Permission = {
  id: '9100714781927733',
  parentId: '',
  label: 'Payment',
  name: 'paymentManager',
  icon: 'fluent:payment-48-filled',
  type: PermissionType.MENU,
  route: 'paymentManager',
  order: 6,
  component: '/payment/payment-list.manager.tsx',
};

export const ADMIN_PERMISSION = [
  ADMIN_DASHBOARD_PERMISSION,
  STATION_MANAGER_PERMISSION,
  STATION_MANAGE_PERMISSION,
  STATION_MANAGER_PRICING_MANAGE_PERMISSION,
  ADMIN_TRANSACTIONS_PERMISSION,
  ADMIN_USER_PERMISSION,
  PAYMENT_STATION_MANAGE_PERMISSION,
  PACKAGE_STATION_MANAGE_PERMISSION,
];
export const STATION_MANAGER_LIST_PERMISSION = [
  STATION_MANAGER_CONFIG_PERMISSION,
  DASHBOARD_PERMISSION,
  // STATION_MANAGER_PACKAGEMANAGEMENT_PERMISSION,
  PACKAGE_STATION_MANAGE_PERMISSION,
  // PACKAGE_HISTORY_STATION_MANAGE_PERMISSION,
  PAYMENT_STATION_MANAGE_PERMISSION,
];

export const STAFF_LIST_PERRMISSION = [
  DASHBOARD_PERMISSION,
  STAFF_PACKAGEMANAGEMENT_PERMISSION,
  // STATION_MANAGER_STAFF_MANAGE_PERMISSION,
  // PACKAGE_STATION_MANAGE_PERMISSION,
  // PACKAGE_HISTORY_STATION_MANAGE_PERMISSION,
  // PAYMENT_STATION_MANAGE_PERMISSION,
];
