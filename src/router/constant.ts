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

export const ADMIN_PERMISSION = [DASHBOARD_PERMISSION];
