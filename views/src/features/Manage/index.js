import {React} from "react";

import {Route, useRouteMatch, Switch} from "react-router-dom";
import NotFound from "../../components/NotFound";

import MenuManage from "./components/MenuManage";
import addProducts from "./pages/AddProduct";
import ListProducts from "./pages/ListProducts";
import MainPage from "./pages/Main";

function Manage() {
  const match = useRouteMatch();
  return (
    <div>
      <MenuManage />
      <Switch>
        <Route exact path={match.url} component={MainPage} />
        <Route path={`${match.url}/add`} component={addProducts} />
        <Route path={`${match.url}/products`} component={ListProducts} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default Manage;
