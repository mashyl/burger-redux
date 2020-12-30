import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import ToggleDrawer from '../../Navigation/SideDrawer/ToggleDrawer/ToggleDrawer';

const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        <ToggleDrawer toggleDrawerClicked={props.toggleDrawerClicked}/>
        <div className={classes.Logo} >
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavItems isAuthenticated={props.isAuth} />
        </nav>
    </header>
);

export default Toolbar;