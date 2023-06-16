import React, { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { ROUTER } from "../utils/path";
import { LayoutAuthentication, LayoutDefault } from "../layouts";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Autentication/Login/Login";


// const ListEmployee = React.lazy(() => import("../pages/Employee/ListEmployee"));
//được bảo vệ
function ProtectedRoute() {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTER.login} />;
}
//bị từ chối
function RejectedRoute() {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return !isAuthenticated ? <Outlet /> : <Navigate to={ROUTER.dashboard} />;
}
const routersPublic = [
  // {
  //   path: "",
  //   element: (
  //     <LayoutDefault>
  //       <Dashboard></Dashboard>
  //     </LayoutDefault>
  //   ),
  // },
  {
    path: "",
    element: <ProtectedRoute></ProtectedRoute>,
    children: [
      {
        path: ROUTER.dashboard,
        element: (
          <LayoutDefault>
            <Suspense fallback={<div>Loading...</div>}>
              <Dashboard />
            </Suspense>
          </LayoutDefault>
        ),
      },
    ],
  },
  {
    path: "",
    element: <RejectedRoute></RejectedRoute>,
    children: [
      {
        path: ROUTER.login,
        element: (
          <LayoutAuthentication>
            <Login></Login>
          </LayoutAuthentication>
        ),
      },
    ],
  },
  // {
  //   path: "*",
  //   element: <NotFound></NotFound>,
  // },
];
const routersPrivate = [{}];
export { routersPublic, routersPrivate };
