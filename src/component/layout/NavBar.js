import React from 'react';
import {Link} from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import {connect} from 'react-redux';




const NavBar = ({auth}) => 
{
    
    const links = (auth.uid !==undefined) ? <SignedInLinks/> : <SignedOutLinks/>
    return(
        <nav>
            <div className="nav-wrapper container">
                <Link  to="/"  id="logo"  className="left brand-logo ">PMS</Link>
                {links}
            </div>
      </nav>
    )
}

const mapStateToProps = (state) => 
{
    return{
        auth:state.firebase.auth
        
    }
}


export default connect(mapStateToProps)(NavBar);