import {take, fork} from 'redux-saga/effects';
import axios from 'axios';
import {store} from '../store';
import {changeLoading} from "../actions/crmDashboard";
import {
	addArrayContacts,
	GET_CONTACTS, GET_CONTACTS_SUP, GET_POSTES_CONTACTS, GET_POSTES_CONTACTS_SUP, getPostesContacts,
	getPostesContactsSup, updateContacts,
	updateContactsSup,
	updatePostesContacts, updatePostesContactsSup
} from "../actions/crmContacts";

let tokenToSend = localStorage.getItem("cookieSession");
if (tokenToSend === undefined)
	tokenToSend = "";

let config = {
	headers: {
		"Authorization": tokenToSend
	}
};

export function* requestPostesContacts() {

	while (true) {

		let data = yield take(GET_POSTES_CONTACTS);
		let contacts = data.data;

		//communication avec server
		let server = "http://localhost:3002/clients/jobs";
		let backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://salty-scrubland-22457.herokuapp.com/clients/jobs';


		axios.get(backendUrl, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					let postes = response.data.message;
					if(!!contacts) {
						let array = contacts.map(contact => {
							let poste = 1;
							postes.forEach(element => {
								if(element.libelleposte === contact.libelleposte) {
									poste = element.idposte;
								}
							});
							return {...contact, idposte: poste, titre: contact.libelletitre}	;
						});
						store.dispatch(addArrayContacts(array));
					}
					store.dispatch(updatePostesContacts(response.data.message));
				} else {
					alert('Erreur lors du chargement des postes d\'un contact');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export function* requestPostesContactsFournisseurs() {

	while (true) {

		let data = yield take(GET_POSTES_CONTACTS_SUP);
		let contacts = data.data;

		//communication avec server
		let server = "http://localhost:3002/providers/jobs";
		let backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://salty-scrubland-22457.herokuapp.com/providers/jobs';


		axios.get(backendUrl, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					let postes = response.data.message;
					if(!!contacts) {
						let array = contacts.map(contact => {
							let poste = 1;
							postes.forEach(element => {
								if(element.libelleposte === contact.libelleposte) {
									poste = element.idposte;
								}
							});
							return {...contact, idposte: poste, titre: contact.libelletitre}	;
						});
						store.dispatch(addArrayContacts(array));
					}
					store.dispatch(updatePostesContactsSup(response.data.message));
					store.dispatch(changeLoading(false));
				} else {
					alert('Erreur lors du chargement des postes d\'un contact');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export function * requestContacts() {

	while (true) {

		let client = yield take(GET_CONTACTS);
		let id = client.idClient;


		//communication avec server
		let server = "http://localhost:3002/clients/contacts/"+ id;
		let backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://salty-scrubland-22457.herokuapp.com/clients/contacts/'+ id;

		axios.get(backendUrl, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					let contacts = response.data.message;
					store.dispatch(getPostesContacts(contacts));
					if(!!contacts) {
					let array = contacts.map((contact)=> {
						for(let key in contact) {
							if (contact.hasOwnProperty(key)) {
								if(contact[key] === null) {
									contact[key] = '';
								}
							}
						}
						return contact
					});
					store.dispatch(updateContacts(array));
					}
				} else {
					alert('Erreur lors du chargement des contact');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export function * requestContactsSup() {

	while (true) {

		let supplier = yield take(GET_CONTACTS_SUP);
		let id = supplier.id;

		//communication avec server
		let server = "http://localhost:3002/providers/contacts/"+ id;
		let backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://salty-scrubland-22457.herokuapp.com/providers/contacts/'+ id;

		axios.get(backendUrl, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					store.dispatch(getPostesContactsSup(response.data.message));
					store.dispatch(updateContactsSup(response.data.message));
					store.dispatch(changeLoading(false));
				} else {
					alert('Erreur lors du chargement des contact');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export function * ContactsFlow() {
	yield fork(requestPostesContacts);
	yield fork(requestContacts);
	yield fork(requestPostesContactsFournisseurs);
	yield fork(requestContactsSup);
}
