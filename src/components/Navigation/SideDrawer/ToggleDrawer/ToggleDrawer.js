import React from 'react';
import classes from './ToggleDrawer.module.css';

const ToggleDrawer = (props) => (
    <div className={classes.ToggleDrawer} onClick={props.toggleDrawerClicked}>
        <div></div>        
        <div></div>        
        <div></div>        
    </div>
)
    
export default ToggleDrawer;