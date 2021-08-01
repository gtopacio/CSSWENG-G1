import './App.css';
import HomePage from "./pages/home_page";
import CoursesPage from './pages/courses_page';
import AboutPage from "./pages/about_page";
import DashboardPage from './pages/dashboard_page';
import LoginPage from './pages/login_page';
import SignupPage from './pages/signup_page';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div className="App" >
      <Router>
        <Route path="/" exact component={HomePage} />
          <Route path="/courses" exact component={CoursesPage} />
          <Route path="/about" exact component={AboutPage} />
          <Route path="/dashboard" exact component={DashboardPage} />
          <Route path="/login" exact component={LoginPage} /> 
          <Route path="/signup" exact component={SignupPage} /> 
        </Router>
    </div>
  );
}
export default App;