import {take, fork} from 'redux-saga/effects';
import {
	REQUEST_GRID, changeGrid, changeLayout, CREATE_CUSTOMER_FILE,
	UPDATE_CUSTOMER_FILE, GET_RELEVES, updateReleves, CREATE_NEW_FIELD,
	requestGrid, GET_CHAMP_TYPES, updateChampTypes, GET_ACTIVITES, updateActivites, GET_ETATS, GET_PROVENANCES,
	UPDATE_POSITIONS, updateEtats, updateProvenances, getReleves, getChampTypes, getEtats,
	getActivites, getProvenances, UPDATE_FIELD, DELETE_FIELD, changeUpdateField, changeNewField, GET_GRID_MODIFY,
	getGridModify, changeRequiredFields, DELETE_CUSTOMER
} from '../actions/crmGridLayout';
import axios from 'axios';
import {store} from '../store';
import {changeViewCollective} from "../actions/crmCollectiveContainer";
import {changeLoading, changeLoadingValidation} from "../actions/crmDashboard";


let tokenToSend= localStorage.getItem("cookieSession");
if(tokenToSend === undefined)
	tokenToSend="";

let config ={
		headers: {
			"Authorization": tokenToSend
		}
};

//Récupère les champs du back-end
export function * getGridLayout (){
	while(true){

		let view = yield take(REQUEST_GRID);
		let {id} = view;

		//communication avec server
		let server = "http://localhost:3002/attributesManagement/customer";
		let backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://salty-scrubland-22457.herokuapp.com/attributesManagement/customer';

		axios.get(backendUrl,config)
			.then(function (response) {
				if(!!response.data.message && response.data.status === "success"){
					let grid = response.data.message.map( champ => {
						return {...champ, value: ''};
					});
					store.dispatch(changeGrid(grid));
					let layout = response.data.message.map(champ => {
						return {
							i: champ.idattrentreprise.toString(),
							x: champ.posx,
							y: champ.posy,
							w: champ.width,
							h: champ.height,
							minW: champ.minwidth,
							static: true
						};
					});
					store.dispatch(changeLayout({lg: layout, md: layout, sm: layout, xs: layout, xxs: layout}));
					if(id) {
						store.dispatch(getReleves({id, grid}));
					}
					else {
						store.dispatch(changeRequiredFields({
							nomEntreprise: '',
							releve: '1',
							rue: '',
							ville: '',
							province: '',
							codePostal: '',
							telephone: '',
							extension: '',
							activite: '1',
							etat: '1',
							provenance: '1',
							prospect: true,
							notes: ''
						}));
						store.dispatch(getReleves());
					}
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

//Récupère les valeurs de la liste des relevés
export function * requestReleves (){
	while(true){

		let view = yield take(GET_RELEVES);
		//communication avec server
		let server = "http://localhost:3002/clients/statementSendingModes";
		let backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://salty-scrubland-22457.herokuapp.com/clients/statementSendingModes';

		axios.get(backendUrl, config)
			.then(function (response) {
				if(!!response.data.message && response.data.status === "success"){
					store.dispatch(updateReleves(response.data.message));
					if(view.id) {
						store.dispatch(getChampTypes({id: view.id.id, releves: response.data.message, grid: view.id.grid}))
					}
					else {
						store.dispatch(getChampTypes())
					}
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

//Récupère les types de champ que l'administrateur peut créer
export function * requestChampTypes (){
	while(true){

		let view = yield take(GET_CHAMP_TYPES);

		//communication avec server
		let server = "http://localhost:3002/attributesManagement/types";
		let backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://salty-scrubland-22457.herokuapp.com/attributesManagement/types';

		axios.get(backendUrl,config)
			.then(function (response) {
				if(!!response.data.message && response.data.status === "success"){
					store.dispatch(updateChampTypes(response.data.message));
					if(view.data) {
						store.dispatch(getActivites({
							id: view.data.id,
							releves: view.data.releves,
							grid: view.data.grid
						}));
					}
					else {
						store.dispatch(getActivites());
					}
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

//Récupère les activites
export function * requestActivites (){
	while(true){

		let view = yield take(GET_ACTIVITES);

		//communication avec server
		let server = "http://localhost:3002/clients/activities";
		let backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://salty-scrubland-22457.herokuapp.com/clients/activities';

		axios.get(backendUrl, config)
			.then(function (response) {
				if(!!response.data.message && response.data.status === "success"){
					store.dispatch(updateActivites(response.data.message));
					if(view.data) {
						store.dispatch(getEtats({
							id: view.data.id,
							releves: view.data.releves,
							activites: response.data.message,
							grid: view.data.grid
						}));
					}
					else {
						store.dispatch(getEtats());
					}
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

//Récupère les etats
export function * requestEtats (){
	while(true){

		let view = yield take(GET_ETATS);

		//communication avec server
		let server = "http://localhost:3002/clients/states";
		let backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://salty-scrubland-22457.herokuapp.com/clients/states';

		axios.get(backendUrl,config)
			.then(function (response) {
				if(!!response.data.message && response.data.status === "success"){
					store.dispatch(updateEtats(response.data.message));
					if(view.data) {
						store.dispatch(getProvenances({
							id: view.data.id,
							releves: view.data.releves,
							activites: view.data.activites,
							etats: response.data.message,
							grid: view.data.grid
						}));
					}
					else {
						store.dispatch(getProvenances());
					}
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

//Récupère les provenances
export function * requestProvenances (){
	while(true){

		let view = yield take(GET_PROVENANCES);

		//communication avec server
		let server = "http://localhost:3002/clients/provenances";
		let backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://salty-scrubland-22457.herokuapp.com/clients/provenances';

		axios.get(backendUrl, config)
			.then(function (response) {
				if(!!response.data.message && response.data.status === "success"){
					store.dispatch(updateProvenances(response.data.message));
					if(view.data) {
						store.dispatch(getGridModify({
							id: view.data.id,
							releves: view.data.releves,
							activites: view.data.activites,
							etats: view.data.etats,
							provenances: response.data.message,
							grid: view.data.grid
						}))
					}
					else {
						store.dispatch(changeLoading(false));
					}
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

//Envoie les champs au back-end (Création d'un client)
export function * sendFile() {
	while(true) {
		let file = yield take(CREATE_CUSTOMER_FILE);
		let {
			grid,
			requiredFields,
			arrayContacts
		} = file.file;
		let facultatif = grid.map(champ => {
			return {id: champ.idattrentreprise, value: champ.value}
		});

		//communication avec server
		let server = "http://localhost:3002/clients/create";
		let backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://salty-scrubland-22457.herokuapp.com/clients/create';

		axios.post(backendUrl, {
			idreleve: requiredFields.releve,
			nom: requiredFields.nomEntreprise,
			tel_princ: requiredFields.telephone,
			ext_tel_princ: requiredFields.extension,
			idactivite: requiredFields.activite,
			rue: requiredFields.rue,
			ville: requiredFields.ville,
			province: requiredFields.province,
			codepostal: requiredFields.codePostal,
			idetat: requiredFields.etat,
			idprovenance: requiredFields.provenance,
			prospect: requiredFields.prospect,
			notes: requiredFields.notes,
			facultatif: facultatif,
			newcontacts: arrayContacts
		},config)
			.then(function (response) {
				store.dispatch(changeLoadingValidation(false));
				if (!!response.data.status && response.data.status === "success") {
					alert('La fiche client a été créée avec succès');
					store.dispatch(changeViewCollective('customers'));
				}
				else if(response.data.status === "fail") {
					alert(response.data.message);
				}
				else {
					alert('Erreur lors de la création de la fiche client');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

//Envoie les champs au back-end (Modification d'un client)
export function * updateFile() {
	while(true) {
		let file = yield take(UPDATE_CUSTOMER_FILE);
		let {
			grid,
			requiredFields,
			idToDisplay,
			newcontacts,
			delcontacts,
			updatedContacts
		} = file.file;
		console.log("update file");

		let facultatif = grid.map(champ => {
			return {id: champ.idattrentreprise, value: champ.value}
		});

		//communication avec server
		let server = "http://localhost:3002/clients/update";
		let backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://salty-scrubland-22457.herokuapp.com/clients/update';

		axios.post(backendUrl, {
			idclient: idToDisplay,
			idreleve: requiredFields.releve,
			nom: requiredFields.nomEntreprise,
			tel_princ: requiredFields.telephone,
			ext_tel_princ: requiredFields.extension,
			idactivite: requiredFields.activite,
			rue: requiredFields.rue,
			ville: requiredFields.ville,
			province: requiredFields.province,
			codepostal: requiredFields.codePostal,
			idetat: requiredFields.etat,
			idprovenance: requiredFields.provenance,
			prospect: requiredFields.prospect,
			notes: requiredFields.notes,
			facultatif: facultatif,
			updtcontacts: updatedContacts,
			newcontacts: newcontacts,
			delcontacts: delcontacts,
		},config)
			.then(function (response) {
				store.dispatch(changeLoadingValidation(false));
				if (!!response.data.status && response.data.status === "success") {
					alert('La fiche client a été modifiée avec succès');
					store.dispatch(changeViewCollective('customers'));
				}
				else if(response.data.status === 'fail') {
					alert(response.data.message);
				}
				else {
					alert('Erreur lors de la modification de la fiche client');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

//On supprime la fiche client
export function * deleteCustomerFile() {
	while(true) {
		let field = yield take(DELETE_CUSTOMER);
		let id = field.id;
		//communication avec server
		let server = "http://localhost:3002/clients/"+id;
		let backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://salty-scrubland-22457.herokuapp.com/clients/'+id;

		axios.delete(backendUrl,config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					store.dispatch(changeViewCollective("customers"));
					alert("Fiche client supprimé avec succès");
				} else {
					alert('Erreur lors de la supression d\'un client');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

//Envoie le nouveau champ crée au back-end
export function * createNewField() {
	while(true) {
		let champ = yield take(CREATE_NEW_FIELD);
		let {
			form,
			posx,
			posy
		} = champ.newField;
		console.log("create new field");

		//communication avec server
		let server = "http://localhost:3002/attributesManagement/create/customer";
		let backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://salty-scrubland-22457.herokuapp.com/attributesManagement/create/customer';

		axios.post(backendUrl, {
			description: form.description,
			label: form.label,
			idtype: form.type,
			forme: null,
			valeur_defaut: null,
			ext: null,
			posx: posx,
			posy: posy,
			height: 1,
			minwidth: 3,
			width: 3

		},config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					alert('Nouveau champ crée avec succès');
					store.dispatch(changeNewField(
						{
							description: '',
							label: '',
							type: "1"
						}
					));
					store.dispatch(requestGrid());
				} else {
					alert('Erreur lors de la création d\'un nouveau champ');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

//on envoie la position des champs
export function * updatePositions() {
	while(true) {
		let positions = yield take(UPDATE_POSITIONS);
		let {
			newItem,
		} = positions.positions;

		//communication avec server
		let server = "http://localhost:3002/attributesManagement/update/customer/display";
		let backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://salty-scrubland-22457.herokuapp.com/attributesManagement/update/customer/display';

		axios.post(backendUrl, {
			layout: newItem,
		},config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
				} else {
					alert('Erreur lors de la modification des positions');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

//on envoie les infos d'un champ à modifier
export function * sendUpdateField() {
	while(true) {
		let field = yield take(UPDATE_FIELD);
		let {
			descField,
			nameField,
			id
		} = field.field;
		//communication avec server
		let server = "http://localhost:3002/attributesManagement/update/customer";
		let backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://salty-scrubland-22457.herokuapp.com/attributesManagement/update/customer';

		axios.post(backendUrl, {
			id: id,
			label: nameField,
			description: descField,
			forme: null,
			valeur_defaut: null,
			ext: null
		},config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					alert("La modification du champ est un succès");
					store.dispatch(changeUpdateField({
						nameField: '',
						descField: ''
					}));
					store.dispatch(requestGrid());
				}
				else if(response.data.status === "fail") {
					alert(response.data.message);
				}
				else {
					alert('Erreur lors de la modification des positions');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

//on supprime un champ
export function * sendDeleteField() {
	while(true) {
		let field = yield take(DELETE_FIELD);
		let id = field.field;


		//communication avec server
		let server = "http://localhost:3002/attributesManagement/customer/"+id;
		let backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://salty-scrubland-22457.herokuapp.com/attributesManagement/customer/'+id;

		axios.delete(backendUrl,config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					store.dispatch(requestGrid());
					alert("Champ supprimé avec succès");
				} else {
					alert('Erreur lors de la supression d\'un champ');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

//On récupère les champs d'une fiche client particulière
export function * getGridLayoutToModify() {
	while(true) {
		let client = yield take(GET_GRID_MODIFY);
		let {id, releves, activites, etats, provenances, grid} = client.data;
		let releve, activite, etat, provenance = '';

		//communication avec server
		let server = "http://localhost:3002/clients/"+id;
		let backendUrl = window.location.host;
		backendUrl = backendUrl === 'localhost:3000' ? server : 'https://salty-scrubland-22457.herokuapp.com/attributesManagement/clients/'+id;

		axios.get(server,config)
			.then(function (response) {
				if (!!response.data.status && response.data.status === "success") {
					let champs = response.data.message;
					let facultatif = [];
					grid.forEach(champ => {
						let duplicate = false;
						champs.facultatif.forEach(champ2 => {
							if(champ2.idRow === champ.idattrentreprise) {
								duplicate = true;
								facultatif.push({
									...champ,
									value: champ2.valeur
								});
							}
						});
						if(!duplicate) {
							facultatif.push({
								...champ,
								value: ''
							});
						}
					});
					store.dispatch(changeGrid(facultatif));
					releves.forEach(type => {
						if(type.modeenvoiereleve === champs.releve) {
							releve = type.idreleve;
						}
					});

					activites.forEach(type => {
						if(type.libelleactivite === champs.forme_type) {
							activite = type.idactivite;
						}
					});

					etats.forEach(type => {
						if(type.libelleetat === champs.etat) {
							etat = type.idetat;
						}
					});

					provenances.forEach(type => {
						if(type.libelleprovenance === champs.provenance) {
							provenance = type.idprovenance;
						}
					});

					store.dispatch(changeRequiredFields({
						nomEntreprise: champs.nom,
						releve: releve,
						rue: champs.rue,
						ville: champs.ville,
						province: champs.province,
						codePostal: champs.codepostal,
						telephone: champs.tel_principal,
						extension: champs.ext_tel_principal,
						activite: activite,
						etat: etat,
						provenance: provenance,
						prospect: true,
						notes: champs.notes
					}));
					store.dispatch(changeLoading(false));
				} else {
					alert('Erreur lors de la récupération d\'un client');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
}

export function * GridFlow () {
	yield fork (getGridLayout);
	yield fork (sendFile);
	yield fork (updateFile);
	yield fork (requestReleves);
	yield fork (createNewField);
	yield fork (requestChampTypes);
	yield fork (requestActivites);
	yield fork (requestEtats);
	yield fork (requestProvenances);
	yield fork (updatePositions);
	yield fork (sendUpdateField);
	yield fork (sendDeleteField);
	yield fork (getGridLayoutToModify);
	yield fork (deleteCustomerFile);
}
