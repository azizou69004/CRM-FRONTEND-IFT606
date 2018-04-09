import {take, fork} from 'redux-saga/effects';
import {SENDING_REQUEST_COLL, getRequestClientColl} from '../actions/crmRechercheCollective';
import axios from 'axios';
import {store} from '../store';
import {changeLoading} from "../actions/crmDashboard";

export function* searchFlow() {
	while (true) {

		yield take(SENDING_REQUEST_COLL);
		let tokenToSend = localStorage.getItem("cookieSession");
		if (tokenToSend === undefined)
			tokenToSend = "";

		let config = {
			headers: {
				"Authorization": tokenToSend
			}
		};

		//communication avec server
		let server = "http://localhost:3002/assurancesCollectives";
		let backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://salty-scrubland-22457.herokuapp.com/assurancesCollectives';

		//changer la location de la variable server pour plus de securite
		axios.post(backendUrl, {}, config)
			.then(function (response) {
				if (!!response.data.clients) {
					store.dispatch(getRequestClientColl(response.data.clients));
					store.dispatch(changeLoading(false));
				}
			})
			.catch(function (error) {
				console.log(error);
			});

	}
}

export function* SearchCollectiveFlow() {
	yield fork(searchFlow)
}
