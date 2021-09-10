import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as CgIcons from 'react-icons/cg';
import * as SiIcons from 'react-icons/si';


export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Courses',
    path: '/courses',
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
  {
    title: 'Zoom',
    path: '/zoomStu',
    icon: <SiIcons.SiZoom />,
    cName: 'nav-text'
  },
  {
    title: 'Enrollment Requests',
    path: '/enrollment/requests',
    icon: <FaIcons.FaFileInvoice />,
    cName: 'nav-text'
  },
  {
    title: 'Notifications (1)',
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