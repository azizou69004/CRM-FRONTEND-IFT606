/** Imports **/
import axios from 'axios';
import {push} from 'react-router-redux';

import 'react-s-alert/dist/s-alert-default.css';

import {fork, put, take} from 'redux-saga/effects';
import {RESET_PASSWORD_REQUEST, sendingRequest} from '../actions/crmResetPassword';
import {store} from '../store';

export function* resetPasswordFlow() {

	while (true) {

		let reset = yield take(RESET_PASSWORD_REQUEST);
		let {newPassword, confirmPassword} = reset.data;
		let resetToken = reset.token;

		yield put(sendingRequest(true));


		// TODO: Add a .ENV file?
		let server = "http://localhost:3002/ResetPassword";
		//changer la location de la variable server pour plus de securite
		var backendUrl = window.location.host;
		backendUrl = backendUrl==='localhost:3000' ? server : 'https://salty-scrubland-22457.herokuapp.com/ResetPassword';
	
		axios.post(backendUrl, {
			confirmPassword: newPassword,
			newPassword: confirmPassword,
			resetToken: resetToken
		}).then((response) => {
			if (!!response.data && response.data.status === 'success') {
				alert("Votre mot de passe a été changé");
				store.dispatch(push('/'));
			}
			else {
				// rajouter une alert
				alert('Mot de passe non changé\n\n' + response.data.message);
			}
		})
			.catch((error) => {
				console.log(error);
			});
	}
}

export function* ResetPasswordFlow() {
	yield fork(resetPasswordFlow)
}
