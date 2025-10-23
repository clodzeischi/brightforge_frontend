import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import {AppLayout} from "./components/AppLayout.tsx";
import {Error} from "./pages/Error.tsx";
import {Splash} from "./pages/Splash.tsx";
import {Inventory} from "./pages/Inventory.tsx";
import {Employee} from "./pages/Employee.tsx";

const router = createBrowserRouter( [
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
            {path: 'splash', element: <Splash />},
            {path: 'inventory', element: <Inventory />},
            {path: 'employee', element: <Employee />},
            {index: true, element: <Splash />},
            {path: "*", element: <Error />}
        ]
    }])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
