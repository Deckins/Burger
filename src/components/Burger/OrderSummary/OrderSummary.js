import React from 'react';
import Aux from '../../../hoc/Auxs/Auxs';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map((igKey) => {
            return (
                <li>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
            )
        })
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Following Ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><span>Price: {props.price.toFixed(2)}</span></p>
            <p>Continue to checkout?</p>
            <Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>Cancel</Button>
        </Aux>
    )
}

export default orderSummary;