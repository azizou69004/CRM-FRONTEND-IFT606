import {take, fork} from 'redux-saga/effects';

import {
	GET_DEFAULTPERMS, GET_OPERATIONS, SUBMIT_USER, GET_ROLES, UPDATE_USER,
	updateDefaultPerms, updateOperations, updateRoles,
} from '../actions/crmCreateUser';

import {
	GET_LIST_USERS, REQUEST_USER_BY_ID, DELETE_USER, updateUsers, updateUserToDisplay, getListUser
} from '../actions/crmUserManagement';

import axios from 'axios';
import {store} from '../store';
import {changeLoading} from "../actions/crmDashboard";


export function* createUser() {

	while (true) {

		let user = yield take(SUBMIT_USER);

		let {
			role,
			titre,
			nom,
			prenom,
			login,
			mdpProv,
			mail,
			userPerms
		} = user.newUser;

		var tokenToSend = localStorage.getItem("cookieSession");
		if (tokenToSend === undefined)
			tokenToSend = "";
		var config = {
			headers: {
				"Authorization": tokenToSend
			}
		};

		//communication avec server
		var server = "http://localhost:3002/users/create";
		var backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://salty-scrubland-22457.herokuapp.com/users/create';

		axios.post(backendUrl, {
			role: role,
			titre: titre,
			nom: nom,
			prenom: prenom,
			login: login,
			mdpProv: mdpProv,
			mail: mail,
			userPerms: userPerms,
		}, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					alert('L\'utilisateur a été créé avec succès');
					store.dispatch(getListUser());
				}
				else if (response.data.status === "fail") {
					alert(response.data.message);
				}
				else {
					alert('Erreur lors de la création de l\'utilisateur');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}


export function* updateUser() {
	while (true) {

		let user = yield take(UPDATE_USER);
		let {
			id,
			titre,
			role,
			nom,
			prenom,
			login,
			mail,
			userPerms
		} = user.updatedUser;
		var tokenToSend = localStorage.getItem("cookieSession");
		if (tokenToSend === undefined)
			tokenToSend = "";
		var config = {
			headers: {
				"Authorization": tokenToSend
			}
		}
		//communication avec server
		var server = "http://localhost:3002/users/update/";
		var backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://salty-scrubland-22457.herokuapp.com/users/update/';

		axios.post(backendUrl, {
			id: id,
			titre: titre,
			role: role,
			nom: nom,
			prenom: prenom,
			login: login,
			mail: mail,
			userPerms: userPerms,
		}, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					alert('L\'utilisateur a été modifié avec succès');
					store.dispatch(getListUser());
				}
				else if (response.data.status === "fail") {
					alert(response.data.message);
				}
				else {
					alert('Erreur lors de la modification de l\'utilisateur');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export function* deleteUser() {
	while (true) {

		var tokenToSend = localStorage.getItem("cookieSession");
		if (tokenToSend === undefined)
			tokenToSend = "";

		var config = {
			headers: {
				"Authorization": tokenToSend
			}
		};

		let id = yield take(DELETE_USER);

		//communication avec server
		var server = "http://localhost:3002/users/user/" + id.id;
		var backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://salty-scrubland-22457.herokuapp.com/user/' + id.id;

		axios.delete(backendUrl, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					alert('L\'utilisateur a été supprimé avec succès');
					store.dispatch(getListUser());
				} else {
					alert('Erreur lors de la suppression de l\'utilisateur');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export function* getOperations() {
	while (true) {
		yield take(GET_OPERATIONS);
		var tokenToSend = localStorage.getItem("cookieSession");
		if (tokenToSend === undefined)
			tokenToSend = "";

		var config = {
			headers: {
				"Authorization": tokenToSend
			}
		}
		var server = "http://localhost:3002/users/operations";
		var backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://salty-scrubland-22457.herokuapp.com/users/operations';

		axios.get(backendUrl, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					store.dispatch(updateOperations(response.data.message));
				} else {
					alert("Erreur lors du chargement des operations");
				}
			})
			.catch(function (error) {
				console.log(error);
			})
	}
}

export function* getDefaultPerms() {
	while (true) {

		yield take(GET_DEFAULTPERMS);

		var tokenToSend = localStorage.getItem("cookieSession");

		if (tokenToSend === undefined)
			tokenToSend = "";

		var config = {
			headers: {
				"Authorization": tokenToSend
			}
		}
		var server = "http://localhost:3002/users/defaultPerms";
		var backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://salty-scrubland-22457.herokuapp.com/users/defaultPerms';

		axios.get(backendUrl, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					store.dispatch(updateDefaultPerms(response.data.message));
				} else {
					alert("Erreur lors du chargement des operations");
				}
			})
			.catch(function (error) {
				console.log(error);
			})
	}
}

export function* getRoles() {
	while (true) {
		yield take(GET_ROLES);

		//communication avec server
		var server = "http://localhost:3002/users/getRoles";
		var backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://salty-scrubland-22457.herokuapp.com/users/getRoles';

		var tokenToSend = localStorage.getItem("cookieSession");
		if (tokenToSend === undefined)
			tokenToSend = "";

		var config = {
			headers: {
				"Authorization": tokenToSend
			}
		}
		axios.get(backendUrl, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					store.dispatch(updateRoles(response.data.roles));
				} else {
					alert('Erreur lors du chargement des roles');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export function* getListUsers() {
	while (true) {
		yield take(GET_LIST_USERS);

		var server = "http://localhost:3002/users/list";
		var backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://salty-scrubland-22457.herokuapp.com/users/list';

		var tokenToSend = localStorage.getItem("cookieSession");
		if (tokenToSend === undefined)
			tokenToSend = "";

		var config = {
			headers: {
				"Authorization": tokenToSend
			}
		}
		axios.get(backendUrl, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					store.dispatch(updateUsers(response.data.users));
				} else {
					alert('Erreur lors du chargement des utilisateurs');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export function* requestUserToDisplay() {
	while (true) {
		let user = yield take(REQUEST_USER_BY_ID);

		let tokenToSend = localStorage.getItem("cookieSession");
		if (tokenToSend === undefined)
			tokenToSend = "";

		let config = {
			headers: {
				"Authorization": tokenToSend
			}
		};
		let server = "http://localhost:3002/users/user/" + user.id;
		let backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://salty-scrubland-22457.herokuapp.com/users/user/' + user.id;

		axios.get(backendUrl, config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					store.dispatch(updateUserToDisplay(response.data.message));
					store.dispatch(changeLoading(false));
				} else {
					alert('Erreur lors du chargement des utilisateurs');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export function* gestionUserFlow() {
	yield fork(createUser);
	yield fork(getOperations);
	yield fork(getDefaultPerms);
	yield fork(getRoles);
	yield fork(getListUsers);
	yield fork(requestUserToDisplay);
	yield fork(updateUser);
	yield fork(deleteUser);
}
