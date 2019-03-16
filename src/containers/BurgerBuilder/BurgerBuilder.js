import React, { Component } from 'react';
import Aux from '../../hoc/Auxs/Auxs';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
}
class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 0,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error:false
    }
    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients)
            .map((igKey) => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchaseable: sum > 0 });
    }
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const newIngredients = {
            ...this.state.ingredients
        }
        newIngredients[type] = newCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: newIngredients });
        this.updatePurchaseState(newIngredients);
    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount === 0) {
            return;
        }
        const newCount = oldCount - 1;
        const newIngredients = {
            ...this.state.ingredients
        }
        newIngredients[type] = newCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ totalPrice: newPrice, ingredients: newIngredients });
        this.updatePurchaseState(newIngredients);
    }
    purchasingHandler = () => {
        this.setState({ purchasing: true })
    }
    purchasingCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchasingContinueHandler = () => {
        //while we are doing a post request we set loading to true
        //so that we can show a spinner for the orderSummary
        // this.setState({ loading: true })
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Bob Dylan',
        //         address: {
        //             street: 'street 1',
        //             zipCode: '11330',
        //             country: 'Germany'
        //         },
        //         email: 'hi@gmail.com',

        //     },
        //     deliveryMethod: 'fastest'
        // }
        // //Once the request reaches response it is done loading so we do not 
        // //need it to load anymore && if there is an error stop loading
        // axios.post('/orders.jsn', order)
        //     .then(response => {
        //         console.log(response.data)
        //         this.setState({ loading: false, purchasing: false })
        //     })
        //     .catch(error => this.setState({ loading: false, purchasing: false }))
        const queryParams=[];
        for(let i in this.state.ingredients){
            //encodeURI so that the values can be used in the URL because of white space
            queryParams.push(encodeURIComponent(i)+ '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        // console.log(queryParams)
        queryParams.push('price=' +this.state.totalPrice);
        const queryString=queryParams.join('&')
        this.props.history.push({
            pathname:'/checkout',
            search: '?'+ queryString
        })


    }
    modalHandler = () => {
        this.setState({ purchasing: false })
    }
    componentDidMount() {
        console.log(this.props)
        axios.get('https://my-react-burger-d2699.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data })
                // console.log(response.data)
            })
            //catching error and outputting a custom message
            .catch(error =>{
                this.setState({error:true})
            })
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null
        //If an error occurs during get request then display an error
        let burger = this.state.error ? 
        <p>An error occured where the HTTP request could not be fulfilled</p> :
        <Spinner/>
        //If the data ingredients cannot be fetched from the server then it will just
        //keep loading
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchaseable={this.state.purchaseable}
                        order={this.purchasingHandler}
                    />
                </Aux>
            )
            orderSummary = (
                <OrderSummary
                ingredients={this.state.ingredients}
                purchaseContinued={this.purchasingContinueHandler}
                purchaseCanceled={this.purchasingCancelHandler}
                price={this.state.totalPrice}
                />
            )
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.modalHandler}>
                    {orderSummary}
                </Modal>
                {burger}

            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);