import { App } from "@/components/App";
import LazyShop from "@/pages/Shop";
import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

export const routes = [
  {
    path: "/shop",
    element: <App />,
    children: [
      {
        path: "/shop/main",
        element: (
          <Suspense fallback={"loading..."}>
            <LazyShop />
          </Suspense>
        ),
      },
      {
        path: "/shop/second",
        element: (
          <Suspense fallback={"loading..."}>
            <div style={{color: 'red'}}>second</div>
          </Suspense>
        ),
      },
    ],
  },
];


export const router = createBrowserRouter(routes);

export default routes;
