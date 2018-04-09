export const CHANGE_LAYOUT = 'CHANGE_LAYOUT';
export const CHANGE_GRID = 'CHANGE_GRID';
export const REQUEST_GRID = 'REQUEST_GRID';
export const CREATE_CUSTOMER_FILE = 'CREATE_CUSTOMER_FILE';
export const UPDATE_CUSTOMER_FILE = 'UPDATE_CUSTOMER_FILE';
export const GET_RELEVES = 'GET_RELEVES';
export const UPDATE_RELEVES = 'UPDATE_RELEVES';
export const CREATE_NEW_FIELD = 'CREATE_NEW_FIELD';
export const GET_CHAMP_TYPES = 'GET_CHAMP_TYPES';
export const UPDATE_CHAMP_TYPES = 'UPDATE_CHAMP_TYPES';
export const GET_ACTIVITES = 'GET_ACTIVITES';
export const UPDATE_ACTIVITES = 'UPDATE_ACTIVITES';
export const GET_ETATS = 'GET_ETATS';
export const UPDATE_ETATS = 'UPDATE_ETATS';
export const GET_PROVENANCES = 'GET_PROVENANCES';
export const UPDATE_PROVENANCES = 'UPDATE_PROVENANCES';
export const CHANGE_REQUIRED_FIELDS = 'CHANGE_REQUIRED_FIELDS';
export const UPDATE_POSITIONS = 'UPDATE_POSITIONS';
export const UPDATE_FIELD = 'UPDATE_FIELD';
export const CHANGE_UPDATE_FIELD = 'CHANGE_UPDATE_FIELD';
export const CHANGE_NEW_FIELD = 'CHANGE_NEW_FIELD';
export const DELETE_FIELD = 'DELETE_FIELD';
export const GET_GRID_MODIFY = 'GET_GRID_MODIFY';
export const CHANGE_ID_DISPLAY = 'CHANGE_ID_DISPLAY';
export const DELETE_CUSTOMER = 'DELETE_CUSTOMER';

export function changeLayout (newLayout){
	return {type: CHANGE_LAYOUT, newLayout}
}

export function changeGrid (newGrid){
	return {type: CHANGE_GRID, newGrid}
}

export function requestGrid (id){
	return {type: REQUEST_GRID, id}
}

export function createCustomerFile(file) {
	return {type: CREATE_CUSTOMER_FILE, file}
}

export function updateCustomerFile(file) {
	return {type: UPDATE_CUSTOMER_FILE, file}
}

export function getReleves(id) {
	return {type: GET_RELEVES, id}
}

export function updateReleves(releves) {
	return {type: UPDATE_RELEVES, releves}
}

export function createNewField(newField) {
	return {type: CREATE_NEW_FIELD, newField}
}

export function getChampTypes(data) {
	return {type: GET_CHAMP_TYPES, data}
}

export function updateChampTypes(champTypes) {
	return {type: UPDATE_CHAMP_TYPES, champTypes}
}

export function getActivites(data) {
	return {type: GET_ACTIVITES, data}
}

export function updateActivites(activites) {
	return {type: UPDATE_ACTIVITES, activites}
}

export function getEtats(data) {
	return {type: GET_ETATS, data}
}

export function updateEtats(etats) {
	return {type: UPDATE_ETATS, etats}
}

export function getProvenances(data) {
	return {type: GET_PROVENANCES, data}
}

export function updateProvenances(provenances) {
	return {type: UPDATE_PROVENANCES, provenances}
}

export function changeRequiredFields(newRequiredFields) {
	return {type: CHANGE_REQUIRED_FIELDS, newRequiredFields}
}

export function updatePositions(positions) {
	return {type: UPDATE_POSITIONS, positions}
}

export function updateField(field) {
	return {type: UPDATE_FIELD, field}
}

export function changeUpdateField(newUpdateField) {
	return {type: CHANGE_UPDATE_FIELD, newUpdateField}
}

export function changeNewField(newField) {
	return {type: CHANGE_NEW_FIELD, newField}
}

export function deleteField(field) {
	return {type: DELETE_FIELD, field}
}

export function getGridModify(data) {
	return {type: GET_GRID_MODIFY, data}
}

export function changeIdDisplay(newId) {
	return {type: CHANGE_ID_DISPLAY, newId}
}

export function deleteCustomer(id) {
	return {type: DELETE_CUSTOMER, id}
}
