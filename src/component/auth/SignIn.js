import React, { Component } from 'react'
import {connect} from 'react-redux';
import {signIn} from '../../actions/authActions';
import { Redirect } from 'react-router';
import {validateForm} from '../../formControl/control';
import {errors} from '../../formControl/errors';
import {pattern} from '../../formControl/regEx';
export class SignIn extends Component {

    state =
    {
        email:'',
        password:'',

        emailError:'',
        passwordError:''
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
        if(this.state.email!=='' && this.state.password!=='')
            this.props.signIn(this.state);
    }

    render() {
        const {auth,authError} = this.props;

        if(auth.uid)
            return <Redirect to='/'/>
        return (
            <div className="forms container valign-wrapper">
                <form onSubmit={this.handleSubmit} className="container white z-depth-1 center">
                    <h3>sign in</h3>
                    <div className="input-field container">
                        <label htmlFor="email">email</label>
                        <input onChange={this.handleChange} id="email" type="email" />
                        <div   className="form-error">{this.state.emailError}</div>
                    </div>
                    <div className="input-field container">
                        <label htmlFor="password">password</label>
                        <input onChange={this.handleChange} id="password" type="password" />
                        <div   className="form-error">{this.state.passwordError}</div>
                    </div>
                    <div className="container center-align red-text">
                        {authError ? <p>Invalide email or password</p> : null}
                    </div>
                    <button className="submit-btn btn btn-large ">sign in</button>

                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => 
{
    return {
        authError: state.auth.authError,
        auth:state.firebase.auth
    }
}
const mapDispatchToProps = (dispatch) => 
{
    return{
        signIn:(credentials) => dispatch(signIn(credentials))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(SignIn);

