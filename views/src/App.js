import "./App.css";
import "antd/dist/antd.css";
import React, {Suspense} from "react";
import NotFound from "./components/NotFound";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import AuthRoute from "./AuthRoute";

const LandingPage = React.lazy(() => import("./features/Home"));
const LoginPage = React.lazy(() => import("./features/Login"));
const RegisterPage = React.lazy(() => import("./features/Register"));
const ManagePage = React.lazy(() => import("./features/Manage"));
const Header = React.lazy(() => import("./components/Header"));
const ProductPage = React.lazy(() => import("./features/ProductPage/MainPageProduct"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading....</div>}>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/products" component={ProductPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <AuthRoute path="/manage" component={ManagePage} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;