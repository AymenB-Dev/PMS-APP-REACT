import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {signUp} from '../../actions/authActions';
import {validateForm} from '../../formControl/control';
import {errors} from '../../formControl/errors';
import {pattern} from '../../formControl/regEx';
export class SignUp extends Component {

    state =
    {
        email:'',
        password:'',
        firstName:'',
        lastName:'',

        firstNameError:'',
        lastNameError:'',
        emailError:'',
        passwordError:'',
    }


    handleChange = (e) => 
    {
        let formValide = validateForm(e.target,pattern[e.target.id]);
 
        if(formValide)
            this.setState({ [e.target.id]:e.target.value,[e.target.id+'Error']:''});
            
        else
            this.setState({[e.target.id]:'',[e.target.id+'Error']:errors[e.target.id+'Error']})

        
    }

    handleSubmit = (e) => 
    {
        e.preventDefault();
       if(this.state.firstName!=='' && this.state.lastName!=='' && this.state.email!=='' && this.state.password!=='')
            this.props.signUp(this.state);
        
    }

    render() {

        const {auth,authError} = this.props;

        if(auth.uid) 
            return <Redirect to='/'/>

        return (
            <div className="forms container valign-wrapper">
                <form onSubmit={this.handleSubmit} className="container white z-depth-1 center">
                    <h3>sign up</h3>
                    <div className="row container">
                        <div className="user-name col s12 m6">
                            <div className="input-field">
                                <label htmlFor="first-name">first name</label>
                                <input  onChange={this.handleChange} id="firstName" type="text" />
                                <div   className="form-error">{this.state.firstNameError}</div>
                            </div>
                        </div>
                        <div className="user-name col s12 m6">
                            <div className="input-field">
                                <label htmlFor="last-name">last name</label>
                                <input onChange={this.handleChange} id="lastName" type="text" />
                                <div  className="form-error">{this.state.lastNameError}</div>
                            </div>
                        </div>
                    </div>
                    <div className="input-field container">
                        <label htmlFor="email">email</label>
                        <input onChange={this.handleChange} id="email" type="email" />
                        <div  className="form-error">{this.state.emailError}</div>
                    </div>
                    <div className="input-field container">
                        <label htmlFor="password">password</label>
                        <input onChange={this.handleChange} id="password" type="password" />
                        <div className="form-error">{this.state.passwordError}</div>
                    </div>
                    <div className="container center-align red-text">
                        {authError ? <p>Email already exists</p> : null}
                    </div>
                    <button className="submit-btn btn btn-large ">sign up</button>

                </form>
            </div>
        )
    }
}


const mapStateToProps = (state) => 
{
    return {
        auth:state.firebase.auth,
        authError:state.auth.authError
    }
}


const mapDispatchToProps = (dispatch) => 
{
    return{
        signUp : (user) => dispatch(signUp(user))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUp);
