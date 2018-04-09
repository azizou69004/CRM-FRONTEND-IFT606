import {take, fork} from 'redux-saga/effects';
import {SENDING_REQUEST_FOUR, getRequestFour} from '../actions/crmRechercheFournisseur';
import axios from 'axios';
import {store} from '../store';

export function * getListFournisseurs (){
	while(true){

		yield take(SENDING_REQUEST_FOUR);
		let tokenToSend= localStorage.getItem("cookieSession");
		if(tokenToSend === undefined)
			tokenToSend="";

		let config ={
				headers: {
					"Authorization": tokenToSend
				}
		};
		//communication avec server
		let server = "http://localhost:3002/providers";

		let backendUrl = window.location.host;
		backendUrl = backendUrl==='localhost:3000' ? server : 'https://salty-scrubland-22457.herokuapp.com/providers';

		axios.get(backendUrl, config)
			.then(function (response) {
				if(!!response.data.status && response.data.status === "success"){
					store.dispatch(getRequestFour(response.data.message));
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export function * FournisseursFlow () {
	yield fork (getListFournisseurs);
}
