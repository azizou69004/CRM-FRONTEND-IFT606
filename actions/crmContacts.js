export const GET_POSTES_CONTACTS = 'GET_POSTES_CONTACTS';
export const UPDATE_POSTES_CONTACTS = 'UPDATE_POSTES_CONTACTS';
export const GET_CONTACTS = 'GET_CONTACTS';
export const UPDATE_CONTACTS = 'UPDATE_CONTACTS';
export const CHANGE_FORM_STATE = 'CHANGE_FORM_STATE';
export const ADD_ARRAY_CONTACTS = 'ADD_ARRAY_CONTACTS';
export const DELETE_CONTACT = 'DELETE_CONTACT';
export const GET_POSTES_CONTACTS_SUP = 'GET_POSTES_CONTACTS_SUP';
export const UPDATE_POSTES_CONTACTS_SUP = 'UPDATE_POSTES_CONTACTS_SUP';
export const GET_CONTACTS_SUP = 'GET_CONTACTS_SUP';
export const UPDATE_CONTACTS_SUP = 'UPDATE_CONTACTS_SUP';

export function getPostesContacts(data) {
	return {type: GET_POSTES_CONTACTS, data}
}

export function updatePostesContacts(postes) {
	return {type: UPDATE_POSTES_CONTACTS, postes}
}

export function getContacts(idClient) {
	return {type: GET_CONTACTS, idClient}
}

export function updateContacts(contacts) {
	return {type: UPDATE_CONTACTS, contacts}
}

export function changeFormState(newFormState) {
	return {type: CHANGE_FORM_STATE, newFormState}
}

export function addArrayContacts(newArray) {
	return {type: ADD_ARRAY_CONTACTS, newArray}
}

export function deleteContact(newFormState, deletedContacts) {
	return {type: DELETE_CONTACT, newFormState, deletedContacts}
}

export function getPostesContactsSup(data) {
	return {type: GET_POSTES_CONTACTS_SUP, data}
}

export function updatePostesContactsSup(postes) {
	return {type: UPDATE_POSTES_CONTACTS_SUP, postes}
}

export function getContactsSup(id) {
	return {type: GET_CONTACTS_SUP, id}
}

export function updateContactsSup(contacts) {
	return {type: UPDATE_CONTACTS_SUP, contacts}
}
