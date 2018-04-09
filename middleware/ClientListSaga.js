import {take, fork} from 'redux-saga/effects';
import axios from 'axios';
import {store} from '../store';
import {bindClientData, GET_CLIENT_REQ} from "../actions/crmClientList";
import {getContacts} from "../actions/crmContacts";

export function* getClient() {

	while (true) {

		let tokenToSend = localStorage.getItem("cookieSession");
		if (tokenToSend === undefined)
			tokenToSend = "";

		let config = {
			headers: {
				"Authorization": tokenToSend
			}
		};

		let clientReq = yield take(GET_CLIENT_REQ);
		let id = clientReq.idClient;

		//communication avec server
		let server = "http://localhost:3002/clients/" + id;
		let backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://salty-scrubland-22457.herokuapp.com/clients/' + id;


		axios.get(backendUrl, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					store.dispatch(bindClientData(response.data.message));
					store.dispatch(getContacts(id));
				} else {
					alert('Erreur lors du chargement du client');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}


export function* ClientListFlow() {
	yield fork(getClient);
}
