import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Pages
import Home from "./pages/home";
import Error404 from "./pages/error404";
import Login from "./pages/login";
import DashboardMenu from "./components/dashboardMenu";

require('dotenv').config();

function App() {
  return (
    <div className="App flex bg-gray">
      <Router>
        <Switch>
          <Route path="/dashboard">
            <DashboardMenu />
          </Route>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="*" exact component={Error404} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
