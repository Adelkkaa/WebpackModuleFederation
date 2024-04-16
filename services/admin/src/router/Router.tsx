import { App } from "@/components/App";
import LazyAbout from "@/pages/About";
import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/about",
        element: (
          <Suspense fallback={"loading..."}>
            <LazyAbout />
          </Suspense>
        ),
      },
    ],
  },
]

export const router = createBrowserRouter(routes);

export default routes;
