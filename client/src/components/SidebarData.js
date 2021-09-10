import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as CgIcons from 'react-icons/cg';

export const SidebarDataUser = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Courses',
    path: '/profile/courses',
    icon: <FaIcons.FaBook />,
    cName: 'nav-text'
  },
  {
    title: 'Chat',
    path: '/chat',
    icon: <BsIcons.BsChatSquareDots />,
    cName: 'nav-text'
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: <FaIcons.FaRegUserCircle />,
    cName: 'nav-text'
  },
  // {
  //   title: 'Zoom',
  //   path: '/zoomStu',
  //   icon: <SiIcons.SiZoom />,
  //   cName: 'nav-text'
  // },
  {
    title: 'Enrollment Requests',
    path: '/enrollment/requests',
    icon: <FaIcons.FaFileInvoice />,
    cName: 'nav-text'
  },
  {
    title: 'Notifications',
    path: '/messages',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: 'Log Out',
    path: '/logout',
    icon: <CgIcons.CgLogOut />,
    cName: 'nav-text'
  }
];