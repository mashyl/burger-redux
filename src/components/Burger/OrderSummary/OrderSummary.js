import React, { Component } from 'react';
import Wrapper from '../../../hoc/Wrapper';
import Button from '../../../UI/Button/Button';

class OrderSummary extends Component {
    render() {
        const ingrSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return <li key={igKey}>{igKey}: {this.props.ingredients[igKey]}</li>
            });

        return (
            <Wrapper>
                <h3>Your Order</h3>
                <p>A burger with these ingredients:</p>
                <ul> {ingrSummary} </ul>
                <p><strong>Total price: ${this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType='Danger' clicked={this.props.purchaseCancelled} >CANCEL</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinued} >CONTINUE</Button>
            </Wrapper>
        )
    }
} 

export default OrderSummary;