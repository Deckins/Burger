import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
class ContactData extends Component{
    state={
        orderForm: {
            name:{
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Your Name'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            }, 
            
            street: {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Your Street'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder:'ZIP CODE'
                },
                value: '',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:5,
                    isNumeric: true
                },
                valid:false,
                touched:false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Country'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type:'email',
                    placeholder:'Your email'
                },
                value: '',
                validation:{
                    required:true,
                    isEmail: true
                },
                valid:false,
                touched:false
            },
        deliveryMethod: {
            elementType: 'select',
            elementConfig:{
            options:[
                {value:'fastest', displayValue: 'Fastest'},
                {value:'cheapest', displayValue: 'Cheapest'}
            ]},
            validation:{
                required:false
            },
            value:'fastest',
            valid:false
        }
    },
        formIsValid: false,
        loading:false
    
    }
    orderHandler = (event) => {
        //So that that page doesn't automatically refresh
        event.preventDefault();
        // while we are doing a post request we set loading to true
        // so that we can show a spinner for the orderSummary
        this.setState({ loading: true })
        const formData = {}
        for(let data in this.state.orderForm){
            formData[data] = this.state.orderForm[data].value
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer:formData
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
        
    inputChangeHandler = (event,identifier) => {
        const updatedOrderForm = {...this.state.orderForm}
        const orderFormElement = {...updatedOrderForm[identifier]};
        orderFormElement.value = event.target.value;
        //each input will have valid set to true/false depending on checkValidity. If it returns false
        //then it will trigger css:invalid selector
        orderFormElement.valid = this.checkValidity(orderFormElement.value,orderFormElement.validation)
        orderFormElement.touched = true;
        updatedOrderForm[identifier] = orderFormElement;
        // console.log(orderFormElement)
        //formIsValid is only true if all other inputs are valid else submit button is disabled
        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
    }
    checkValidity =(value, rules) => {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }
    render(){
        const formElementArray = [];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        let form = (
                <form onSubmit={this.orderHandler}>
                    {formElementArray.map(formElement => {
                       return <Input 
                        key={formElement.id}
                        changed={(event) => this.inputChangeHandler(event,formElement.id)}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched ={formElement.config.touched}
                        value={formElement.config.value}
                        valueType={formElement.id}/>
                        
                    })} 
                    <Button btnType="Success" disabled={!this.state.formIsValid} >Order</Button>
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
