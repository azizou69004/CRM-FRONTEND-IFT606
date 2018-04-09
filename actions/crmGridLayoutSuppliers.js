export const CHANGE_LAYOUT_FOUR = 'CHANGE_LAYOUT_FOUR';
export const CHANGE_GRID_FOUR = 'CHANGE_GRID_FOUR';
export const REQUEST_GRID_FOUR = 'REQUEST_GRID_FOUR';
export const CREATE_FOURNISSEUR_FILE = 'CREATE_FOURNISSEUR_FILE';
export const UPDATE_FOURNISSEUR_FILE = 'UPDATE_FOURNISSEUR_FILE';
export const CHANGE_REQUIRED_SUP = 'CHANGE_REQUIRE_SUP';
export const CREATE_NEW_FIELD_SUP = 'CREATE_NEW_FIELD_SUP';
export const GET_CHAMP_TYPES_SUP = 'GET_CHAMP_TYPES_SUP';
export const UPDATE_CHAMP_TYPES_SUP = 'UPDATE_CHAMP_TYPES_SUP';
export const UPDATE_POSITIONS_SUP = 'UPDATE_POSITIONS_SUP';
export const UPDATE_FIELD_SUP = 'UPDATE_FIELD_SUP';
export const CHANGE_UPDATE_FIELD_SUP = 'CHANGE_UPDATE_FIELD_SUP';
export const CHANGE_NEW_FIELD_SUP = 'CHANGE_NEW_FIELD_SUP';
export const DELETE_FIELD_SUP = 'DELETE_FIELD_SUP';
export const GET_GRID_MODIFY_SUP = 'GET_GRID_MODIFY_SUP';
export const CHANGE_ID_DISPLAY_SUP = 'CHANGE_ID_DISPLAY_SUP';
export const DELETE_SUPPLIER = 'DELETE_SUPPLIER';
export const GET_SUPPLIER = 'GET_SUPPLIER';

export function changeLayoutFour (newLayout){
	return {type: CHANGE_LAYOUT_FOUR, newLayout}
}

export function changeGridFour (newGrid){
	return {type: CHANGE_GRID_FOUR, newGrid}
}

export function requestGridFour (){
	return {type: REQUEST_GRID_FOUR}
}

export function createSuppliersFile(file) {
	return {type: CREATE_FOURNISSEUR_FILE, file}
}

export function updateSuppliersFile(file) {
	return {type: UPDATE_FOURNISSEUR_FILE, file}
}

export function changeRequiredSup(newRequiredFields) {
	return {type: CHANGE_REQUIRED_SUP, newRequiredFields}
}

export function createNewFieldSup(newField) {
	return {type: CREATE_NEW_FIELD_SUP, newField}
}

export function getChampTypesSup(data) {
	return {type: GET_CHAMP_TYPES_SUP, data}
}

export function updateChampTypesSup(champTypes) {
	return {type: UPDATE_CHAMP_TYPES_SUP, champTypes}
}

export function updatePositionsSup(positions) {
	return {type: UPDATE_POSITIONS_SUP, positions}
}

export function updateFieldSup(field) {
	return {type: UPDATE_FIELD_SUP, field}
}

export function changeUpdateFieldSup(newUpdateField) {
	return {type: CHANGE_UPDATE_FIELD_SUP, newUpdateField}
}

export function changeNewFieldSup(newField) {
	return {type: CHANGE_NEW_FIELD_SUP, newField}
}

export function deleteFieldSup(field) {
	return {type: DELETE_FIELD_SUP, field}
}

export function getGridModifySup(data) {
	return {type: GET_GRID_MODIFY_SUP, data}
}

export function changeIdDisplaySup(newId) {
	return {type: CHANGE_ID_DISPLAY_SUP, newId}
}

export function deleteSupplier(id) {
	return {type: DELETE_SUPPLIER, id}
}

export function getSupplier(id) {
	return {type: GET_SUPPLIER, id}
}
