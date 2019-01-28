import React from 'react';
import classes from './Backdrop.css'

/*Depending on value of show it will display it or not*/ 
const backDrop = (props) => (
    props.show ? 
    <div className={classes.Backdrop} onClick={props.clicked}></div> : 
    null
)

export default backDrop;