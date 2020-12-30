import React, { Component } from 'react';
import classes from './Auth.module.css'
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'
import Spinner from '../../UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    reqiured: true,
                    emailPattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
                },
                valid: false,
                touched: false,
                invalidMessage: 'Please enter valid e-mail address'
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    reqiured: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
                invalidMessage: 'Please enter valid password'
            }
        },
        formIsValid: false,
        isSignup: true
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath('/')
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }

        let formIsValid = true;
        for (const input in updatedControls) {
            formIsValid = updatedControls[input].valid && formIsValid;
        }

        this.setState({controls: updatedControls, formIsValid: formIsValid})
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

        if (rules.emailPattern) {
            isValid = rules.emailPattern.test(value);
        }

        return isValid;
    }

    authHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
    }

    authModeChangeHandler = (event) => {
        event.preventDefault();
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup
            }
        })
    }

    render() {
        const formElementsArr = [];
        for (const key in this.state.controls) {
            formElementsArr.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = (
            formElementsArr.map(inputElement => (
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
            ))
        );

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;
        if(this.props.error) {
        
            errorMessage = this.props.error.message
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form>
                    {form}
                    <Button 
                        btnType='Success'
                        disabled={!this.state.formIsValid}
                        clicked={this.authHandler} >{this.state.isSignup ? 'SIGN UP' : 'LOG IN'}</Button>
                    <Button 
                        btnType='Danger'
                        clicked={this.authModeChangeHandler} >SWITCH TO {this.state.isSignup ? 
                                                                            'LOG IN' : 'SIGN UP'}</Button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);