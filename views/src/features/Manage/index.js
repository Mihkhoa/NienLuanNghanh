import {React} from "react";

import {Route, useRouteMatch, Switch} from "react-router-dom";
import NotFound from "../../components/NotFound";

import MenuManage from "./components/MenuManage";
import addProduct from "./pages/AddProduct";
import ListProducts from "./pages/ListProducts";
import ListOrders from "./pages/ListOrders";
import MainPage from "./pages/Main";

function Manage() {
  const match = useRouteMatch();
  return (
    <div>
      <MenuManage />
      <Switch>
        <Route exact path={match.url} component={MainPage} />
        <Route path={`${match.url}/add`} component={addProduct} />
        <Route path={`${match.url}/products`} component={ListProducts} />
        <Route path={`${match.url}/list_orders`} component={ListOrders} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default Manage;
