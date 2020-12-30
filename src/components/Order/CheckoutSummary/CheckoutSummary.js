import React from 'react';
import classes from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';
import Button from '../../../UI/Button/Button';

const CheckoutSummrary = (props) => {
    return (
        <div className={classes.CheckoutSummary} >
            <h1>We hope it tastes well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
                <Button 
                    btnType='Danger'
                    clicked={props.checkoutCancelled} >CANCEL</Button>
                <Button 
                    btnType='Success'
                    clicked={props.checkoutContinued} >CONTINUE</Button>
            </div>
        </div>
    )
}

export default CheckoutSummrary;