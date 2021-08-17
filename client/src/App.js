import './App.css';
import HomePage from "./pages/home_page";
import AllCoursesPage from './pages/allCourses_page';
import CoursesPage from './pages/courses_page';
import AboutPage from "./pages/about_page";
import DashboardPage from './pages/dashboard_page';
import LoginPage from './pages/login_page';
import ProfilePage from './pages/profile_page';
import AssignPage from './pages/assign_page';
import CreateCourses from './pages/create_courses';
import LogoutPage from './pages/logout_page';
import ZoomPage from './pages/zoom_page';
import ZoomStuPage from './pages/zoom_student_page';
import TokenHandler from './components/TokenHandler';
import UserVerificationPage from './pages/user_verification_page';
import {UserProvider} from "./contexts/UserContext";
import {ErrorProvider} from "./contexts/ErrorContext";
import ErrorPopup from "./components/ErrorPopup";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div className="App" >
      <ErrorProvider>
        <ErrorPopup />
      <UserProvider>
        <TokenHandler />
        <Router>
          <Route path="/" exact component={HomePage} />
          <Route path="/allCourses" exact component={AllCoursesPage} />
          <Route path="/Courses" exact component={CoursesPage} />
          <Route path="/about" exact component={AboutPage} />
          <Route path="/dashboard" exact component={DashboardPage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/profile" exact component={ProfilePage} />
          <Route path="/logout" exact component={LogoutPage} />
          <Route path="/verify/:id" component={UserVerificationPage} />
          <Route path="/assign" exact component={AssignPage} />
          <Route path="/createCourses" exact component={CreateCourses} />
          <Route path="/zoom" exact component={ZoomPage} />
          <Route path="/zoomStu" exact component={ZoomStuPage} />
        </Router>
      </UserProvider>
      </ErrorProvider>
    </div>
  );
}
export default App;