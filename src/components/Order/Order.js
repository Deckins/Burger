import React from 'react';
import classes from './Order.css';
const Order = (props) => {
    console.log(props.ingredients)
    const ingredients = []
    for(let ingredientName in props.ingredients){
        ingredients.push({
            name:ingredientName,
            amount:props.ingredients[ingredientName],
            
        })
    }
    console.log(ingredients)
    // const ingredientMap = props.ingredients.map(ig => {
    //     return (
    //         {ig.value}
    //     )
    // })
    const ingredientOutput = ingredients.map(ig => {
            return(
                
                <span 
                style={{
                    textTransform: 'capitalize',
                    display:'inline-block',
                    margin: '0 8px',
                    border:'1px solid #ccc',
                    padding: '5px'
                    }}
                >{ig.name}: {ig.amount}</span>
            )
        }    
    )
        
        // console.log(ingredientOutput)
    return(
    <div className={classes.Order}>
        <p>Ingredients: </p>
        {ingredientOutput}
        <p>Price: {props.price}</p>
    </div>
    )
}
export default Order;