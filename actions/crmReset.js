
export const RESET_REQUEST = 'RESET_REQUEST';
export const CHANGE_FORM = 'CHANGE_FORM';
export const SENDING_REQUEST = 'SENDING_REQUEST';
export const SET_AUTH = 'SET_AUTH';





export function changeForm (newFormState){
	return {type: CHANGE_FORM, newFormState}
}

export function resetRequest (data){
	return {type: RESET_REQUEST, data}
}

export function sendingRequest (sending){
	return {type: SENDING_REQUEST, sending}
}

export function setAuthState (newAuthState){
	return {type: SET_AUTH, newAuthState}
}

