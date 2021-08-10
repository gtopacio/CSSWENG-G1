import React, {useState} from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarDataAdmin';
import { IconContext } from 'react-icons';
import '../css/Sidebar.css';

import didaskologo from '../images/didaskologotrim.png'

export default function Sidebar() {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
    return (
        <IconContext.Provider value={{ color: '#000000' }}>
            <div className='navbar d-flex flex-row justify-content-start'>
                <div className="p-1">
            <Link to='#' className='menu-bars'>
                <FaIcons.FaBars onClick={showSidebar} />
            </Link>
            </div>
                <div className="p-1">
                    <img src={didaskologo}
                        width="150"
                        Alt="didasko"
                    />
                </div>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
                <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                    <AiIcons.AiOutlineClose />
                </Link>
                </li>
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
        </IconContext.Provider>
    )
}