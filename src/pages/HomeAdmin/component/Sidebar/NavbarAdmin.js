import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './NavbarAdmin.css';
import {MenuRounded, CloseRounded} from '@material-ui/icons'
import { AppBar, ListItem, Toolbar } from '@material-ui/core';

function NavbarAdmin() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
        <AppBar color="primary" position="static">
          <Link to='#' className='menu-bars'>
            <MenuRounded  onClick={showSidebar} />
          </Link>
        </AppBar>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <ListItem className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <CloseRounded />
              </Link>
            </ListItem>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      
    </>
  );
}

export default NavbarAdmin;
