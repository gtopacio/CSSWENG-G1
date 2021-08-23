import React from 'react';
import * as SiIcons from 'react-icons/si';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import * as CgIcons from 'react-icons/cg';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Assign Teacher',
    path: '/assign',
    icon: <MdIcons.MdAssignmentInd />,
    cName: 'nav-text'
  },
  {
    title: 'Create Webinar',
    path: '/courses/create',
    icon: <MdIcons.MdAssignmentReturned />,
    cName: 'nav-text'
  },
  {
    title: 'Modify Webinars',
    path: '/zoom',
    icon: <SiIcons.SiZoom />,
    cName: 'nav-text'
  },
  {
    title: 'Enrollment Requests',
    path: '/enrollment/requests',
    icon: <AiIcons.AiOutlineCheckSquare />,
    cName: 'nav-text'
  },
  {
    title: 'Log Out',
    path: '/logout',
    icon: <CgIcons.CgLogOut />,
    cName: 'nav-text'
  }
];