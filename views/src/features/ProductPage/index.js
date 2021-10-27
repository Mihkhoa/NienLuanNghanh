import React from "react";
import {Route, useRouteMatch, Switch} from "react-router-dom";
import NotFound from "../../components/NotFound";
import InfoProduct from "./InfoProduct";
import MainProductPage from "./MainPageProduct";

function ProductPage() {
  const match = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route exact path={match.url} component={MainProductPage} />
        <Route exact path={`/product/:MaSP`}>
          <InfoProduct />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default ProductPage;
