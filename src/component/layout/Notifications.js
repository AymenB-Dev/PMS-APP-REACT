import React  from 'react';
import {connect} from 'react-redux';
import moment from 'moment';



const Notifications = ({notifications}) => 
{
    const notificationsList = (notifications) ? (notifications.map(notification => {
        return   <li className="notification-item">
                    <div>
                        <span className="notifications-user">{notification.user}</span>
                        <span className="notifications-content">{notification.content}</span>
                    </div>
                    <div className="notifications-time">{moment(notification.time.toDate()).fromNow()}</div>
                </li>     
    }
    )) : null ;
    return(
        <ul id='notification' className='dropdown-content z-depth-1'>
            {notificationsList}
        </ul>
    )
}


export default  connect()(Notifications);