import { Outlet } from "react-router-dom";
import "./New.scss";

export const App = () => {
  return (
    <div>
      <h1>ADMIN MODULE</h1>
      <Outlet />
    </div>
  );
};
