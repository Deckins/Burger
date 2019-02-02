import React, {Component} from 'react';
import classes from './Modal.css';
import Auxs from '../../../hoc/Auxs/Auxs';
import Backdrop from '../Backdrop/Backdrop';
class Modal extends Component{
    // if show receieves a dif value then it will update
    shouldComponentUpdate(nextProps,nextState){
        return nextProps.show !== this.props.show 
        || nextProps.children !== this.props.children;
    }

    componentWillUpdate(){
        console.log('[Modal] will update!')
    }
    render(){
       
        return(
            <Auxs>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}></Backdrop>
                <div className={classes.Modal}
                style={{
                    transform: this.props.show ? 'translateY(0)' :'translateY(-100vh)',//slides the modal down
                    opacity: this.props.show ? '1' : '0'
                }}>
                {this.props.children}
                </div>
            </Auxs>
    
        )
    }
}
   

export default Modal;