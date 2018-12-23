import React from 'react';
import Aux from '../../hoc/Auxs';
import classes from './Layout.css'

const layout = (props) => (
    <Aux>
        <div>ToolBar SideDrawer Backdrop</div>
        <main className={classes.Content}>{props.children}</main>
    </Aux>
)

export default layout;