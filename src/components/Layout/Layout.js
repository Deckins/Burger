import React from 'react';
import Aux from '../../hoc/Auxs';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
const layout = (props) => (
    <Aux>
        <Toolbar></Toolbar>
        <div>ToolBar SideDrawer Backdrop</div>
        <main className={classes.Content}>{props.children}</main>
    </Aux>
)

export default layout;