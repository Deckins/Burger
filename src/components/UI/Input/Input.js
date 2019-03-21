import React from 'react';
import classes from './Input.css';

const Input = (props) => {
    let inputElement = null;
    let invalidInput = null;
    const inputClasses = [classes.InputElement]
    
    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid)
        invalidInput = <p className={classes.ValidationError}>Please enter a valid {props.valueType}</p>
        console.log(invalidInput)
    }
    switch (props.elementType) {
        case ('input'):
            inputElement = 
            <input className= {inputClasses.join(' ')}
             onChange={props.changed} {...props.elementConfig} value={props.value} />;
            break;
        case ('textarea'):
            inputElement = <textarea className={classes.inputClasses.join(' ')} 
            onChange={props.changed}
            {...props.elementConfig} />;
            break;
        case ('select'):
            inputElement = (
                <select className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input onChange={props.changed} 
            className={classes.inputClasses.join(' ')}
            {...props.elementConfig} />
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {invalidInput}
        </div>
    )
}
export default Input;