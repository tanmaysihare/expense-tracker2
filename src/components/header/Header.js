import React from "react";
import MainNavigation from "./MainNavigation";
import classes from './Header.module.css';

 const Header = (props)=> {
    return (
        <div className={classes.body}>
        <MainNavigation />
        <main>{props.children}</main>
        </div>
    );
 };
 export default Header;