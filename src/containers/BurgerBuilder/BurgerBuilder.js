import React, { Component } from 'react';
import Wrapper from '../../hoc/Wrapper';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import orderAxiosInstance from '../../orderAxiosInstance';
import Spinner from '../../UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/';

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    componentDidMount() {
        this.props.onFetchIngredients();
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({purchasing: true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push('/checkout')
    }

    updatePurchasable(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum,el) => {return sum + el},0);
        return sum > 0;
    }

    render() {
        const disabledInfo = {...this.props.ingrs};
        for(const ingr in disabledInfo) {
            disabledInfo[ingr] = disabledInfo[ingr] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients cannot be loaded</p> : <Spinner />;

        if(this.props.ingrs) {
            orderSummary = (<OrderSummary 
                        ingredients={this.props.ingrs}
                        price={this.props.price}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler} />)
            burger = (
                <Wrapper>
                    <Burger ingredients={this.props.ingrs} />
                    <BuildControls 
                        ingrAdded={this.props.onIngrAdded}
                        ingrDeleted={this.props.onIngrRemoved} 
                        disabledInfo={disabledInfo}
                        price={this.props.price}
                        isAuthenticated={this.props.isAuthenticated}
                        purchasable={this.updatePurchasable(this.props.ingrs)}
                        orderClick={this.purchaseHandler} />
                </Wrapper>
            )
        }
       
        return (
            <Wrapper>
                <Modal show={this.state.purchasing} closeModal={this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal>
                {burger}
            </Wrapper>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingrs: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngrAdded: (ingrName) => dispatch(actions.addIngredient(ingrName)),
        onIngrRemoved: (ingrName) => dispatch(actions.removeIngredient(ingrName)),
        onFetchIngredients: () => dispatch(actions.fetchIngridients()),
        onPurchaseInit: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, orderAxiosInstance));