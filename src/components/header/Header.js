import React from "react";
import MainNavigation from "./MainNavigation";



 const Header = (props)=> {
    
    return (
        <div >
        <MainNavigation />
        <main >{props.children}</main>
        </div>
    );
 };
 export default Header; 