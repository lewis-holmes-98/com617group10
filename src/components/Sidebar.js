import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const sidebarNavItems = [
    {
        display: 'Map',
        // icon,
        to: '/map',
        section: ''
    },
    {
        display: 'Brides Les Bains',
        // icon,
        to: '/',
        section: ''
    },
    {
        display: 'Courchevel',
        // icon,
        to: '/',
        section: ''
    },
    {
        display: 'Saint Martin de Believille',
        // icon,
        to: '/',
        section: ''
    },
    {
        display: 'Meribel',
        // icon,
        to: '/map',
        section: ''
    },
    {
        display: 'Les Menuires',
        // icon,
        to: '/',
        section: ''
    },
    {
        display: 'Val Thorens',
        // icon,
        to: '/',
        section: ''
    },
    {
        display: 'Orelle',
        // icon,
        to: '/',
        section: ''
    },
]

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 50);
    }, []);

    // change active index
    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    return <div className='sidebar'>
        <div ref={sidebarRef} className="sidebar__menu ">
            <div
                ref={indicatorRef}
                className="sidebar__menu__indicator"
                style={{
                    transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
                }}
            ></div>
            {
                sidebarNavItems.map((item, index) => (
                    <Link to={item.to} key={index}>
                        <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''} py-4 px-2 text-white border-b-4 font-semibold bg-slate-500 hover:bg-slate-300 border-slate-500 transition duration-300 `}>
                            <div className="sidebar__menu__item__icon">
                                {item.icon}
                            </div>
                            <div className="sidebar__menu__item__text">
                                {item.display}
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    </div>;
};

export default Sidebar;