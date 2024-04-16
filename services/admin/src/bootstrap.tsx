import { createRoot } from "react-dom/client";
import { App } from "./components/App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import LazyAbout from "@/pages/About";
import { router } from "./router/Router";

const root = document.getElementById("root");

if (!root) {
  throw new Error("root not found");
}

const container = createRoot(root);

container.render(<RouterProvider router={router} />);
