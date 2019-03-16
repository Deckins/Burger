import React, {Component} from 'react';
import Aux from '../Auxs/Auxs';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state ={
            error:null
        }
        //Since this component is a HOC it wraps other components
        //Since withErrorHandler wraps BurgerBuilder the childcomponent will
        //execute its render lifecycle first so that is why we must use
        //componentwillMount in withErrorHandler because it will established our
        //error handlers before it enters the child component 
        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error:null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error:error})
            })
        }
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.request.eject(this.resInterceptor)

        }
        errorConfirmedHandler = () => {
            this.setState({error:null})
        }
        render() {
            return(
                <Aux>
                    <Modal show={this.state.error}
                    modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }

}

export default withErrorHandler;