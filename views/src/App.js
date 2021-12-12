import "antd/dist/antd.css";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import AuthRoute from "./AuthRoute";
import NotFound from "./components/NotFound";

const LandingPage = React.lazy(() => import("./features/Home"));
const Header = React.lazy(() => import("./components/Header"));
const LoginPage = React.lazy(() => import("./features/Login"));
const RegisterPage = React.lazy(() => import("./features/Register"));
const ManagePage = React.lazy(() => import("./features/Manage"));
const ProductPage = React.lazy(() => import("./features/ProductPage"));
const InfoProductPage = React.lazy(() => import("./features/InfoProduct"));
const CartPage = React.lazy(() => import("./features/cart"));
const OrderPage = React.lazy(() => import("./features/OrderPage"));
const PaymentPage = React.lazy(() => import("./features/PaymentPage"));
const Sales = React.lazy(() => import("./features/SalesPage"));
const ProfilePage = React.lazy(() => import("./features/ProfilePage"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading....</div>}>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/products" component={ProductPage} />
            <Route exact path="/product/:MaSP" component={InfoProductPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/cart" component={CartPage} />
            <Route path="/payment" component={PaymentPage} />
            <Route path="/sales" component={Sales} />
            <Route path="/order" component={OrderPage} />
            <Route path="/profile" component={ProfilePage} />
            <AuthRoute path="/manage" component={ManagePage} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
