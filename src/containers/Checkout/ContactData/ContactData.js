import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
class ContactData extends Component{
    state={
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:''
        },
        loading:false
    }
    orderHandler = (event) => {
        //So that that page doesn't automatically refresh
        event.preventDefault();

        // while we are doing a post request we set loading to true
        // so that we can show a spinner for the orderSummary
        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Bob Dylan',
                address: {
                    street: 'street 1',
                    zipCode: '11330',
                    country: 'Germany'
                },
                email: 'hi@gmail.com',

            },
            deliveryMethod: 'fastest'
        }
        //Once the request reaches response it is done loading so we do not 
        //need it to load anymore && if there is an error stop loading
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response.data)
                this.setState({ loading: false})
                this.props.history.push('/')
            })
            .catch(error => 
                this.setState({ loading: false}))
        }
        
    
    render(){
        let form = (
            
                <form >
                    <Input inputtype ='text' name='name' placeholder='Your name'></Input>
                    <Input inputtype ='text' name='email' placeholder='Your email'></Input>
                    <Input inputtype ='text' name='street' placeholder='Your street'></Input>
                    <Input inputtype ='text' name='postal' placeholder='Your postal'></Input>
                    <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
                </form>
           
        )
        if(this.state.loading){
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact info</h4>
            {form}
            </div>
        )
    }
}
export default ContactData;
