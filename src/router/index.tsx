import { lazy } from 'react';
import { Navigate, RouteObject, RouterProvider, createHashRouter } from 'react-router-dom';

import DashboardLayout from '@/layouts/dashboard';
import Layout from '@/layouts/dashboard/layout';
import PricingManagerList from '@/pages/pricing/pricing-list.container';
import StaffManagerList from '@/pages/staff/staff-list.user';
import { ManageCheckOutCreate } from '@/pages/station/checkout.create';
import ManageZoneManagerList from '@/pages/station/zone-list.container';
import AuthGuard from '@/router/components/auth-guard';
import { usePermissionRoutes } from '@/router/hooks';
import { ErrorRoutes } from '@/router/routes/error-routes';

import { AppRouteObject } from '#/router';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;
const LoginRoute: AppRouteObject = {
  path: '/login',
  Component: lazy(() => import('@/pages/sys/login/Login')),
};

const PAGE_NOT_FOUND_ROUTE: AppRouteObject = {
  path: '*',
  element: <Navigate to="/404" replace />,
};

export default function Router() {
  const permissionRoutes = usePermissionRoutes();
  const asyncRoutes: AppRouteObject = {
    path: '/',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [{ index: true, element: <Navigate to={HOMEPAGE} replace /> }, ...permissionRoutes],
  };
  const zoneAsyncRoutes: AppRouteObject = {
    path: '/zone/:id',
    element: (
      <AuthGuard>
        <Layout Component={<ManageZoneManagerList />} />
      </AuthGuard>
    ),
  };
  const staffAsyncRoutes: AppRouteObject = {
    path: '/staff/:id',
    element: (
      <AuthGuard>
        <Layout Component={<StaffManagerList />} />
      </AuthGuard>
    ),
  };
  const pricingAsyncRoutes: AppRouteObject = {
    path: '/pricing/:id',
    element: (
      <AuthGuard>
        <Layout Component={<PricingManagerList />} />
      </AuthGuard>
    ),
  };
  const checkOutAsyncRoutes: AppRouteObject = {
    path: '/checkout/:id',
    element: (
      <AuthGuard>
        <Layout Component={<ManageCheckOutCreate />} />
      </AuthGuard>
    ),
  };
  const routes = [
    LoginRoute,
    pricingAsyncRoutes,
    staffAsyncRoutes,
    zoneAsyncRoutes,
    checkOutAsyncRoutes,
    asyncRoutes,
    ErrorRoutes,
    PAGE_NOT_FOUND_ROUTE,
  ];

  const router = createHashRouter(routes as unknown as RouteObject[]);
  return <RouterProvider router={router} />;
}
