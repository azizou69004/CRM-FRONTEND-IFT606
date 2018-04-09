import React, { Component } from 'react';
//import Login from './Login';
import { connect  } from 'react-redux';
import Login from '../components/form/Login';

//import '../style/Login.css';
/// TODO
import {loginRequest, changeForm} from '../actions/crmLogin'
import {changeLoadingLogin} from "../actions/crmDashboard";

class LoginPage extends Component   {

	render() {
		let { formState , isLoading, error } = this.props.crmLogin;
		let {loadingLogin} = this.props.crmDashboard;
		//gestion derreur sur la div login

		return(

                <Login onSubmit = {this.props.loginRequest}
                       formState = {formState}
                       isLoading = {isLoading}
                       error = {error}
					   loadingLogin={loadingLogin}
                       changeForm = {this.props.changeForm} />
		)
	}
}

// les fonctions redux
//valeurs
function mapStateToProps (state) {

	return{
		crmLogin: state.crmLogin,
		crmDashboard: state.crmDashboard
	}
}

//fonctions
const  mapDispatchToProps = (dispatch) => {

	return{
		loginRequest: (formData) => {
			dispatch(loginRequest(formData));
			dispatch(changeLoadingLogin(true));
		},
		changeForm : (newFormState) => {
			dispatch(changeForm(newFormState))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (LoginPage)
