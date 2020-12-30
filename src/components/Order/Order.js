import React from 'react';
import classes from './Order.module.css';

const Order = (props) => {
    const ingredients = [];
    for (let ingrName in props.ingredients) {
        ingredients.push({
            name: ingrName,
            amount: props.ingredients[ingrName]
        })
    }
    const inrgOutput = ingredients.map(ingr => {
    return <span
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px'
                }}
                key={ingr.name} >{ingr.name} - {ingr.amount}</span>
    })

    return (
    <div className={classes.Order} >
        <p>Ingredients: {inrgOutput}</p>
        <p>Price: <strong>${(+props.price).toFixed(2)}</strong></p>
    </div>);
};

export default Order;