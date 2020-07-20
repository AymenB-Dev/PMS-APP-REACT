import React from 'react';
import {NavLink} from 'react-router-dom';


const SignedOutLinks = () => 
{
    return(
        <ul id="nav-mobile" className="right">
            <li><NavLink to="/signIn">sign in</NavLink></li>
            <li><NavLink to="/signUp">sign up</NavLink></li>
        </ul>
    )
}



export default SignedOutLinks;