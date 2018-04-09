import {take, fork, put} from 'redux-saga/effects';
import {RESET_REQUEST, SENDING_REQUEST} from '../actions/crmReset';
//importer le salt pour le username et password
//import genSalt from '../salt';
import axios from 'axios';
import 'react-s-alert/dist/s-alert-default.css';

export function * resetFlow (){
	while(true){

		let reset = yield take(RESET_REQUEST);
		let {email} = reset.data;

		yield put ({ type: SENDING_REQUEST, sending:true})

		//communication avec server
		var server = "http://localhost:3002/Reset";
		//changer la location de la variable server pour plus de securite
		var backendUrl = window.location.host;
		backendUrl = backendUrl==='localhost:3000' ? server : 'https://salty-scrubland-22457.herokuapp.com/Reset';

		axios.post(backendUrl, {
			email: email,
		})
		.then(function (response) {
			if(!!response.data && response.data.status === "success"){
				document.getElementById("resetPasswordMsg").style.display = "";
				document.getElementById("resetPasswordMsgFail").style.display = "none";
				document.getElementById("courriel").value = "";
			}
			else {
				// rajouter une alert
				document.getElementById("resetPasswordMsgFail").style.display = "";
			}
		})
		.catch(function (error) {
			console.log(error);
		});
	}
}


export function * ResetEmailFlow () {
	yield fork (resetFlow)
}
