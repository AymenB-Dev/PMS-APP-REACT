import React from 'react' ;
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import NavBar from './component/layout/NavBar';
import Dashboard from './component/dashboard/Dashboard';
import ProjectDetails from './component/projects/ProjectDetails';
import SignIn from './component/auth/SignIn';
import SignUp from './component/auth/SignUp';
import  CreateProject  from './component/projects/CreateProject';

function App()  {

    return(

        <BrowserRouter>
          <div className="App">
            <NavBar/>
            <Switch>
                <Route exact path='/' component={Dashboard}/>
                <Route path='/project/:project_id' component={ProjectDetails}/>
                <Route path='/signIn' component={SignIn}/>
                <Route path='/signUp' component={SignUp}/>
                <Route path='/create' component={CreateProject}/>
            </Switch>
          </div>
        </BrowserRouter>
    );

  
}

export default App;
