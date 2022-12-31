import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import { isLoggedIn } from "./Utils/Network";

let PrivateRoute = ({ props, children }) => {
  if (isLoggedIn()) return <Route {...props}>{children}</Route>;
  else return <Redirect to="/login" />;
};

console.log("isLoggedIn",isLoggedIn())


export { PrivateRoute };
