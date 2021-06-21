import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Switch, NavLink, Route } from "react-router-dom";
import Category from "./Components/Category";
import TestType from "./Components/TestType";
import TestParams from "./Components/TestParams";
import Doctor from "./Components/Doctor";
import Patient from "./Components/Patient";
import TestSelection from "./Pages/TestSelection";

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
            <li>
              <NavLink to="/register-doctor">DOCTOR</NavLink>
            </li>
            <li>
              <NavLink to="/register-patient">RegisterPatient</NavLink>
            </li>
            <li>
              <NavLink to="/test-selection">Test-Selection</NavLink>
            </li>
          </ul>
        </div>

        <div className="app-content">
          <Switch>
            <Route path="/category" component={Category} />
            <Route path="/types" component={TestType} />
            <Route path="/params" component={TestParams} />
            <Route path="/register-doctor" component={Doctor} />
            <Route path="/register-patient" component={Patient} />
            <Route path="/test-selection" component={TestSelection} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
