import React from 'react';
import classes from './Modal.css';
import Auxs from '../../../hoc/Auxs';
import Backdrop from '../Backdrop/Backdrop';
const modal = (props) => (
    <Auxs>
        <Backdrop show={props.show} clicked={props.modalClosed}></Backdrop>
    <div className={classes.Modal}
    style={{
        transform: props.show ? 'translateY(0)' :'translateY(-100vh)',//slides the modal down
        opacity: props.show ? '1' : '0'
    }}>
        {props.children}
    </div>
    </Auxs>
);

export default modal;