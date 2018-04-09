export const SEARCH_REQUEST_COLL = 'SEARCH_REQUEST_COLL';
export const CHANGE_FORM_COLL = 'CHANGE_FORM_COLL';
export const SENDING_REQUEST_COLL = 'SENDING_REQUEST_COLL';
export const GET_REQUEST_CLIENT_COLL = 'GET_REQUEST_CLIENT_COLL';

export function changeFormColl(newFormState) {
	return {type: CHANGE_FORM_COLL, newFormState}
}

export function searchRequestColl(data) {
	return {type: SEARCH_REQUEST_COLL, data}
}

export function sendingRequestColl() {
	return {type: SENDING_REQUEST_COLL}
}

export function getRequestClientColl(newDossiersState) {
	return {type: GET_REQUEST_CLIENT_COLL, newDossiersState}
}
