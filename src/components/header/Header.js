import React from "react";
import MainNavigation from "./MainNavigation";
import classes from './Header.module.css';
import { useSelector } from "react-redux";

 const Header = (props)=> {
    const themeToggle = useSelector((state)=> state.theme.isDarkMode);
    console.log("is dark mode on or off:",themeToggle);
    return (
        <div className={`${themeToggle ? classes.darkMode : classes.header}`}>
        <MainNavigation />
        <main >{props.children}</main>
        </div>
    );
 };
 export default Header; 