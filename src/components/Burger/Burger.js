import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';

const Burger = (props) => {
    let transformedIngrs = Object.keys(props.ingredients)
        .map(IgKey => {
            return [...Array(props.ingredients[IgKey])].map((_, i) => {
               return <BurgerIngredient key={IgKey + i} type={IgKey} />
            });
        })
        .reduce((arr,el) => {
            return arr.concat(el);
        }, [])

        if (transformedIngrs.length === 0) {
            transformedIngrs = <p>Please, start adding ingredients.</p>
        }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {transformedIngrs}
            <BurgerIngredient type='bread-bottom' />
        </div>
    )
}

export default Burger;