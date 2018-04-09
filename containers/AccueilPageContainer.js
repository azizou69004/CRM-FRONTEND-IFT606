import React, {Component} from 'react';
//import Login from './Login';
import {connect} from 'react-redux';
import PageAccueil from '../components/PageAccueil';

import {loginRequest, changeForm} from '../actions/crmLogin'

class AccueilPageContainer extends Component {

	render() {
		let {formState} = this.props.crmLogin;
		//gestion derreur sur la div login

		return (
			<PageAccueil
				formState={formState}
			/>

		)
	}
}

// les fonctions redux
//valeurs
function mapStateToProps(state) {

	return {
		crmLogin: state.crmLogin
	}
}

//fonctions
const mapDispatchToProps = (dispatch) => {

	return {
		loginRequest: (formData) => {
			dispatch(loginRequest(formData))
		},
		changeForm: (newFormState) => {
			dispatch(changeForm(newFormState))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(AccueilPageContainer)
