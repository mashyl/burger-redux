import React from 'react';

import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import Wrapper from '../../../hoc/Wrapper';
import classes from './SideDrawer.module.css';

const SideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.showSideDrawer) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }

    return (
        <Wrapper>
            <Backdrop showBackdrop={props.showSideDrawer} backdropClicked={props.closeSideDrawer}/>
            <div className={attachedClasses.join(' ')} onClick={props.closeSideDrawer}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavItems isAuthencticated={props.isAuth} />
                </nav>
            </div>
        </Wrapper>
    )
}

export default SideDrawer;