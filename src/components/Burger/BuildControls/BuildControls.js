import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese',  type: 'cheese' },
]

const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls} >
            <p>Current price: <strong>${props.price.toFixed(2)}</strong></p>
            {controls.map((ctrl) => {
                return <BuildControl 
                            key={ctrl.label}
                            label={ctrl.label} 
                            ingrAdded={()=>props.ingrAdded(ctrl.type)}
                            ingrDeleted={()=>props.ingrDeleted(ctrl.type)} 
                            disabled={props.disabledInfo[ctrl.type]} />
            })}
            <button 
                className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.orderClick} >{props.isAuthenticated ? 'ORDER NOW' : 'SIGN UP TO CONTINUE'}</button>
        </div>
    )
}

export default BuildControls;