import React  from 'react'
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {Redirect} from 'react-router';
import {deleteProject} from '../../actions/projectActions';

const ProjectDetails = ({project,auth,projectId,history,deleteProject}) => 
{
    if(!auth.uid) 
        return <Redirect to='/signIn'/>
    if(project)
    {
        return (
        <div className="project-details container ">
            <i onClick={()=> {
                if(window.confirm('do you really want to delete this project ?'))
                {
                    deleteProject(projectId) ; 
                    history.push('/');
                    //window.location.reload(false);
                }}} className="right project-delete material-icons small">delete</i>

            <div className="card ">
                <div className="card-content">
                    <span className="card-title">
                        {project.title}
                    </span>
                    
                    <p>{project.content}</p>
                </div>
                <div className="card-action">
                    <span className=" contributor">{'by : '+project.authorFirstName+' '+project.authorLastName}</span>
                    <span className="right contribution-date">{project.createdAt.toString()}</span>
                </div>
            </div>
        </div>
        )
        
    }
    return (
            <div className="container center-align " >
                <p class="flow-text">Loading ...</p>
            </div>
    )
    
   
}


const mapStateToProps = (state,ownProps) => 
{
    const projectId = ownProps.match.params.project_id ; 
    const projects = state.firestore.data.projects;
    const project = projects ? projects[projectId] : null
    
    return {
         projectId ,
         project ,
         auth : state.firebase.auth,
         history:ownProps.history
    }
}

const mapDispatchToProps =(dispatch,ownProps) => 
{
    return{
        deleteProject : (id) =>  dispatch(deleteProject(id)),
        push:(url) => ownProps.history.push(url)  
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
        {collection : 'projects'}
    ])

)(ProjectDetails);