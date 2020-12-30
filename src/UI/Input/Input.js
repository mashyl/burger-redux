import React from 'react';
import classes from './Input.module.css'

const Input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    let invalidMessage = null;

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        invalidMessage = <p className={classes.InvalidMessage} >{props.invalidMessage}</p>;
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input 
                                key={props.id}
                                className={inputClasses.join(' ')}
                                {...props.elementConfig}
                                value={props.value}
                                onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea 
                                key={props.id}
                                className={inputClasses.join(' ')}
                                {...props.elementConfig}
                                value={props.value}
                                onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = <select
                                key={props.id}
                                className={inputClasses.join(' ')}
                                value={props.value}
                                onChange={props.changed} >
                                {props.elementConfig.options.map(option => (
                                    <option key={option.value} value={option.value}>{option.displayValue}</option>
                                ))}
                            </select>;
            break;
        default:
            inputElement = <input 
                                key={props.id}
                                className={inputClasses}
                                {...props.elementConfig}
                                value={props.value}
                                onChange={props.changed} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {invalidMessage}
        </div>
    )
}

export default Input;