import './App.css';
import HomePage from "./pages/home_page";
import CoursesPage from './pages/courses_page';
import AboutPage from "./pages/about_page";
import DashboardPage from './pages/dashboard_page';
import LoginPage from './pages/login_page';
import ProfilePage from './pages/profile_page';
import LogoutPage from './pages/logout_page';
import {UserProvider} from "./contexts/UserContext";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div className="App" >
      <UserProvider>
        <Router>
          <Route path="/" exact component={HomePage} />
          <Route path="/courses" exact component={CoursesPage} />
          <Route path="/about" exact component={AboutPage} />
          <Route path="/dashboard" exact component={DashboardPage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/profile" exact component={ProfilePage} />
          <Route path="/logout" exact component={LogoutPage} />
        </Router>
      </UserProvider>
    </div>
  );
}
export default App;