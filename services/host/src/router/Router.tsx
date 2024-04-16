import { App } from "@/components/App";
import { createBrowserRouter } from "react-router-dom";
import shopRoutes from "shop/Router"; // name/exposes
import adminRoutes from "admin/Router"; // name/exposes

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [...shopRoutes, ...adminRoutes],
  },
]);
