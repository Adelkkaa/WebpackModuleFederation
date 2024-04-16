import React from "react";
import { Link } from "react-router-dom";
import { shopRoutes } from "@packages/shared";

const Shop = () => {
  return (
    <div>
      Shop
      <div>
        <Link to={shopRoutes.second}>Go to second page</Link>
      </div>
    </div>
  );
};

export default Shop;
