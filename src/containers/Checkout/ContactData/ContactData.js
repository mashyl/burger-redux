import React, { Component } from 'react';
import {connect} from 'react-redux';
import Button from '../../../UI/Button/Button';
import Spinner from '../../../UI/Spinner/Spinner';
import Input from '../../../UI/Input/Input';
import classes from './ContactData.module.css';
import * as actions from '../../../store/actions/index'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    reqiured: true
                },
                valid: false,
                touched: false,
                invalidMessage: 'Name field can`t be empty'
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    reqiured: true
                },
                valid: false,
                touched: false,
                invalidMessage: 'Please enter valid e-mail address'
            },
            street: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    reqiured: true
                },
                valid: false,
                touched: false,
                invalidMessage: 'Please enter your address'
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP CODE'
                },
                value: '',
                validation: {
                    reqiured: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false,
                invalidMessage: 'Please enter a valid zip-code'
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.reqiured) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true})
        const formData = {};
        for (const key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }
        this.props.onOrderSubmit(order, this.props.token)
    }

    inputChangedHandler = (event, inpIdentifier) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedOrderForm[inpIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedOrderForm[inpIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (const input in updatedOrderForm) {
            formIsValid = updatedOrderForm[input].valid && formIsValid;
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render() {
        const formElementsArr = [];
        for (const key in this.state.orderForm) {
            formElementsArr.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form>
                {formElementsArr.map(inputElement => (
                    <Input 
                        key={inputElement.id}
                        elementType={inputElement.config.elementType}
                        value={inputElement.config.value}
                        elementConfig={inputElement.config.elementConfig}
                        invalid={!inputElement.config.valid}
                        shouldValidate={inputElement.config.validation}
                        touched={inputElement.config.touched}
                        invalidMessage={inputElement.config.invalidMessage}
                        changed={(event) => this.inputChangedHandler(event, inputElement.id)} />
                ))}
                <Button 
                    btnType='Success'
                    disabled={!this.state.formIsValid}
                    clicked={this.orderHandler} >ORDER</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData} >
                <h4>Enter you contact data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderSubmit: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);