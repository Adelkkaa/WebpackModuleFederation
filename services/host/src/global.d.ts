declare module "*.module.scss" {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg" {
  import React from "react";
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

declare const __PLATFORM__: "desktop" | "mobile";

declare module "shop/Router" {
  import { RouteObject } from "react-router-dom";
  const shopRoutes: RouteObject[];
  export default shopRoutes;
}

declare module "admin/Router" {
  import { RouteObject } from "react-router-dom";
  const adminRoutes: RouteObject[];
  export default adminRoutes;
}
