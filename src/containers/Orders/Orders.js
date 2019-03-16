import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
class Orders extends Component {
    state={
        fetchedOrder: [],
        loading:true
    }
    componentDidMount(){
        axios.get('/orders.json')
        .then(res => {
            console.log(res.data)
            const fetchedOrder = []
            for(let key in res.data){
                fetchedOrder.push({
                    ...res.data[key] ,
                    id:key
                }) 
            }
            this.setState({fetchedOrder: fetchedOrder, loading:false })
            // console.log(this.state.fetchedOrder)
        })
        .catch(err => {
            this.setState({loading:false});
        });
    }
    render() {
        return (
            <div>
                {this.state.fetchedOrder.map(order => {
                    return <Order key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                    
                    />
                })
                }
                
            </div>
        );
    }
}

export default withErrorHandler(Orders,axios);