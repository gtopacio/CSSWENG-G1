import logo from './logo.svg';
import './App.css';
import './css/Navbar.css' ;
import './css/Login.css' ;
import Navbar from './components/Navbar';
import Login from './components/Login';
import About from './components/About';
import AllCourses from './components/AllCourses';
import Home from './components/Home';
import MyAccount from './components/MyAccount';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/Home" component={Home}>
            <Home />
          </Route>
          <Route path="/AllCourses" component={AllCourses}>
            <AllCourses />
          </Route>
          <Route path="/About" component={About}>
            <About />
          </Route>
          <Route path="/MyAccount" component={MyAccount}>
            <MyAccount />
          </Route>

          <Route path="/Login" component={Login}>
          <Login/>
          </Route>
        </Switch>
    </Router>
    </div>
  );
}
export default App;
