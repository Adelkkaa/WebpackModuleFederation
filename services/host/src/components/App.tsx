import { Link, Outlet } from "react-router-dom";
import "./New.scss";

import { aboutRoutes, shopRoutes } from "@packages/shared";

export const App = () => {
  return (
    <div>
      <h1>PAGE</h1>
      <nav>
      <Link to={shopRoutes.main}>Shop</Link>
      <Link to={aboutRoutes.about}>about</Link>
      </nav>

      <Outlet />
    </div>
  );
};
