import moment from 'moment';

export const createProject = (project) => 
{
    return (dispatch,getState,{getFirestore}) => 
    {
          //make async request

          const firestore = getFirestore();
          const profile = getState().firebase.profile;
          const userId = getState().firebase.auth.uid;

          firestore.collection('projects').add({
              ...project,
              authorFirstName:profile.firstName,
              authorLastName:profile.lastName,
              authorId:userId,
              createdAt : moment().format("DD-MM-YYYY HH:mm:ss")
          }).then( () => dispatch({type:'CREATE_PROJECT',project})).catch(
              (error) => dispatch({type:'CREATE_PROJECT_ERROR',error})
          )
    }
}

export const deleteProject = (id) => 
{
    return (dispatch,getState,{getFirestore}) => 
    {
        const firestore = getFirestore();
        firestore.collection('projects').doc(id).delete().then( 
            () => {dispatch({type:'DELETE_PROJECT'})}).catch(
            (error)=>dispatch({type:'DELETE_PROJECT_ERROR',error})
        );
    }
}