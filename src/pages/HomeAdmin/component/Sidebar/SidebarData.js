import React from 'react';
import {HomeRounded, ReportOutlined, ShoppingCart, People, EmailSharp} from '@material-ui/icons'

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <HomeRounded />,
    cName: 'nav-text'
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: < ReportOutlined />,
    cName: 'nav-text'
  },
  {
    title: 'Products',
    path: '/products',
    icon: <ShoppingCart />,
    cName: 'nav-text'
  },
  {
    title: 'Team',
    path: '/team',
    icon: <People />,
    cName: 'nav-text'
  },
  {
    title: 'Messages',
    path: '/messages',
    icon: <EmailSharp />,
    cName: 'nav-text'
  },

];
