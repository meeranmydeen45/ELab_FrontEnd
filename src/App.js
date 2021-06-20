import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Switch, NavLink, Route } from "react-router-dom";
import Category from "./Components/Category";
import TestType from "./Components/TestType";

function App() {
  return (
    <div className="app-Page">
      <BrowserRouter>
        <div className="app-Head">
          <ul>
            <li>
              <NavLink to="/category">Categories</NavLink>
            </li>
            <li>
              <NavLink to="/types">Types</NavLink>
            </li>
            <li>
              <NavLink to="/params">Params</NavLink>
            </li>
          </ul>
        </div>

        <div className="app-content">
          <Switch>
            <Route path="/category" component={Category} />
            <Route path="/types" component={TestType} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
