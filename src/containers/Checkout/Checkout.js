import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
class Checkout extends Component {
    state={
      ingredients:null,
      price:0
    }
    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search)
        console.log(this.props)
        const ingredients = {};
        let price = 0;
        //query.entries returns an interator that allows for iteration through all key/value pairs in the obj
        for(let param of query.entries()){
            
            if(param[0] === 'price'){
                price = +param[1] 
            }else{
                ingredients[param[0]] = +param[1]
            }
        }
        this.setState({ingredients:ingredients, price:price})
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    render(){
        return(
            <div>
                <CheckoutSummary 
                ingredients={this.state.ingredients}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route path={this.props.match.path + '/contact-data'}
                render={(props) => (
                    <ContactData ingredients={this.state.ingredients} price={this.state.price}  {...props}/>
                )}/>
            </div>
        )
    }

}
export default Checkout;