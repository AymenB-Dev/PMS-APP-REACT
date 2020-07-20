import React, { Component } from 'react';
import {connect} from 'react-redux';
import {createProject} from '../../actions/projectActions';
import {Redirect} from 'react-router';



class CreateProject extends Component {

    state =
    {
        title:'',
        content:''
    }


    handleChange = (e) => 
    {
        this.setState(
            {
                [e.target.id]:e.target.value,
            }
        )
    }

    handleSubmit = (e) => 
    {
        e.preventDefault();
        if(this.state.tile!=='' && this.state.content!=='')
        {
            this.props.createProject(this.state);
            this.props.history.push('/');
        }
       
        else
            alert('you cannot submit an empty project');
    }

    render() {

        const {auth} = this.props;
        if(!auth.uid) 
            return <Redirect  to='/signIn'/>
        return (
            <div className="forms container valign-wrapper">
                <form onSubmit={this.handleSubmit} className="container white z-depth-1 center">
                    <h3>new project </h3>
                    <div className="input-field container">
                        <label htmlFor="title">title</label>
                        <input onChange={this.handleChange} id="title" type="text" />
                    </div>
                    <div className="input-field container">
                        <label htmlFor="content">content</label>
                        <textarea onChange={this.handleChange} id="content" className="materialize-textarea"></textarea>
                    </div>
                    <button className="submit-btn btn btn-large ">create</button>

                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => 
{
    return{
        auth:state.firebase.auth
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        createProject : (project) => dispatch(createProject(project))
    }
}


export default (connect(mapStateToProps,mapDispatchToProps))(CreateProject);
