export const CHANGE_VIEW_CONTRACT = 'CHANGE_VIEW_CONTRACT';
export const CHANGE_FORM_CONTRACT = 'CHANGE_FORM_CONTRACT';
export const GET_EMPLOYES_AFC = 'GET_EMPLOYES_AFC';
export const UPDATE_EMPLOYES_AFC = 'UPDATE_EMPLOYES_AFC';
export const GET_LIST_ASSUREURS = 'GET_LIST_ASSUREURS';
export const UPDATE_LIST_ASSUREURS = 'UPDATE_LIST_ASSUREURS';
export const GET_AGA = 'GET_AGA';
export const UPDATE_AGA = 'UPDATE_AGA';
export const GET_LIST_CONTRACTS = 'GET_LIST_CONTRACTS';
export const SET_LIST_CONTRACTS = 'SET_LIST_CONTRACTS';
export const CHANGE_SEARCH_CONTRACTS = 'CHANGE_SEARCH_CONTRACTS';
export const CHANGE_BIG_LAYOUT = 'CHANGE_BIG_LAYOUT';
export const CHANGE_LIL_LAYOUT = 'CHANGE_LIL_LAYOUT';
export const GET_MODULES = 'GET_MODULES';
export const SET_MODULES = 'SET_MODULES';
export const GET_GRID = 'GET_GRID';
export const SET_GRID = 'SET_GRID';
export const UPDATE_POS_LAYOUT = 'UPDATE_POS_LAYOUT';
export const CHANGE_NEW_FIELD_CONTRACT = 'CHANGE_NEW_FIELD_CONTRACT';
export const CHANGE_UPDATE_FIELD_CONTRACT = 'CHANGE_UPDATE_FIELD_CONTRACT';
export const GET_TYPES_CONTRACT = 'GET_TYPES_CONTRACT';
export const SET_TYPES_CONTRACT = 'SET_TYPES_CONTRACT';
export const SEND_NEW_FIELD_CONTRACT = 'SEND_NEW_FIELD_CONTRACT';
export const SEND_UPDATE_FIELD_CONTRACT = 'SEND_UPDATE_FIELD_CONTRACT';
export const SEND_DELETE_FIELD_CONTRACT = 'SEND_DELETE_FIELD_CONTRACT';
export const SET_FROM_CLIENT = 'SET_FROM_CLIENT';
export const GET_CONTRACT = 'GET_CONTRACT';
export const SET_CONTRACT = 'SET_CONTRACT';
export const SUBMIT_CONTRACT = 'SUBMIT_CONTRACT'

export function createContract(contract){
	return {type: SUBMIT_CONTRACT, contract}
}

export function changeViewContract (newView){
	return {type: CHANGE_VIEW_CONTRACT, newView}
}

export function changeFormContract (newForm){
	return {type: CHANGE_FORM_CONTRACT, newForm}
}

export function getEmployesAFC(){
	return {type: GET_EMPLOYES_AFC}
}

export function updateEmployesAFC(listEmployes){
	return {type: UPDATE_EMPLOYES_AFC, listEmployes}
}
//nomassureurs et AGA
export function getListAssureurs(){
	return {type: GET_LIST_ASSUREURS}
}

export function updateListAssureurs(listAssureurs){
	return {type: UPDATE_LIST_ASSUREURS, listAssureurs}
}

export function getAGA(){
	return {type: GET_AGA}
}

export function updateAGA(listAGA){
	return {type: UPDATE_AGA, listAGA}
}

export function getListContracts() {
	return {type: GET_LIST_CONTRACTS}
}

export function setListContracts(contracts) {
	return {type: SET_LIST_CONTRACTS, contracts}
}

export function changeSearchContracts(search) {
	return {type: CHANGE_SEARCH_CONTRACTS, search}
}

export function changeBigLayout(layout) {
	return {type: CHANGE_BIG_LAYOUT, layout}
}

export function changeLilLayout(layout) {
	return {type: CHANGE_LIL_LAYOUT, layout}
}

export function getModules() {
	return {type: GET_MODULES}
}

export function setModules(modules) {
	return {type: SET_MODULES, modules}
}

export function getGrid(update) {
	return {type: GET_GRID, update}
}

export function setGrid(grid) {
	return {type: SET_GRID, grid}
}

export function updatePosLayout(layout, menus) {
	return {type: UPDATE_POS_LAYOUT, layout, menus}
}

export function changeNewFieldContract(newField) {
	return {type: CHANGE_NEW_FIELD_CONTRACT, newField}
}

export function getTypesContract() {
	return {type: GET_TYPES_CONTRACT}
}

export function setTypesContract(types) {
	return {type: SET_TYPES_CONTRACT, types}
}

export function sendNewFieldContract(newField) {
	return {type: SEND_NEW_FIELD_CONTRACT, newField}
}

export function changeUpdateFieldContract(updateField) {
	return {type: CHANGE_UPDATE_FIELD_CONTRACT, updateField}
}

export function sendUpdateFieldContract(updateField) {
	return {type: SEND_UPDATE_FIELD_CONTRACT, updateField}
}

export function sendDeleteFieldContract(id) {
	return {type: SEND_DELETE_FIELD_CONTRACT, id}
}

export function setFromClient(fromClient) {
	return {type: SET_FROM_CLIENT, fromClient}
}

export function getContract(idContract) {
	return {type: GET_CONTRACT, idContract}
}

export function setContract(contract) {
	return {type: SET_CONTRACT, contract}
}
