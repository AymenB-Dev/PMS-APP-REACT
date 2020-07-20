import React ,{useEffect} from 'react';
import ProjectList from '../projects/ProjectList';
import {connect} from 'react-redux';
import {getFirestore} from 'redux-firestore';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {Redirect} from 'react-router';


const Dashboard = ({projects,auth}) =>
{
    useEffect(()=>{
        getFirestore().collection('projects').onSnapshot( snap => {
            let changes = snap.docChanges() ;
            changes.forEach(change => {
               if(change.type==='removed')
                    {
                        let project= document.querySelector('a[href="/project/'+change.doc.id+'"]');
                        let projectList=document.querySelector('.project-list');
                        if(project!==null)
                            projectList.removeChild(project);
                    }
            });
        });
    },[])


    if(!auth.uid)
        return <Redirect to='/signIn' />


    return(
        <div className="dashboard container">
            <div className="row center-align">
                    <ProjectList projects={projects}/>
            </div>
        </div>
    )

}



const mapStateToProps = (state) => 
{
    return{
        projects:state.firestore.ordered.projects,
        auth:state.firebase.auth,
    }
}


export default  compose(
    connect(mapStateToProps),
    firestoreConnect([{ collection : 'projects' , orderBy:['createdAt','desc']}])
)(Dashboard);