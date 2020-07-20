import React ,{useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {signOut} from '../../actions/authActions';
import {getFirestore} from 'redux-firestore';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import M from 'materialize-css';
import Notifications from './Notifications';



const SignedInLinks = (props) => 
{
    const {profile,notifications} = props;
    
    useEffect(() => {
        var tooltip = document.querySelectorAll('.tooltipped');
        M.Tooltip.init(tooltip);
        var dropdown = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(dropdown);

        getFirestore().collection('notifications').onSnapshot( snap => {
            let changes = snap.docChanges() ;
            changes.forEach(change => {
               if(change.type==='added')
                    {
                        console.log('notification added');
                        let notificationsBadge = document.querySelector('.notifications-badge.badge');
                        notificationsBadge.style.display='inline-block';
                    }
                if(change.type==='modified')
                    console.log('notifications modified')
            });
        });


    }, []);

    const handleNotifications = ()=> 
    {
        let notificationsBadge = document.querySelector('.notifications-badge');
        notificationsBadge.style.display='none';
    }

    return(
        <ul id="nav-signed-in-links" className="right">
            <li><NavLink to="/create">
                <i className="material-icons tooltipped" data-position="bottom" data-tooltip="add a new project">add_circle</i>
            </NavLink></li>            
            <li><a href="#!" onClick={props.signOut}>
                    <i className="material-icons large">exit_to_app</i>
                </a>
            </li>
            <li>
                <a onClick={handleNotifications} className="dropdown-trigger btn btn-floating btn-small white black-text"  data-target='notification'>
                    {profile.initials}
                </a>
                <span className="notifications-badge new badge red accent-2"></span>
                <Notifications notifications={notifications}/>
            </li>
        </ul>
    )
}



const mapStateToProps = (state) => 
{
    return{
        profile : state.firebase.profile,
        notifications : state.firestore.ordered.notifications,
    }
}
 
const mapDispatchToProps = (dispatch) => 
{
    return {
        signOut : () => dispatch(signOut())
    }
}






export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
        { collection : 'notifications', limit:5 , orderBy :['time','desc']}
    ])
)(SignedInLinks);